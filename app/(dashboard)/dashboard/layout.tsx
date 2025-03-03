import { type ReactNode } from "react";
import HeaderContainer from "@/components/dashboard/HeaderContainer";
import NavLinks from "@/components/dashboard/NavLinks";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HeaderContainer />
      <div className="flex flex-col bg-gray-100">
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-semibold text-gray-800">
                Menu
              </span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
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
    </div>
  );
}
