import { type ReactNode } from "react";
import { Metadata } from "next";
import HeaderContainer from "@/components/dashboard/HeaderContainer";
import NavLinks from "@/components/dashboard/NavLinks";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base">
      <HeaderContainer />

      {/* The rail is fixed, so it sits outside the flow and needs the header's
          height as a top offset. */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="mt-[80px] flex flex-1 flex-col border-r border-parchment/10 bg-surface-panel/40 pt-4">
          <NavLinks />
        </div>
      </div>

      <main className="flex-1 md:pl-64">
        <div className="py-6">
          <div className="container mx-auto w-full px-3 sm:max-w-[40rem] sm:px-4 md:max-w-[48rem] lg:max-w-[64rem] lg:px-16 xl:max-w-[80rem] xl:px-20 2xl:max-w-[96rem]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
