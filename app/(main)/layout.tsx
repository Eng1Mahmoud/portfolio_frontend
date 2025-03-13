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
      <div className="hidden lg:block lg:w-[80%] overflow-y-auto h-screen scrollBar">
        <main className="container py-10">{children}</main>
      </div>
      <div className="lg:hidden pt-16 pb-4 flex-1 overflow-y-auto scrollBar">
        <main className="container">{children}</main>
      </div>
    </div>
  );
}
