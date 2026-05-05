"use client";

/**
 * Canvas trailing cursor — adapted from
 * https://cursify.ui-layouts.com/components/canvas-cursor
 */

import { useEffect } from "react";

const CANVAS_ID = "canvas";

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
} as const;

type Pos = { x: number; y: number };

class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(config: Partial<Oscillator> = {}) {
    this.phase = config.phase ?? 0;
    this.offset = config.offset ?? 0;
    this.frequency = config.frequency ?? 0.001;
    this.amplitude = config.amplitude ?? 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class Node {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

class LineTrail {
  private readonly pos: Pos;
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(spring: number, pos: Pos) {
    this.pos = pos;
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    for (let i = 0; i < CONFIG.size; i++) {
      const t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }

  update() {
    let e = this.spring;
    const nodes = this.nodes;
    const head = nodes[0];
    head.vx += (this.pos.x - head.x) * e;
    head.vy += (this.pos.y - head.y) * e;

    for (let i = 0, len = nodes.length; i < len; i++) {
      const t = nodes[i];
      if (i > 0) {
        const prev = nodes[i - 1];
        t.vx += (prev.x - t.x) * e;
        t.vy += (prev.y - t.y) * e;
        t.vx += prev.vx * CONFIG.dampening;
        t.vy += prev.vy * CONFIG.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= CONFIG.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const nodes = this.nodes;
    const last = nodes.length - 2;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let a = 1; a < last; a++) {
      const e = nodes[a];
      const t = nodes[a + 1];
      const midX = 0.5 * (e.x + t.x);
      const midY = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, midX, midY);
    }
    const e = nodes[last];
    const t = nodes[last + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function updatePointerPos(pos: Pos, ev: MouseEvent | TouchEvent) {
  if ("touches" in ev && ev.touches.length > 0) {
    pos.x = ev.touches[0].clientX;
    pos.y = ev.touches[0].clientY;
  } else if ("clientX" in ev) {
    pos.x = ev.clientX;
    pos.y = ev.clientY;
  }
}

export default function useCanvasCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.getElementById(
      CANVAS_ID,
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const pos: Pos = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };

    let lines: LineTrail[] = [];
    let running = true;
    let rafId = 0;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    const hue = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const initLines = () => {
      lines = [];
      for (let i = 0; i < CONFIG.trails; i++) {
        lines.push(new LineTrail(0.4 + (i / CONFIG.trails) * 0.025, pos));
      }
    };

    const resizeCanvas = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLines();
    };

    const onMove = (e: MouseEvent) => {
      updatePointerPos(pos, e);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
    };

    const render = () => {
      if (!running) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(hue.update())}, 50%, 50%, 0.22)`;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 0; i < lines.length; i++) {
        lines[i].update();
        lines[i].draw(ctx);
      }
      rafId = requestAnimationFrame(render);
    };

    const onFocus = () => {
      if (!running && lines.length > 0) {
        running = true;
        render();
      }
    };

    const onBlur = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resizeCanvas();

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("orientationchange", resizeCanvas);

    render();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("orientationchange", resizeCanvas);
    };
  }, []);
}
