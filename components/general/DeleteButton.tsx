"use client";
import { FaTrash } from "react-icons/fa";
import { useActionState, useEffect, useState, useTransition } from "react";
import { showToast } from "@/utiles/showToast";
import { IactionState } from "@/types/general";

interface DeleteButtonProps {
  itemId: string;
  deleteAction: (
    state: IactionState,
    id: string,
  ) => Promise<{ message: string; success: boolean }>;
}

const DeleteButton = ({ itemId, deleteAction }: DeleteButtonProps) => {
  const [isPending, StartTransition] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);
  const [state, formAction] = useActionState(deleteAction, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state.message) {
      showToast({
        type: state.success ? "success" : "error",
        message: state.message,
      });
    }
  }, [state]);

  // Auto-cancel so a half-pressed delete doesn't sit armed indefinitely.
  useEffect(() => {
    if (!isConfirming) return;
    const timeout = setTimeout(() => setIsConfirming(false), 5000);
    return () => clearTimeout(timeout);
  }, [isConfirming]);

  if (isConfirming) {
    return (
      <span className="flex items-center gap-1">
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            setIsConfirming(false);
            StartTransition(() => formAction(itemId));
          }}
          className="rounded-md bg-red-500/90 px-2 py-1 font-medium text-white transition-colors duration-150 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
        >
          {isPending ? "Deleting" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="rounded-md border border-parchment/15 px-2 py-1 font-medium text-ink-body transition-colors duration-150 hover:border-parchment/30 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      className="flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 font-medium text-red-300 transition-colors duration-150 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
      onClick={() => setIsConfirming(true)}
    >
      <FaTrash className="w-4 h-4 mr-1" aria-hidden="true" />
      {isPending ? "Deleting" : "Delete"}
    </button>
  );
};

export default DeleteButton;
