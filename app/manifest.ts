import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahmoud Mohamed | Frontend Software Engineer",
    short_name: "Dev Mahmoud",
    description:
      "Portfolio of Mahmoud Mohamed, Frontend Software Engineer focused on React.js, Next.js and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#171A16",
    theme_color: "#9DC2A6",
    icons: [
      {
        src: "/icons/icon192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
