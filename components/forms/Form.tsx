import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface FormProps<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string; // Allow custom styles
}

const Form = <T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  children,
  className,
}: FormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate // Disable default browser validation
        className={className} // Allow custom styling
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
