"use client";
import { experienceSchema } from "@/zod/experienceSchema";
import { addExperienceAction } from "@/actions/addExperience";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";

const AddExperienceForm = () => {
  const initialValues = {
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    workType: "",
    skills: "",
    image: "",
    description: "",
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={experienceSchema}
      action={addExperienceAction}
      redirectPath="/dashboard/experience"
      buttonProps={{
        name: "Add Experience",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="role"
            label="Role / Title"
            type="text"
            variant="light"
          />
          <InputField
            name="workType"
            label="Work Type (e.g. Remote, Hybrid)"
            type="text"
            variant="light"
          />
        </div>
        <InputField
          name="company"
          label="Company"
          type="text"
          variant="light"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="startDate"
            label="Start Date"
            type="text"
            variant="light"
          />
          <InputField
            name="endDate"
            label="End Date"
            type="text"
            variant="light"
          />
        </div>
        <InputField
          name="skills"
          label="Skills (comma-separated, e.g. React, Node.js)"
          type="text"
          variant="light"
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
          variant="light"
        />
      </div>
    </Form>
  );
};

export default AddExperienceForm;
