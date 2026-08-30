import { BreadcrumbList, WithContext } from "schema-dts";
import {
  IEducation,
  IExperience,
  Iproject,
  IRecommendation,
  ISkill,
} from "@/types/general";
import { siteDescription, siteName, siteTitle, siteUrl } from "./site";

/**
 * Generate a BreadcrumbList schema for breadcrumb navigation.
 * Helps search engines understand site hierarchy and can show breadcrumbs in search results.
 * Includes optional image for rich snippets display.
 */
export const buildBreadcrumbList = (
  breadcrumbs: Array<{ name: string; url: string }>,
  image?: string,
): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => {
    const breadcrumbItem: {
      "@type": "ListItem";
      position: number;
      name: string;
      item: string;
      image?: string;
    } = {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    };
    // Add image to first breadcrumb (home) if provided
    if (index === 0 && image) {
      breadcrumbItem.image = image;
    }
    return breadcrumbItem;
  }),
});

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  publisher: { "@id": `${siteUrl}/#person` },
  inLanguage: "en-US",
});

export const buildCollectionPageJsonLd = ({
  name,
  description,
  path,
  breadcrumbs,
  items,
  image,
}: {
  name: string;
  description: string;
  path: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  items: Array<Record<string, unknown>>;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbList(breadcrumbs, image),
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}${path}#webpage`,
      name,
      description,
      url: `${siteUrl}${path}`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      author: { "@id": `${siteUrl}/#person` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item,
        })),
      },
    },
  ],
});

export const buildProjectsJsonLd = (projects: Iproject[], image?: string) =>
  buildCollectionPageJsonLd({
    name: "Projects by Mahmoud Mohamed",
    description:
      "Selected React.js, Next.js and frontend engineering projects by Mahmoud Mohamed.",
    path: "/projects",
    breadcrumbs: projectsBreadcrumbs,
    image,
    items: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: project.imageUrl,
      url: project.demoLink || project.githubLink || `${siteUrl}/projects`,
      creator: { "@id": `${siteUrl}/#person` },
      keywords: project.technologies?.join(", "),
      codeRepository: project.githubLink || undefined,
    })),
  });

export const buildSkillsJsonLd = (skills: ISkill[], image?: string) =>
  buildCollectionPageJsonLd({
    name: "Frontend skills used by Mahmoud Mohamed",
    description:
      "Technologies Mahmoud Mohamed uses across React.js, Next.js and frontend engineering projects.",
    path: "/skills",
    breadcrumbs: skillsBreadcrumbs,
    image,
    items: skills.map((skill) => ({
      "@type": "DefinedTerm",
      name: skill.name,
      image: skill.imageUrl,
      inDefinedTermSet: skill.category || "Technical skills",
    })),
  });

export const buildExperienceJsonLd = (
  experiences: IExperience[],
  image?: string,
) =>
  buildCollectionPageJsonLd({
    name: "Professional experience of Mahmoud Mohamed",
    description:
      "Frontend Software Engineer roles and companies in Mahmoud Mohamed's career.",
    path: "/experience",
    breadcrumbs: experienceBreadcrumbs,
    image,
    items: experiences.map((experience) => ({
      "@type": "Role",
      roleName: experience.role,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      worksFor: {
        "@type": "Organization",
        name: experience.company,
        image: experience.image,
      },
    })),
  });

export const buildEducationJsonLd = (
  educations: IEducation[],
  image?: string,
) =>
  buildCollectionPageJsonLd({
    name: "Education of Mahmoud Mohamed",
    description:
      "Academic background and courses behind Mahmoud Mohamed's frontend engineering work.",
    path: "/education",
    breadcrumbs: educationBreadcrumbs,
    image,
    items: educations.map((education) => ({
      "@type": "EducationalOccupationalCredential",
      name: education.degree,
      description: education.description,
      recognizedBy: {
        "@type": "Organization",
        name: education.institution,
        image: education.image,
      },
      validFrom: education.startDate,
    })),
  });

export const buildRecommendationsJsonLd = (
  recommendations: IRecommendation[],
  image?: string,
) =>
  buildCollectionPageJsonLd({
    name: "Recommendations for Mahmoud Mohamed",
    description:
      "LinkedIn-style recommendations from people who have worked with Mahmoud Mohamed.",
    path: "/recommendations",
    breadcrumbs: recommendationsBreadcrumbs,
    image,
    items: recommendations.map((recommendation) => ({
      "@type": "Review",
      reviewBody: recommendation.text,
      datePublished: recommendation.date,
      author: {
        "@type": "Person",
        name: recommendation.name,
        jobTitle: recommendation.role,
        image: recommendation.avatar || undefined,
        worksFor: recommendation.company
          ? { "@type": "Organization", name: recommendation.company }
          : undefined,
        sameAs: recommendation.linkedinUrl || undefined,
      },
      itemReviewed: { "@id": `${siteUrl}/#person` },
    })),
  });

export const buildContactPageJsonLd = (image?: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbList(contactBreadcrumbs, image),
    {
      "@type": "ContactPage",
      "@id": `${siteUrl}/contact-us#webpage`,
      name: "Contact Mahmoud Mohamed",
      description:
        "Contact Mahmoud Mohamed for React.js, Next.js, freelance and frontend engineering opportunities.",
      url: `${siteUrl}/contact-us`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
  ],
});

export const buildHomePageJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    buildWebSiteJsonLd(),
    buildBreadcrumbList(homeBreadcrumbs),
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      name: siteTitle,
      description: siteDescription,
      url: siteUrl,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
  ],
});

/**
 * Generate breadcrumb list for common pages
 */
export const homeBreadcrumbs = [{ name: "Home", url: "/" }];
export const skillsBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Skills", url: "/skills" },
];
export const projectsBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Projects", url: "/projects" },
];
export const experienceBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Experience", url: "/experience" },
];
export const educationBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Education", url: "/education" },
];
export const recommendationsBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Recommendations", url: "/recommendations" },
];
export const contactBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact-us" },
];
export const aboutBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
];
