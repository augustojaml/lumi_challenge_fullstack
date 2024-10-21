import { MainLayout } from '@global/layouts/main-layout'

export const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <strong className="text-3xl text-textSecondary">Page Not found</strong>
        <span className="text-xl text-textPrimary">404</span>
      </div>
    </MainLayout>
  )
}
