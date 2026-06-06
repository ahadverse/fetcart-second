'use client'

import { useState, useEffect } from 'react'
import { X, ChevronDown, Star } from 'lucide-react'
import { Product } from '@/types'
import ColorSwatch from './ColorSwatch'

interface FilterState {
  minPrice: number
  maxPrice: number
  colors: string[]
  brands: string[]
  minRating: number
  inStockOnly: boolean
}

interface FilterPanelProps {
  open: boolean
  onClose: () => void
  products: Product[]
  onFiltered: (filtered: Product[]) => void
}

const DEFAULT_FILTERS: FilterState = {
  minPrice: 0,
  maxPrice: Infinity,
  colors: [],
  brands: [],
  minRating: 0,
  inStockOnly: false,
}

function getUnique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

export default function FilterPanel({ open, onClose, products, onFiltered }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    price: true, color: true, brand: true, rating: false, stock: false,
  })

  const allColors = getUnique(products.flatMap(p => p.colors ?? []))
  const allBrands = getUnique(products.map(p => p.brand)).sort()
  const maxProductPrice = Math.ceil(Math.max(...products.map(p => p.price), 0))

  useEffect(() => {
    applyFilters(filters)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  function applyFilters(f: FilterState) {
    const result = products.filter(p => {
      if (p.price < f.minPrice) return false
      if (f.maxPrice !== Infinity && p.price > f.maxPrice) return false
      if (f.colors.length > 0 && !p.colors?.some(c => f.colors.includes(c))) return false
      if (f.brands.length > 0 && !f.brands.includes(p.brand)) return false
      if (p.rating < f.minRating) return false
      if (f.inStockOnly && !p.inStock) return false
      return true
    })
    onFiltered(result)
  }

  function toggleColor(color: string) {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }))
  }

  function toggleBrand(brand: string) {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand],
    }))
  }

  function clearAll() {
    setFilters(DEFAULT_FILTERS)
    onFiltered(products)
  }

  function toggleSection(key: string) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const activeCount = (filters.colors.length > 0 ? 1 : 0)
    + (filters.brands.length > 0 ? 1 : 0)
    + (filters.minRating > 0 ? 1 : 0)
    + (filters.inStockOnly ? 1 : 0)
    + (filters.minPrice > 0 || filters.maxPrice !== Infinity ? 1 : 0)

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:static lg:h-auto lg:w-64 lg:shadow-none lg:translate-x-0 lg:z-auto lg:flex lg:flex-col
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5] lg:border-0 lg:pb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#111111]">Filters</h3>
            {activeCount > 0 && (
              <span className="text-[10px] bg-[#1B5DBE] text-white rounded-full px-1.5 py-0.5 font-medium">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-[#F97316] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button onClick={onClose} className="lg:hidden text-[#999999] hover:text-[#111111] cursor-pointer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable filter sections */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">

          {/* Price */}
          <FilterSection title="Price Range" expanded={expanded.price} onToggle={() => toggleSection('price')}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-[#999999] mb-1 block">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={filters.maxPrice === Infinity ? maxProductPrice : filters.maxPrice}
                    value={filters.minPrice}
                    onChange={e => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) || 0 }))}
                    className="w-full border border-[#E5E5E5] px-2 py-1.5 text-sm text-[#111111] focus:outline-none focus:border-[#1B5DBE]"
                  />
                </div>
                <span className="text-[#999999] pt-5">–</span>
                <div className="flex-1">
                  <label className="text-[10px] text-[#999999] mb-1 block">Max</label>
                  <input
                    type="number"
                    min={filters.minPrice}
                    value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
                    placeholder={`${maxProductPrice}`}
                    onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : Infinity }))}
                    className="w-full border border-[#E5E5E5] px-2 py-1.5 text-sm text-[#111111] focus:outline-none focus:border-[#1B5DBE]"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Colors */}
          {allColors.length > 0 && (
            <FilterSection title="Color" expanded={expanded.color} onToggle={() => toggleSection('color')}>
              <div className="flex flex-wrap gap-2">
                {allColors.map(color => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    size="md"
                    selected={filters.colors.includes(color)}
                    onClick={() => toggleColor(color)}
                  />
                ))}
              </div>
            </FilterSection>
          )}

          {/* Brands */}
          <FilterSection title="Brand" expanded={expanded.brand} onToggle={() => toggleSection('brand')}>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 border-[#E5E5E5] text-[#1B5DBE] cursor-pointer"
                  />
                  <span className="text-sm text-[#555555] group-hover:text-[#111111] transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Min Rating" expanded={expanded.rating} onToggle={() => toggleSection('rating')}>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(stars => (
                <label key={stars} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="minRating"
                    checked={filters.minRating === stars}
                    onChange={() => setFilters(prev => ({ ...prev, minRating: stars }))}
                    className="cursor-pointer"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} size={12} className="fill-[#F97316] text-[#F97316]" />
                    ))}
                    <span className="text-xs text-[#555555]">& up</span>
                  </div>
                </label>
              ))}
              {filters.minRating > 0 && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                  className="text-xs text-[#999999] hover:text-[#111111] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </FilterSection>

          {/* In stock */}
          <FilterSection title="Availability" expanded={expanded.stock} onToggle={() => toggleSection('stock')}>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={e => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-[#555555]">In Stock only</span>
            </label>
          </FilterSection>
        </div>
      </aside>
    </>
  )
}

function FilterSection({
  title, expanded, onToggle, children,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-[#E5E5E5] pb-4 pt-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-3 cursor-pointer"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-[#555555]">{title}</span>
        <ChevronDown
          size={14}
          className={`text-[#999999] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  )
}
