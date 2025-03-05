import { useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useTransition } from "react";
import { FormProps } from "@/types/forms";
import { showToast } from "@/utiles/showToast";
import SubmitButton from "./SubmitButton";
export const Form = <T extends FieldValues>({
  defaultValues,
  schema,
  action,
  children,
  className,
  onSuccess,
  onError,
  redirectPath,
  buttonProps,
}: FormProps<T>) => {
  const router = useRouter();
  const methods = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const [state, formAction] = useActionState(action, {
    message: "",
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const [toastTrigger, setToastTrigger] = useState(true);

  // handle form submission
  const onSubmit: SubmitHandler<T> = (data) => {
    startTransition(() => {
      formAction(data);
      // next line is just to trigger the toast to show up even if same message returned from same action
      setToastTrigger((prev) => !prev);
    });
  };

  useEffect(() => {
    if (state.message) {
      // show toast if ther is message return from action
      showToast({
        type: state.success ? "success" : "error",
        message: state.message,
      });
    }
    // Only call onSuccess when form submission is successful
    if (state.success && onSuccess) {
      onSuccess();
    }
    // Only call onError when form submission fails
    if (!state.success && onError) {
      onError();
    }
    if (state.success) {
      // redirect to path if provided
      if (redirectPath) {
        router.push(redirectPath);
      }
    }

    // reset form
    methods.reset();
  }, [
    state.message,
    state.success,
    methods,
    toastTrigger,
    onSuccess,
    onError,
    redirectPath,
    router,
  ]);
  // Update form values when defaultValues prop changes
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={className}
      >
        {children}
        {/**render button here in all forms only pass props of it  */}
       <div className="mt-4">
        <SubmitButton
          name={buttonProps.name}
          isPending={isPending}
          className={buttonProps.className}
        />
        </div>
      </form>
    </FormProvider>
  );
};
