import { getProfileInfo } from "@/actions/getProfileInfo";
import { PersonalInfo } from "@/components/about/PersonalInfo";
import { ProfileImage } from "@/components/about/ProfileImage";
import { Title } from "@/components/general/Title";
import { IuserInfo } from "@/types/general";
import { Metadata } from "next";
import { AboutPage, WithContext } from "schema-dts";
// metadata
export const metadata: Metadata = {
  title: "About Me",
  description: "About Mahmoud Mohamed",
};
// JSONLD
const jsonld: WithContext<AboutPage> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Me",
  description:
    "I am  Frontend Engineer with a degree in Computers and Artificial Intelligence, plus one year of startup experience. Specializing in React and Next.js, I create responsive, high-performance web applications that drive user engagement and business growth. what I offer: - Expertise in React, Next.js, and modern front-end technologies - Rapid development of user-friendly, scalable web solutions - Ability to balance technical excellence with business objectives - Collaborative approach, thriving in fast-paced environments Committed to delivering innovative web experiences that exceed expectations and propel digital success.",
  url: "https://dev-mahmoud-portfolio.vercel.app/", // Replace with your actual URL
  author: {
    "@type": "Person",
    name: "Mahmoud Mohamed",
    url: "https://dev-mahmoud-portfolio.vercel.app/",
  },
  mainEntity: {
    "@type": "Person",
    name: "Mahmoud Mohamed",
    description:
      "I am  Frontend Engineer with a degree in Computers and Artificial Intelligence, plus one year of startup experience. Specializing in React and Next.js, I create responsive, high-performance web applications that drive user engagement and business growth. what I offer: - Expertise in React, Next.js, and modern front-end technologies - Rapid development of user-friendly, scalable web solutions - Ability to balance technical excellence with business objectives - Collaborative approach, thriving in fast-paced environments Committed to delivering innovative web experiences that exceed expectations and propel digital success.",
    url: "https://dev-mahmoud-portfolio.vercel.app/",
  },
};
export default async function AboutUsPage() {
  const profileInfo = await getProfileInfo();
  return (
    <div>
      <Title title="About Me" eyebrow="Who I am" />
      <div className="grid items-start gap-8 md:grid-cols-2">
        {/* Profile Image */}
        <ProfileImage profileInfo={profileInfo as IuserInfo} />

        {/* Personal Information */}
        <PersonalInfo profileInfo={profileInfo as IuserInfo} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
}
