'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { products } from '@/data/seed'
import { Product } from '@/types'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    try {
      const re = new RegExp(query.trim(), 'gi')
      const matched = products.filter(p =>
        re.test(p.name) || re.test(p.brand) || re.test(p.category) ||
        re.test(p.subcategory) || p.tags?.some(t => re.test(t))
      ).slice(0, 8)
      setResults(matched)
    } catch {
      // invalid regex — fall back to plain substring match
      const q = query.toLowerCase()
      setResults(
        products.filter(p =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
        ).slice(0, 8)
      )
    }
  }, [query])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Enter' && results.length > 0) {
      router.push(`/products/${results[0].slug}`)
      onClose()
    }
  }

  function handleSelect(slug: string) {
    router.push(`/products/${slug}`)
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-2xl bg-white shadow-2xl animate-fadeInDown"
        style={{ animation: 'fadeInDown 0.2s ease-out' }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E5E5]">
          <Search size={20} className="text-[#999999] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, brands, categories…"
            className="flex-1 text-base text-[#111111] placeholder-[#999999] outline-none bg-transparent"
          />
          <button onClick={onClose} className="text-[#999999] hover:text-[#111111] transition-colors cursor-pointer shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-[#F8F8F8]">
            {results.map(product => (
              <li key={product.id}>
                <button
                  onClick={() => handleSelect(product.slug)}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[#F8F8F8] transition-colors cursor-pointer text-left"
                >
                  <div className="relative w-12 h-12 shrink-0 bg-[#F8F8F8] overflow-hidden rounded">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111111] truncate">{product.name}</p>
                    <p className="text-xs text-[#999999]">{product.brand} · {product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#111111] shrink-0">${product.price.toFixed(2)}</p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-5 py-6 text-sm text-[#999999] text-center">
            No products found for &ldquo;{query}&rdquo;
          </div>
        )}

        {!query && (
          <div className="px-5 py-4 text-xs text-[#999999]">
            Start typing to search across 125+ products
          </div>
        )}
      </div>
    </div>
  )
}
