import { getSaleProducts } from '@/data/seed'
import ProductGrid from '@/components/product/ProductGrid'
import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'

export default function OnSaleSection() {
  const products = getSaleProducts(8)

  if (products.length === 0) return null

  return (
    <section className="py-16 bg-[#FFF8F4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tag size={13} className="text-[#F97316]" />
              <p className="text-xs font-semibold tracking-widest uppercase text-[#F97316]">
                Limited Time Deals
              </p>
            </div>
            <h2 className="text-2xl font-light text-[#111111]">On Sale Now</h2>
          </div>
          <Link
            href="/electronics"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#F97316] hover:bg-[#EA6C0A] px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View All Deals <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={products} cols={4} />

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/electronics"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#F97316] hover:bg-[#EA6C0A] px-6 py-2.5 rounded-lg transition-all duration-200"
          >
            View All Deals <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
