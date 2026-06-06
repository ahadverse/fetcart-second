import HeroMosaic from '@/components/home/HeroMosaic'
import CategoryGrid from '@/components/home/CategoryGrid'
import NewArrivals from '@/components/home/NewArrivals'
import BenefitsStrip from '@/components/home/BenefitsStrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewsletterCTA from '@/components/home/NewsletterCTA'
import PromoSection from '@/components/home/PromoSection'
import BrandsStrip from '@/components/home/BrandsStrip'
import OnSaleSection from '@/components/home/OnSaleSection'

export default function HomePage() {
  return (
    <>
      <div className="animate-fadeInUp"><HeroMosaic /></div>
      <div className="animate-fadeInUp delay-100"><BenefitsStrip /></div>
      <div className="animate-fadeInUp delay-200"><CategoryGrid /></div>
      <div className="animate-fadeInUp delay-200"><NewArrivals /></div>
      <div className="animate-fadeInUp delay-300"><PromoSection /></div>
      <div className="animate-fadeInUp delay-300"><FeaturedProducts /></div>
      <div className="animate-fadeInUp delay-300"><BrandsStrip /></div>
      <div className="animate-fadeInUp delay-400"><OnSaleSection /></div>
      <div className="animate-fadeInUp delay-400"><NewsletterCTA /></div>
    </>
  )
}
