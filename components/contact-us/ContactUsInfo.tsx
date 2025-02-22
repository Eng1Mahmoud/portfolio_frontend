import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const ContactItem = ({ icon, title, content }: ContactItemProps) => {
  return (
    <div className="flex gap-3 bg-primary-dark text-white p-4 md:p-6 rounded-lg shadow-custom-shadow ">
      <div className="flex items-center justify-center rounded-md border border-white h-[40px] w-[40px] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
        {content.map((item) => (
          <p
            className="text-text-secondary text-sm md:text-base break-words text-wrap "
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

const ContactUsInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 ">
      <ContactItem
        icon={<AiFillPhone className="text-2xl" />}
        title="Phone"
        content={["+201201453941", "+201125948712"]}
      />
      <ContactItem
        icon={<AiOutlineMail className="text-2xl" />}
        title="Email"
        content={["mahmoudabbamalik@gmail.com", "engm9690@gmail.com"]}
      />
      <ContactItem
        icon={<GoLocation className="text-2xl" />}
        title="Address"
        content={["Egypt, 6th of October City"]}
      />
    </div>
  );
};

export default ContactUsInfo;
