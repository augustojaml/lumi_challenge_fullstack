import { useAuthStore } from '@global/useStores/useAuth'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const SecurityRouter = ({ children }: { children: ReactNode }) => {
  const { sessions } = useAuthStore((store) => store)
  const location = useLocation();

  if (!sessions) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children
}
