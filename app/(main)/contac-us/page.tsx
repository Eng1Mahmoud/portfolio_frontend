import { getProfileInfo } from "@/actions/getProfileInfo";
import ContactUsForm from "@/components/contact-us/ContactUsForm";
import ContactUsInfo from "@/components/contact-us/ContactUsInfo";
import { Title } from "@/components/general/Title";
import { Reveal } from "@/components/general/Reveal";
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
      {/* The two halves arrive in reading order rather than together, so the
          form leads and the details follow it. */}
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <Reveal delay={0.12}>
          <ContactUsForm />
        </Reveal>
        <Reveal delay={0.22}>
          <ContactUsInfo profileInfo={profileInfo as IuserInfo} />
        </Reveal>
      </div>
    </div>
  );
};

export default ContactUsPage;
