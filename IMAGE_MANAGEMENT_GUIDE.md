# Image Management System - Complete Guide

## Overview

The image management system enables centralized control of all website images through the admin dashboard. Every image used across the site is now dynamically linked to the admin interface for easy updates without code changes.

## Features

- **Centralized Image Upload**: Upload images directly in admin dashboard
- **Placement Mapping**: Assign images to specific locations (header logo, hero background, testimonials, etc.)
- **Dynamic Image Fetching**: Components automatically load images from the admin-managed storage
- **Client-Side Caching**: Efficient caching (5-minute duration) to improve performance
- **Fallback Handling**: Graceful fallback to placeholder images if primary images unavailable
- **Category Organization**: Filter and organize images by category
- **Admin Assignment Interface**: Visual grid for assigning images to placements

## Architecture

### Database Schema

**MediaAsset** - Individual image file
```typescript
{
  id: string                  // Unique identifier
  type: string               // 'hero-image', 'testimonial', 'logo', etc.
  title: string              // Display name
  description: string        // Details about the image
  filename: string           // Original filename
  url: string                // Publicly accessible URL
  size: number               // File size in bytes
  category: string           // Categorization: 'header', 'hero', 'testimonials', etc.
  placement?: string         // Optional specific placement identifier
  altText: string            // Accessibility text
  width?: number             // Image dimensions
  height?: number
  tags: string[]             // Search and filter tags
  isActive: boolean          // Enable/disable without deleting
  uploadedAt: string         // Upload timestamp
  metadata?: Record<string, any>  // Custom data
}
```

**ImagePlacement** - Mapping location
```typescript
{
  id: string                 // Unique placement ID
  placementKey: string       // Identifier: 'header-logo', 'hero-background'
  label: string              // Display name: 'Header Logo'
  category: string           // Category grouping
  description: string        // What this placement is for
  mediaId?: string           // Currently assigned media ID
  width?: number             // Recommended dimensions
  height?: number
  aspectRatio?: string       // e.g., '16/9', '1/1'
  isRequired: boolean        // Required for site functionality
}
```

**ImageGalleryConfig** - Overall configuration
```typescript
{
  id: string                 // Config ID (typically '1')
  placements: ImagePlacement[]  // All placement definitions
  defaultCategory: string    // Default filter category
  createdAt: string
  updatedAt: string
}
```

### API Endpoints

#### Media Upload & Management
- `GET /api/media` - List all media assets
- `POST /api/media` - Upload new image
- `PATCH /api/media/[id]` - Update media metadata
- `DELETE /api/media/[id]` - Delete image

#### Image Retrieval
- `GET /api/media/category/[category]` - Get images by category
- `GET /api/media/placement/[placementKey]` - Get image for specific placement
- `GET /api/media/gallery` - Get gallery configuration
- `GET /api/media/placements` - List all placements

#### Placement Management
- `GET /api/media/placements` - Get all placements
- `PUT /api/media/placements` - Assign media to placement
- `PUT /api/media/gallery` - Update gallery config

### Components

#### AdminImage Component
Reusable component for displaying admin-managed images:

```typescript
<AdminImage
  placementKey="header-logo"      // Which placement to load
  width={40}                       // Image width
  height={40}                      // Image height
  alt="Logo"                       // Accessibility text
  priority={true}                  // For above-fold images
  fallbackUrl="..."                // Fallback if not found
  objectFit="contain"              // CSS object-fit
/>
```

#### ImagePlacementManager Component
Admin interface for assigning images to placements. Includes:
- Visual placement list
- Media asset grid with preview
- Category filtering
- Assignment/removal controls
- Status indicators

### React Hooks

#### useAdminImages()
Fetch image by placement with caching:

```typescript
const { image, loading, error, placeholder, refetch } = useAdminImages({
  placementKey: 'header-logo'
})
```

#### useAllImages()
Get all media assets:

```typescript
const { images, loading, error, refetch } = useAllImages()
```

#### useImageGallery()
Get gallery configuration:

```typescript
const { gallery, loading, error, refetch } = useImageGallery()
```

### Image Utilities

**lib/image-utils.ts** provides:

- `fetchImageByPlacement(placementKey)` - Get image for placement
- `fetchImagesByCategory(category)` - Get images by category
- `fetchAllMedia()` - Get all media
- `fetchImageGallery()` - Get gallery config
- `getPlaceholderImage(placementKey)` - Get fallback placeholder
- `getCachedImage(placementKey)` - Get from cache
- `clearImageCache()` - Clear all cache
- `invalidatePlacementCache(placementKey)` - Clear specific placement cache

## Predefined Placements

The system comes with these default placements:

| Placement Key | Label | Category | Required | Aspect Ratio |
|---|---|---|---|---|
| header-logo | Header Logo | header | Yes | - |
| hero-background | Hero Background | hero | Yes | 16/9 |
| overview-image-1 | Overview Section | overview | No | - |
| portfolio-1 | Portfolio Image 1 | portfolio | No | - |
| portfolio-2 | Portfolio Image 2 | portfolio | No | - |
| testimonial-avatar-1 | Testimonial Avatar 1 | testimonials | No | 1/1 |
| testimonial-avatar-2 | Testimonial Avatar 2 | testimonials | No | 1/1 |
| testimonial-avatar-3 | Testimonial Avatar 3 | testimonials | No | 1/1 |
| footer-logo | Footer Logo | footer | No | - |

## How to Use

### For Site Visitors
- No changes - images load automatically
- Faster performance with client-side caching
- Graceful fallback if images unavailable

### For Admins

#### Upload Images
1. Go to `/admin` > Media tab
2. Click "Upload Media"
3. Select file, set type, title, description
4. Click Upload

