import { Aside } from "@/components/general/Aside";
import { MobileAsideToggle } from "@/components/general/MobileAside";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-light text-white relative h-screen overflow-hidden">
      <MobileAsideToggle />
      <div className="hidden lg:grid lg:grid-cols-[20%_80%] h-full overflow-hidden">
        <Aside />
        <main className="overflow-y-auto relative p-6">{children}</main>
      </div>
      <main className="lg:hidden absolute inset-0 pt-5 overflow-y-auto bg-primary-light">
        <div className="relative h-full p-6">{children}</div>
      </main>
    </div>
  );
}