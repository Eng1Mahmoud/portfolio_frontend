"use client";
import Image from "next/image";
import { IuserInfo } from "@/types/general";

export const ProfileImage = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  return (
    <div className="group relative aspect-square w-full max-w-md">
      <Image
        src={profileInfo?.aboutImage}
        alt="Mahmoud Mohamed"
        fill
        className="object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105"
        priority
      />
      {/* Top Left Corner */}
      <div
        className="
          absolute top-0 left-0 
          w-8 h-8 
          border-l-[6px] border-t-[6px] 
          border-sage 
          rounded-tl-lg
        "
      />
      {/* Bottom Right Corner */}
      <div
        className="
          absolute bottom-0 right-0 
          w-8 h-8 
          border-r-[6px] border-b-[6px] 
          border-sage 
          rounded-br-lg
        "
      />
      {/* Hover Effect Container */}
      <div
        className="
        absolute inset-0 
        border-4 border-transparent 
        group-hover:border-sage/50 
        rounded-lg 
        transition-all 
        duration-300 
        opacity-0 
        group-hover:opacity-100
      "
      />
    </div>
  );
};
