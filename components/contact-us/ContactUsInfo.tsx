import { IuserInfo } from "@/types/general";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
  linkType?: "phone" | "email" | "none";
}

const ContactItem = ({ icon, title, content, linkType = "none" }: ContactItemProps) => {
  return (
    <div className="flex gap-3 bg-primary-dark text-white p-4 md:p-6 rounded-lg shadow-custom-shadow ">
      <div className="flex items-center justify-center rounded-md border border-white h-[40px] w-[40px] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
        {content.map((item) => (
          <p
            className="text-text-secondary text-sm md:text-base break-words text-wrap"
            key={item}
          >
            {linkType === "phone" && item ? (
              <a href={`tel:${item}`} className="hover:text-blue-400 transition-colors">
                {item}
              </a>
            ) : linkType === "email" && item ? (
              <a href={`mailto:${item}`} className="hover:text-blue-400 transition-colors">
                {item}
              </a>
            ) : (
              item
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

const ContactUsInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 ">
      <ContactItem
        icon={<AiFillPhone className="text-2xl" />}
        title="Phone"
        content={[profileInfo?.phone1, profileInfo?.phone2]}
        linkType="phone"
      />
      <ContactItem
        icon={<AiOutlineMail className="text-2xl" />}
        title="Email"
        content={[profileInfo?.email]}
        linkType="email"
      />
      <ContactItem
        icon={<GoLocation className="text-2xl" />}
        title="Address"
        content={[profileInfo?.address]}
      />
    </div>
  );
};

export default ContactUsInfo;
