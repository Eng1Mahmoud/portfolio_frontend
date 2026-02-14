import { ToastContainer } from "react-toastify";
import { GoogleAnalytics } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { mainFont } from "@/fonts";
import { Metadata } from "next";
import { Person, WithContext } from "schema-dts";

const ChatBot = dynamic(() => import("@/components/general/chatbot/ChatBot"));
// metadata
export const metadata: Metadata = {
  title: {
    default: "Mahmoud Mohamed | Portfolio",
    template: "%s | Mahmoud Mohamed",
  },
  description:
    "Professional portfolio showcasing my work and skills in web development",
  keywords: [
    "portfolio",
    "web developer",
    "frontend developer",
    "react",
    "next.js",
  ],
};
// JSONLD
const jsonld: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahmoud Mohamed",
  url: "https://dev-mahmoud-portfolio.vercel.app/",
  sameAs: [
    "https://github.com/Eng1Mahmoud",
    "https://www.linkedin.com/in/Mahmoud-Mohamed-Abdel-Aal",
  ],
  jobTitle: "Frontend Engineer",
  description:
    "I am  Frontend Engineer with a degree in Computers and Artificial Intelligence, plus one year of startup experience. Specializing in React and Next.js, I create responsive, high-performance web applications that drive user engagement and business growth. what I offer: - Expertise in React, Next.js, and modern front-end technologies - Rapid development of user-friendly, scalable web solutions - Ability to balance technical excellence with business objectives - Collaborative approach, thriving in fast-paced environments Committed to delivering innovative web experiences that exceed expectations and propel digital success.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${mainFont.variable}`}>
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
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
