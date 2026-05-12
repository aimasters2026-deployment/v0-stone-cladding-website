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
    <section id="portfolio" className="py-20 sm:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of our most prestigious stone cladding installations across Africa and international markets.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-background">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-accent font-medium mb-3">
                  {project.location}
                </p>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            See more of our completed projects and case studies
          </p>
          <button className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
