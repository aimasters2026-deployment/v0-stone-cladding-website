# Consultation Popup Component - Complete Guide

## Overview

The Consultation Popup is a comprehensive, fully interactive modal component that provides users with multiple contact options and is managed through an admin dashboard. It supports phone, email, Gmail, WhatsApp, and Telegram contact methods with smooth animations and responsive design.

## Features

### User-Facing Features
- **Multiple Contact Methods**: Phone, Email, Gmail, WhatsApp, Telegram
- **Smooth Animations**: Configurable entrance/exit animations with Framer Motion
- **Responsive Design**: Mobile-first layout (1 column → 2-3 columns)
- **Copy to Clipboard**: Quick copy buttons for contact information
- **Deep Linking**: Direct links to contact apps (WhatsApp, Telegram, phone, email)
- **Accessible**: ARIA labels, keyboard navigation (Esc to close)
- **Touch-Friendly**: 44px+ tap targets on mobile

### Admin Features
- **Channel Management**: Enable/disable individual contact methods
- **Edit Contact Info**: Real-time configuration without code changes
- **Color Customization**: Accent colors, button colors, background styles
- **Animation Control**: Enable/disable animations, adjust timing
- **Live Preview**: See changes in real-time before saving
- **Persistent Storage**: Configuration saved to JSON file

## File Structure

```
components/
├── consultation-popup.tsx (241 lines) - Main popup modal component
├── consultation-button.tsx (45 lines) - Reusable trigger button
├── consultation-provider.tsx (42 lines) - React Context provider
└── admin/
    └── consultation-management.tsx (475 lines) - Admin dashboard

app/
└── api/
    └── consultation/
        └── route.ts (40 lines) - GET/PUT API endpoints

lib/
└── db.ts (updated with consultation config types and functions)
```

## Database Schema

### ConsultationChannel
```typescript
interface ConsultationChannel {
  id: string
  type: 'phone' | 'email' | 'gmail' | 'whatsapp' | 'telegram'
  label: string
  value: string // phone number, email, username
  enabled: boolean
  icon?: string
}
```

### ConsultationConfig
```typescript
interface ConsultationConfig {
  id: string
  title: string
  subtitle: string
  channels: ConsultationChannel[]
  backgroundColor: string
  accentColor: string
  buttonColor: string
  buttonTextColor: string
  animationDuration: number
  animationEnabled: boolean
  closeOnBackdropClick: boolean
  createdAt: string
  updatedAt: string
}
```

## API Endpoints

### GET /api/consultation
Retrieve current consultation configuration (public access).

**Response:**
```json
{
  "id": "1",
  "title": "Get In Touch",
  "subtitle": "Choose your preferred contact method",
  "channels": [
    {
      "id": "1",
      "type": "phone",
      "label": "Call Us",
      "value": "+234701234567",
      "enabled": true,
      "icon": "Phone"
    }
  ],
  "backgroundColor": "rgba(10, 10, 10, 0.95)",
  "accentColor": "#ff8c42",
  "buttonColor": "#ff8c42",
  "buttonTextColor": "#ffffff",
  "animationDuration": 300,
  "animationEnabled": true,
  "closeOnBackdropClick": true,
  "createdAt": "2024-05-12T...",
  "updatedAt": "2024-05-12T..."
}
```

### PUT /api/consultation
Update consultation configuration (admin-only, requires x-admin-key header).

**Headers:**
- `x-admin-key`: Your ADMIN_KEY environment variable
- `Content-Type`: application/json

**Request Body:**
```json
{
  "title": "Updated Title",
  "channels": [...],
  // ... other fields to update
}
```

## Component Usage

### ConsultationButton

Reusable trigger button for opening the popup.

```typescript
import ConsultationButton from '@/components/consultation-button'

export default function MyComponent() {
  return (
    <ConsultationButton 
      text="Get in Touch"
      variant="primary"
      size="md"
    />
  )
}
```

