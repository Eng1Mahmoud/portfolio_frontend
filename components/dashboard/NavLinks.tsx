"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUserCog,
  FaProjectDiagram,
  FaLightbulb,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
} from "react-icons/fa";

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Personal Data",
      icon: <FaUserCog size={20} />,
    },
    {
      href: "/dashboard/projects",
      label: "Projects",
      icon: <FaProjectDiagram size={20} />,
    },
    {
      href: "/dashboard/skills",
      label: "Skills",
      icon: <FaLightbulb size={20} />,
    },
    {
      href: "/dashboard/experience",
      label: "Experience",
      icon: <FaBriefcase size={20} />,
    },
    {
      href: "/dashboard/education",
      label: "Education",
      icon: <FaGraduationCap size={20} />,
    },
    {
      href: "/dashboard/recommendations",
      label: "Recommendations",
      icon: <FaQuoteLeft size={20} />,
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive = isLinkActive(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative flex items-center rounded-lg px-4 py-3 text-sm font-medium
                  transition-colors duration-200 ease-in-out
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sage
                  ${
                    isActive
                      ? "bg-parchment/[0.06] text-ink-strong"
                      : "text-ink-muted hover:bg-parchment/[0.04] hover:text-ink-strong"
                  }
                `}
              >
                {/* A rail rather than a filled pill — the same mark the public
                    site uses to flag the section you are in. */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-sage"
                  />
                )}
                <span
                  className={`
                  mr-3 transition-colors
                  ${isActive ? "text-sage" : "text-ink-muted group-hover:text-sage"}
                `}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
