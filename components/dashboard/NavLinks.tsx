import Link from 'next/link'
const NavLinks = () => {
  return (
    <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
    <Link
      href="/dashboard"
      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      Personal Data
    </Link>
    <Link
      href="/dashboard/projects"
      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      Projects
    </Link>
    <Link
      href="/dashboard/skills"
      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      Skills
    </Link>
  </nav>
  )
}

export default NavLinks