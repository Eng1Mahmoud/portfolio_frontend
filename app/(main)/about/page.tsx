import { redirect } from "next/navigation";

/** The About section is gone; its biography now opens the home page. */
export default function SectionRedirect() {
  redirect("/#home");
}
