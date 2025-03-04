"use client";
import { Form } from "@/components/forms/Form";
import { skillsSchema } from "@/zod/skillsSchema";
import { editSkillAction } from "@/actions/editSkill";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import { ISkill } from "@/types/general";
const EditSkillForm = ({ initialValues }: { initialValues: ISkill }) => {
  return (
    <Form
      defaultValues={initialValues}
      schema={skillsSchema}
      action={editSkillAction}
      redirectPath="/dashboard/skills"
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField
          name="name"
          label="Name of skill"
          type="text"
          className="bg-text-primary text-primary-dark "
        />
        <ImageUploadInput name="imageUrl" label="Upload skill image" />
        <SubmitButton name="Save" className="w-[300px]" />
      </div>
    </Form>
  );
};

export default EditSkillForm;
