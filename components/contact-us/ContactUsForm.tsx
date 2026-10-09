"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TcontactUsSchema } from "@/zod/contactUsSchema";
import SubmitButton from "../forms/SubmitButton";
import { contactUsSchema } from "@/zod/contactUsSchema";
import InputField from "@/components/forms/InputField";
import { contactUs } from "@/actions/contactUs";
import TextArea from "../forms/TextArea";

const ContactUsForm = () => {
  const methods = useForm<TcontactUsSchema>({
    defaultValues: { userName: "", email: "", phone: "", message: "" },
    resolver: zodResolver(contactUsSchema),
    mode: "onTouched",
  });
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const submit = async (data: TcontactUsSchema) => {
    setResult(null);
    try {
      const response = await contactUs({ success: false, message: "" }, data);
      setResult(response);
      if (response.success) methods.reset();
    } catch {
      setResult({
        success: false,
        message:
          "Your message could not be sent. Please check your connection and try again — your details are still here.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="contact-form [&_input]:bg-surface-panel! [&_input]:[border-color:var(--field-border)]! [&_input]:min-h-12! [&_textarea]:bg-surface-panel! [&_textarea]:[border-color:var(--field-border)]! [&_textarea]:min-h-12! [&_>_div_>_div_>_div]:[transform:none]! [&_>_div_>_div_>_div]:[box-shadow:var(--flat-shadow)]! [&_[role=alert]]:[overflow-wrap:anywhere]! [&_label]:text-ink-body! [&_input:focus]:border-sage! [&_textarea:focus]:border-sage!"
        noValidate
        aria-busy={methods.formState.isSubmitting}
        onSubmit={methods.handleSubmit(submit, () => setResult(null))}
      >
        <fieldset
          disabled={methods.formState.isSubmitting}
          className="min-w-0 border-0 p-0 m-0"
        >
          <div className="grid grid-cols-1 gap-5">
            <InputField
              name="userName"
              label="Your name"
              type="text"
              showLabel
            />
            <InputField
              name="email"
              label="Email address"
              type="email"
              showLabel
            />
            <InputField
              name="phone"
              label="Phone number"
              type="tel"
              showLabel
            />
            <TextArea name="message" label="Your message" rows={6} showLabel />
          </div>
        </fieldset>
        <div className="mt-4">
          <SubmitButton
            name={methods.formState.isSubmitting ? "Sending…" : "Send Message"}
            isPending={methods.formState.isSubmitting}
            variant="site"
            className="min-h-12 sm:w-auto sm:px-8"
          />
        </div>
        {result && (
          <p
            role={result.success ? "status" : "alert"}
            className="mt-4 text-sm leading-relaxed text-ink wrap-break-word"
          >
            {result.message}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default ContactUsForm;
