# Visual Design Reference Guide

## Color Palette & Accent System

### Primary Colors
- **Background**: #0a0a0a (Deep charcoal black)
- **Text Primary**: #ffffff (Pure white)
- **Text Secondary**: #9ca3af (Light gray)
- **Glass Background**: rgba(255, 255, 255, 0.1) with backdrop blur
- **Glass Border**: rgba(255, 255, 255, 0.1) - white/10

### Accent Colors
- **Primary Accent**: #ff8c42 (Bright orange)
- **Accent Secondary**: #ea580c (Darker orange)
- **Accent Hover**: #ff8c42 with 0.2 alpha shadow
- **Success Green**: #22c55e (Testimonials/success feedback)

### Hover & Interactive States
- **Card Hover Shadow**: `0 20px 40px rgba(255, 140, 66, 0.2)`
- **Button Hover**: Gradient from #ff8c42 → #ea580c
- **Border Hover**: rgba(255, 140, 66, 0.5) - orange/50
- **Feature Tag Hover**: rgba(255, 140, 66, 0.35) - orange/35

---

## Typography System

### Font Families
- **Headings**: 'Space Grotesk' (font-space-grotesk)
- **Body**: 'Geist' (font-sans)
- **Monospace**: 'Geist Mono' (font-mono)

### Heading Sizes
```
h1: text-3xl sm:text-4xl md:text-5xl (30px → 36px → 48px)
h2: text-2xl sm:text-3xl md:text-4xl (24px → 28px → 36px)
h3: text-lg sm:text-xl (18px → 20px)
h4: text-base sm:text-lg (16px → 18px)
```

### Body Text Sizes
```
Large: text-base sm:text-lg (16px → 18px)
Normal: text-sm sm:text-base (14px → 16px)
Small: text-xs sm:text-sm (12px → 14px)
Tiny: text-xs (12px)
```

### Line Heights
- Headings: tight (leading-tight)
- Body: relaxed (leading-relaxed)
- Captions: normal (leading-normal)

---

## Spacing Scale

### Margin & Padding
```
px: 4px    (spacing-1)
3: 12px    (spacing-3)
4: 16px    (spacing-4)
6: 24px    (spacing-6)
8: 32px    (spacing-8)
```

### Gap Scale (between elements)
```
Mobile:   gap-3 (12px)
Tablet:   gap-5 (20px)
Desktop:  gap-6 (24px)
```

### Section Padding
```
Mobile:   px-4 (16px sides), py-20 (80px top/bottom)
Tablet:   px-6 (24px sides), py-24 (96px top/bottom)
Desktop:  px-8 (32px sides), py-28 (112px top/bottom)
```

---

## Component Sizing

### Card Heights (Responsive)
```
Materials/Portfolio:
  Mobile:   h-40 (160px)
  Tablet:   h-48 (192px)
  Desktop:  h-56 (224px)

Testimonials:
  Mobile:   Flexible (grows with content)
  Desktop:  min-height 300px
```

### Avatar Sizing
```
Testimonials:
  Mobile:   h-10 w-10 (40x40px)
  Desktop:  h-12 w-12 (48x48px)
  Border:   2px border-orange-400/50
```

### Button Sizing
```
Primary Button:
  Mobile:   px-6 py-2.5
  Desktop:  px-10 py-3
  
Filter Button:
  Mobile:   px-4 py-2
  Desktop:  px-6 py-3

Details Button:
  Mobile:   p-2 text-xs
  Desktop:  p-3 text-sm
```

---

## Border & Radius System

### Border Radius
```
Cards: rounded-lg sm:rounded-xl (8px → 12px)
Buttons: rounded-lg (12px)
Details: rounded-md sm:rounded-lg (8px → 12px)
Avatars: rounded-full (50%)
Badges: rounded-full (50%)
```

### Border Width
```
Cards: border-1 (1px)
Focus: border-2 (2px - avatars)
```

### Border Colors
```
Inactive: border-white/10 (rgba(255,255,255,0.1))
Hover: border-orange-500/50 (rgba(255,133,66,0.5))
Active: border-orange-400/30 (rgba(255,140,66,0.3))
```

---

## Shadow & Depth

### Box Shadows
```
Default Card: No shadow
Hover Card: 0 20px 40px rgba(255, 140, 66, 0.2)
Button Hover: shadow-lg shadow-orange-500/30
Avatar Hover: 0 0 15px rgba(255, 140, 66, 0.5)
```

### Gradients
```
Text Gradient: 
  from-orange-400 via-red-400 to-green-400

Button Gradient:
  from-orange-500 to-orange-600

Overlay (Images):
  from-black/90 via-black/40 to-transparent
```

---

## Animation Values

### Duration Timing
```
Fast:    200ms (interactive feedback)
Normal:  250-300ms (standard animations)
Slow:    500-600ms (entrance animations)
```

### Easing
```
Default: cubic-bezier(0.4, 0, 0.2, 1)
Bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55)
Linear:  ease-linear (for continuous motion)
```

