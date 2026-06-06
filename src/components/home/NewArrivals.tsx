import { getNewArrivals } from '@/data/seed'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NewArrivals() {
  const products = getNewArrivals(6)

  return (
    <section className="py-16 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#999999] mb-1">Fresh in store</p>
            <h2 className="text-2xl font-light text-[#111111]">New Arrivals</h2>
          </div>
          <Link href="/fashion" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#111111] border border-[#E5E5E5] hover:border-[#111111] bg-white hover:bg-[#111111] hover:text-white px-4 py-2 rounded-lg transition-all duration-200">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {products.map(product => (
            <div key={product.id} className="w-56 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