**Props:**
- `text?: string` - Button label (default: "Request Consultation")
- `variant?: 'primary' | 'secondary'` - Button style (default: "primary")
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: "md")
- `className?: string` - Additional CSS classes

### ConsultationProvider

Context provider for managing popup state (automatically added to root layout).

```typescript
import { ConsultationProvider } from '@/components/consultation-provider'

export default function Layout({ children }) {
  return (
    <ConsultationProvider>
      {children}
    </ConsultationProvider>
  )
}
```

### useConsultation Hook

Access popup state and controls.

```typescript
import { useConsultation } from '@/components/consultation-provider'

export default function MyComponent() {
  const { isOpen, openConsultation, closeConsultation } = useConsultation()
  
  return (
    <button onClick={openConsultation}>Open Popup</button>
  )
}
```

## Admin Dashboard

### Accessing the Admin Panel

1. Navigate to `/admin`
2. Enter your `ADMIN_KEY` environment variable
3. Click "Consultation" tab

### Managing Channels

#### Add a Channel
1. Click "Add Channel" button
2. Configure the channel:
   - **Type**: Select from phone, email, Gmail, WhatsApp, Telegram
   - **Label**: Display name (e.g., "Call Us")
   - **Contact Info**: Phone number, email, or username
   - **Active**: Toggle to enable/disable
3. Changes auto-save on blur

#### Edit a Channel
- Click into any field to edit
- Changes are applied immediately in preview

#### Delete a Channel
- Click the trash icon
- Confirm deletion (no undo on client side)

### Customization Options

#### Popup Content
- **Title**: Main heading (e.g., "Get In Touch")
- **Subtitle**: Subheading text

#### Colors
- **Accent Color**: Used for icons and highlights (hex color)
- **Button Color**: CTA button background color (hex color)
- Button colors apply to all ConsultationButton instances

#### Behavior
- **Enable Animations**: Toggle smooth entrance/exit animations
- **Animation Duration**: Speed in milliseconds (100-1000)
- **Close on Backdrop Click**: Allow closing popup by clicking overlay

### Live Preview

Click "Show Preview" to see real-time changes to the popup:
- View all enabled channels
- See color customizations
- Preview animations
- Verify layout on different sizes

## Animations

All animations use Framer Motion with performance optimization:

### Default Animations
- **Entrance**: Scale 0.9 → 1.0, Fade 0 → 1 (300ms)
- **Exit**: Scale 1.0 → 0.9, Fade 1 → 0 (200ms)
- **Channel Icons**: Staggered entrance (50ms delays)
- **Hover Effects**: Scale 1.05, shadow glow

### Disabling Animations

In admin dashboard:
1. Go to "Behavior" section
2. Uncheck "Enable Animations"
3. Animations will be skipped (0ms duration)

## Responsive Design

### Mobile (< 640px)
- Full width popup (96% with padding)
- 1 column channel grid
- Compact padding (p-3 sm:p-8)
- Touch-optimized spacing

### Tablet (640px - 1024px)
- Max width 420px
- 2-3 column channel grid
- Balanced padding

### Desktop (> 1024px)
- Max width 500px
- 3 column channel grid
- Generous spacing

## Configuration File

Configuration is stored in `.data/consultation-config.json`:

```json
{
  "id": "1",
  "title": "Get In Touch",
  "subtitle": "Choose your preferred contact method",
  "channels": [
    {
      "id": "1",
      "type": "phone",
      "label": "Call Us",
      "value": "+234701234567",
      "enabled": true,
      "icon": "Phone"
    }
  ],
  "backgroundColor": "rgba(10, 10, 10, 0.95)",
  "accentColor": "#ff8c42",
  "buttonColor": "#ff8c42",
  "buttonTextColor": "#ffffff",
  "animationDuration": 300,
  "animationEnabled": true,
  "closeOnBackdropClick": true,
  "createdAt": "2024-05-12T...",
  "updatedAt": "2024-05-12T..."
}
```

## Environment Variables

```env
# .env.local
ADMIN_KEY=your_secure_admin_password_here
```

