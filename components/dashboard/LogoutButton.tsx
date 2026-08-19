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
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-light disabled:opacity-50"
    >
      <FaSignOutAlt className="h-4 w-4" aria-hidden="true" />
      <span>{isPending ? "Signing out…" : "Sign out"}</span>
    </button>
  );
}
