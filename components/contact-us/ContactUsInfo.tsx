"use client";
import { IuserInfo } from "@/types/general";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
  linkType?: "phone" | "email" | "none";
}
const ContactItem = ({ icon, title, content, linkType = "none" }: ContactItemProps) => (
  <div className="contact-detail">
    <span className="contact-detail-icon" aria-hidden="true">{icon}</span>
    <div className="min-w-0">
      <h3 className="mb-2 text-sm text-ink-muted">{title}</h3>
      {content.filter(Boolean).map(item => (
        <p key={item} className="wrap-break-word text-base font-medium text-ink-strong">
          {linkType !== "none" ? <a href={`${linkType === "phone" ? "tel" : "mailto"}:${item}`} className="contact-detail-link">{item}</a> : item}
        </p>
      ))}
    </div>
  </div>
);
const ContactUsInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => (
  <div className="contact-details">
    <ContactItem icon={<AiOutlineMail />} title="Email" content={[profileInfo?.email]} linkType="email" />
    <ContactItem icon={<AiFillPhone />} title="Phone" content={[profileInfo?.phone1, profileInfo?.phone2]} linkType="phone" />
    <ContactItem icon={<GoLocation />} title="Based in" content={[profileInfo?.address]} />
  </div>
);
export default ContactUsInfo;
