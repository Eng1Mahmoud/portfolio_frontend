"use client";
import { Form } from "@/components/forms/Form";
import { contactUsSchema } from "@/zod/contactUsSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import TextArea from "../forms/TextArea";

const ContactUsForm = () => {
  const initialValues = { email: "", password: "" };

  return (
    <Form
      className="contact-form"
      defaultValues={initialValues}
      schema={contactUsSchema}
      action={contactUs}
      buttonProps={{
        name: "Send Message",
        variant: "site",
        className: "min-h-12 sm:w-auto sm:px-8",
      }}
    >
      <div className="grid grid-cols-1 gap-5">
        <InputField name="userName" label="Your name" type="text" showLabel />
        <InputField name="email" label="Email address" type="email" showLabel />
        <InputField name="phone" label="Phone number" type="tel" showLabel />
        <TextArea name="message" label="Your message" rows={6} showLabel />
      </div>
    </Form>
  );
};

export default ContactUsForm;
