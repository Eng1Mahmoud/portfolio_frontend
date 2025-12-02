import { TypedName } from "@/components/Home/TypedName";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Overlay } from "@/components/general/Overlay";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { IuserInfo } from "@/types/general";

export default async function Home() {
  const profileInfo = await getProfileInfo();

  return (
    <section className="min-h-dvh flex items-center justify-center bg-[#0f172a] text-white relative ">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-transparent to-[#0f172a] pointer-events-none"></div>
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-2 md:px-4 z-10">
        <div className="w-full text-center ">
          <Overlay />
          <TypedName profileInfo={profileInfo as IuserInfo} />
          <HomeIntro profileInfo={profileInfo as IuserInfo} />
          <SocialLinks profileInfo={profileInfo as IuserInfo} />
        </div>
      </div>
    </section>
  );
}
