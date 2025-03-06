import { TypedName } from "@/components/Home/TypedName";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Overlay } from "@/components/general/Overlay";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { IuserInfo } from "@/types/general";
import Image from "next/image";
import animation from "@/public/animation.gif";

export default async function Home() {
  const profileInfo = await getProfileInfo();

  return (
    <section className="h-full flex items-center justify-center bg-primary-light text-white">
      <div className="flex flex-col md:flex-row md:gap-8 items-center justify-between">
        <div className="z-10 w-full md:w-1/2 text-left md:text-left">
          <Overlay />
          <TypedName profileInfo={profileInfo as IuserInfo} />
          <HomeIntro profileInfo={profileInfo as IuserInfo} />
          <SocialLinks profileInfo={profileInfo as IuserInfo} />
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden -top-10 md:top-0 z-[12]">
            <Image
              src={animation}
              alt="Developer Animation"
              fill
              priority
              className="object-cover w-[50%] "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
