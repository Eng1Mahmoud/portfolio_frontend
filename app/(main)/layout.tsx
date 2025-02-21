import { Aside } from "@/components/general/Aside";
import { MobileAsideToggle } from "@/components/general/MobileAside";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-primary-light text-white">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="relative h-screen overflow-hidden">
          {/* Mobile Aside Toggle */}
          <MobileAsideToggle />

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[20%_80%] h-full overflow-hidden ">
            <Aside />
            <main className="overflow-y-auto relative p-6">{children}</main>
          </div>

          {/* Mobile Main Content */}
          <main
            className="
            lg:hidden 
            absolute inset-0 
            pt-5 overflow-y-auto 
            bg-primary-light
          "
          >
            <div className="relative h-full p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
