import { ToastContainer } from "react-toastify";
import { GoogleAnalytics } from "@next/third-parties/google";
import "react-toastify/dist/ReactToastify.css";
import { displayFont, mainFont, monoFont } from "@/fonts";
import { Metadata } from "next";
import { Person, WithContext } from "schema-dts";
import ChatBotWraper from "@/components/general/chatbot/ChatBotWraper";
import MotionProvider from "@/app/providers/MotionProvider";
import { getProfileInfo } from "@/actions/getProfileInfo";
import {
  getProfileImageUrl,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
} from "@/utiles/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const profileInfo = await getProfileInfo();
  const profileImageUrl = getProfileImageUrl(profileInfo?.avatar);

  return {
    // Required so relative OG/canonical URLs resolve to absolute ones.
    metadataBase: new URL(siteUrl),
    icons: {
      icon: profileImageUrl || "/icon.png",
      apple: profileImageUrl || "/apple-icon.png",
    },
    title: {
      // The name alone is contested — several developers share it, so the role
      // is what makes this result identifiable in a list of them.
      default: siteTitle,
      template: "%s | Mahmoud Mohamed — Frontend Engineer",
    },
    description: siteDescription,
    keywords: siteKeywords,
    authors: [{ name: "Mahmoud Mohamed", url: siteUrl }],
    creator: "Mahmoud Mohamed",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "profile",
      siteName,
      title: {
        default: siteTitle,
        template: "%s | Mahmoud Mohamed — Frontend Engineer",
      },
      description: siteDescription,
      url: "/",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          alt: "Mahmoud Mohamed — Frontend Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: siteTitle,
        template: "%s | Mahmoud Mohamed — Frontend Engineer",
      },
      description: siteDescription,
      images: ["/twitter-image"],
    },
    // Without max-image-preview:large Google will not consider a large thumbnail
    // for this page at all, which is the first requirement for showing a photo.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
/**
 * Built per-request from the profile so `image` carries the real avatar.
 * A Person with no image gives Google nothing to attach a photo to, which was
 * the single biggest gap here — the rest of the graph was already fine.
 */
const buildPersonJsonLd = (profile?: {
  avatar?: string;
  title?: string;
  bio?: string;
  email?: string;
  address?: string;
  github?: string;
  linkedin?: string;
}): WithContext<Person> => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Mahmoud Mohamed",
  url: siteUrl,
  // Absolute, crawlable, and on an allowed image host — all three are required
  // before the photo is even a candidate for a rich result.
  ...(getProfileImageUrl(profile?.avatar) && {
    image: getProfileImageUrl(profile?.avatar),
  }),
  sameAs: [
    profile?.github ?? "https://github.com/Eng1Mahmoud",
    profile?.linkedin ??
      "https://www.linkedin.com/in/Mahmoud-Mohamed-Abdel-Aal",
  ],
  // Trimmed: these come from free-text dashboard fields, and stray whitespace
  // ends up inside the structured data verbatim.
  jobTitle: profile?.title?.trim() || "Frontend Software Engineer",
  ...(profile?.email && { email: profile.email.trim() }),
  ...(profile?.address && {
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.address.trim(),
    },
  }),
  // The searchable skill terms, in the field made for them.
  knowsAbout: siteKeywords.filter(
    (keyword) => keyword !== "Mahmoud Mohamed" && keyword !== "portfolio",
  ),
  description: profile?.bio || siteDescription,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cached by the same fetch layer every other page uses, so this costs nothing
  // extra per request.
  const profileInfo = await getProfileInfo();
  const jsonld = buildPersonJsonLd(profileInfo);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${displayFont.variable} ${mainFont.variable} ${monoFont.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonld),
          }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_GTAG as string} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z[1000]"
        />
        <MotionProvider>{children}</MotionProvider>
        <ChatBotWraper />
      </body>
    </html>
  );
}
