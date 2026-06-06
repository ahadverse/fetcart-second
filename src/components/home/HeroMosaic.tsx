import Image from 'next/image'
import Link from 'next/link'

const panels = [
  {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80&auto=format&fit=crop',
    label: 'New Electronics',
    cta: 'Shop Now',
    href: '/electronics/mobile-tablets',
    position: 'bottom-left',
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80&auto=format&fit=crop',
    label: 'Summer Fashion',
    cta: 'Explore',
    href: '/fashion/womens-clothing',
    position: 'bottom-right',
  },
]

export default function HeroMosaic() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-[70vh] md:h-[85vh]">
      {panels.map((panel, i) => (
        <div key={i} className="relative overflow-hidden group">
          <Image
            src={panel.image}
            alt={panel.label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className={`absolute p-8 ${panel.position === 'bottom-left' ? 'bottom-0 left-0' : 'bottom-0 right-0 text-right'}`}>
            <p className="text-white text-2xl font-light tracking-wider mb-3">{panel.label}</p>
            <Link
              href={panel.href}
              className="inline-block bg-white text-[#111111] text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:bg-[#F97316] hover:text-white transition-colors duration-200"
            >
              {panel.cta}
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
