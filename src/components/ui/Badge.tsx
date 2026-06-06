import clsx from 'clsx'

interface BadgeProps {
  type: 'New' | 'Sale' | 'Featured'
}

const styles = {
  New: 'bg-[#1B5DBE] text-white',
  Sale: 'bg-[#F97316] text-white',
  Featured: 'bg-[#111111] text-white',
}

export default function Badge({ type }: BadgeProps) {
  return (
    <span className={clsx('text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5', styles[type])}>
      {type}
    </span>
  )
}
