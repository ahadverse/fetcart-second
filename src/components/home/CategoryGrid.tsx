import Image from 'next/image'
import Link from 'next/link'
import { getAllCategories } from '@/data/seed'

export default function CategoryGrid() {
  const categories = getAllCategories()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-[#999999] mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}/${cat.subcategories[0].slug}`}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white text-sm font-semibold tracking-wide">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
