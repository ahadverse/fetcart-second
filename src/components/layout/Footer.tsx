import Link from "next/link";
import Image from "next/image";

const links = {
  Shop: [
    { label: "Electronics", href: "/electronics" },
    { label: "Fashion", href: "/fashion" },
    { label: "Home & Living", href: "/home-living" },
    { label: "Health & Beauty", href: "/health-beauty" },
    { label: "Sports & Outdoors", href: "/sports-outdoors" },
  ],
  Help: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  Company: [
    { label: "About FetKart", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Sustainability", href: "/sustainability" },
  ],
};

export default function Footer() {
  return (
    <footer className='bg-[#111111] text-white mt-24'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Brand */}
          <div className='col-span-2 lg:col-span-2'>
            <div className='mb-6'>
              <Image
                src='/logo.png'
                alt='FetKart'
                width={144}
                height={40}
                className='object-contain'
              />
            </div>
            <p className='text-sm text-[#999999] max-w-xs leading-relaxed'>
              Quality products across every category. Shipped fast, returned
              easy.
            </p>
            <div className='mt-6'>
              <p className='text-xs text-[#999999] mb-2'>Subscribe for deals</p>
              <form className='flex'>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className='flex-1 bg-[#222222] text-sm text-white placeholder-[#555555] px-4 py-2.5 border border-[#333333] focus:outline-none focus:border-[#1B5DBE]'
                />
                <button
                  type='submit'
                  className='bg-[#1B5DBE] text-white text-sm px-4 py-2.5 hover:bg-[#154aa0] transition-colors'
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className='text-[10px] font-semibold tracking-widest uppercase text-[#999999] mb-4'>
                {title}
              </p>
              <ul className='space-y-2.5'>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className='text-sm text-[#999999] hover:text-white transition-colors'
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-[#555555]'>
            © {new Date().getFullYear()} FetKart. All rights reserved.
          </p>
          <div className='flex gap-4 text-xs text-[#555555]'>
            <Link
              href='/refund-policy'
              className='hover:text-white transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms-and-conditions'
              className='hover:text-white transition-colors'
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
