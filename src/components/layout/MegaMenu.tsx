'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/types'

interface MegaMenuProps {
  category: Category
}

const categoryImages: Record<string, string> = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80&auto=format&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80&auto=format&fit=crop',
  'home-living': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&auto=format&fit=crop',
  'health-beauty': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format&fit=crop',
  'sports-outdoors': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80&auto=format&fit=crop',
}

export default function MegaMenu({ category }: MegaMenuProps) {
  const mid = Math.ceil(category.subcategories.length / 2)
  const col1 = category.subcategories.slice(0, mid)
  const col2 = category.subcategories.slice(mid)

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t border-[#E5E5E5] shadow-xl z-50 animate-fadeInDown">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-4 gap-8">
        {/* Col 1: first half of subcategories */}
        <div>
          <ul className="space-y-2.5">
            {col1.map(sub => (
              <li key={sub.slug}>
                <Link
                  href={`/${category.slug}/${sub.slug}`}
                  className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: second half of subcategories */}
        <div>
          <ul className="space-y-2.5">
            {col2.map(sub => (
              <li key={sub.slug}>
                <Link
                  href={`/${category.slug}/${sub.slug}`}
                  className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={`/${category.slug}`}
                className="text-sm font-medium text-[#1B5DBE] hover:underline cursor-pointer"
              >
                View All →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: quick links */}
        <div>
          <ul className="space-y-2.5">
            <li><Link href={`/${category.slug}/${category.subcategories[0].slug}`} className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer">New Arrivals</Link></li>
            <li><Link href={`/${category.slug}/${category.subcategories[0].slug}`} className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer">Best Sellers</Link></li>
            <li><Link href={`/${category.slug}/${category.subcategories[0].slug}`} className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer">On Sale</Link></li>
            <li><Link href={`/${category.slug}/${category.subcategories[0].slug}`} className="text-sm text-[#555555] hover:text-[#1B5DBE] transition-colors cursor-pointer">Gift Ideas</Link></li>
          </ul>
        </div>

        {/* Col 4: category image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={categoryImages[category.slug] || category.image}
            alt={category.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  )
}
