const brands = [
  'Apple', 'Samsung', 'Sony', 'Nike', 'Lululemon',
  'Dyson', 'Bose', 'Canon', 'Patagonia', 'Garmin',
  'LG', 'Dell', 'Adidas', 'Osprey', 'Theragun',
]

export default function BrandsStrip() {
  return (
    <section className="border-y border-[#E5E5E5] bg-white py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#999999]">
          Trusted Brands
        </p>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap items-center">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-2xl font-black text-[#CCCCCC] hover:text-[#111111] transition-colors duration-300 shrink-0 cursor-default select-none tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
