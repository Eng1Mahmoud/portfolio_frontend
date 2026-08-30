import { getProfileInfo } from "@/actions/getProfileInfo";
import ContactUsForm from "@/components/contact-us/ContactUsForm";
import ContactUsInfo from "@/components/contact-us/ContactUsInfo";
import { Title } from "@/components/general/Title";
import { Reveal } from "@/components/general/Reveal";
import { IuserInfo } from "@/types/general";
import { Metadata } from "next";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildContactPageJsonLd } from "@/utiles/seo-schemas";

const description =
  "Get in touch with Mahmoud Mohamed, Frontend Software Engineer — available for React.js and Next.js roles, freelance and contract work.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Contact",
  description,
  path: "/contact-us",
  ogTitle: "Get In Touch | Mahmoud Mohamed — Frontend Engineer",
});

const ContactUsPage = async () => {
  const profileInfo = await getProfileInfo();
  const jsonld = buildContactPageJsonLd(profileInfo?.avatar);

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
};

export default ContactUsPage;
