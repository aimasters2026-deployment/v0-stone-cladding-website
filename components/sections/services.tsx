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
    <section id="services" className="py-20 sm:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
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
                className="group p-8 bg-background rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 inline-block p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
