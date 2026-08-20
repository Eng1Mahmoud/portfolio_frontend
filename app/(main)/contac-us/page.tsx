import { getProfileInfo } from "@/actions/getProfileInfo";
import ContactUsForm from "@/components/contact-us/ContactUsForm";
import ContactUsInfo from "@/components/contact-us/ContactUsInfo";
import { Title } from "@/components/general/Title";
import { IuserInfo } from "@/types/general";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Mahmoud Mohamed",
};
const ContactUsPage = async () => {
  const profileInfo = await getProfileInfo();
  return (
    <div>
      <Title title="Get in touch" eyebrow="Open to work" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <ContactUsForm />
        <ContactUsInfo profileInfo={profileInfo as IuserInfo} />
      </div>
    </div>
  );
};

export default ContactUsPage;
