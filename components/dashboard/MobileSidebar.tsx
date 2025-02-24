"use client"
import { X } from "lucide-react"
import { type Dispatch, type SetStateAction } from "react"
import NavLinks from "./NavLinks"
export default function MobileSidebar({
  sidebarOpen,
  setSidebarOpen
}: {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white transition ease-in-out duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-shrink-0 flex items-center px-4">
          <span className="text-2xl font-semibold text-gray-800 py-3 ">Menu</span>
        </div>
        <div className="h-[1px] w-full bg-gray-300"/>
        <NavLinks/>
       
      </div>
      <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
    </div>
  )
}