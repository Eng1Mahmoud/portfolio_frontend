"use client";
import { Form } from "@/components/forms/Form";
import { skillsSchema } from "@/zod/skillsSchema";
import { addSkillAction } from "@/actions/addSkill";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
const AddSkillForm = () => {
  const initialValues = {
    name: "",
    imageUrl: "",
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={skillsSchema}
      action={addSkillAction}
      redirectPath="/dashboard/skills"
      buttonProps={{
        name: "Add Skill",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField
          name="name"
          label="Name of skill"
          type="text"
          variant="light"
        />
        <ImageUploadInput name="imageUrl" label="Upload skill image" />
      </div>
    </Form>
  );
};

export default AddSkillForm;
