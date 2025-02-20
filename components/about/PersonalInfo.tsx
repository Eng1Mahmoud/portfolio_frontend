"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PersonalInfoProps {
  resumeLink: string;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ resumeLink }) => {
  const [name, setName] = useState('');
  const typedName = 'Mahmoud Mohamed';

  // Calculate age
  const calculateAge = (birthDate: string) => {
    const dob = new Date(birthDate);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
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
    { label: 'Full Name', value: 'Mahmoud Mohamed' },
    { label: 'Age', value: `${calculateAge('2001-03-26')} Years` },
    { label: 'Nationality', value: 'Egyptian' },
    { label: 'Languages', value: 'Arabic, English' },
    { label: 'Address', value: 'Egypt, 6th of October City' },
    { label: 'Freelance', value: 'Available' }
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
        I am a Frontend Engineer with a degree in Computers and AI, specializing
        in React and Next.js. I build scalable, high-performance web applications
        that enhance user engagement and business growth.
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

      <Link 
        href={resumeLink} 
        download
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download CV
      </Link>
    </div>
  );
};