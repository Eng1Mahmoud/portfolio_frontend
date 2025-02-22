import ContactUsForm from "@/components/contact-us/ContactUsForm";
import ContactUsInfo from "@/components/contact-us/ContactUsInfo";
import { Title } from "@/components/general/Title";

const page = () => {
  return (
    <>
      <Title title="Contact Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
        <ContactUsForm />
        <ContactUsInfo />
      </div>
    </>
  );
};

export default page;
