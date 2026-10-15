"use client";
import { IuserInfo } from "@/types/general";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { handleSocialClick } from "@/utiles/analytics-events/events";

export const SocialLinks = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  // One hover treatment for all three. They used to hover in each platform's
  // own brand colour, which put three unrelated hues on the quietest corner of
  // the page.
  const socialLinks = [
    { label: "LinkedIn", icon: FaLinkedin, href: profileInfo?.linkedin },
    { label: "GitHub", icon: FaGithub, href: profileInfo?.github },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/${profileInfo?.phone1}`,
    },
  ];

  return (
    <div className="relative">
      <ul className="flex items-center gap-3 relative">
        {socialLinks.map((social, index) => (
          <li
            key={index}
            className="relative group transition-transform hover:-translate-y-1 hover:scale-110 active:scale-95 motion-reduce:transform-none"
          >
            <Link
              href={social.href}
              aria-label={`Visit Mahmoud on ${social.label}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const platform = social.href.includes("linkedin")
                  ? "linkedin"
                  : social.href.includes("github")
                    ? "github"
                    : "whatsapp";
                handleSocialClick(platform);
              }}
              className="block rounded-full border border-parchment/10 p-3 transition-colors duration-300 hover:border-sage/50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
            >
              <social.icon
                aria-hidden="true"
                className="text-lg text-ink-muted transition-colors duration-300 group-hover:text-sage"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
