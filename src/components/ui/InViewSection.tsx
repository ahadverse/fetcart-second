'use client'

import { useInView } from '@/hooks/useInView'

interface InViewSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function InViewSection({ children, className = '', delay = 0 }: InViewSectionProps) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
