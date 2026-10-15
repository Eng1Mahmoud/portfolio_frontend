import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
function load(path, overrides = {}) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    process: { env: { NEXT_PUBLIC_POSTHOG_KEY: "test-key" } },
    require: (name) => (name in overrides ? overrides[name]() : require(name)),
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
  });
  const html = renderToStaticMarkup(
    React.createElement(Template, null, "Visible immediately"),
  );
  assert.match(html, /Visible immediately/);
  assert.doesNotMatch(html, /opacity:0|visibility:hidden/);
});
