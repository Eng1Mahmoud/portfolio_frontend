import { Aside } from "@/components/general/Aside";
import { MobileAsideToggle } from "@/components/general/MobileAside";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        suppressHydrationWarning={true} 
        className="bg-gray-900 text-white"
      >
        <div className="relative h-screen overflow-hidden">
          {/* Mobile Aside Toggle */}
          <MobileAsideToggle />

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-[20%_80%] h-full overflow-hidden">
            <Aside />
            <main className="overflow-y-auto relative">
              {children}
            </main>
          </div>

          {/* Mobile Main Content */}
          <div className="
            md:hidden 
            absolute inset-0 
            pt-5 overflow-y-auto 
            bg-gray-900
          ">
            <div className="relative h-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}