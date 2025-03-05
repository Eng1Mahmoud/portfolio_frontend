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
      defaultValues={initialValues}
      schema={contactUsSchema}
      action={contactUs}
      buttonProps={{
        name: "Send Message",
      }}
      
    >
      <div className="grid grid-cols-1 gap-6">
      <InputField name="userName" label="Enter your name" type="text" />
      <InputField name="email" label="Enter your email" type="email" />
      <InputField name="phone" label="Enter your phone number" type="text" />
      <TextArea name="message" label="Enter your message" rows={6} />
      </div>
    </Form>

  );
};

export default ContactUsForm;