This key is required to:
- Access `/admin` dashboard
- Modify consultation configuration via API
- Authenticate admin operations

## Integration Points

### Already Integrated
- ✓ Root layout wraps with ConsultationProvider
- ✓ ConsultationPopup rendered globally
- ✓ Materials section uses ConsultationButton
- ✓ Consultation tab added to admin dashboard

### Easy to Integrate
Add ConsultationButton to any page:

```typescript
import ConsultationButton from '@/components/consultation-button'

export default function MyPage() {
  return (
    <section>
      <h1>Contact Us</h1>
      <ConsultationButton variant="primary" size="lg" />
    </section>
  )
}
```

## Customization Examples

### Change Button Text
```typescript
<ConsultationButton text="Schedule a Demo" />
```

### Use Secondary Style
```typescript
<ConsultationButton variant="secondary" />
```

### Add to Other Pages
```typescript
// In contact.tsx, about.tsx, etc.
<ConsultationButton />
```

### Programmatic Opening
```typescript
import { useConsultation } from '@/components/consultation-provider'

function MyComponent() {
  const { openConsultation } = useConsultation()
  
  useEffect(() => {
    // Open after 5 seconds
    const timer = setTimeout(openConsultation, 5000)
    return () => clearTimeout(timer)
  }, [openConsultation])
}
```

## Deep Linking Support

The popup automatically generates appropriate links:

- **Phone**: `tel:+234701234567`
- **Email**: `mailto:info@example.com`
- **Gmail**: `mailto:info@example.com`
- **WhatsApp**: `https://wa.me/234701234567`
- **Telegram**: `https://t.me/username`

Phone numbers in WhatsApp must be in E.164 format (digits only).

## Copy to Clipboard

Hovering over a channel shows a copy button:
- Click to copy contact info to clipboard
- Green checkmark appears for 2 seconds
- Works on all channels

## Accessibility Features

- ✓ ARIA labels on buttons
- ✓ Keyboard navigation (Esc to close)
- ✓ Focus management
- ✓ Semantic HTML structure
- ✓ Sufficient color contrast
- ✓ Touch targets ≥ 44px

## Performance

- **Zero Layout Shift**: All animations use transform/opacity
- **60fps**: GPU-accelerated with will-change
- **Lazy Loading**: Config fetched on mount
- **Optimized Bundle**: ~8KB gzipped (including Framer Motion)

## Troubleshooting

### Popup Not Appearing
1. Check ConsultationProvider is in root layout
2. Verify ConsultationPopup is imported and rendered
3. Check browser console for errors
4. Ensure ConsultationButton is being used

### Colors Not Updating
1. Save changes in admin dashboard
2. Hard refresh browser (Ctrl+Shift+R)
3. Check network tab - verify PUT request succeeded
4. Check `.data/consultation-config.json` was updated

### Animations Not Working
1. Check "Enable Animations" is toggled in admin
2. Verify animationDuration > 0
3. Check browser doesn't have animations disabled
4. Try disabling and re-enabling

### Admin Access Denied
1. Verify ADMIN_KEY environment variable is set
2. Check you're entering the correct key
3. Verify key doesn't have typos
4. Check .env.local vs environment variables

## Data Management

### Backing Up Configuration

```bash
# Export current config
cp .data/consultation-config.json .data/consultation-config.backup.json
```

### Restoring Configuration

```bash
# Restore from backup
cp .data/consultation-config.backup.json .data/consultation-config.json
```

## Future Enhancements

Potential features to add:
- Auto-open popup after delay
- Analytics tracking for popup interactions
- A/B testing different channel configurations
- Email notification on channel clicks
- Rate limiting to prevent abuse
- Multi-language support

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in browser console
3. Check API responses in Network tab
4. Verify configuration file integrity
5. Check admin key authentication

## Version History

### Version 1.0 (Current)
- Initial release with 5 contact channels
- Full admin customization
- Responsive animations
- Deep linking support
