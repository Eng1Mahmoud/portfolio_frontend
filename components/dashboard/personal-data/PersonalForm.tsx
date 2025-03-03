"use client";
import { Form } from "@/components/forms/Form";
import { TuserInfoSchema, userInfoSchema } from "@/zod/userInfoSchema";
import InputField from "@/components/forms/InputField";
import { updateUser } from "@/actions/UpdateInfo";
import SubmitButton from "@/components/forms/SubmitButton";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import TextArea from "@/components/forms/TextArea";
import FileUploadInput from "@/components/forms/FileUploadInput";
const PersonalForm = ({ initialValues }: { initialValues: TuserInfoSchema }) => {
  return (
    <Form
      defaultValues={initialValues}
      schema={userInfoSchema}
      action={updateUser}
    >
      <div className="grid grid-cols-1 gap-6">
        <InputField
          name="userName"
          label="Name"
          type="text"
          className="bg-text-primary text-primary-dark "
        />
        <InputField
          name="title"
          label="Title"
          type="text"
          className="bg-text-primary text-primary-dark "
        />
        <InputField
          name="email"
          label="Email"
          type="email"
          className="bg-text-primary text-primary-dark "
        />
        <InputField
          name="phone1"
          label="Phone number 1"
          type="text"
          className="bg-text-primary text-primary-dark "
        />
        <InputField
          name="phone2"
          label="Phone number 2"
          type="text"
          className="bg-text-primary text-primary-dark "
        />
        <TextArea
          name="bio"
          label="Bio"
          rows={6}
          className="bg-text-primary text-primary-dark "
        />

        <ImageUploadInput
          name="avatar"
          label="Upload avatar Image"
          type="image"
        />
        <ImageUploadInput name="aboutImage" label="Upload About Image" />
        <FileUploadInput
          name="cv"
          label="Upload PDF Document"
          accept="application/pdf"
        />
        <SubmitButton name="Save" className="w-[300px]" />
      </div>
    </Form>
  );
};

export default PersonalForm;
