import { getProfileInfo } from "@/actions/getProfileInfo";
import { Aside } from "@/components/general/Aside";
import CanvasCursor from "@/components/general/CanvasCursor";
import { MobileAsideToggle } from "@/components/general/MobileAside";
import { IuserInfo } from "@/types/general";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileInfo = await getProfileInfo();
  return (
    <div className="bg-surface-base text-ink-body h-screen flex flex-col lg:flex-row ">
      <MobileAsideToggle profileInfo={profileInfo as IuserInfo} />
      <div className="hidden lg:block lg:w-[20%] h-screen">
        <Aside profileInfo={profileInfo as IuserInfo} />
      </div>
      {/* Single content region for both breakpoints — rendering `children`
          twice puts the whole page in the DOM twice (duplicate <main>/<h1>). */}
      {/*
        The page scrolls in here, not in the window. Anything that reacts to
        scroll position has to be told so — <Timeline /> looks this id up to
        subscribe to the right element.

        `relative` is load-bearing: a scroll container measured by
        framer-motion has to be a containing block, or the offsets it reads
        for its children are computed against the wrong origin.
      */}
      <div
        id="page-scroll"
        className="relative flex-1 lg:flex-none lg:w-[80%] h-screen overflow-y-auto scrollBar pt-16 pb-4 lg:pt-0 lg:pb-0"
      >
        <main className="container lg:py-10">{children}</main>
        <CanvasCursor />
      </div>
    </div>
  );
}
