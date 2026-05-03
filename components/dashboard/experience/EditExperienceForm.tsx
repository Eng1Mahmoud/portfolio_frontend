"use client";
import { experienceSchema, TexperienceSchema } from "@/zod/experienceSchema";
import { editExperienceAction } from "@/actions/editExperience";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import { useFormContext } from "react-hook-form";

const ExperienceIdField = ({ id }: { id?: string }) => {
  const { register } = useFormContext();
  return <input type="hidden" {...register("_id")} defaultValue={id} />;
};

const EditExperienceForm = ({
  experience,
}: {
  experience: TexperienceSchema & { _id?: string };
}) => {
  const initialValues = {
    _id: experience._id,
    role: experience.role,
    company: experience.company,
    startDate: experience.startDate,
    endDate: experience.endDate,
    workType: experience.workType || "",
    skills:
      experience.skills && Array.isArray(experience.skills)
        ? experience.skills.join(", ")
        : "",
    image: experience.image || "",
    description: experience.description || "",
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={experienceSchema}
      action={editExperienceAction}
      redirectPath="/dashboard/experience"
      buttonProps={{
        name: "Save Changes",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <ExperienceIdField id={experience._id} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="role"
            label="Role / Title"
            type="text"
            className="input-light"
          />
          <InputField
            name="workType"
            label="Work Type (e.g. Remote, Hybrid)"
            type="text"
            className="input-light"
          />
        </div>
        <InputField
          name="company"
          label="Company"
          type="text"
          className="input-light"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="startDate"
            label="Start Date"
            type="text"
            className="input-light"
          />
          <InputField
            name="endDate"
            label="End Date"
            type="text"
            className="input-light"
          />
        </div>
        <InputField
          name="skills"
          label="Skills (comma-separated, e.g. React, Node.js)"
          type="text"
          className="input-light"
        />
        <ImageUploadInput
          name="image"
          label="Image (optional)"
          className="w-full"
        />
        <TextArea
          name="description"
          label="Description"
          rows={6}
          className="input-light"
        />
      </div>
    </Form>
  );
};

export default EditExperienceForm;
