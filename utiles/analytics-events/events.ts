import { sendGAEvent } from "./google-client";
import { captureEvent } from "./posthog-client";

// add click event to the download cv link
export const handleDownloadCV = () => {
  // PostHog
  captureEvent("cv_downloaded");

  // Google Analytics
  sendGAEvent("event", "download_cv", {
    event_category: "download_cv",
    event_label: "download_cv_link",
    event_action: "click",
    app_name: "devMahmoud_portfolio",
  });
};

export const handleViewProject = (projectTitle: string) => {
  captureEvent("project_viewed", {
    project_title: projectTitle,
  });
};

export const handleProjectExternalClick = (
  projectTitle: string,
  type: "github" | "live",
) => {
  captureEvent("project_external_link_clicked", {
    project_title: projectTitle,
    link_type: type,
  });
};

export const handleSocialClick = (platform: string) => {
  captureEvent("social_link_clicked", {
    platform: platform,
  });
};

export const handleChatBotInteraction = (action: "opened" | "message_sent") => {
  captureEvent(`chatbot_${action}`);
};

export const handleSkillHover = (skillName: string) => {
  captureEvent("skill_viewed", {
    skill_name: skillName,
  });
};
