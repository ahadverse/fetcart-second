'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product, CartItem } from '@/types'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, color?: string) => void
  removeFromCart: (productId: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, color?: string) => void
  clearCart: () => void
  isInCart: (productId: string, color?: string) => boolean
  itemCount: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'fetcart_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product: Product, color?: string) {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedColor === color
      )
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, quantity: 1, selectedColor: color }]
    })
    setIsOpen(true)
  }

  function removeFromCart(productId: string, color?: string) {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.selectedColor === color)))
  }

  function updateQuantity(productId: string, quantity: number, color?: string) {
    if (quantity <= 0) {
      removeFromCart(productId, color)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.selectedColor === color
          ? { ...i, quantity }
          : i
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  function isInCart(productId: string, color?: string) {
    return items.some(i =>
      i.product.id === productId && (color === undefined || i.selectedColor === color)
    )
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity,
      clearCart, isInCart, itemCount, total,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
