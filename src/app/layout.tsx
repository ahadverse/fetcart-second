import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'FetKart — Shop Everything',
    template: '%s | FetKart',
  },
  description: 'FetKart offers the best deals on Electronics, Fashion, Home & Living, Health & Beauty, and Sports & Outdoors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-[#111111]">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
