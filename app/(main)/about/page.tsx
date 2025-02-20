import { PersonalInfo } from "@/components/about/PersonalInfo";
import { ProfileImage } from "@/components/about/ProfileImage";
import { Title } from "@/components/general/Title";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
     <Title title="About Me" />
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Profile Image */}
        <ProfileImage />

        {/* Personal Information */}
        <PersonalInfo 
          resumeLink={""}
        />
      </div>
    </div>
  );
}