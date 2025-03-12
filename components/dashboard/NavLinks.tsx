"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Lightbulb } from "lucide-react";

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Personal Data",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/dashboard/projects",
      label: "Projects",
      icon: <FolderKanban size={20} />,
    },
    {
      href: "/dashboard/skills",
      label: "Skills",
      icon: <Lightbulb size={20} />,
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
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-lg
                  transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-secondary-light text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span
                  className={`
                  mr-3 transition-colors
                  ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}
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
