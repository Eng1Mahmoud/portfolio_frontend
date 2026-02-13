import { sendGAEvent } from "@next/third-parties/google";
import posthog from "posthog-js";

// add click event to the download cv link
export const handleDownloadCV = () => {
  // PostHog
  posthog.capture("cv_downloaded");

  // Google Analytics
  sendGAEvent("event", "download_cv", {
    event_category: "download_cv",
    event_label: "download_cv_link",
    event_action: "click",
    app_name: "devMahmoud_portfolio",
  });
};

export const handleViewProject = (projectTitle: string) => {
  posthog.capture("project_viewed", {
    project_title: projectTitle,
  });
};

export const handleProjectExternalClick = (
  projectTitle: string,
  type: "github" | "live",
) => {
  posthog.capture("project_external_link_clicked", {
    project_title: projectTitle,
    link_type: type,
  });
};

export const handleSocialClick = (platform: string) => {
  posthog.capture("social_link_clicked", {
    platform: platform,
  });
};

export const handleChatBotInteraction = (
  action: "opened" | "closed" | "message_sent",
) => {
  posthog.capture(`chatbot_${action}`);
};

export const handleChatBotError = (errorType: string) => {
  posthog.capture("chatbot_error", {
    error_type: errorType,
  });
};

export const handleSkillHover = (skillName: string) => {
  posthog.capture("skill_viewed", {
    skill_name: skillName,
  });
};
