import { TypedName } from "@/components/Home/TypedName";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { IuserInfo } from "@/types/general";

export default async function Home() {
  const profileInfo = await getProfileInfo();

  return (
    <section className="min-h-dvh flex items-center justify-center bg-surface-panel text-white relative ">
      {/*
        Background: a faint grid plus one soft glow behind the content.
        It was four stacked layers — grid, a full-screen gradient, and two
        hard-edged 384px colour blobs in opposite corners — which pulled the
        eye to the corners and away from the text.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="fixed left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 z-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <TypedName profileInfo={profileInfo as IuserInfo} />
          <HomeIntro profileInfo={profileInfo as IuserInfo} />
          <SocialLinks profileInfo={profileInfo as IuserInfo} />
        </div>
      </div>
    </section>
  );
}
