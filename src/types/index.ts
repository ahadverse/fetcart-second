export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  longDescription?: string
  image: string
  images?: string[]
  colorImages?: Record<string, string>
  category: string
  subcategory: string
  colors?: string[]
  sizes?: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  badge?: 'New' | 'Sale' | 'Featured'
  tags?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface Subcategory {
  name: string
  slug: string
}

export interface Category {
  name: string
  slug: string
  image: string
  subcategories: Subcategory[]
}
