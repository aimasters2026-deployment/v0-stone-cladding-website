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
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Why Choose Stone Cladding?
          </h2>
          <p className="text-lg text-muted-foreground">
            Stone cladding offers unmatched performance benefits that extend far beyond aesthetics. Transform your building into an energy-efficient, durable structure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 sm:h-[500px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project-building-1.png-EO3SIth9pBZ33WMLgB0y2qZe5t98VW.png"
              alt="Stone cladding technical details"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Benefits Grid */}
          <div className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-3xl font-bold text-accent mb-2">30-40%</p>
                <p className="text-sm text-muted-foreground">Energy cost reduction potential</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-3xl font-bold text-accent mb-2">50+</p>
                <p className="text-sm text-muted-foreground">Years lifespan with minimal maintenance</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 p-2 bg-accent/10 rounded-lg h-fit">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Text */}
            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground italic">
                "Stone cladding is not just an aesthetic choice—it&apos;s a smart investment in your building&apos;s future performance and sustainability."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
