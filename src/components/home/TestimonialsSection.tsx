import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely love FetKart. The quality of products is outstanding and delivery was faster than expected. My go-to for everything.',
    product: 'Apple iPhone 15 Pro',
    avatar: 'SM',
    color: '#1B5DBE',
  },
  {
    name: 'James R.',
    location: 'London, UK',
    rating: 5,
    text: 'Best online shopping experience I have had. The filter system is incredibly easy to use and the product descriptions are detailed and accurate.',
    product: 'Sony WH-1000XM5',
    avatar: 'JR',
    color: '#F97316',
  },
  {
    name: 'Priya K.',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'Ordered three items and all arrived perfectly packaged. The return process for one item was seamless. Genuinely impressed.',
    product: 'Lululemon ABC Pant',
    avatar: 'PK',
    color: '#2e7d32',
  },
  {
    name: 'David L.',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'The product selection is incredible. Found things here I could not find anywhere else. Customer service responded within minutes.',
    product: 'Osprey Atmos AG 65',
    avatar: 'DL',
    color: '#7b1fa2',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#999999] mb-2">What customers say</p>
          <h2 className="text-2xl font-light text-[#111111]">Loved by thousands</h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-[#F97316] text-[#F97316]" />
            ))}
            <span className="text-sm text-[#555555] ml-2">4.9 out of 5 · 12,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5] hover:shadow-md transition-shadow duration-300 flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-[#F97316] text-[#F97316]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#555555] leading-relaxed flex-1 mb-5">
                "{t.text}"
              </p>

              {/* Product badge */}
              <span className="self-start text-[10px] font-medium text-[#999999] bg-[#F8F8F8] border border-[#E5E5E5] px-2.5 py-1 rounded-full mb-4">
                Verified: {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                  <p className="text-xs text-[#999999]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
