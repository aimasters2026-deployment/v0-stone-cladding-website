# Quick Start Guide

## 🚀 Getting Started (2 minutes)

### 1. Setup Environment
```bash
# Set your admin key
echo "ADMIN_KEY=your_secure_key_here" > .env.local
```

### 2. Install & Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

### 3. Test the Website
- **Home Page**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Add Materials**: Click "Materials" tab in admin → "Add Material"

---

## 📱 Mobile & Desktop Testing

### Browser DevTools
1. Open Chrome/Firefox
2. Press `F12` (DevTools)
3. Click mobile device icon (top-left)
4. Test breakpoints:
   - **Mobile**: 375 × 667 (iPhone)
   - **Tablet**: 768 × 1024 (iPad)
   - **Desktop**: 1920 × 1080 (Full HD)

### What to Test
- ✓ Cards stack vertically on mobile
- ✓ Hover effects work on desktop
- ✓ Animations run at 60fps
- ✓ Text is readable on all sizes
- ✓ Images scale responsively

---

## 🎨 Key Features

### Materials Catalog
- Click "Details" button to expand/collapse information
- Filter by category using buttons at top
- Hover effects: Card lifts with orange glow
- Responsive: Minimized on mobile, full on desktop

### Testimonials
- Avatars scale on hover (with glow)
- Stars rotate on hover
- Cards lift on hover
- Responsive spacing and sizing

### Portfolio
- Project cards lift and scale on hover
- Images zoom smoothly on hover
- Text truncates on mobile for readability
- Grid adapts: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)

### Admin Dashboard
- Click "Materials" tab
- View all materials in a list
- Click "Edit" to modify
- Click "Delete" with confirmation
- Click "Add Material" to create new

---

## 🔐 Admin Authentication

### How It Works
1. Environment variable `ADMIN_KEY` in `.env.local`
2. Admin tab uses this key for API requests
3. Protected endpoints verify the key

### Testing
```bash
# Set in .env.local
ADMIN_KEY=super_secret_key_123

# Then access admin at:
# http://localhost:3000/admin
```

### For Production
```bash
# Generate secure key
openssl rand -base64 32

# Add to .env in Vercel dashboard:
# ADMIN_KEY=your_generated_key
```

---

## 📐 Responsive Breakpoints

### Mobile (< 640px)
```
- Single column cards
- Compact padding: p-3 (12px)
- Smaller images: h-40 (160px)
- Font size: text-xs/sm
```

### Tablet (640px - 1024px)
```
- Two column grid
- Medium padding: p-5 (20px)
- Medium images: h-48 (192px)
- Font size: text-sm/base
```

### Desktop (1024px+)
```
- Three column grid
- Generous padding: p-6 (28px)
- Large images: h-56 (224px)
- Font size: text-base/lg
```

---

## 🎬 Animation Reference

### Card Hover Effects
```
- Lift: -6px (y-axis)
- Glow: Orange shadow (rgba(255,140,66,0.2))
- Image scale: 1.15x
- Duration: 300-500ms
```

### Interactive Feedback
```
- Tap: Scale 0.95
- Category filter: Scale 1.05 on hover
- Avatar: Scale 1.12 with glow
- Duration: 200-300ms
```

### Entrance Animations
```
- Fade in + slide up
- Staggered: 50ms delay between items
- Duration: 600ms
- Trigger: On viewport visibility
```

---

## 🎯 Common Tasks

### Add a New Material
1. Go to `/admin`
2. Click "Materials" tab
3. Click "Add Material"
4. Fill in form:
   - Name (required)
   - Category (dropdown)
   - Description
   - Durability
   - Cost
   - Maintenance level
   - Applications
   - Image URL
   - Features (comma-separated)
5. Click "Add Material"

### Edit a Material
1. Go to `/admin` → Materials
2. Click "Edit" on the material
3. Update fields
4. Click "Save Changes"

### Delete a Material
1. Go to `/admin` → Materials
2. Click "Delete" on the material
3. Confirm in popup
4. Material removed immediately

### Filter Materials by Category
1. Go to home page
2. Scroll to "Choosing the Right Materials"
3. Click category button (All, Natural Stone, etc.)
4. Grid updates instantly
5. Click "All" to reset

