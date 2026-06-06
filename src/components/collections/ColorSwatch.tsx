import clsx from 'clsx'

interface ColorSwatchProps {
  color: string
  selected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

export default function ColorSwatch({ color, selected, onClick, size = 'sm' }: ColorSwatchProps) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-full border-2 transition-all cursor-pointer',
        dim,
        selected ? 'border-[#111111] scale-110' : 'border-transparent hover:border-[#999999]'
      )}
      style={{ backgroundColor: color }}
      title={color}
    />
  )
}
