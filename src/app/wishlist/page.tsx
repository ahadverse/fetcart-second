'use client'

import { Heart, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import ProductGrid from '@/components/product/ProductGrid'

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-[#111111]">Wishlist</h1>
          <p className="text-sm text-[#999999] mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => items.forEach(p => addToCart(p))}
            className="flex items-center gap-2 bg-[#1B5DBE] text-white text-sm font-medium px-5 py-3 hover:bg-[#154aa0] transition-colors cursor-pointer"
          >
            <ShoppingBag size={16} />
            Add All to Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Heart size={56} className="text-[#E5E5E5]" />
          <p className="text-[#999999] text-sm">Your wishlist is empty</p>
          <p className="text-[#999999] text-xs max-w-xs">
            Save items you love by clicking the heart on any product.
          </p>
          <Link
            href="/"
            className="mt-2 text-sm font-medium text-[#1B5DBE] hover:underline cursor-pointer"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} cols={4} />
      )}
    </div>
  )
}
