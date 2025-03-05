import { getProfileInfo } from "@/actions/getProfileInfo";
import PersonalForm from "@/components/dashboard/personal-data/PersonalForm";
export default async function PersonalData() {
  const profileInfo = await getProfileInfo();
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>
      <PersonalForm
        initialValues={
          profileInfo ?? {
            userName: "",
            title: "",
            email: "",
            phone1: "",
            phone2: "",
            bio: "",
            avatar: "",
            aboutImage: "",
            cv: "",
          }
        }
      />
    </div>
  );
}
