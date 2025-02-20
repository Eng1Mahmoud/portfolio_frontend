"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const socialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

export const SocialLinks = () => {
    const socialLinks = [
        { 
            icon: FaLinkedin, 
            href: "https://www.linkedin.com/in/mahmoud-mohamed-abdel-aal",
            color: "text-blue-600 hover:text-blue-400"
        },
        { 
            icon: FaTwitter, 
            href: "https://twitter.com/ABAAMALIK1",
            color: "text-sky-500 hover:text-sky-400"
        },
        { 
            icon: FaGithub, 
            href: "https://github.com/Eng1Mahmoud",
            color: "text-gray-200 hover:text-white"
        }
    ];

    return (
        <motion.ul 
            initial="hidden" 
            animate="visible"
            variants={socialVariants}
            transition={{ duration: 1.5 }}
            className="flex space-x-6 justify-center"
        >
            {socialLinks.map((social, index) => (
                <li key={index}>
                    <Link 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-3xl transition-colors duration-300 ${social.color}`}
                    >
                        <social.icon />
                    </Link>
                </li>
            ))}
        </motion.ul>
    );
};