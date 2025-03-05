"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IuserInfo } from "@/types/general";
export const PersonalInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const [name, setName] = useState("");
  const typedName = profileInfo?.userName || "";

  // Calculate age
  const calculateAge = (birthDate: string) => {
    const dateOfBirth = new Date(birthDate);
    const timeDifference = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(timeDifference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typedName.length) {
        setName(typedName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const personalDetails = [
    { label: "Full Name", value: profileInfo?.userName },
    { label: "Age", value: `${calculateAge("2001-03-26")} Years` },
    { label: "Nationality", value: "Egyptian" },
    { label: "Languages", value: "Arabic, English" },
    { label: "Address", value: profileInfo?.address },
    { label: "Freelance", value: "Available" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Hi, I am <span className="text-blue-500">{name}</span>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-gray-300"
      >
        {profileInfo?.bio}
      </motion.p>

      <ul className="space-y-2 mb-6">
        {personalDetails.map((detail, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <strong className="mr-2">{detail.label}:</strong> {detail.value}
          </motion.li>
        ))}
      </ul>

      <a
        href={profileInfo?.cv}
        target="_blank"
        download
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download CV
      </a>
    </div>
  );
};
