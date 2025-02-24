"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Header from "./Header"
import MobileSidebar from "./MobileSidebar"

export default function HeaderContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  )
}