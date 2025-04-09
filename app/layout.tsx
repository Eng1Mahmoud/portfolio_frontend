import { ToastContainer } from "react-toastify";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { mainFont } from "@/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mahmoud Mohamed | Portfolio",
    template: "%s | Mahmoud Mohamed",
  },
  description:
    "Professional portfolio showcasing my work and skills in web development",
  keywords: [
    "portfolio",
    "web developer",
    "frontend developer",
    "react",
    "next.js",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${mainFont.variable}`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_GTAG as string} />
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
          className="z[1000]"
        />
        {children}
      </body>
    </html>
  );
}
