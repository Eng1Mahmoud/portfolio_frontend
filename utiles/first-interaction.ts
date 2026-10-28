// Shared progressive-enhancement signal. No timers or device/test detection:
// expensive optional UI starts when a visitor begins using the page.
let interacted = false;
const listeners = new Set<() => void>();
const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
const options = { passive: true, capture: true };

function stop() {
  events.forEach((name) => window.removeEventListener(name, notify, options));
}
function notify() {
  if (interacted) return;
  interacted = true;
  stop();
  const pending = [...listeners];
  listeners.clear();
  pending.forEach((listener) => listener());
}
export const hasInteracted = () => interacted;
export const serverHasInteracted = () => false;
export function afterFirstInteraction(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  if (interacted) {
    listener();
    return () => {};
  }
  if (!listeners.size)
    events.forEach((name) => window.addEventListener(name, notify, options));
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) stop();
  };
}
