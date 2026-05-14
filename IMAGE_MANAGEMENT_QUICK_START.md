# Image Management System - Quick Start (5 Minutes)

## What You Got

- Centralized image management via admin dashboard
- Dynamic image loading in all website components
- Efficient 5-minute caching for performance
- Fallback placeholders for graceful degradation
- Admin interface to assign images to placements

## Quick Steps

### 1. Access Image Management (Placements)

```
1. Go to /admin
2. Enter ADMIN_KEY
3. Click "Placements" tab (next to "Media")
```

### 2. Upload an Image

```
1. Click "Media" tab
2. Click "Upload Media"
3. Select image file
4. Fill in: Type, Title, Description
5. Click "Upload"
```

### 3. Assign Image to Placement

```
1. Go to "Placements" tab
2. Click placement in left panel (e.g., "Header Logo")
3. Select category (e.g., "header") - optional
4. Click image in grid to select
5. Click "Assign Selected Media"
6. Done!
```

### 4. Update Image on Website

Image appears automatically on your website. No code deployment needed.

## Placements Available

| Placement | Where It Shows | Required |
|-----------|---|---|
| header-logo | Top left of every page | Yes |
| hero-background | Large background on homepage | Yes |
| overview-image-1 | Overview section | No |
| portfolio-1 | Portfolio section image 1 | No |
| portfolio-2 | Portfolio section image 2 | No |
| testimonial-avatar-1 | Testimonial 1 avatar | No |
| testimonial-avatar-2 | Testimonial 2 avatar | No |
| testimonial-avatar-3 | Testimonial 3 avatar | No |
| footer-logo | Bottom of every page | No |

## Common Tasks

### Change Logo

```
1. Upload new logo (Media tab)
2. Go to Placements tab
3. Click "Header Logo"
4. Select new logo from grid
5. Click "Assign Selected Media"
```

### Change Hero Background

```
1. Upload hero image (Media tab)
2. Go to Placements tab
3. Click "Hero Background"
4. Select image
5. Click "Assign Selected Media"
```

### Remove Image Assignment

```
1. Go to Placements tab
2. Select placement
3. Click "Remove Assignment"
```

### Update Image Metadata

```
1. Go to Media tab
2. Click image to select
3. Edit title, description, alt text
4. Click "Save"
```

## Performance Tips

- Images are cached for 5 minutes
- No performance penalty vs hardcoded URLs
- Uses Next.js Image optimization
- Lazy loads by default (except headers/heroes)

## Troubleshooting

**Image not showing?**
1. Check it's uploaded (Media tab)
2. Check it's assigned (Placements tab)
3. Hard refresh browser (Ctrl+Shift+R)
4. Check file size isn't huge

**Seeing placeholder?**
1. Image might not be assigned
2. Check placement configuration
3. Try uploading a new image

**Assignment not working?**
1. Verify ADMIN_KEY is correct
2. Check browser console for errors
3. Try refreshing page

## File Locations

- Images stored in: `.data/media.json`
- Placements stored in: `.data/image-gallery.json`
- Components use: `AdminImage` component
- Utilities in: `lib/image-utils.ts`

## API Reference (Optional)

Fetch images programmatically:

```typescript
// Get image by placement
import { fetchImageByPlacement } from '@/lib/image-utils'

const headerLogo = await fetchImageByPlacement('header-logo')
console.log(headerLogo?.url)

// Get all images in category
import { fetchImagesByCategory } from '@/lib/image-utils'

const testimonialAvatars = await fetchImagesByCategory('testimonials')
```

## Next Steps

1. ✅ Upload your first image (Media tab)
2. ✅ Assign it to a placement (Placements tab)
3. ✅ See it appear on your website!
4. ✅ Update anytime without redeploying

## Need More Help?

See: `IMAGE_MANAGEMENT_GUIDE.md` for complete documentation

---

**Time to get started**: 2 minutes
**Time to update website images**: 30 seconds
**Complexity**: Beginner-friendly
