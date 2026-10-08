import { getProfileInfo } from "@/actions/getProfileInfo";
import CanvasCursor from "@/components/general/CanvasCursor";
import { Navbar } from "@/components/general/Navbar";
import { ScrollProgress } from "@/components/general/ScrollProgress";
import { IuserInfo } from "@/types/general";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileInfo = await getProfileInfo();
  return (
    <div className="relative bg-surface-base text-ink-body h-screen">
      {/* Ambient night glow behind every page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(60rem_40rem_at_85%_-10%,rgba(124,156,255,0.16),transparent_60%),radial-gradient(50rem_35rem_at_-10%_110%,rgba(196,165,255,0.12),transparent_60%)]"
      />
      <Navbar profileInfo={profileInfo as IuserInfo} />
      {/*
        The page scrolls here, not in the window — <Timeline />, <PinnedCard />
        and <ScrollProgress /> look this id up. `relative` is load-bearing:
        framer-motion measures scroll offsets against the containing block.
      */}
      <div
        id="page-scroll"
        className="relative z-10 h-screen overflow-y-auto scrollBar pt-24 pb-6 sm:pt-28"
      >
        <ScrollProgress />
        <main className="container max-w-7xl lg:pb-10">{children}</main>
        <CanvasCursor />
      </div>
    </div>
  );
}
