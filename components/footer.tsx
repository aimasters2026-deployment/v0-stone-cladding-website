import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] glass border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-%20Copy-5TXvy836rjWOFMLMeBR3Mk2Vm25aFQ.png"
                  alt="Octo 21st Stone Technology"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold">Octo 21st</p>
                <p className="text-xs opacity-90">Stone Technology</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Premier stone wall cladding solutions for modern architecture across Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#services" className="hover:opacity-100 transition-opacity">
                  Design &amp; Consulting
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:opacity-100 transition-opacity">
                  Supply &amp; Installation
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:opacity-100 transition-opacity">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:opacity-100 transition-opacity">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/about" className="hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:opacity-100 transition-opacity">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Get in Touch</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+234 809 877 7052</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-xs">octo21ststonetechnology@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-xs">Ibadan &amp; Abuja, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm opacity-90">
              © 2024 Octo 21st Stone Technology. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary-foreground/10 rounded transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary-foreground/10 rounded transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary-foreground/10 rounded transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner Badge */}
        <div className="text-center text-sm opacity-75 border-t border-primary-foreground/20 pt-8">
          <p>In Partnership with Neksan - Premium Turkish Stone & Marble Solutions</p>
        </div>
      </div>
    </footer>
  )
}
