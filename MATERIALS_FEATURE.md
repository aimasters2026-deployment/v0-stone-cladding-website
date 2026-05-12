# Materials Catalog Feature Documentation

## Overview

The Materials Catalog feature provides a comprehensive, interactive showcase of stone materials with full admin management capabilities. The section is positioned between Portfolio and Testimonials on the main page and includes an animated, responsive design with category filtering.

## Architecture

### Data Layer (`lib/db.ts`)

**Material Interface:**
```typescript
interface Material {
  id: string
  name: string
  category: string
  description: string
  durability: string
  cost: string
  maintenance: string
  applications: string
  imageUrl: string
  features: string[]
  createdAt: string
}
```

**Available Functions:**
- `getMaterials()` - Retrieve all materials
- `addMaterial()` - Create new material
- `updateMaterial()` - Update existing material
- `deleteMaterial()` - Remove material
- `saveMaterials()` - Persist to file storage

### API Endpoint (`/api/materials`)

**GET** - Retrieve all materials (public)
```bash
curl https://yoursite.com/api/materials
```

**POST** - Add new material (admin only)
```bash
curl -X POST https://yoursite.com/api/materials \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{...material data...}'
```

**PUT** - Update material (admin only)
```bash
curl -X PUT https://yoursite.com/api/materials \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id": "material_id", ...updates...}'
```

**DELETE** - Remove material (admin only)
```bash
curl -X DELETE "https://yoursite.com/api/materials?id=material_id" \
  -H "x-admin-key: YOUR_ADMIN_KEY"
```

## Frontend Components

### Materials Section (`components/sections/materials.tsx`)

Public-facing section featuring:
- **Responsive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Animated Cards**: Entrance animations with staggered effects
- **Hover Effects**: Scale, shadow, and gradient overlay on hover
- **Category Filtering**: Dynamic filter buttons based on material categories
- **Loading States**: Skeleton loaders during data fetch
- **Mobile Optimized**: Touch-friendly buttons and spacing

**Key Features:**
- Real-time data fetching from `/api/materials`
- Automatic category detection
- Framer Motion animations matching site design
- Responsive images with Next.js Image optimization
- Accessibility-focused (semantic HTML, alt text)

### Admin Management (`components/admin/materials-management.tsx`)

Admin dashboard for managing materials:
- **Add Materials**: Form modal for creating new materials
- **Edit Materials**: Pre-populated form for updates
- **Delete Materials**: Confirmation dialog before deletion
- **Material List**: Table view of all materials with quick actions
- **Real-time Updates**: No page refresh needed

**Form Fields:**
- Material Name (required)
- Category (required)
- Description (required)
- Durability (e.g., "50+ years")
- Cost Range (e.g., "Premium")
- Maintenance (e.g., "Low")
- Applications (comma-separated)
- Image URL
- Features (comma-separated)

## Integration Points

### Main Page (`app/page.tsx`)

The Materials section is imported and rendered between Portfolio and Testimonials:
```tsx
<Portfolio />
<Materials />
<Testimonials />
```

### Admin Dashboard (`app/admin/page.tsx`)

A "Materials" tab is added to the admin dashboard navigation, accessible via the admin panel at `/admin`.

### Admin Navigation (`components/admin-nav.tsx`)

The Materials tab uses a Layers icon and is positioned at the end of tab navigation.

## Styling & Design

### Design System Integration

- **Colors**: Consistent with site branding (orange primary, white text on dark backgrounds)
- **Typography**: Space Grotesk for headings, system font for body
- **Glass Morphism**: Uses existing glass class for card backgrounds
- **Animations**: Leverages existing animation variants from `lib/animations.ts`

### Responsive Breakpoints

| Breakpoint | Grid | Padding | Font |
|-----------|------|---------|------|
| Mobile < 640px | 1 column | 16px | sm/base |
| Tablet 640-1024px | 2 columns | 24px | base |
| Desktop > 1024px | 3 columns | 32px | lg |

### Hover States

- **Card Lift**: `hover-lift` class with scale and shadow
- **Image Zoom**: 110% scale on image with smooth transition
- **Border Highlight**: White/10 to orange-500/50 border
- **Gradient Overlay**: Reveals on hover (black/80 gradient)

## Data Persistence

Materials are stored in `.data/materials.json` using the same JSON file pattern as existing message and media data. The system automatically:
1. Creates the `.data` directory if missing
2. Initializes `materials.json` on first run
3. Persists changes immediately on create/update/delete

## Sample Data

Six materials are included in `.data/materials.json` with realistic attributes:
- Black Granite Classic
- White Marble Elegance
- Sandstone Warm Tone
- Slate Grey Contemporary
- Limestone Soft Beige
- Basalt Dark Premium

Each includes category, durability, cost range, maintenance level, and feature tags.

## Admin Key Authentication

All POST, PUT, and DELETE operations require admin authentication via the `x-admin-key` header, matching the existing pattern from `/api/config`.

**Setup:**
1. Set `ADMIN_KEY` environment variable in your project
2. Use this key in the admin dashboard login
3. The key is automatically included in API calls

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Responsive design optimized for mobile-first approach

## Performance Optimizations

- **Image Optimization**: Next.js Image component with automatic formats
- **Lazy Loading**: Section renders with Framer Motion viewport detection
- **Code Splitting**: Component is loaded on-demand
- **Minimal Dependencies**: Uses only Framer Motion (already installed)

## Future Enhancements

Potential features for expansion:
- Material comparison tool
- Advanced filtering (price, durability, etc.)
- Material specifications PDF export
- Customer testimonials per material
- Image gallery for each material
- Pricing calculator integration
- Material availability by region

## Troubleshooting

**Materials not loading:**
- Check that `/api/materials` returns 200 response
- Verify `.data/materials.json` exists and is valid JSON
- Check browser console for fetch errors

**Admin operations failing:**
- Verify admin key is set in environment variables
- Check that key matches in admin dashboard and environment
- Look for 401 Unauthorized responses in network tab

**Styling issues:**
- Clear browser cache and rebuild (`npm run build`)
- Verify globals.css includes glass class
- Check that Tailwind is properly configured

## File Structure

```
.
├── .data/
│   └── materials.json                    # Material storage
├── app/
│   ├── page.tsx                          # Main page (updated)
│   ├── admin/
│   │   └── page.tsx                      # Admin dashboard (updated)
│   └── api/
│       └── materials/
│           └── route.ts                  # Materials API
├── components/
│   ├── sections/
│   │   └── materials.tsx                 # Public section
│   ├── admin/
│   │   └── materials-management.tsx      # Admin UI
│   └── admin-nav.tsx                     # Tab navigation (updated)
└── lib/
    └── db.ts                             # Database functions (updated)
```

## Getting Started

1. **View Materials**: Visit homepage and scroll to "Choosing the Right Materials" section
2. **Admin Access**: Navigate to `/admin` and authenticate with your admin key
3. **Manage Materials**: Use Materials tab in admin dashboard to add/edit/delete items
4. **Public Filtering**: Use category filters on the public section to narrow materials

All changes are immediately reflected on the frontend without page refresh.
