import { type ReactNode } from "react";
import HeaderContainer from "@/components/dashboard/HeaderContainer";
import NavLinks from "@/components/dashboard/NavLinks";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100vh]">
      <HeaderContainer />
      <div className="flex flex-col bg-gray-100">
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-1 border-r border-gray-200 mt-[80px]">
            <NavLinks />
          </div>
        </div>
      </div>
      <main className="md:pl-64 flex-1">
        <div className="py-6">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
}
