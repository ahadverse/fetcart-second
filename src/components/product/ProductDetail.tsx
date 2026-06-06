'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, Minus, Plus, ShoppingBag, Truck, RotateCcw, Heart, Shield, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useInView } from '@/hooks/useInView'
import ColorSwatch from '@/components/collections/ColorSwatch'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>('description')
  const [showLens, setShowLens] = useState(false)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const inWishlist = isInWishlist(product.id)

  const LENS = 260
  const ZOOM = 2.5

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setLensPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const { ref: galleryRef, inView: galleryInView } = useInView(0.1)
  const { ref: infoRef, inView: infoInView } = useInView(0.1)

  const images = product.images?.length ? product.images : [product.image]

  useEffect(() => {
    if (!selectedColor) return
    const colorImg = product.colorImages?.[selectedColor]
    if (colorImg) {
      const idx = images.indexOf(colorImg)
      setActiveImg(idx !== -1 ? idx : 0)
    } else {
      const colorIdx = product.colors?.indexOf(selectedColor) ?? -1
      setActiveImg(colorIdx > 0 && images[colorIdx] ? colorIdx : 0)
    }
  }, [selectedColor, product.colorImages, product.colors, images])

  function toggle(section: string) {
    setExpandedSection(v => v === section ? null : section)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* ── LEFT: Image gallery ─────────────────────────────────── */}
        <div
          ref={galleryRef}
          className={`flex gap-4 transition-all duration-700 ease-out ${galleryInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="hidden md:flex flex-col gap-2 shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-16 h-16 overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
                    activeImg === i ? 'border-[#111111] scale-105' : 'border-transparent hover:border-[#E5E5E5]'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1 space-y-3">
            <div
              ref={imgContainerRef}
              className="relative aspect-square overflow-hidden bg-[#F8F8F8] cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowLens(true)}
              onMouseLeave={() => setShowLens(false)}
            >
              <Image
                key={`${activeImg}-${images[activeImg]}`}
                src={images[activeImg]}
                alt={product.name}
                fill
                className="object-cover animate-fadeIn"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge type={product.badge} />
                </div>
              )}

              {/* Magnifier lens */}
              {showLens && (() => {
                const containerW = imgContainerRef.current?.offsetWidth ?? 500
                const innerSize = containerW * ZOOM
                const offsetX = -(lensPos.x * ZOOM - LENS / 2)
                const offsetY = -(lensPos.y * ZOOM - LENS / 2)
                return (
                  <div
                    className="absolute rounded-full border-2 border-white shadow-2xl pointer-events-none z-20 overflow-hidden"
                    style={{ width: LENS, height: LENS, left: lensPos.x - LENS / 2, top: lensPos.y - LENS / 2 }}
                  >
                    <div style={{ position: 'absolute', width: innerSize, height: innerSize, left: offsetX, top: offsetY }}>
                      <Image
                        src={images[activeImg]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="1200px"
                      />
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Mobile thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 md:hidden">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-16 overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImg === i ? 'border-[#111111]' : 'border-[#E5E5E5]'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Image counter dots */}
            {images.length > 1 && (
              <div className="flex justify-center gap-1.5 md:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      activeImg === i ? 'bg-[#111111] w-4' : 'bg-[#E5E5E5]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Product info ─────────────────────────────────── */}
        <div
          ref={infoRef}
          className={`lg:sticky lg:top-24 lg:self-start space-y-6 transition-all duration-700 ease-out delay-150 ${infoInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          {/* Brand + name */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1B5DBE] mb-1">{product.brand}</p>
            <h1 className="text-2xl lg:text-3xl font-light text-[#111111] leading-snug">{product.name}</h1>
          </div>

          {/* Rating + in-stock */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {product.inStock ? '✓ In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-1">
            <span className={`text-3xl font-semibold ${product.originalPrice ? 'text-[#F97316]' : 'text-[#111111]'}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-[#999999] line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-semibold bg-[#F97316] text-white px-2 py-0.5 rounded">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm text-[#555555] leading-relaxed border-b border-[#E5E5E5] pb-6">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#555555] mb-2.5">
                Color — <span className="normal-case font-normal text-[#111111]">{selectedColor}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map(color => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    size="md"
                    selected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#555555] mb-2.5">
                Size — <span className="normal-case font-normal text-[#111111]">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs border transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] text-[#555555] hover:border-[#111111] hover:text-[#111111]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#555555] mb-2.5">Quantity</p>
            <div className="inline-flex items-center border border-[#E5E5E5]">
              <button
                onClick={() => setQuantity(v => Math.max(1, v - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#555555] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(v => v + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#555555] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product, selectedColor)
              }}
              disabled={!product.inStock}
              className="w-full bg-[#1B5DBE] text-white text-sm font-semibold tracking-widest uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#154aa0] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:shadow-md"
            >
              <ShoppingBag size={16} />
              {product.inStock ? 'Add to Bag' : 'Out of Stock'}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full border text-sm font-medium py-4 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
                inWishlist
                  ? 'border-[#F97316] text-[#F97316] bg-orange-50 hover:bg-orange-100'
                  : 'border-[#E5E5E5] text-[#555555] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              <Heart size={16} className={inWishlist ? 'fill-[#F97316]' : ''} />
              {inWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
            </button>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E5E5E5]">
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
              { icon: Shield, label: 'Secure Pay', sub: 'SSL encrypted' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <Icon size={18} className="text-[#1B5DBE]" />
                <p className="text-[11px] font-semibold text-[#111111]">{label}</p>
                <p className="text-[10px] text-[#999999]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Accordion */}
          {[
            {
              key: 'description',
              label: 'Description',
              render: () => (
                <div className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">
                  {product.longDescription || product.description}
                </div>
              ),
            },
            {
              key: 'details',
              label: 'Details & Care',
              render: () => (
                product.tags && product.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-xs bg-[#F8F8F8] text-[#555555] border border-[#E5E5E5] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#555555]">See product description for full details.</p>
                )
              ),
            },
            {
              key: 'reviews',
              label: `Reviews (${product.reviewCount.toLocaleString()})`,
              render: () => (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#F8F8F8]">
                    <span className="text-4xl font-light text-[#111111]">{product.rating.toFixed(1)}</span>
                    <div>
                      <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                      <p className="text-xs text-[#999999] mt-1">Based on {product.reviewCount.toLocaleString()} reviews</p>
                    </div>
                  </div>
                  {[5, 4, 3].map(stars => {
                    const pct = stars === 5 ? 72 : stars === 4 ? 20 : 8
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} size={11} className="fill-[#F97316] text-[#F97316]" />
                          ))}
                        </div>
                        <div className="flex-1 h-1.5 bg-[#F8F8F8] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F97316] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-[#999999] w-8 text-right">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              ),
            },
            {
              key: 'shipping',
              label: 'Shipping & Returns',
              render: () => (
                <div className="text-sm text-[#555555] space-y-2 leading-relaxed">
                  <p>✓ Free standard shipping on orders over $50</p>
                  <p>✓ Standard delivery: 3–7 business days</p>
                  <p>✓ Express delivery: 1–2 business days (fees apply)</p>
                  <p>✓ Easy 30-day returns — no questions asked</p>
                  <p>✓ Free returns on all orders</p>
                </div>
              ),
            },
          ].map(({ key, label, render }) => (
            <div key={key} className="border-t border-[#E5E5E5]">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#111111] hover:text-[#1B5DBE] transition-colors cursor-pointer"
              >
                {label}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${expandedSection === key ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedSection === key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-5">{render()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
