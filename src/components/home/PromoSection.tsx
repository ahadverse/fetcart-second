import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promos = [
  {
    title: "Up to 40% Off",
    subtitle: "Electronics Sale",
    desc: "Phones, laptops, cameras & more at the lowest prices of the season.",
    cta: "Shop Electronics",
    href: "/electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80&auto=format&fit=crop",
    accent: "#1B5DBE",
    tag: "Limited Time",
  },
  {
    title: "New Season",
    subtitle: "Fashion Arrivals",
    desc: "Discover the latest trends in men's, women's and kids' fashion.",
    cta: "Explore Fashion",
    href: "/fashion",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&auto=format&fit=crop",
    accent: "#F97316",
    tag: "Just In",
  },
];

export default function PromoSection() {
  return (
    <section className='max-w-7xl mx-auto px-6 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {promos.map((promo) => (
          <div
            key={promo.href}
            className='relative overflow-hidden  group h-72'
          >
            <Image
              src={promo.image}
              alt={promo.subtitle}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent' />
            <div className='absolute inset-0 p-8 flex flex-col justify-between'>
              <span
                className='self-start text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white'
                style={{ background: promo.accent }}
              >
                {promo.tag}
              </span>
              <div>
                <p className='text-white/70 text-sm mb-1'>{promo.subtitle}</p>
                <h3 className='text-white text-3xl font-bold mb-2'>
                  {promo.title}
                </h3>
                <p className='text-white/60 text-xs mb-5 max-w-xs'>
                  {promo.desc}
                </p>
                <Link
                  href={promo.href}
                  className='inline-flex items-center gap-2 text-white text-sm font-semibold border border-white/40 hover:border-white bg-white/10 hover:bg-white hover:text-[#111111] px-5 py-2.5 rounded-lg transition-all duration-200'
                >
                  {promo.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
