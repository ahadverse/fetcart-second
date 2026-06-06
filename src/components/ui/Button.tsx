import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wide',
        {
          'primary': 'bg-[#1B5DBE] text-white hover:bg-[#154aa0] active:scale-[0.98]',
          'secondary': 'border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white',
          'ghost': 'text-[#555555] hover:text-[#111111] hover:bg-[#F8F8F8]',
          'accent': 'bg-[#F97316] text-white hover:bg-[#ea6a0a] active:scale-[0.98]',
        }[variant],
        {
          'sm': 'text-xs px-4 py-2',
          'md': 'text-sm px-6 py-3',
          'lg': 'text-sm px-8 py-4',
        }[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
