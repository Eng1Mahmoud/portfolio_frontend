"use client";
import { Form } from "@/components/forms/Form";
import { contactUsSchema } from "@/zod/contactUsSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import SubmitButton from "@/components/forms/SubmitButton"
import TextArea from  "@/components/forms/TextArea"
import File from "@/components/forms/File";
import ImageUpload from "@/components/forms/Image";
const PersonalForm = () => {
  const initialValues = { userName: "", email: "", phone: "", bio: "", cv: "", image: "" };

  return (
    <Form
      defaultValues={initialValues}
      schema={contactUsSchema}
      action={contactUs}
      
    >
      <div className="grid grid-cols-1 gap-6">
      <InputField name="userName" label="Name" type="text" className="bg-text-primary text-primary-dark " />
      <InputField name="email" label="Email" type="email" className="bg-text-primary text-primary-dark " />
      <InputField name="phone" label="Phone number" type="text" className="bg-text-primary text-primary-dark " />
      <TextArea name="bio" label="Bio" rows={6} className="bg-text-primary text-primary-dark " />
      <File name="cv" label="CV" className="bg-text-primary text-primary-dark " />
      <ImageUpload name="image" label="Image" className="bg-text-primary text-primary-dark " />
      <SubmitButton name="Send Message" className="w-[300px]" />
      </div>
    </Form>

  );
};

export default PersonalForm;
