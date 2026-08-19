import { getProfileInfo } from "@/actions/getProfileInfo";
import { Aside } from "@/components/general/Aside";
import { MobileAsideToggle } from "@/components/general/MobileAside";
import { IuserInfo } from "@/types/general";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileInfo = await getProfileInfo();
  return (
    <div className="bg-primary-light text-white h-screen flex flex-col lg:flex-row ">
      <MobileAsideToggle profileInfo={profileInfo as IuserInfo} />
      <div className="hidden lg:block lg:w-[20%] h-screen">
        <Aside profileInfo={profileInfo as IuserInfo} />
      </div>
      {/* Single content region for both breakpoints — rendering `children`
          twice puts the whole page in the DOM twice (duplicate <main>/<h1>). */}
      <div className="flex-1 lg:flex-none lg:w-[80%] h-screen overflow-y-auto scrollBar pt-16 pb-4 lg:pt-0 lg:pb-0">
        <main className="container lg:py-10">{children}</main>
      </div>
    </div>
  );
}
