import { useAuthStore } from '@global/useStores/useAuth'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from './_app-routes'

export const AppRoutes = () => {
  const { getSessions } = useAuthStore((store) => store)

  useEffect(() => {
    getSessions()
  }, [getSessions])

  return <RouterProvider router={router} />
}