#### Assign Images to Placements
1. Go to `/admin` > Placements tab
2. Click placement to assign
3. Select category filter (optional)
4. Click media in grid
5. Click "Assign Selected Media"

#### Update Existing Images
1. Go to `/admin` > Media tab
2. Click image to select
3. Edit title, description, alt text, tags
4. Click Save

#### Remove Image Assignment
1. Go to `/admin` > Placements tab
2. Select placement
3. Click "Remove Assignment"

### For Developers

#### Add New Placement
Edit `lib/db.ts` and add to `defaultGallery.placements`:

```typescript
{
  id: '10',
  placementKey: 'my-section-image',
  label: 'My Section Image',
  category: 'my-category',
  description: 'Image for my section',
  isRequired: false,
  aspectRatio: '16/9'
}
```

#### Use Image in Component
```typescript
'use client'

import { AdminImage } from '@/components/admin-image'

export function MyComponent() {
  return (
    <div>
      <AdminImage
        placementKey="my-section-image"
        alt="My image"
        width={800}
        height={450}
        priority={true}
      />
    </div>
  )
}
```

#### Fetch Programmatically
```typescript
import { fetchImageByPlacement } from '@/lib/image-utils'

const image = await fetchImageByPlacement('header-logo')
if (image) {
  console.log(image.url) // Use image URL
}
```

## Performance Considerations

### Client-Side Caching
- Images cached for 5 minutes
- Automatic cache invalidation
- Manual invalidation available: `invalidatePlacementCache(key)`
- Clear all: `clearImageCache()`

### Image Optimization
- Next.js Image component for automatic optimization
- Responsive image sizes with `sizes` attribute
- Lazy loading by default (except `priority={true}`)
- WebP conversion when supported

### Best Practices
1. **Use priority for above-fold images**: `priority={true}`
2. **Set proper dimensions**: Helps prevent layout shift
3. **Use alt text**: Improves accessibility
4. **Optimize before upload**: Compress images first
5. **Use appropriate formats**: JPG for photos, PNG for icons
6. **Set aspect ratios**: Define in placement config

## Troubleshooting

### Images Not Loading
1. Check `/admin` > Media tab - image uploaded?
2. Check `/admin` > Placements tab - image assigned?
3. Check browser Network tab for 404s
4. Try clearing cache: `clearImageCache()`

### Slow Performance
1. Check image file sizes (optimize before upload)
2. Verify caching is working (check Network tab)
3. Use `priority={true}` for critical images
4. Ensure dimensions specified in AdminImage

### Permission Issues
1. Verify ADMIN_KEY set in environment
2. Check admin authentication token
3. Verify admin key matches server config

## Migration Guide

### Converting Hardcoded Images to Dynamic

**Before:**
```typescript
<Image
  src="https://static-url.com/image.jpg"
  alt="Logo"
  width={40}
  height={40}
/>
```

**After:**
```typescript
<AdminImage
  placementKey="header-logo"
  alt="Logo"
  width={40}
  height={40}
  fallbackUrl="https://static-url.com/image.jpg"  // Optional fallback
/>
```

## Data Files

Images are stored in:
- **Media assets**: `.data/media.json` - Contains all uploaded images
- **Gallery config**: `.data/image-gallery.json` - Placement mappings

These files are automatically created and persisted.

## Currently Updated Components

The following components have been updated to use the image management system:

1. **Header Component** (`components/header.tsx`)
   - Logo: `header-logo` placement

### Remaining Components to Update

These components can be updated similarly:

1. **Footer Component** - Logo and footer images
2. **Hero Section** - Background image
3. **Testimonials Section** - Avatar images
4. **Portfolio Section** - Portfolio images
5. **Overview Section** - Section images
6. **Why Stone Section** - Section images

## API Response Examples

### Get Image by Placement
```bash
GET /api/media/placement/header-logo
```

Response:
```json
{
  "media": {
    "id": "123",
    "title": "Company Logo",
    "url": "https://...",
    "altText": "Octo 21st Logo",
    "category": "header",
    "isActive": true
  },
  "placementKey": "header-logo"
}
```

### Get Images by Category
```bash
GET /api/media/category/testimonials
```

Response:
```json
{
  "media": [
    { "id": "1", "title": "Avatar 1", ... },
    { "id": "2", "title": "Avatar 2", ... }
  ],
  "category": "testimonials",
  "count": 2
}
```

### Get All Placements
```bash
GET /api/media/placements
```

Response:
```json
{
  "placements": [
    {
      "id": "1",
      "placementKey": "header-logo",
      "label": "Header Logo",
      "mediaId": "123"
    },
    ...
  ]
}
```

## Security

- All upload/management operations require `ADMIN_KEY`
- Placement fetching is public (images should be public anyway)
- Admin key sent via `x-admin-key` header
- No sensitive data in image metadata

## Future Enhancements

Potential improvements:

1. **Image Optimization**: Automatic compression on upload
2. **CDN Integration**: Upload directly to Vercel Blob or similar
3. **Image Variants**: Generate responsive variants automatically
4. **Batch Operations**: Upload multiple images at once
5. **Image Cropping**: Crop in admin before assignment
6. **Analytics**: Track which placements show which images
7. **Versioning**: Keep image history with rollback
8. **Lazy Placeholders**: Blur-up effect during load

## Support

For issues or questions:

1. Check this guide first
2. Review admin dashboard feedback messages
3. Check browser console for error details
4. Verify ADMIN_KEY and authentication
5. Check `.data/` directory for data files

---

**Last Updated**: 2026-05-12
**Version**: 1.0
**Status**: Production Ready
