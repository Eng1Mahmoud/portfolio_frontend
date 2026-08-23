"use client";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IuserInfo } from "@/types/general";
import { handleDownloadCV } from "@/utiles/analytics-events/events";

/**
 * Milliseconds per character. The previous 300ms took four and a half seconds
 * to spell a name — long enough that visitors read the paragraph below it and
 * looked back to find the heading still typing.
 */
const TYPE_SPEED = 65;

export const PersonalInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const typedName = profileInfo?.userName || "";
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const isTyping = name.length < typedName.length;

  useEffect(() => {
    if (reduceMotion) {
      setName(typedName);
      return;
    }
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 1;
      setName(typedName.slice(0, currentIndex));
      if (currentIndex >= typedName.length) clearInterval(interval);
    }, TYPE_SPEED);

    return () => clearInterval(interval);
  }, [typedName, reduceMotion]);

  // Calculate age
  const calculateAge = (birthDate: string) => {
    const dateOfBirth = new Date(birthDate);
    const timeDifference = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(timeDifference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

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
      <h2 className="display-title mb-4 text-2xl text-ink-strong">
        Hi, I am{" "}
        <span className="text-sage">
          {/* The full name is always in the DOM for assistive tech; the typed
              copy is the decorative one. */}
          <span aria-hidden="true">{name}</span>
          <span className="sr-only">{typedName}</span>
          {isTyping && (
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1],
              }}
              className="ms-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.05em] bg-sage-bright"
            />
          )}
        </span>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 leading-relaxed text-ink-body"
      >
        {profileInfo?.bio}
      </motion.p>

      {/*
        A spec sheet, set as one. These are fixed facts about a person, so the
        rows are a definition list with a hairline leader carrying the eye from
        label to value — the structure of an index, because that is what this
        is. It replaces a bulleted list where the label and value ran together
        in one line of prose.
      */}
      <dl className="mb-8 divide-y divide-parchment/[0.07] border-y border-parchment/[0.07]">
        {personalDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15 + index * 0.06,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-baseline gap-3 py-2.5"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {detail.label}
            </dt>
            <span
              aria-hidden="true"
              className="h-px flex-1 translate-y-[-0.15em] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.18)_0_1px,transparent_1px_5px)]"
            />
            <dd className="text-sm text-ink-strong">{detail.value}</dd>
          </motion.div>
        ))}
      </dl>

      <a
        href={profileInfo?.cv}
        target="_blank"
        download
        className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        onClick={handleDownloadCV}
      >
        Download CV
      </a>
    </div>
  );
};
