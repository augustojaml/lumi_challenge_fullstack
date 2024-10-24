import { LucideIcon } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface SignInInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  placeholder: string
  type?: string
  label?: string
  error?: string
}

export const Input = ({ icon: Icon, label, error, ...rest }: SignInInputProps) => (
  <div className="flex flex-col">
    {label && <label className="text-xs mb-1 font-semibold text-main">{label}</label>}
    <div className="group flex w-full items-center rounded-lg border bg-input px-2 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-main">
      <input
        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none"
        {...rest}
      />
      {Icon && (
        <Icon
          className="mr-2 text-gray-400 group-focus-within:text-main"
          size={20}
        />
      )}
    </div>
    <div className="h-6">
      {error && <span className="text-[12px] text-red-500">{error}</span>}
    </div>
  </div>
)
