import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahmoud Mohamed | Software Engineer",
    short_name: "Dev Mahmoud",
    description:
      "Portfolio of Mahmoud Mohamed, Software Engineer focused on frontend and full-stack development with React.js, Next.js, Node.js and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0C17",
    theme_color: "#7C9CFF",
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
