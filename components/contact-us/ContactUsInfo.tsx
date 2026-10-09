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
const ContactItem = ({
  icon,
  title,
  content,
  linkType = "none",
}: ContactItemProps) => (
  <div className="contact-detail grid! [grid-template-columns:40px_minmax(0,_1fr)]! items-start! gap-4! [padding-block:26px]! [border-bottom:var(--hairline-border)]! [&:first-child]:[padding-top:0]! max-md:[padding-block:18px]!">
    <span
      className="contact-detail-icon grid! place-items-center! w-10! h-10! text-wheat! [background:var(--contact-border)]! [border-radius:6px]! [font-size:22px]!"
      aria-hidden="true"
    >
      {icon}
    </span>
    <div className="min-w-0">
      <h3 className="mb-2 text-sm text-ink-muted">{title}</h3>
      {content.filter(Boolean).map((item) => (
        <p
          key={item}
          className="wrap-break-word text-base font-medium text-ink-strong"
        >
          {linkType !== "none" ? (
            <a
              href={`${linkType === "phone" ? "tel" : "mailto"}:${item}`}
              className="contact-detail-link [overflow-wrap:anywhere]! [transition:color_150ms]! [&:hover]:text-sage-bright! [&:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&:focus-visible]:[outline-offset:4px]!"
            >
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
const ContactUsInfo = ({ profileInfo }: { profileInfo: IuserInfo }) => (
  <div className="contact-details grid!">
    <ContactItem
      icon={<AiOutlineMail />}
      title="Email"
      content={[profileInfo?.email]}
      linkType="email"
    />
    <ContactItem
      icon={<AiFillPhone />}
      title="Phone"
      content={[profileInfo?.phone1, profileInfo?.phone2]}
      linkType="phone"
    />
    <ContactItem
      icon={<GoLocation />}
      title="Based in"
      content={[profileInfo?.address]}
    />
  </div>
);
export default ContactUsInfo;
