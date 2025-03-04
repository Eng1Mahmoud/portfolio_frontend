"use client";
import { Trash2 } from "lucide-react";
import { useActionState, useEffect, useTransition } from "react";
import { deleteSkillById } from "@/actions/deleteSkill";
import { showToast } from "@/utiles/showToast";

interface DeleteSkillButtonProps {
  skillId: string;
}

const DeleteSkillButton = ({ skillId }: DeleteSkillButtonProps) => {
  const [isPending, StartTransition] = useTransition();
  const [state, formAction] = useActionState(deleteSkillById, {
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
        StartTransition(() => formAction(skillId));
      }}
    >
      <Trash2 className="w-4 h-4 mr-1" />
      {isPending ? "Deleting" : "Delete"}
    </button>
  );
};

export default DeleteSkillButton;