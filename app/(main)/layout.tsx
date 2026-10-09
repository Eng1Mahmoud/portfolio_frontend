import { getProfileInfo } from "@/actions/getProfileInfo";
import { Navbar } from "@/components/general/Navbar";
import { ScrollProgress } from "@/components/general/ScrollProgress";
import { FloatingActions } from "@/components/general/FloatingActions";
import { SectionBackdrop } from "@/components/general/SectionBackdrop";

import { IuserInfo } from "@/types/general";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileInfo = await getProfileInfo();
  return (
    <div className="portfolio-shell h-dvh! overflow-hidden! relative bg-surface-base text-ink-body">
      <Navbar profileInfo={profileInfo as IuserInfo} />
      {/*
        The page scrolls here, not in the window — <Timeline />, <PinnedCard />
        and <ScrollProgress /> look this id up. `relative` is load-bearing:
        framer-motion measures scroll offsets against the containing block.
      */}
      <SectionBackdrop />
      <div
        id="page-scroll"
        className="page-scroll-styles h-dvh! [scrollbar-gutter:stable]! scroll-smooth! [scroll-padding-top:100px]! max-md:[scrollbar-gutter:auto]! max-md:[scrollbar-width:none]! max-md:[&::-webkit-scrollbar]:hidden! max-md:pb-25! relative z-10 overflow-y-auto scrollBar [scrollbar-width:auto]! [scrollbar-color:var(--portfolio-accent-dim)_var(--portfolio-well)]! [&::-webkit-scrollbar]:w-3! [&::-webkit-scrollbar-track]:bg-surface-well! [&::-webkit-scrollbar-thumb]:[background:var(--scrollbar-thumb)]! [&::-webkit-scrollbar-thumb]:[border-radius:9999px]! [&::-webkit-scrollbar-thumb]:[border:2px_solid_transparent]! [&::-webkit-scrollbar-thumb]:[background-clip:content-box]! [&::-webkit-scrollbar-thumb:hover]:[background:var(--scrollbar-thumb-hover)]! [&::-webkit-scrollbar-thumb:hover]:[background-clip:content-box]! pt-24 pb-6 sm:pt-28"
      >
        <ScrollProgress />
        <main className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-16 xl:px-20 lg:pb-10">
          {children}
        </main>
      </div>
      <FloatingActions profileInfo={profileInfo as IuserInfo} />
    </div>
  );
}
