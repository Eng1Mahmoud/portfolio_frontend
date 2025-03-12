"use client";
import { IuserInfo } from "@/types/general";
import { useState, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export const TypedName = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const [name, setName] = useState("");
  const typedName =  "I am " + profileInfo?.userName.split(" ").slice(0,1).join("") || "";

  const throwTestError = () => {
    try {
      throw new Error('Test Sentry Error from TypedName Component');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  useEffect(() => {
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
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        Hi, {" "}
        <span className="text-blue-500">{name}</span>
      </h1>
      <button
        onClick={throwTestError}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Test Sentry Error
      </button>
    </div>
  );
};
