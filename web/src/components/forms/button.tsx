import { Loading } from '@components/loading'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isLoading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

export const Button = ({
  label,
  isLoading,
  icon,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`mt-6 flex items-center justify-center space-x-2 rounded-lg bg-main p-2 px-4 text-white transition duration-300 hover:bg-mainDark focus:outline-none focus:ring-2 focus:ring-infoLight disabled:cursor-not-allowed disabled:bg-mainDark ${fullWidth ? 'w-full' : 'w-auto'}`}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {icon && <span className="h-5 w-5">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
