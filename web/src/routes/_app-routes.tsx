import { AuthLayout } from '@global/layouts/auth-layout'
import { NotFound } from '@pages/not-found'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '../_global/layouts/main-layout'
import { LoadingPage } from '../pages/loading'
import { SecurityRouter } from './_security-routes'

const DashboardPage = lazy(async () => import('@pages/dashboard'))
const ManageInvoicesPage = lazy(async () => import('@pages/manager-invoices'))
const ClientsPage = lazy(async () => import('@pages/clients'))
const SignInPage = lazy(async () => import('@pages/auth/signin'))

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      errorElement: <NotFound />,
      path: '/',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingPage />}>
            <SecurityRouter>
              <DashboardPage />
            </SecurityRouter>
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: '/manager',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingPage />}>
            <SecurityRouter>
              <ManageInvoicesPage />
            </SecurityRouter>
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: '/clients',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingPage />}>
            <SecurityRouter>
              <ClientsPage />
            </SecurityRouter>
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: '/signin',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        </Suspense>
      ),
    },
  ])
