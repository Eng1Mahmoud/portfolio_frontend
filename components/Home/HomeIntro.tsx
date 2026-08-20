"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";

export const HomeIntro = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const bio = profileInfo?.bio?.trim() ?? "";
  const title = profileInfo?.title?.trim();

  if (!bio && !title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mx-auto my-8 w-full max-w-2xl"
    >
      {title && (
        <p className="mb-5 text-center text-base font-medium tracking-wide text-cyan-300 md:text-lg">
          {title}
        </p>
      )}

      {/*
        Rendered as one real text node.

        It used to be split on spaces into ~89 <span>s with `mr-2` faking the
        gaps, which meant the DOM held no actual space characters: copying the
        bio produced "FrontendEngineerwith3+years...", screen readers ran the
        words together, and each word carried its own hover handler.

        `whitespace-pre-line` honours newlines typed into the bio field in the
        dashboard, so paragraph breaks are controlled from the CMS rather than
        guessed at here — splitting on "." would break React.js, Next.js,
        Vue.js and CI/CD.
      */}
      {bio && (
        <p className="whitespace-pre-line text-start text-base leading-relaxed text-gray-300 md:text-lg md:leading-loose">
          {bio}
        </p>
      )}
    </motion.div>
  );
};
