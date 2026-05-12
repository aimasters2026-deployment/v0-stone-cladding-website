import Image from 'next/image'

const projects = [
  {
    title: 'Central Bank of Nigeria - Ibadan',
    location: 'Ibadan, Nigeria',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engineered_facade_detail.jpg%20-%20Copy%20-%20Copy-jH7bCc3bqM5kAWesV9qFSb5Iddv423.png',
    description: 'Premium stone facade installation for iconic financial institution',
  },
  {
    title: 'Modern Commercial Complex',
    location: 'Abuja, Nigeria',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern_building_rainscreen.jpg%20-%20Copy-cZoiVF0UwkzNB3iqa4HjWcLI3XYpE2.png',
    description: 'Complete stone cladding system with thermal performance optimization',
  },
  {
    title: 'Luxury Residential Development',
    location: 'Istanbul, Turkey',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project-building-1.png-EO3SIth9pBZ33WMLgB0y2qZe5t98VW.png',
    description: 'Sultangazi Hastane ve Fakülte Binaları - Prestigious stone facade',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-green-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            A selection of our most prestigious stone cladding installations across Africa and international markets.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2 font-space-grotesk">
                  {project.title}
                </h3>
                <p className="text-sm text-orange-400 font-medium mb-3">
                  {project.location}
                </p>
                <p className="text-gray-300 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400 mb-6">
            See more of our completed projects and case studies
          </p>
          <button className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
