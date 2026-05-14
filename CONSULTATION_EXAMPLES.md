# Consultation Popup - Usage Examples

## Button Variations

### Basic Usage
```typescript
import ConsultationButton from '@/components/consultation-button'

export default function ContactSection() {
  return (
    <div className="text-center space-y-4">
      <h2>Get In Touch</h2>
      <ConsultationButton />
    </div>
  )
}
```

### Custom Text
```typescript
<ConsultationButton text="Schedule a Demo" />
<ConsultationButton text="Talk to Our Experts" />
<ConsultationButton text="Get Free Consultation" />
```

### Different Styles
```typescript
{/* Primary - orange gradient */}
<ConsultationButton variant="primary" />

{/* Secondary - outline style */}
<ConsultationButton variant="secondary" />
```

### Different Sizes
```typescript
{/* Small */}
<ConsultationButton size="sm" text="Contact Us" />

{/* Medium (default) */}
<ConsultationButton size="md" text="Request Consultation" />

{/* Large */}
<ConsultationButton size="lg" text="Get Started Today" />
```

### With Custom Classes
```typescript
<ConsultationButton 
  className="mt-8 mb-4"
  text="Learn More"
  size="lg"
/>
```

## Integration Examples

### Hero Section
```typescript
'use client'

import ConsultationButton from '@/components/consultation-button'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Premium Stone Solutions
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Expert consulting and installation
        </p>
        <ConsultationButton size="lg" variant="primary" />
      </div>
    </section>
  )
}
```

### Feature Card
```typescript
import ConsultationButton from '@/components/consultation-button'

export function FeatureCard() {
  return (
    <div className="p-8 border border-white/10 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Custom Solutions</h3>
      <p className="text-gray-400 mb-6">
        We design solutions tailored to your needs
      </p>
      <ConsultationButton text="Discuss Your Project" size="md" />
    </div>
  )
}
```

### Contact Section with Multiple Buttons
```typescript
import ConsultationButton from '@/components/consultation-button'

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Can We Help?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* General Inquiry */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">General Inquiry</h3>
            <p className="text-gray-400 mb-6">
              Questions about our services
            </p>
            <ConsultationButton 
              text="Get in Touch" 
              variant="primary"
            />
          </div>

          {/* Project Discussion */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Your Project</h3>
            <p className="text-gray-400 mb-6">
              Let's discuss your specific needs
            </p>
            <ConsultationButton 
              text="Discuss Project" 
              variant="primary"
            />
          </div>

          {/* Support */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
            <p className="text-gray-400 mb-6">
              Get help with existing products
            </p>
            <ConsultationButton 
              text="Request Support" 
              variant="primary"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Floating Action Button
```typescript
'use client'

import ConsultationButton from '@/components/consultation-button'

export function FloatingConsultationButton() {
  return (
    <div className="fixed bottom-8 right-8 z-30">
      <ConsultationButton 
        text="Need Help?" 
        size="md"
        variant="primary"
        className="rounded-full"
      />
    </div>
  )
}
```

### In a Form Section
```typescript
import ConsultationButton from '@/components/consultation-button'

export function FormSection() {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
        
        {/* Form would go here */}
        <form className="space-y-6">
          {/* Form fields */}
        </form>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4">
            Prefer to talk directly? Use any of these methods:
          </p>
          <ConsultationButton size="lg" variant="primary" />
        </div>
      </div>
    </section>
  )
}
```

## Programmatic Control

### Open Popup on User Interaction
```typescript
'use client'

import { useConsultation } from '@/components/consultation-provider'

export function CustomComponent() {
  const { openConsultation } = useConsultation()

  return (
    <button onClick={openConsultation}>
      Open Consultation Popup
    </button>
  )
}
```

### Open After Delay
```typescript
'use client'

import { useEffect } from 'react'
import { useConsultation } from '@/components/consultation-provider'

