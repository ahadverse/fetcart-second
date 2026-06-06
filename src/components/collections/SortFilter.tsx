'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Product } from '@/types'

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

interface SortFilterProps {
  products: Product[]
  onSorted: (sorted: Product[]) => void
  onFilterOpen?: () => void
}

export default function SortFilter({ products, onSorted, onFilterOpen }: SortFilterProps) {
  const [sortKey, setSortKey] = useState<SortKey>('default')

  function handleSort(key: SortKey) {
    setSortKey(key)
    const sorted = [...products]
    if (key === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (key === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (key === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    else if (key === 'newest') sorted.sort((a, b) => (a.badge === 'New' ? -1 : 1))
    else onSorted(products)
    if (key !== 'default') onSorted(sorted)
  }

  return (
    <div className="flex items-center justify-between lg:justify-end py-4 border-b border-[#E5E5E5] mb-8">
      <button
        onClick={onFilterOpen}
        className="flex items-center gap-2 text-sm text-[#555555] hover:text-[#111111] hover:border-[#111111] transition-colors border border-[#E5E5E5] px-4 py-2 cursor-pointer lg:hidden"
      >
        <SlidersHorizontal size={14} />
        Filter
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#999999]">Sort:</span>
        <select
          value={sortKey}
          onChange={e => handleSort(e.target.value as SortKey)}
          className="text-sm text-[#111111] border-0 bg-transparent focus:outline-none cursor-pointer"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>
    </div>
  )
}
