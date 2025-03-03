"use client";
import { Form } from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { loginSchema } from "@/zod/loginSchema";
import { loginAction } from "@/actions/login";
import SubmitButton from "@/components/forms/SubmitButton";
const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>
        <Form
          defaultValues={initialValues}
          schema={loginSchema}
          action={loginAction}
          className="space-y-6"
        >
          <InputField
            name="email"
            label="Email"
            type="email"
            className="bg-text-primary"
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            className="bg-text-primary"
          />
          <SubmitButton name="Sign In" />
        </Form>
      </div>
    </main>
  );
};
export default LoginForm;
