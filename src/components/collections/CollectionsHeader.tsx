import Breadcrumb from '@/components/ui/Breadcrumb'

interface CollectionsHeaderProps {
  categoryName: string
  categorySlug: string
  subcategoryName: string
  productCount: number
}

export default function CollectionsHeader({
  categoryName, categorySlug, subcategoryName, productCount
}: CollectionsHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: categoryName, href: `/${categorySlug}` },
        { label: subcategoryName },
      ]} />
      <div className="flex items-end justify-between mt-4">
        <h1 className="text-2xl font-light text-[#111111]">{subcategoryName}</h1>
        <p className="text-sm text-[#999999]">{productCount} products</p>
      </div>
    </div>
  )
}
