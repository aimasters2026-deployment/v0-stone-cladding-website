import Image from 'next/image'

export default function Overview() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Simplifying Wall Cladding
          </h2>
          <p className="text-lg text-muted-foreground">
            At Octo 21st Stone Technology, we combine expertise with premium materials to deliver exceptional stone wall cladding solutions that enhance building performance and aesthetics.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 sm:h-[500px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern_building_rainscreen.jpg%20-%20Copy-cZoiVF0UwkzNB3iqa4HjWcLI3XYpE2.png"
              alt="Modern building installation"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Our Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                With partnerships in Turkey and working with international partners like Neksan, we provide world-class stone cladding solutions tailored to your architectural vision and building requirements.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-2">Complete Service Offering</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Professional consulting and facade design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Premium Turkish stone and marble materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Expert installation and quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Maintenance and repair services</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">In Partnership with Neksan</span> - Providing access to premium Turkish stone materials and international standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
