import { Home, LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface MainLinkProps {
  icon?: LucideIcon
  to?: string
  label?: string
}

export const MainLink = ({
  icon: Icon = Home,
  to = '/',
  label = 'MainLink',
}: MainLinkProps) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive ? 'bg-gray-800 text-main' : 'hover:bg-gray-800 hover:text-main'}`}
    >
      <Icon
        className={`h-5 w-5 ${isActive ? 'text-main' : 'hover:text-main'}`}
      />
      <span>{label}</span>
    </Link>
  )
}
