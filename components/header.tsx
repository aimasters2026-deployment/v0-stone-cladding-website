'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 bg-[#0a0a0a]/40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-%20Copy-5TXvy836rjWOFMLMeBR3Mk2Vm25aFQ.png"
                  alt="Octo 21st Stone Technology"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-foreground">Octo 21st</p>
                <p className="text-xs text-muted-foreground">Stone Technology</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="#contact">Get Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="#contact">Get Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
