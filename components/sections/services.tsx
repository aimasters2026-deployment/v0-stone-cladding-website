import {
  BarChart3,
  Hammer,
  Truck,
  Lightbulb,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

const services = [
  {
    icon: Lightbulb,
    title: 'Design & Consulting',
    description: 'Expert facade design considering aesthetics, thermal performance, and wind resistance for optimal building performance.',
  },
  {
    icon: Truck,
    title: 'Supply',
    description: 'Premium Turkish stone and marble materials sourced from our trusted international partners for superior quality.',
  },
  {
    icon: Hammer,
    title: 'Installation',
    description: 'Professional installation using proven fastening systems and techniques to ensure durability and performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Rigorous quality control at every stage to guarantee your facade meets the highest standards and specifications.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Repairs',
    description: 'Ongoing support and professional maintenance services to keep your stone cladding in pristine condition.',
  },
  {
    icon: BarChart3,
    title: 'Technical Support',
    description: 'Complete technical documentation, specifications, and material guides for architects and construction teams.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent blur-3xl -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Comprehensive stone cladding solutions from concept to completion, backed by expertise and international partnerships.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group glass hover-lift p-8 rounded-xl border border-white/10 hover:border-orange-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-orange-500/20 to-orange-400/10 rounded-lg group-hover:from-orange-500/30 group-hover:to-orange-400/20 transition-colors border border-orange-500/20">
                    <Icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
