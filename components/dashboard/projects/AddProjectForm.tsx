"use client";
import { projectsSchema } from "@/zod/projectsSchema";
import { addProjectAction } from "@/actions/addProject";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
const AddProjectForm = () => {
  const initialValues = {
    title: "",
    description: "",
    imageUrl: "",
    demoLink: "",
    githubLink: "",
    order: 0,
  };
  return (
    <Form
      defaultValues={initialValues}
      schema={projectsSchema}
      action={addProjectAction}
      redirectPath="/dashboard/projects"
      buttonProps={{
        name: "Add Project",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField
          name="title"
          label="Title of Project"
          type="text"
          variant="light"
        />
        <TextArea
          name="description"
          label="Description of Project"
          rows={8}
          variant="light"
        />
        <InputField
          name="demoLink"
          label="Demo Link"
          type="text"
          variant="light"
        />
        <InputField
          name="githubLink"
          label="Github Link"
          type="text"
          variant="light"
        />
        <InputField
          name="order"
          label="Display Order"
          type="number"
          variant="light"
        />
        <ImageUploadInput name="imageUrl" label="Upload project image" />
      </div>
    </Form>
  );
};

export default AddProjectForm;
