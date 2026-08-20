"use client";
import { Form } from "@/components/forms/Form";
import { TuserInfoSchema, userInfoSchema } from "@/zod/userInfoSchema";
import InputField from "@/components/forms/InputField";
import { updateUser } from "@/actions/UpdateInfo";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import FileUploadInput from "@/components/forms/FileUploadInput";
const PersonalForm = ({
  initialValues,
}: {
  initialValues: TuserInfoSchema;
}) => {
  return (
    <Form
      defaultValues={initialValues}
      schema={userInfoSchema}
      action={updateUser}
      redirectPath="/dashboard"
      buttonProps={{
        name: "Save",
      }}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField name="userName" label="Name" type="text" variant="light" />
        <InputField name="title" label="Title" type="text" variant="light" />
        <InputField name="email" label="Email" type="email" variant="light" />
        <InputField
          name="address"
          label="Address"
          type="text"
          variant="light"
        />
        <InputField
          name="phone1"
          label="Phone number 1"
          type="text"
          variant="light"
        />
        <InputField
          name="phone2"
          label="Phone number 2"
          type="text"
          variant="light"
        />
        <TextArea name="bio" label="Bio" rows={6} variant="light" />
        <InputField name="github" label="Github" type="text" variant="light" />
        <InputField
          name="linkedin"
          label="LinkedIn"
          type="text"
          variant="light"
        />
        <ImageUploadInput
          name="avatar"
          label="Upload avatar Image"
          type="image"
          variant="light"
        />
        <ImageUploadInput
          name="aboutImage"
          label="Upload About Image"
          className="bg-white text-gray-800 border-gray-300"
        />
        <FileUploadInput
          name="cv"
          label="Upload PDF Document"
          accept="application/pdf"
          className="bg-white text-gray-800 border-gray-300"
        />
      </div>
    </Form>
  );
};

export default PersonalForm;
