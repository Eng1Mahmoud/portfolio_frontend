import { sendGAEvent } from "@next/third-parties/google";

// add click event to the download cv link
export const handleDownloadCV = () => {
  sendGAEvent("event", "download_cv", {
    event_category: "download_cv",
    event_label: "download_cv_link",
    event_action: "click",
    app_name: "devMahmoud_portfolio", // Your app name
  });
};
