"use client";

import { TypedName } from "@/components/Home/TypedName";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Overlay } from "@/components/general/Overlay";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="container mx-auto px-4  z-10 md:text-center ">
      <Overlay  />
        <TypedName />
        <HomeIntro />
        <SocialLinks />
      </div>
    </section>
  );
}