---

## 🛠️ Development Tips

### Update Animations
- File: `lib/animations.ts`
- Add new variants for Framer Motion
- Use in components with `variants={yourVariant}`

### Change Colors
- File: `app/globals.css`
- Update CSS variables
- Orange accent: `#ff8c42`
- Background: `#0a0a0a`

### Modify Spacing
- Use Tailwind scale: `p-3`, `gap-6`
- Update responsive: `p-3 sm:p-5 lg:p-6`
- Check `RESPONSIVE_DESIGN_SUMMARY.md`

### Add New Section
1. Create component in `components/sections/`
2. Use animations from `lib/animations.ts`
3. Add to `app/page.tsx`
4. Test responsive at all breakpoints

---

## 📊 Performance Tips

### Monitor Animations
1. Open DevTools
2. Go to "Performance" tab
3. Record while scrolling
4. Check FPS (should be 60)
5. Look for smooth line (no spikes)

### Check Mobile Performance
1. Use Lighthouse (DevTools)
2. Run "Mobile" audit
3. Target score: 90+
4. Fix warnings

### Image Optimization
- Use responsive image URLs
- Images scale with CSS (not server-side)
- Modern formats: WebP support via Image component

---

## 🐛 Troubleshooting

### Animations Lagging
**Solution**: Check DevTools → Reduce animation complexity → Profile performance

### Mobile Menu Not Working
**Solution**: Clear cache → Hard refresh (Cmd+Shift+R) → Check console errors

### Admin Not Loading
**Solution**: Verify ADMIN_KEY set → Check .env.local file → Restart dev server

### Images Not Showing
**Solution**: Check URL validity → Verify CORS → Check network tab → Use valid image URL

### Hover Effects Not Visible
**Solution**: Use desktop (not mobile) → Check browser zoom → Verify CSS loaded

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **QUICK_START.md** | This file - 5-minute setup |
| **MOBILE_FIRST_OPTIMIZATION.md** | Mobile strategy details |
| **RESPONSIVE_DESIGN_SUMMARY.md** | Complete responsive guide |
| **VISUAL_DESIGN_REFERENCE.md** | Design system & colors |
| **FINAL_SUMMARY.md** | Full project overview |
| **ADMIN_SETUP.md** | Admin authentication |
| **MATERIALS_FEATURE.md** | Materials catalog feature |

---

## 🚀 Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Update website with mobile optimization"
git push origin main
```

### 2. Set Vercel Environment
```
Dashboard → Settings → Environment Variables
Add:
  ADMIN_KEY=your_secure_key_here
```

### 3. Deploy
```
Vercel automatically deploys on push
Or click "Deploy" button in Vercel dashboard
```

### 4. Test
```
Visit your Vercel URL
Test all features
Check mobile on phone
Verify admin panel works
```

---

## ✅ Pre-Launch Checklist

Before going live:
- [ ] Set ADMIN_KEY in environment
- [ ] Test admin panel fully
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Check all animations smooth
- [ ] Verify no console errors
- [ ] Test all category filters
- [ ] Test material expansion
- [ ] Verify testimonial avatars
- [ ] Check responsive images
- [ ] Run Lighthouse audit
- [ ] Test contact form
- [ ] Verify all links work

---

## 📞 Support

### Common Questions

**Q: How do I change the orange color?**
A: Edit `app/globals.css` - change `#ff8c42` to your color

**Q: How do I add more testimonials?**
A: Edit `components/sections/testimonials.tsx` - add to testimonials array

**Q: How do I change animation timing?**
A: Edit `lib/animations.ts` - adjust duration/delay values

**Q: How do I add new materials in code?**
A: Edit `.data/materials.json` directly or use admin panel

**Q: How do I customize responsive breakpoints?**
A: Use Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)

---

## 🎓 Learning Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Next.js**: https://nextjs.org/docs
- **Responsive Design**: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design

---

## 🎉 You're All Set!

Your website is now:
✅ Mobile-first responsive  
✅ Fully animated  
✅ Admin-manageable  
✅ Production-ready  
✅ Well-documented  

Happy building! 🚀

---

**Last Updated**: 2024  
**Version**: 2.0  
**Status**: Production Ready
