import Image from 'next/image'
import {
  Droplet,
  Zap,
  Wind,
  Shield,
  Leaf,
  Layers,
} from 'lucide-react'

const benefits = [
  {
    icon: Droplet,
    title: 'Water-Resistant',
    description: 'Superior protection against moisture and weathering',
  },
  {
    icon: Zap,
    title: 'Energy Efficiency',
    description: 'Reduces HVAC reliance and lowers energy costs significantly',
  },
  {
    icon: Wind,
    title: 'Wind Resistance',
    description: 'Robust performance against extreme weather conditions',
  },
  {
    icon: Shield,
    title: 'Durability',
    description: 'Resistant to extreme temperatures, fire, and insects',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable choice with minimal environmental impact',
  },
  {
    icon: Layers,
    title: 'Zero Maintenance',
    description: 'Long-lasting beauty without ongoing upkeep',
  },
]

export default function WhyStone() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[600px] bg-gradient-to-tl from-yellow-500/10 via-transparent to-transparent blur-3xl -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-space-grotesk">
            Why Choose <span className="gradient-text">Stone Cladding</span>?
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Stone cladding offers unmatched performance benefits that extend far beyond aesthetics. Transform your building into an energy-efficient, durable structure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] group">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project-building-1.png-EO3SIth9pBZ33WMLgB0y2qZe5t98VW.png"
              alt="Stone cladding technical details"
              fill
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 glass rounded-xl border border-white/10" />
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6 sm:space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="glass p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1 sm:mb-2">30-40%</p>
                <p className="text-xs sm:text-sm text-gray-400">Energy cost reduction potential</p>
              </div>
              <div className="glass p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1 sm:mb-2">50+</p>
                <p className="text-xs sm:text-sm text-gray-400">Years lifespan with minimal maintenance</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 sm:space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 glass-sm rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 p-1.5 sm:p-2 bg-gradient-to-br from-orange-500/20 to-orange-400/10 rounded-lg h-fit border border-orange-500/20">
                      <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-0.5 sm:mb-1 font-space-grotesk text-sm sm:text-base">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Text */}
            <div className="pt-3 sm:pt-4 border-t border-white/10 glass-sm p-3 sm:p-4 rounded-lg">
              <p className="text-gray-300 italic text-xs sm:text-sm leading-relaxed">
                "Stone cladding is not just an aesthetic choice—it&apos;s a smart investment in your building&apos;s future performance and sustainability."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
