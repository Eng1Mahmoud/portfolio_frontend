"use client";
import { FaTrash } from "react-icons/fa";
import { useActionState, useEffect, useTransition } from "react";
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

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
      onClick={() => {
        StartTransition(() => formAction(itemId));
      }}
    >
      <FaTrash className="w-4 h-4 mr-1" />
      {isPending ? "Deleting" : "Delete"}
    </button>
  );
};

export default DeleteButton;
