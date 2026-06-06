'use client'

import { notFound } from 'next/navigation'
import { useState, use } from 'react'
import { getAllCategories, getProductsBySubcategory } from '@/data/seed'
import CollectionsHeader from '@/components/collections/CollectionsHeader'
import SortFilter from '@/components/collections/SortFilter'
import FilterPanel from '@/components/collections/FilterPanel'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/types'

interface CollectionsPageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export default function CollectionsPage({ params }: CollectionsPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = use(params)

  const categories = getAllCategories()
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) notFound()

  const subcategory = category.subcategories.find(s => s.slug === subcategorySlug)
  if (!subcategory) notFound()

  const allProducts = getProductsBySubcategory(subcategorySlug)
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="min-h-screen animate-fadeInUp">
      <CollectionsHeader
        categoryName={category.name}
        categorySlug={categorySlug}
        subcategoryName={subcategory.name}
        productCount={products.length}
      />
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <SortFilter
          products={allProducts}
          onSorted={setProducts}
          onFilterOpen={() => setFilterOpen(true)}
        />
        <div className="flex gap-8">
          {/* Single FilterPanel — shows as sidebar on desktop, drawer on mobile */}
          <FilterPanel
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            products={allProducts}
            onFiltered={setProducts}
          />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} cols={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
