import LoginForm from "@/components/auth/LoginForm";
const page = () => {
  return (
    <div className="container mx-auto w-full px-3 sm:max-w-[40rem] sm:px-4 md:max-w-[48rem] lg:max-w-[64rem] lg:px-16 xl:max-w-[80rem] xl:px-20 2xl:max-w-[96rem]">
      <LoginForm />
    </div>
  );
};

export default page;
