"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asideLinks } from "@/utiles/aside-links";
import Divider from "@/components/general/Divider";
// import image
import myAvatar from "@/public/unnamed.jpg";

export const Aside = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <aside className="h-full w-full bg-primary-dark text-white p-6 flex flex-col items-center border-r-[6px] border-slate-600 rounded-r-xl">
            <div className="avatar mb-8">
                <Image
                    src={myAvatar}
                    alt="avatar"
                    width={200}
                    height={200}
                    priority
                    className="rounded-full w-40 h-40 object-cover"
                />
            </div>

            <div className="w-full">
                <ul className="space-y-4">
                    {asideLinks.map((item, index) => (
                        <li key={index} className="w-full">
                            <Link
                                href={item.path}
                                className={`
                                    block w-full py-2 px-4 rounded-md text-center transition-colors duration-300
                                    ${isActive(item.path)
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Divider />
                <div className="cv mt-4 text-center">
                    <a
                        href={""}
                        download
                        className="block w-full py-2 px-4 rounded-md text-center 
                            bg-green-600 text-white 
                            hover:bg-green-700 
                            transition-colors duration-300">
                        Download CV
                    </a>
                </div>
                <Divider />
            </div>
            {/** divider */}

            {/** copyright */}
            <div className="mt-auto mb-4 text-center">
                <p className="text-[13px] text-gray-400  ">
                    All rights reserved &copy; {new Date().getFullYear()} Mahmoud Mohamed
                </p>
            </div>
        </aside>
    );
};
