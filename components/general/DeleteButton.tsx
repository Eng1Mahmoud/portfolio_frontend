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
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md transition duration-150 disabled:opacity-50"
        >
          {isPending ? "Deleting" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-md transition duration-150"
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
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center disabled:opacity-50"
      onClick={() => setIsConfirming(true)}
    >
      <FaTrash className="w-4 h-4 mr-1" aria-hidden="true" />
      {isPending ? "Deleting" : "Delete"}
    </button>
  );
};

export default DeleteButton;
