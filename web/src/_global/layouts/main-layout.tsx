import { MainLink } from '@components/main-link'
import { useAuthStore } from '@global/useStores/useAuth'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LayoutDashboard, LogOut, Users } from 'lucide-react'
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children?: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { signOut } = useAuthStore((store) => store)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-sidebar text-white md:flex">
        <div className="flex items-center p-4 font-semibold">
          <img src="assets/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-2 text-2xl">
            <strong className="text-main">I</strong>Managers
          </span>
        </div>
        <nav className="mt-8 flex-1 space-y-4 px-4">
          <MainLink to="/" icon={LayoutDashboard} label="Dashboard" />
          <MainLink to="/manager" icon={Users} label="Gerenciar arquivos" />
          <MainLink to="/clients" icon={Users} label="Clients" />
        </nav>
        <footer className="p-4 text-sm">
          <p>My Team</p>
        </footer>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <h1 className="text-xl font-semibold text-textPrimary">
            Opportunities
          </h1>
          <div className="flex items-center space-x-2">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <img
                  src="https://randomuser.me/api/portraits/men/77.jpg"
                  alt="User"
                  className="h-10 w-10 cursor-pointer rounded-full"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="w-40 rounded-md bg-input p-2 shadow-lg"
                  sideOffset={5}
                  align="end"
                >
                  <DropdownMenu.Arrow className="fill-white" offset={10} />
                  <DropdownMenu.Item
                    className="flex cursor-pointer items-center space-x-2 rounded-md p-2 text-textPrimary hover:bg-gray-100"
                    onSelect={signOut}
                  >
                    <LogOut className="h-5 w-5 text-main" />
                    <span>Sair</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden bg-card p-6">
          {/* Placeholder for content */}
          <div className="custom-scroll h-full overflow-scroll overflow-x-hidden rounded-lg bg-white p-4 shadow-md">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
