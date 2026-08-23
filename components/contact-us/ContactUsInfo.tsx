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
      className="flex gap-4 rounded-xl border border-parchment/10 bg-parchment/[0.03] p-5 text-ink-body transition-colors hover:border-sage/40"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-parchment/10 bg-parchment/[0.04] text-sage"
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
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
        >
          {title}
        </motion.h3>
        {content.map((item, idx) => (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 + idx * 0.1 }}
            className="mt-1 break-words text-sm text-ink-strong md:text-base"
            key={item}
          >
            {linkType === "phone" && item ? (
              <motion.a
                href={`tel:${item}`}
                className="inline-block transition-colors hover:text-sage"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ) : linkType === "email" && item ? (
              <motion.a
                href={`mailto:${item}`}
                className="inline-block transition-colors hover:text-sage"
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
        icon={<AiFillPhone className="text-xl text-sage" />}
        title="Phone"
        content={[profileInfo?.phone1, profileInfo?.phone2]}
        linkType="phone"
        index={0}
      />
      <ContactItem
        icon={<AiOutlineMail className="text-xl text-sage" />}
        title="Email"
        content={[profileInfo?.email]}
        linkType="email"
        index={1}
      />
      <ContactItem
        icon={<GoLocation className="text-xl text-sage" />}
        title="Address"
        content={[profileInfo?.address]}
        index={2}
      />
    </div>
  );
};

export default ContactUsInfo;