### Transform Values
```
Scale:
  Card Hover:    scale: 1.08
  Image Hover:   scale: 1.15
  Avatar Hover:  scale: 1.12
  Badge Hover:   scale: 1.1
  Filter Hover:  scale: 1.05

Translate (Y-axis):
  Card Lift:     y: -6
  Subtle Lift:   y: -2
  
Rotate:
  Star Hover:    rotate: 10°
  Chevron:       rotate: 0° → 180°
```

### Opacity
```
Full:      opacity: 1
High:      opacity: 0.9
Normal:    opacity: 0.8
Low:       opacity: 0.5
Ghost:     opacity: 0.3
```

---

## Glass Morphism Style

### Glass Background
```css
.glass {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.glass-sm {
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}
```

### Hover State
```css
/* Glass card on hover */
border-color: rgba(255, 140, 66, 0.5);
box-shadow: 0 20px 40px rgba(255, 140, 66, 0.2);
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   (Tablet start)
md:  768px   (Tablet full)
lg:  1024px  (Desktop start)
xl:  1280px  (Large desktop)
```

### Component Behavior at Breakpoints
```
< 640px (Mobile):
  - 1-column grids
  - Single navigation
  - Minimal spacing
  - Compact typography

640px - 1024px (Tablet):
  - 2-column grids
  - Expanded spacing
  - Medium typography
  
> 1024px (Desktop):
  - 3-column grids
  - Generous spacing
  - Full typography
  - Complete animations
```

---

## Icon System

### Icon Sizing
```
Small:   h-3.5 w-3.5 (14x14px)
Normal:  h-4 w-4 (16x16px)
Large:   h-5 w-5 (20x20px)
XL:      h-6 w-6 (24x24px)
```

### Icon Colors
```
Accent: text-orange-400
Muted:  text-gray-400
Active: text-white
```

### Icon Spacing
```
Gap to text:     3-4px (gap-1 or gap-2)
Gap between:     0.5-1px (gap-0.5 or gap-1)
```

---

## State Variations

### Button States
```
Default:    bg-white/5 border-white/10 text-gray-300
Hover:      bg-orange-500/15 border-orange-500/50 text-white
Active:     bg-orange-500 text-white
Disabled:   bg-white/5 opacity-50 cursor-not-allowed
```

### Card States
```
Default:    border-white/10 (subtle)
Hover:      border-orange-500/50 (prominent)
Selected:   border-orange-400 (active)
Loading:    opacity-50 animate-pulse
```

### Category Filter States
```
Inactive:   glass border-white/10 text-gray-300
Active:     bg-gradient-to-r from-orange-500 to-orange-600 text-white
Hover:      border-orange-500/50 text-white
```

---

## Loading & Skeleton States

### Skeleton Styling
```
Background: gradient-to-r from-white/5 to-white/10
Animation:  opacity 0.5 → 1 → 0.5 (1.5s loop)
Stagger:    delay: i * 0.1s
```

### Loading Indicators
```
Pulse:     animate-pulse
Duration:  1.5s
Easing:    ease-in-out
```

---

## Interactive Feedback

### Tap/Click Feedback
```
Button:     whileTap={{ scale: 0.95 }}
Card:       whileTap={{ scale: 0.98 }}
Duration:   150ms
```

### Hover Feedback
```
Text Color:     text-white (from gray-300)
Background:     +20% opacity increase
Scale:          1.05 - 1.15x (element dependent)
Shadow:         Add orange glow
Border:         Change to orange-500/50
```

### Focus States
```
Outline:    ring-2 ring-orange-400
Offset:     ring-offset-2
```

---

## Animation Preset Library

### Entrance Animations
```javascript
// Fade in from top
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6 }

// Scale in
initial: { opacity: 0, scale: 0.9 }
animate: { opacity: 1, scale: 1 }
transition: { duration: 0.4 }

// Stagger children
delay: index * 0.05
```

### Hover Animations
```javascript
// Card lift
whileHover: { y: -6, boxShadow: '...' }

// Image zoom
whileHover: { scale: 1.15 }
transition: { duration: 0.5 }

// Scale button
whileHover: { scale: 1.08 }
```

### Tap Animations
```javascript
whileTap: { scale: 0.95 }
transition: { duration: 0.1 }
```

---

## Accessibility Colors

### WCAG Compliance
- White text on dark background: AAA compliant
- Orange (#ff8c42) on white: AA compliant
- All focus states: Clear visual distinction
- Hover states: Minimum 3:1 contrast ratio

---

## Theme Variables (CSS)

### Root Variables
```css
--background: #0a0a0a
--foreground: #ffffff
--accent: #ff8c42
--accent-dark: #ea580c
--glass-bg: rgba(255,255,255,0.1)
--glass-border: rgba(255,255,255,0.2)
```

---

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | #ff8c42 | Buttons, accents, hover states |
| Text Color | #ffffff | All text |
| Background | #0a0a0a | Page background |
| Glass BG | rgba(255,255,255,0.1) | Cards, containers |
| Border Color | rgba(255,255,255,0.1) | Card borders |
| Radius | 8px → 12px | Cards, buttons |
| Shadow Orange | rgba(255,140,66,0.2) | Hover glow |

---

**Last Updated**: 2024  
**Status**: Production Design System
