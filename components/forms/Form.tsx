import {useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useTransition } from "react";
import { FormProps } from "@/types/types";
import { showToast } from "@/utiles/showToast";
export const Form = <T extends FieldValues>({
  defaultValues,
  schema,
  action,
  children,
  className,
}: FormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const [state, formAction] = useActionState(action, { message: "", success: false });
  const [, startTransition] = useTransition();
  const [toastTrigger, setToastTrigger] = useState(true);

  // Show toast and reset form when state changes
  useEffect(() => {
    if (state.message) {
      // show toast if ther is message return from action
      showToast({ type: "success", message: state.message });
    }
    // reset the form after any submit
    if (state.success) {
      methods.reset();
    }
  }, [state.message, state.success, methods, toastTrigger]);

  // handle form submission
  const onSubmit: SubmitHandler<T> = (data) => {
    startTransition(() => {
      formAction(data);
      // next line is just to trigger the toast to show up even if same message returned from same action
      setToastTrigger((prev) => !prev);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};
