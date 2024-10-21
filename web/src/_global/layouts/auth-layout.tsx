import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children?: ReactNode
}
export const AuthLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col items-center justify-center bg-sidebar md:flex">
        <img src="assets/logo.png" alt="Logo" className="h-64 w-64" />
      </div>
      <div className="flex flex-col items-center justify-center">
        {children || <Outlet />}
      </div>
    </div>
  )
}
