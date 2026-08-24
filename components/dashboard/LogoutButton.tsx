"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { useTransition } from "react";
import { logoutAction } from "@/actions/logout";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-parchment/[0.06] hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
    >
      <FaSignOutAlt className="h-4 w-4" aria-hidden="true" />
      <span>{isPending ? "Signing out…" : "Sign out"}</span>
    </button>
  );
}
