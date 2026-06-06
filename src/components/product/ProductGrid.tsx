import { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  cols?: 2 | 3 | 4
}

const colClass = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

export default function ProductGrid({ products, cols = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[#999999]">No products found.</p>
      </div>
    )
  }
  return (
    <div className={`grid ${colClass[cols]} gap-x-4 gap-y-10`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
