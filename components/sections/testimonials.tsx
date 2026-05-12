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
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted by architects, developers, and facility managers across Africa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass p-8 rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic text-sm">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <p className="font-bold text-white font-space-grotesk">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-orange-400 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
