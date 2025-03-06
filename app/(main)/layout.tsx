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
    <div className="bg-primary-light text-white relative h-screen overflow-hidden">
      <MobileAsideToggle profileInfo={profileInfo as IuserInfo} />
      <div className="hidden lg:grid lg:grid-cols-[20%_80%] h-full overflow-hidden">
        <Aside profileInfo={profileInfo as IuserInfo} />
        <main className="overflow-y-auto relative container py-10">{children}</main>
      </div>
      <main className="lg:hidden absolute inset-0 overflow-y-auto bg-primary-light ">
        <div className="relative min-h-[100vh] max-h-[auto] container py-16">{children}</div>
      </main>
    </div>
  );
}
