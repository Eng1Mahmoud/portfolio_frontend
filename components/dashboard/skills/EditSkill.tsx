"use client";
import { Form } from "@/components/forms/Form";
import { SKILL_CATEGORIES, skillsSchema } from "@/zod/skillsSchema";
import { editSkillAction } from "@/actions/editSkill";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import SelectField from "@/components/forms/SelectField";
import { ISkill } from "@/types/general";
const EditSkillForm = ({ initialValues }: { initialValues: ISkill }) => {
  return (
    <Form
      defaultValues={initialValues}
      schema={skillsSchema}
      action={editSkillAction}
      redirectPath="/dashboard/skills"
      buttonProps={{
        name: "Edit Skill",
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

export default EditSkillForm;
