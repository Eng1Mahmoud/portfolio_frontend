import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
function load(path, overrides = {}, globals = {}) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    process: { env: { NEXT_PUBLIC_POSTHOG_KEY: "test-key" } },
    require: (name) => (name in overrides ? overrides[name]() : require(name)),
    ...globals,
  });
  return exports;
}

test("hero renders the full biography and name without JavaScript or hidden styles", () => {
  const { HomeIntro } = load("components/Home/HomeIntro.tsx");
  const html = renderToStaticMarkup(
    React.createElement(HomeIntro, {
      profileInfo: {
        userName: "Mahmoud Mohamed",
        title: "Engineer",
        bio: "First line\ncontinues.\n\nSecond paragraph.",
      },
    }),
  );
  assert.match(html, /Mahmoud/);
  assert.match(html, /Mohamed/);
  assert.match(html, /First line continues\./);
  assert.match(html, /Second paragraph\./);
  assert.equal((html.match(/class="hero-bio/g) || []).length, 2);
  assert.doesNotMatch(html, /opacity:0|translateY|visibility:hidden/);
});

test("concurrent analytics events share initialization and arrive in order", async () => {
  const calls = [];
  const sdk = {
    init: () => calls.push("init"),
    capture: (name) => calls.push(name),
  };
  const { getPostHog, captureEvent } = load(
    "utiles/analytics-events/posthog-client.ts",
    { "posthog-js": () => sdk },
  );
  captureEvent("first");
  captureEvent("second");
  await getPostHog();
  await Promise.resolve();
  assert.deepEqual(calls, ["init", "first", "second"]);
});

test("a failed SDK load does not break actions and can be retried", async () => {
  let attempts = 0;
  const calls = [];
  const { getPostHog, captureEvent } = load(
    "utiles/analytics-events/posthog-client.ts",
    {
      "posthog-js": () => {
        if (++attempts === 1) throw new Error("offline");
        return { init: () => {}, capture: (name) => calls.push(name) };
      },
    },
  );
  captureEvent("offline-event");
  await assert.rejects(getPostHog(), /offline/);
  captureEvent("retry-event");
  await getPostHog();
  await Promise.resolve();
  assert.deepEqual(calls, ["retry-event"]);
});

test("page template does not hide server-rendered content before hydration", () => {
  const { default: Template } = load("app/(main)/template.tsx", {
    "next/navigation": () => ({ usePathname: () => "/" }),
    "@/utiles/first-interaction": () => ({
      afterFirstInteraction: () => () => {},
    }),
    "@/utiles/section-scroll": () => ({ scrollToSection: () => {} }),
  });
  const html = renderToStaticMarkup(
    React.createElement(Template, null, "Visible immediately"),
  );
  assert.match(html, /Visible immediately/);
  assert.doesNotMatch(html, /opacity:0|visibility:hidden/);
});

test("first interaction is shared once and removes all listeners", () => {
  const events = new Map();
  const window = {
    addEventListener: (name, callback) => events.set(name, callback),
    removeEventListener: (name) => events.delete(name),
  };
  const { afterFirstInteraction, hasInteracted } = load(
    "utiles/first-interaction.ts",
    {},
    { window },
  );
  const calls = [];
  const cancel = afterFirstInteraction(() => calls.push("cancelled"));
  afterFirstInteraction(() => calls.push("active"));
  assert.equal(events.size, 4);
  assert.equal(hasInteracted(), false);
  cancel();
  events.get("scroll")();
  assert.equal(hasInteracted(), true);
  assert.equal(events.size, 0);
  afterFirstInteraction(() => calls.push("late"));
  assert.deepEqual(calls, ["active", "late"]);
});

test("core error capture stays immediate while replay loads once on error", async () => {
  let beforeSend;
  let loads = 0;
  let added = 0;
  let interaction;
  const sdk = {
    init: (options) => {
      beforeSend = options.beforeSend;
    },
    lazyLoadIntegration: async () => {
      loads++;
      return () => ({ name: "Replay" });
    },
    addIntegration: () => {
      added++;
    },
  };
  load(
    "instrumentation-client.ts",
    {
      "@sentry/nextjs": () => sdk,
      "@/utiles/first-interaction": () => ({
        afterFirstInteraction: (cb) => {
          interaction = cb;
        },
      }),
      "@/utiles/analytics-events/posthog-client": () => ({
        getPostHog: async () => ({}),
      }),
    },
    { process: { env: { NEXT_PUBLIC_SENTRY_DSN: "test-dsn" } } },
  );
  assert.equal(loads, 0);
  assert.equal(typeof interaction, "function");
  const event = { message: "test error" };
  assert.equal(beforeSend(event), event);
  assert.equal(beforeSend(event), event);
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(loads, 1);
  assert.equal(added, 1);
});

test("Google Analytics queues pageview and early clicks before its lazy SDK", () => {
  const scripts = [];
  const { GoogleAnalytics, getGoogleAnalyticsInit } = load(
    "components/general/GoogleAnalytics.tsx",
    {
      "next/script": () => (props) => {
        scripts.push(props);
        return null;
      },
    },
  );
  renderToStaticMarkup(
    React.createElement(GoogleAnalytics, { gaId: "G-TEST123" }),
  );
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].strategy, "lazyOnload");
  const window = {};
  vm.runInNewContext(getGoogleAnalyticsInit("G-TEST123"), { window });
  const { sendGAEvent } = load(
    "utiles/analytics-events/google-client.ts",
    {},
    { window },
  );
  sendGAEvent("event", "download_cv", { event_label: "download_cv_link" });
  const commands = window.dataLayer.map((command) => Array.from(command));
  assert.equal(commands[0][0], "js");
  assert.deepEqual(commands[1], ["config", "G-TEST123"]);
  assert.deepEqual(commands[2], [
    "event",
    "download_cv",
    { event_label: "download_cv_link" },
  ]);
  const { sendGAEvent: onServer } = load(
    "utiles/analytics-events/google-client.ts",
  );
  assert.doesNotThrow(() => onServer("event", "download_cv"));
});

function scrollHarness(reduced = false) {
  const frames = new Map();
  const listeners = new Map();
  let id = 0;
  let focused = 0;
  const root = {
    scrollTop: 0,
    scrollHeight: 20000,
    clientHeight: 800,
    setAttribute() {},
    getBoundingClientRect: () => ({ top: 0 }),
    scrollTo({ top }) {
      this.scrollTop = top;
    },
  };
  const target = {
    getBoundingClientRect: () => ({ top: 12000 - root.scrollTop }),
    getAttribute: () => null,
    addEventListener() {},
    setAttribute() {},
    removeAttribute() {},
    focus: () => {
      focused++;
    },
  };
  const { scrollToSection } = load(
    "utiles/section-scroll.ts",
    {},
    {
      window: {
        matchMedia: () => ({ matches: reduced }),
        addEventListener: (name, callback) => listeners.set(name, callback),
        removeEventListener: (name) => listeners.delete(name),
      },
      performance: { now: () => 0 },
      getComputedStyle: () => ({
        scrollPaddingTop: "100px",
        scrollMarginTop: "12px",
      }),
      requestAnimationFrame: (callback) => {
        frames.set(++id, callback);
        return id;
      },
      cancelAnimationFrame: (key) => frames.delete(key),
    },
  );
  return {
    root,
    target,
    frames,
    listeners,
    scrollToSection,
    focused: () => focused,
    step(time) {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((cb) => cb(time));
    },
  };
}

test("distant section navigation finishes promptly, keeps offset and cleans up", () => {
  const h = scrollHarness();
  h.scrollToSection(h.root, h.target);
  h.step(160);
  assert.ok(h.root.scrollTop > 0 && h.root.scrollTop < 11888);
  h.step(320);
  assert.equal(h.root.scrollTop, 11888);
  assert.equal(h.frames.size, 0);
  assert.equal(h.listeners.size, 0);
  assert.equal(h.focused(), 1);
});

test("manual input interrupts section navigation and reduced motion jumps directly", () => {
  const h = scrollHarness();
  h.scrollToSection(h.root, h.target);
  h.step(80);
  h.listeners.get("wheel")();
  const stopped = h.root.scrollTop;
  h.step(400);
  assert.equal(h.root.scrollTop, stopped);
  assert.equal(h.listeners.size, 0);
  assert.equal(h.focused(), 0);
  const quiet = scrollHarness(true);
  quiet.scrollToSection(quiet.root, quiet.target);
  assert.equal(quiet.root.scrollTop, 11888);
  assert.equal(quiet.frames.size, 0);
  assert.equal(quiet.focused(), 1);
});
