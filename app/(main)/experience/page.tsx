import { ExperienceCard } from "@/components/Experience/ExperienceCard";
import { IExperience } from "@/types/general";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | My Portfolio",
  description: "My professional experience and career journey.",
};

const dummyExperience: IExperience = {
  _id: "1",
  title: "Software Engineer (Frontend)",
  company: "LAUNCH WORKZ",
  location: "Remote",
  startDate: "Nov 2023",
  endDate: "Present",
  description:
    "I work as a Frontend Engineer at LAUNCH WORKZ, where I specialize in transforming Figma designs into fully functional web applications using React and Next.js. I collaborate closely with the backend team to integrate APIs seamlessly and ensure the application functions efficiently. My role also involves identifying and implementing optimal solutions to enhance performance and deliver a smooth user experience.",
  skills: [
    "React",
    "Next.js",
    "Javascript",
    "TypeScript",
    "Tailwind CSS",
    "Redux",
    "Material UI",
    "i18next",
    "formik",
    "yup",
    "axios",
    "react-router",
    "redux-persist",
    "swiper",
    "emailjs",
    "stripe",
    "sentry",
    "react-google-maps",
    "Figma",
    "API Integration",
    "Performance Optimization",
    "User Experience",
  ],
  type: "Full-time",
};

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Experience
          </h1>
          <p className="text-gray-400 text-lg">
            My journey in software development and the companies I&apos;ve
            worked with.
          </p>
        </div>

        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/30"></div>

          <ExperienceCard experience={dummyExperience} index={0} />
        </div>
      </div>
    </div>
  );
}
