"use client";
import { Form } from "@/components/forms/Form";
import { SKILL_CATEGORIES, skillsSchema } from "@/zod/skillsSchema";
import { addSkillAction } from "@/actions/addSkill";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import SelectField from "@/components/forms/SelectField";
const AddSkillForm = () => {
  const initialValues = {
    name: "",
    imageUrl: "",
    category: "",
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
        <SelectField
          name="category"
          label="Category"
          options={SKILL_CATEGORIES}
          placeholder="Ungrouped"
          variant="light"
        />
        <ImageUploadInput name="imageUrl" label="Upload skill image" />
      </div>
    </Form>
  );
};

export default AddSkillForm;
