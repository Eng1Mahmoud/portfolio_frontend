"use client";
import { IuserInfo } from "@/types/general";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { motion } from "framer-motion";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
  linkType?: "phone" | "email" | "none";
  index: number;
}

const ContactItem = ({
  icon,
  title,
  content,
  linkType = "none",
  index,
}: ContactItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex gap-3 bg-gradient-to-br from-primary-dark to-primary-dark/80 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        className="flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 h-[50px] w-[50px] flex-shrink-0"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          {icon}
        </motion.div>
      </motion.div>
      <div className="flex-grow">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
        {content.map((item, idx) => (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 + idx * 0.1 }}
            className="text-gray-300 text-sm md:text-base break-words text-wrap"
            key={item}
          >
            {linkType === "phone" && item ? (
              <motion.a
                href={`tel:${item}`}
                className="hover:text-blue-400 transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ) : linkType === "email" && item ? (
              <motion.a
                href={`mailto:${item}`}
                className="hover:text-blue-400 transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ) : (
              item
            )}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

const ContactUsInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      <ContactItem
        icon={<AiFillPhone className="text-2xl text-blue-400" />}
        title="Phone"
        content={[profileInfo?.phone1, profileInfo?.phone2]}
        linkType="phone"
        index={0}
      />
      <ContactItem
        icon={<AiOutlineMail className="text-2xl text-blue-400" />}
        title="Email"
        content={[profileInfo?.email]}
        linkType="email"
        index={1}
      />
      <ContactItem
        icon={<GoLocation className="text-2xl text-blue-400" />}
        title="Address"
        content={[profileInfo?.address]}
        index={2}
      />
    </div>
  );
};

export default ContactUsInfo;
