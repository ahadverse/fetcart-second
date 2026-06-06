import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-[#999999]">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-[#111111] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[#111111]">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
