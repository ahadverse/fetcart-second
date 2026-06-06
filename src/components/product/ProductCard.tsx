'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import ColorSwatch from '@/components/collections/ColorSwatch'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const inCart = isInCart(product.id)
  const inWishlist = isInWishlist(product.id)

  const colorIndex = product.colors?.indexOf(selectedColor ?? '') ?? -1
  const colorImage = selectedColor ? product.colorImages?.[selectedColor] : undefined
  const hoverImage = product.images?.[1]
  const primaryImage = colorImage ?? (colorIndex > 0 && product.images?.[colorIndex] ? product.images[colorIndex] : product.image)

  return (
    <div
      className="group relative animate-fadeInUp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#F8F8F8] cursor-pointer">
        {/* Primary image — key on wrapper div forces full remount → animate-fadeIn fires */}
        <div key={selectedColor ?? 'default'} className="absolute inset-0 animate-fadeIn">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        {/* Hover image — fades in on top when mouse enters */}
        {hoverImage && hoverImage !== primaryImage && (
          <Image
            src={hoverImage}
            alt={product.name}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge type={product.badge} />
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(product) }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={inWishlist ? 'fill-[#F97316] text-[#F97316]' : 'text-[#111111] fill-white/80'}
          />
        </button>

        {/* Hover name overlay */}
        {hovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2">
            <p className="text-xs font-medium text-[#111111] truncate">{product.name}</p>
          </div>
        )}

        {/* Quick add */}
        <button
          onClick={e => { e.preventDefault(); addToCart(product, selectedColor) }}
          className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 bg-[#111111] text-white flex items-center justify-center hover:bg-[#1B5DBE] transition-colors cursor-pointer"
          aria-label="Quick add"
        >
          <Plus size={16} />
        </button>
      </Link>

      {/* Info */}
      <div className="pt-3 space-y-1.5">
        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map(color => (
              <ColorSwatch
                key={color}
                color={color}
                size="sm"
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#999999]">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <div>
          <p className="text-[11px] text-[#999999]">{product.brand}</p>
          <Link href={`/products/${product.slug}`} className="text-sm text-[#111111] hover:text-[#1B5DBE] transition-colors line-clamp-1">
            {product.name}
          </Link>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-xs text-[#999999] line-through">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className={`text-sm font-semibold ${product.originalPrice ? 'text-[#F97316]' : 'text-[#111111]'}`}>
            ${product.price.toFixed(2)}
          </span>
          {inCart && <span className="text-[10px] text-[#2e7d32] font-medium">In Cart</span>}
        </div>
      </div>
    </div>
  )
}
