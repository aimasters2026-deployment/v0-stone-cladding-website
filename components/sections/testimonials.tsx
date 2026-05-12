import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Arch. Chioma Okafor',
    role: 'Principal Architect',
    company: 'Lagos Design Studios',
    text: 'Working with Octo 21st Stone Technology was exceptional. Their expertise in stone selection and installation quality exceeded all our expectations. The building facade is stunning and performing beautifully.',
  },
  {
    name: 'Engr. Adeyemi Hassan',
    role: 'Project Manager',
    company: 'Central Construction Ltd',
    text: 'Professional, reliable, and detail-oriented. From initial consultation to final installation, every step was handled with precision. Our clients are extremely satisfied with the results.',
  },
  {
    name: 'Dr. Oluwaseun Adekunle',
    role: 'Facilities Manager',
    company: 'Financial Institution',
    text: 'The stone cladding has transformed our building&apos;s appearance while providing excellent thermal performance. We&apos;ve seen measurable reductions in energy costs since completion.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by architects, developers, and facility managers across Africa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-border rounded-lg hover:border-primary transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-accent font-medium">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
