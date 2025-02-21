"use client";
import { Form } from "@/components/forms/Form";
import { contactUsSchema } from "@/zod/contactUsSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import SubmitButton from "../forms/SubmitButton";

const ContactUsForm = () => {
  const initialValues = { email: "", password: "" };

  return (
    <Form
      className="p-4 border rounded-md w-[300px]"
      defaultValues={initialValues}
      schema={contactUsSchema}
      action={contactUs}
    >
      <InputField name="email" label="Email" type="email" />
      <InputField name="password" label="Password" type="password" />
      <SubmitButton name="Send Message" />
    </Form>
  );
};

export default ContactUsForm;
