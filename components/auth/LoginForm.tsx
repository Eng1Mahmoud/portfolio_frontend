"use client";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { loginSchema } from "@/zod/loginSchema";
import { loginAction } from "@/actions/login";
const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-base">
      <div className="w-full max-w-md rounded-2xl border border-parchment/10 bg-surface-panel p-8 shadow-pinned">
        <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-sage">
          Dashboard
        </p>
        <h1 className="display-title mb-8 text-center text-2xl text-ink-strong">
          Welcome Back
        </h1>
        <Form
          defaultValues={initialValues}
          schema={loginSchema}
          action={loginAction}
          className="space-y-6"
          buttonProps={{
            name: "Sign In",
          }}
        >
          <InputField name="email" label="Email" type="email" variant="light" />
          <InputField
            name="password"
            label="Password"
            type="password"
            variant="light"
          />
        </Form>
      </div>
    </main>
  );
};
export default LoginForm;
