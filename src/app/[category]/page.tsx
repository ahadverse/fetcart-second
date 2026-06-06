'use client'

import { notFound } from 'next/navigation'
import { useState, use } from 'react'
import { getAllCategories, getProductsByCategory } from '@/data/seed'
import SortFilter from '@/components/collections/SortFilter'
import FilterPanel from '@/components/collections/FilterPanel'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/types'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params)

  const categories = getAllCategories()
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) notFound()

  const allProducts = getProductsByCategory(categorySlug)
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="min-h-screen animate-fadeInUp">
      {/* Header */}
      <div className="border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav className="text-xs text-[#999999] mb-2 flex items-center gap-1">
            <Link href="/" className="hover:text-[#1B5DBE] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#111111]">{category.name}</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#111111]">{category.name}</h1>
            <span className="text-sm text-[#999999]">{products.length} products</span>
          </div>
          {/* Subcategory pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {category.subcategories.map(sub => (
              <Link
                key={sub.slug}
                href={`/${categorySlug}/${sub.slug}`}
                className="text-xs px-3 py-1.5 rounded-full border border-[#E5E5E5] text-[#555555] hover:border-[#1B5DBE] hover:text-[#1B5DBE] transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <SortFilter
          products={allProducts}
          onSorted={setProducts}
          onFilterOpen={() => setFilterOpen(true)}
        />
        <div className="flex gap-8">
          <FilterPanel
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            products={allProducts}
            onFiltered={setProducts}
          />
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} cols={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
