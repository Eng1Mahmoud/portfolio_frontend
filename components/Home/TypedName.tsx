"use client";
import { IuserInfo } from "@/types/general";
import { useState, useEffect } from "react";

export const TypedName = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const [name, setName] = useState("");
  // Add a null check to prevent issues during prerendering
  const typedName =  "I am " + profileInfo?.userName.split(" ").slice(0,1).join("") || "";
  useEffect(() => {
    // Only run the effect on the client side
    if (typeof window === 'undefined') return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typedName.length) {
        setName(typedName.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [typedName]);

  return (
    <h1 className="text-2xl md:text-4xl font-bold mb-6 ">
      Hi, {" "}
     <span className="text-blue-500">{name}</span>
    </h1>
  );
};
