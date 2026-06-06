import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllCategories } from '@/data/seed'
import ProductDetail from '@/components/product/ProductDetail'
import ProductGrid from '@/components/product/ProductGrid'
import Breadcrumb from '@/components/ui/Breadcrumb'
import InViewSection from '@/components/ui/InViewSection'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return { title: product.name, description: product.description }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product, 4)
  const categories = getAllCategories()
  const category = categories.find(c => c.slug === product.category)
  const subcategory = category?.subcategories.find(s => s.slug === product.subcategory)

  return (
    <div className="animate-fadeInUp">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Breadcrumb crumbs={[
          { label: 'Home', href: '/' },
          { label: category?.name || product.category, href: `/${product.category}/${product.subcategory}` },
          { label: subcategory?.name || product.subcategory, href: `/${product.category}/${product.subcategory}` },
          { label: product.name },
        ]} />
      </div>

      <ProductDetail product={product} />

      {/* Related products */}
      {related.length > 0 && (
        <InViewSection className="border-t border-[#E5E5E5]">
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-xl font-light text-[#111111] mb-10 tracking-wide">You Might Also Like</h2>
            <ProductGrid products={related} cols={4} />
          </section>
        </InViewSection>
      )}
    </div>
  )
}
