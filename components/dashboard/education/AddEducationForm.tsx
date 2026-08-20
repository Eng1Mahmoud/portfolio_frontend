"use client";
import { educationSchema } from "@/zod/educationSchema";
import { addEducationAction } from "@/actions/addEducation";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";

const AddEducationForm = () => {
  const initialValues = {
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    skills: "",
    image: "",
    description: "",
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={educationSchema}
      action={addEducationAction}
      redirectPath="/dashboard/education"
      buttonProps={{
        name: "Add Education",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField name="degree" label="Degree" type="text" variant="light" />
        <InputField
          name="institution"
          label="Institution"
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
          label="Skills (comma-separated, e.g. JavaScript, Python)"
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

export default AddEducationForm;
