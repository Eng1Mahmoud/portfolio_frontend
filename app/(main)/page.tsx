import { TypedName } from "@/components/Home/TypedName";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Overlay } from "@/components/general/Overlay";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { IuserInfo } from "@/types/general";
export default async function Home() {
  const profileInfo = (await getProfileInfo()) 
   
  return (
    <section className="h-full flex items-center justify-center bg-primary-light text-white">
      <div className="z-10 md:text-center ">
        <Overlay />
        <TypedName profileInfo={profileInfo as IuserInfo} />
        <HomeIntro profileInfo={profileInfo as IuserInfo} />
        <SocialLinks profileInfo={profileInfo as IuserInfo} />
      </div>
    </section>
  );
}
