import { IuserInfo } from "@/types/general";
import clsx from "clsx";

interface HomeIntroProps {
  profileInfo: IuserInfo;
}

/**
 * The biography arrives as one field of text: blank lines are paragraph
 * breaks, a single line break is just a wrap.
 */
const toParagraphs = (bio: string) =>
  bio
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

export const HomeIntro = ({ profileInfo }: HomeIntroProps) => {
  const name = profileInfo?.userName?.trim() ?? "";
  const role = profileInfo?.title?.trim() ?? "";
  const paragraphs = toParagraphs(profileInfo?.bio ?? "");

  // "Mahmoud Mohamed" sets on two lines; a single-word name keeps one.
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="hero-copy [overflow-wrap:anywhere]! relative min-w-0 w-full max-w-4xl pl-6 text-start sm:pl-10">
      {/* A single hairline anchors the column. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-sage via-parchment/12 to-transparent"
      />

      {role && (
        <p className="hero-role tracking-normal! [line-height:1.6]!  mb-4 font-mono text-[11px] uppercase text-sage sm:mb-5 sm:text-xs">
          {role}
        </p>
      )}

      {/* Critical text is visible in server HTML without hydration. */}
      <h1 className="display-hero font-display! font-bold! tracking-normal! [&_span_span]:[background-image:var(--hero-title)]! [&_span_span]:[-webkit-background-clip:text]! [&_span_span]:[background-clip:text]! [&_span_span]:[color:transparent]! text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] wrap-break-word text-ink-strong">
        <span className="block overflow-hidden pb-[0.06em]">
          <span className="block">{firstName}</span>
        </span>
        {lastName && (
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block text-ink-muted">{lastName}</span>
          </span>
        )}
      </h1>

      {/* The whole biography, so a visitor learns the person before scrolling. */}
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(
            "hero-bio [max-width:54ch]! text-pretty! max-md:[font-size:14px]! max-md:[line-height:1.6]! text-[15px] leading-relaxed text-ink-body sm:text-base",
            index === 0 ? "mt-4 sm:mt-5" : "mt-3",
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};
