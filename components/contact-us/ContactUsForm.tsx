"use client";
import { Form } from "@/components/forms/Form";
import { contactUsSchema } from "@/zod/userInfoSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import SubmitButton from "../forms/SubmitButton";
import TextArea from "../forms/TextArea";

const ContactUsForm = () => {
  const initialValues = { email: "", password: "" };

  return (
    <Form
      defaultValues={initialValues}
      schema={contactUsSchema}
      action={contactUs}
      
    >
      <div className="grid grid-cols-1 gap-6">
      <InputField name="userName" label="Enter your name" type="text" />
      <InputField name="email" label="Enter your email" type="email" />
      <InputField name="phone" label="Enter your phone number" type="text" />
      <TextArea name="message" label="Enter your message" rows={6} />
      <SubmitButton name="Send Message" />
      </div>
    </Form>

  );
};

export default ContactUsForm;
