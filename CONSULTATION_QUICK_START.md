# Consultation Popup - Quick Start Guide

## 5-Minute Setup

### 1. Environment Variable
Set your admin key:
```env
# .env.local
ADMIN_KEY=your_secure_password_here
```

### 2. Access Admin Dashboard
1. Visit `/admin`
2. Enter your ADMIN_KEY
3. Click "Consultation" tab

### 3. Configure Channels
In the admin dashboard:

**Add Phone Channel:**
- Type: Phone
- Label: Call Us
- Contact Info: +234701234567
- Toggle: Active

**Add WhatsApp Channel:**
- Type: WhatsApp
- Label: WhatsApp
- Contact Info: +234701234567
- Toggle: Active

**Add Email Channel:**
- Type: Email
- Label: Email
- Contact Info: info@octo21st.com
- Toggle: Active

**Add Telegram Channel:**
- Type: Telegram
- Label: Telegram
- Contact Info: @octo21st
- Toggle: Active

### 4. Customize Appearance
In "Colors" section:
- Set accent color (orange: #ff8c42)
- Set button color (matches accent)
- Colors auto-apply to preview

### 5. Save & Test
1. Click "Show Preview" to see live preview
2. Click "Save Changes"
3. Visit any page, click "Request Consultation"
4. Test each contact method

## Using the Popup on Pages

### Default Button
Already installed on Materials page:
```typescript
<ConsultationButton />
```

### Custom Button Text
```typescript
<ConsultationButton text="Schedule Now" />
```

### Different Styles
```typescript
{/* Primary (orange) */}
<ConsultationButton variant="primary" />

{/* Secondary (outline) */}
<ConsultationButton variant="secondary" />
```

### Different Sizes
```typescript
<ConsultationButton size="sm" />  {/* Small */}
<ConsultationButton size="md" />  {/* Medium */}
<ConsultationButton size="lg" />  {/* Large */}
```

### Add to Other Pages
1. Import ConsultationButton:
```typescript
import ConsultationButton from '@/components/consultation-button'
```

2. Add to your component:
```typescript
export default function ContactPage() {
  return (
    <section>
      <h1>Get In Touch</h1>
      <ConsultationButton />
    </section>
  )
}
```

## Default Configuration

The popup comes pre-configured with:
- **Title**: "Get In Touch"
- **Subtitle**: "Choose your preferred contact method"
- **Channels**: Phone, Email, WhatsApp, Telegram (all enabled)
- **Animation Duration**: 300ms
- **Colors**: Orange accent (#ff8c42)

## Admin Dashboard Tabs

**Popup Content**
- Edit title and subtitle

**Colors**
- Change accent color (icons, highlights)
- Change button color (CTA buttons)

**Behavior**
- Enable/disable animations
- Adjust animation speed
- Close on backdrop click

**Contact Channels**
- Add, edit, delete channels
- Enable/disable individual channels
- Configure contact information
- Live preview

## Configuration Storage

Configuration automatically saves to:
```
.data/consultation-config.json
```

This file persists configuration between server restarts.

## API Reference

### Get Current Config
```javascript
const response = await fetch('/api/consultation')
const config = await response.json()
console.log(config)
```

### Update Config (Admin Only)
```javascript
const response = await fetch('/api/consultation', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': 'your_admin_key'
  },
  body: JSON.stringify({
    title: 'New Title',
    // ... other fields
  })
})
```

## Common Tasks

### Change Phone Number
1. Go to Admin > Consultation
2. Find "Call Us" channel
3. Edit Contact Info field
4. New number appears in popup immediately

### Add a New Channel
1. Click "Add Channel" button
2. Select type (phone, email, WhatsApp, Telegram)
3. Enter label and contact info
4. Toggle "Active"

### Change Colors
1. Go to Colors section
2. Click color picker or paste hex code
3. See live preview
4. Changes apply when you save

### Disable Animation
1. Go to Behavior section
2. Uncheck "Enable Animations"
3. Save changes
4. Popup now appears without animation

### Make Popup Non-Dismissible
1. Go to Behavior section
2. Uncheck "Close on Backdrop Click"
3. Users must click X button to close

## Troubleshooting

**Can't access admin?**
- Check ADMIN_KEY in .env.local
- Verify no typos in password
- Restart dev server after changing .env

**Button not showing?**
- Import ConsultationButton in component
- Check component is rendering
- Clear browser cache (Ctrl+Shift+R)

**Popup won't open?**
- Check browser console for errors
- Verify ConsultationButton is being clicked
- Check popup isn't already open

**Changes not saving?**
- Check Network tab - PUT request success
- Verify admin key is correct
- Check file permissions on .data directory

## File Reference

**User-facing components:**
- `components/consultation-button.tsx` - Trigger button
- `components/consultation-popup.tsx` - Modal popup
- `components/consultation-provider.tsx` - Context provider

**Admin component:**
- `components/admin/consultation-management.tsx` - Admin dashboard

**API:**
- `app/api/consultation/route.ts` - GET/PUT endpoints

**Database:**
- `.data/consultation-config.json` - Configuration storage
- `lib/db.ts` - TypeScript types and functions

## Next Steps

1. ✓ Set ADMIN_KEY environment variable
2. ✓ Customize contact channels in admin
3. ✓ Adjust colors and animations
4. ✓ Test popup on different pages
5. Add ConsultationButton to more pages
6. Monitor user interactions
7. Gather feedback and iterate

## Support

See `CONSULTATION_POPUP_GUIDE.md` for complete documentation.
