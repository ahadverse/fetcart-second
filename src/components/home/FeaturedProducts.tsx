import { getFeaturedProducts } from '@/data/seed'
import ProductGrid from '@/components/product/ProductGrid'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const products = getFeaturedProducts(12)

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#999999] mb-1">Handpicked for you</p>
          <h2 className="text-2xl font-light text-[#111111]">Featured Products</h2>
        </div>
        <Link href="/electronics" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#111111] border border-[#E5E5E5] hover:border-[#111111] bg-white hover:bg-[#111111] hover:text-white px-4 py-2 rounded-lg transition-all duration-200">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <ProductGrid products={products} cols={4} />
    </section>
  )
}