export function AutoOpenPopup() {
  const { openConsultation } = useConsultation()

  useEffect(() => {
    // Open popup after 10 seconds
    const timer = setTimeout(openConsultation, 10000)
    return () => clearTimeout(timer)
  }, [openConsultation])

  return null
}
```

### Open on Scroll
```typescript
'use client'

import { useEffect } from 'react'
import { useConsultation } from '@/components/consultation-provider'

export function ScrollTrigger() {
  const { openConsultation } = useConsultation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY / 
         (document.documentElement.scrollHeight - window.innerHeight)) * 100

      // Open popup when user has scrolled 50%
      if (scrollPercentage > 50) {
        openConsultation()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [openConsultation])

  return null
}
```

### Open on Exit Intent
```typescript
'use client'

import { useEffect } from 'react'
import { useConsultation } from '@/components/consultation-provider'

export function ExitIntentPopup() {
  const { openConsultation } = useConsultation()

  useEffect(() => {
    const handleMouseLeave = () => {
      // Open popup when mouse leaves viewport top
      if (event instanceof MouseEvent && event.clientY <= 0) {
        openConsultation()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [openConsultation])

  return null
}
```

### Check Popup State
```typescript
'use client'

import { useConsultation } from '@/components/consultation-provider'

export function Component() {
  const { isOpen, openConsultation, closeConsultation } = useConsultation()

  return (
    <>
      <p>Popup is {isOpen ? 'open' : 'closed'}</p>
      <button onClick={openConsultation}>Open</button>
      <button onClick={closeConsultation}>Close</button>
    </>
  )
}
```

## Admin Dashboard Examples

### Viewing Current Configuration
In admin dashboard under Consultation tab:
1. See all enabled channels
2. View current colors
3. Check animation settings
4. Preview popup appearance

### Adding a New Channel
1. Click "Add Channel"
2. Select type from dropdown
3. Enter label: "LinkedIn"
4. Enter contact info
5. Toggle "Active"
6. Save

### Customizing Colors
1. Go to "Colors" section
2. Click color picker for "Accent Color"
3. Choose new color (e.g., #3b82f6 for blue)
4. See preview update in real-time
5. Click "Save Changes"

### Testing Different Animations
1. Go to "Behavior" section
2. Check "Enable Animations"
3. Adjust duration slider to 500ms (slower)
4. Click "Show Preview"
5. See slower animation
6. Adjust back to 300ms

### Creating Multiple Channel Configurations

You can manage different configurations by:
1. Configure current setup
2. Save it
3. Write down the configuration
4. Change it for different pages (if needed)
5. Restore from backup using `.data/consultation-config.backup.json`

## API Integration Examples

### Fetch Configuration in Custom Component
```typescript
'use client'

import { useEffect, useState } from 'react'
import { ConsultationConfig } from '@/lib/db'

export function ConfigDisplay() {
  const [config, setConfig] = useState<ConsultationConfig | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch('/api/consultation')
      const data = await response.json()
      setConfig(data)
    }

    fetchConfig()
  }, [])

  if (!config) return <p>Loading...</p>

  return (
    <div>
      <h3>{config.title}</h3>
      <p>{config.subtitle}</p>
      <ul>
        {config.channels
          .filter(ch => ch.enabled)
          .map(ch => (
            <li key={ch.id}>{ch.label}: {ch.value}</li>
          ))}
      </ul>
    </div>
  )
}
```

### Update Configuration from External Source
```typescript
'use client'

export async function updateConsultationConfig(
  updates: Partial<ConsultationConfig>,
  adminKey: string
) {
  const response = await fetch('/api/consultation', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey,
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update configuration')
  }

  return response.json()
}
```

## Page Integration Examples

### Materials Page (Already Integrated)
```typescript
// materials.tsx already includes:
import ConsultationButton from '@/components/consultation-button'

// In the CTA section:
<ConsultationButton size="lg" />
```

### About Page Integration
```typescript
'use client'

import ConsultationButton from '@/components/consultation-button'

