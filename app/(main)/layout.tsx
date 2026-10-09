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
    <div className="portfolio-shell relative bg-surface-base text-ink-body">
      <Navbar profileInfo={profileInfo as IuserInfo} />
      {/*
        The page scrolls here, not in the window — <Timeline />, <PinnedCard />
        and <ScrollProgress /> look this id up. `relative` is load-bearing:
        framer-motion measures scroll offsets against the containing block.
      */}
      <SectionBackdrop />
      <div
        id="page-scroll"

        className="relative z-10 overflow-y-auto scrollBar pt-24 pb-6 sm:pt-28"
      >
        <ScrollProgress />
        <main className="container max-w-7xl lg:pb-10">{children}</main>
      </div>
      <FloatingActions profileInfo={profileInfo as IuserInfo} />
    </div>
  );
}
