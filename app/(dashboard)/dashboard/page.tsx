import { getProfileInfo } from "@/actions/getProfileInfo";
import PersonalForm from "@/components/dashboard/personal-data/PersonalForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default async function PersonalData() {
  const profileInfo = await getProfileInfo();

  return (
    <DashPanel title="Personal Information">
      <PersonalForm
        initialValues={
          profileInfo ?? {
            userName: "",
            title: "",
            email: "",
            address: "",
            phone1: "",
            phone2: "",
            bio: "",
            avatar: "",
            aboutImage: "",
            cv: "",
            github: "",
            linkedin: "",
          }
        }
      />
    </DashPanel>
  );
}
