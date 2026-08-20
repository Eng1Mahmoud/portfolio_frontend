"use client";
import { educationSchema, TeducationSchema } from "@/zod/educationSchema";
import { editEducationAction } from "@/actions/editEducation";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import { useFormContext } from "react-hook-form";

const EducationIdField = ({ id }: { id?: string }) => {
  const { register } = useFormContext();
  return <input type="hidden" {...register("_id")} defaultValue={id} />;
};

const EditEducationForm = ({
  education,
}: {
  education: TeducationSchema & { _id?: string };
}) => {
  const initialValues = {
    _id: education._id,
    degree: education.degree,
    institution: education.institution,
    startDate: education.startDate,
    endDate: education.endDate,
    skills:
      education.skills && Array.isArray(education.skills)
        ? education.skills.join(", ")
        : "",
    image: education.image || "",
    description: education.description || "",
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={educationSchema}
      action={editEducationAction}
      redirectPath="/dashboard/education"
      buttonProps={{
        name: "Save Changes",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <EducationIdField id={education._id} />
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

export default EditEducationForm;
