"use client"
import PersonalForm from "@/components/dashboard/personal-data/PersonalForm"
export default function PersonalData() {

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Information</h2>
        <PersonalForm/>
    </div>
  )
}

