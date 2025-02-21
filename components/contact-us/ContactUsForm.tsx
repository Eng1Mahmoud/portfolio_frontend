"use client";
import Form from "@/components/forms/Form";
import { contactUsSchema } from "@/zod/contactUsSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import { useActionState, useEffect, useTransition } from "react";
import SubmitButton from "../forms/SubmitButton";
import { toast } from "react-toastify";
// initial state for the form
const initialState = {
  message: "",
};

const ContactUsForm = () => {
  const [state, formAction] = useActionState(contactUs, initialState);
  const [, startTransition] = useTransition();
  const initialValues = { email: "", password: "" };

  const onSubmit = (data: { email: string; password: string }) => {
    startTransition(() => {
      formAction(data);
    });
  };
  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.message]);

  return (
    <Form
      className="p-4 border rounded-md w-[300px]"
      defaultValues={initialValues}
      schema={contactUsSchema}
      onSubmit={onSubmit}
    >
      <InputField name="email" label="Email" type="email" />
      <InputField name="password" label="Password" type="password" />
      <SubmitButton name="Send Message" />
    </Form>
  );
};

export default ContactUsForm;
