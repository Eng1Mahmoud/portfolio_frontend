import { getProfileInfo } from "@/actions/getProfileInfo";
import { PersonalInfo } from "@/components/about/PersonalInfo";
import { ProfileImage } from "@/components/about/ProfileImage";
import { Title } from "@/components/general/Title";
import { IuserInfo } from "@/types/general";

export default async function AboutPage() {
  const profileInfo = await getProfileInfo();
  return (
    <div>
      <Title title="About Me" />
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Profile Image */}
        <ProfileImage profileInfo={profileInfo as IuserInfo} />

        {/* Personal Information */}
        <PersonalInfo profileInfo={profileInfo as IuserInfo} />
      </div>
    </div>
  );
}