export default function AboutPage() {
  return (
    <main>
      {/* About content */}
      
      <section className="py-20 bg-white/5 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Work With Us?
        </h2>
        <p className="text-gray-400 mb-8">
          Connect with our team to discuss your project
        </p>
        <ConsultationButton size="lg" variant="primary" />
      </section>
    </main>
  )
}
```

### Portfolio Page Integration
```typescript
import ConsultationButton from '@/components/consultation-button'

export function ProjectShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
      
      {/* Project cards */}
      
      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-6">
          Inspired by our work? Let's create something amazing together.
        </p>
        <ConsultationButton 
          text="Start Your Project" 
          size="lg"
          variant="primary"
        />
      </div>
    </section>
  )
}
```

## Styling Examples

### With Tailwind Classes
```typescript
<ConsultationButton 
  className="w-full md:w-auto"
  size="lg"
  text="Get Started"
/>
```

### Responsive Sizes
```typescript
<div className="flex gap-4">
  <ConsultationButton size="sm" text="Small" />
  <ConsultationButton size="md" text="Medium" />
  <ConsultationButton size="lg" text="Large" />
</div>
```

### Variant Comparison
```typescript
<div className="space-y-4">
  <ConsultationButton 
    variant="primary" 
    text="Primary Style"
  />
  <ConsultationButton 
    variant="secondary" 
    text="Secondary Style"
  />
</div>
```

## Advanced Patterns

### Conditional Rendering
```typescript
import ConsultationButton from '@/components/consultation-button'

export function ConditionalButton({ isPro }: { isPro: boolean }) {
  if (!isPro) {
    return <ConsultationButton text="Upgrade for Consultation" />
  }

  return <ConsultationButton text="Schedule Consultation" />
}
```

### With Analytics Tracking
```typescript
'use client'

import ConsultationButton from '@/components/consultation-button'
import { useConsultation } from '@/components/consultation-provider'

export function TrackedButton() {
  const { openConsultation } = useConsultation()

  const handleClick = () => {
    // Track event
    if (window.gtag) {
      window.gtag('event', 'consultation_opened')
    }
    openConsultation()
  }

  return (
    <button onClick={handleClick}>
      Open Consultation
    </button>
  )
}
```

### Custom Styling
```typescript
import ConsultationButton from '@/components/consultation-button'

export function CustomStyledButton() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl">
      <h3 className="text-white text-2xl font-bold mb-4">
        Special Offer
      </h3>
      <ConsultationButton 
        text="Claim Your Offer" 
        variant="secondary"
        className="border-2 border-white"
      />
    </div>
  )
}
```

## Testing Examples

### Test Component
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsultationButton from '@/components/consultation-button'
import { ConsultationProvider } from '@/components/consultation-provider'

test('opens popup when clicked', async () => {
  const user = userEvent.setup()

  render(
    <ConsultationProvider>
      <ConsultationButton />
    </ConsultationProvider>
  )

  const button = screen.getByText('Request Consultation')
  await user.click(button)

  // Popup should appear
})
```

## Real-World Implementation Workflow

1. **Create your page component**
   ```typescript
   export default function MyPage() {
     return <div>Page content</div>
   }
   ```

2. **Import ConsultationButton**
   ```typescript
   import ConsultationButton from '@/components/consultation-button'
   ```

3. **Add to your layout**
   ```typescript
   <section className="py-20">
     <ConsultationButton size="lg" />
   </section>
   ```

4. **Configure in admin**
   - Visit `/admin`
   - Go to Consultation tab
   - Set up channels and colors

5. **Test**
   - Click button on page
   - Verify popup appears
   - Test contact methods
   - Check mobile responsiveness

## Summary

The consultation popup system is:
- Easy to integrate with `<ConsultationButton />`
- Fully customizable via admin dashboard
- Programmable with `useConsultation()` hook
- Production-ready with animations and accessibility
- Ready for deployment on any page

For more examples, see the actual component files and admin dashboard implementation.
