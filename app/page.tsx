import Header from '@/components/header'
import Hero from '@/components/sections/hero'
import Overview from '@/components/sections/overview'
import Services from '@/components/sections/services'
import WhyStone from '@/components/sections/why-stone'
import Portfolio from '@/components/sections/portfolio'
import Testimonials from '@/components/sections/testimonials'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Overview />
      <Services />
      <WhyStone />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
