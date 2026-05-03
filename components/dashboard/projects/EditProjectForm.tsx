"use client";
import { projectsSchema } from "@/zod/projectsSchema";
import { editProjectAction } from "@/actions/editProject";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import { Iproject } from "@/types/general";
const EditProjectForm = ({ initialValues }: { initialValues: Iproject }) => {
  return (
    <Form
      defaultValues={initialValues}
      schema={projectsSchema}
      action={editProjectAction}
      redirectPath="/dashboard/projects"
      buttonProps={{
        name: "Edit Project",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField
          name="title"
          label="Title of Project"
          type="text"
          className="input-light"
        />
        <TextArea
          name="description"
          label="Description of Project"
          rows={8}
          className="input-light"
        />
        <InputField
          name="demoLink"
          label="Demo Link"
          type="text"
          className="input-light"
        />
        <InputField
          name="githubLink"
          label="Github Link"
          type="text"
          className="input-light"
        />
        <InputField
          name="order"
          label="Display Order"
          type="number"
          className="input-light"
        />
        <ImageUploadInput name="imageUrl" label="Upload project image" />
      </div>
    </Form>
  );
};

export default EditProjectForm;
