import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Mesh Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engineered_facade_detail.jpg%20-%20Copy%20-%20Copy-jH7bCc3bqM5kAWesV9qFSb5Iddv423.png"
          alt="Stone facade background"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center sm:text-left">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight font-space-grotesk">
              <span className="gradient-text">Premium Stone Wall</span> Cladding Excellence
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance">
              Transform your building facade with premium Turkish stone materials. Expert consulting, design, and installation for sustainable, energy-efficient structures.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#contact" className="flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="#portfolio">View Our Work</Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-medium mb-3">Trusted by leading developers and architects across Africa</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div>
                <p className="text-2xl font-bold text-foreground">50+</p>
                <p className="text-xs text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Office Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
