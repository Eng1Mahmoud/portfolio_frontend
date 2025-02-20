"use client";

import { useState, useEffect } from "react";

export const TypedName = () => {
  const [name, setName] = useState("");
  const typedName = "Mahmoud Mohamed";

  useEffect(() => {
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
  }, []);

  return (
    <h1 className="text-2xl md:text-5xl font-bold mb-6 ">
      Hi, I am <span className="text-blue-500">{name}</span>
    </h1>
  );
};
