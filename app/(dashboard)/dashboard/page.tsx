import PersonalForm from "@/components/dashboard/personal-data/PersonalForm";
import { Fetch } from "@/fetch/Fetch";
import { IuserInfoResponse } from "@/types/apiResponses";
export default async function PersonalData() {
  const response = await Fetch<IuserInfoResponse, null>({
    endpoint: "profile",
    method: "GET",
    tags: ["info"],
  });
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>
      <PersonalForm
        initialValues={
          response?.data?.info ?? {
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
