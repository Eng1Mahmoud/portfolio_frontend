"use client";
import { projectsSchema } from "@/zod/projectsSchema";
import { editProjectAction } from "@/actions/editProject";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import TagsInput from "@/components/forms/TagsInput";
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
        <TagsInput name="technologies" label="Technologies" variant="light" />
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

export default EditProjectForm;
