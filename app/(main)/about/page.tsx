import { getProfileInfo } from "@/actions/getProfileInfo";
import { PersonalInfo } from "@/components/about/PersonalInfo";
import { ProfileImage } from "@/components/about/ProfileImage";
import { Title } from "@/components/general/Title";
import { IuserInfo } from "@/types/general";
import { Metadata } from "next";
import { AboutPage, WithContext } from "schema-dts";
import {
  buildPublicPageMetadata,
  siteDescription,
  siteUrl,
} from "@/utiles/site";

const description =
  "Mahmoud Mohamed is a Frontend Software Engineer from Egypt with 3+ years building responsive, high-performance web applications in React.js, Next.js and TypeScript.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "About",
  description,
  path: "/about",
  ogTitle: "About Mahmoud Mohamed | Frontend Software Engineer",
  type: "profile",
});

/**
 * The page description is the only thing hardcoded here now. Everything about
 * the person itself points at the Person in the root layout by `@id` rather
 * than restating it — two Person nodes with different wording made the site
 * describe its own author twice, in conflicting terms.
 */
const buildAboutJsonLd = (bio?: string): WithContext<AboutPage> => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Mahmoud Mohamed",
  description: bio || siteDescription,
  url: `${siteUrl}/about`,
  author: { "@id": `${siteUrl}/#person` },
  mainEntity: { "@id": `${siteUrl}/#person` },
});

export default async function AboutUsPage() {
  const profileInfo = await getProfileInfo();
  const jsonld = buildAboutJsonLd(profileInfo?.bio);

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
