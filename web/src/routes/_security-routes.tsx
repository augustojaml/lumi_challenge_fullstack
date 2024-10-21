import { useAuthStore } from '@global/useStores/useAuth'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export const SecurityRouter = ({ children }: { children: ReactNode }) => {
  const { sessions } = useAuthStore((store) => store)

  if (!sessions) {
    return <Navigate to="/signin" />
  }

  return children
}
