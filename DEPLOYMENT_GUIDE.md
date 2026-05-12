# Deployment Guide - Octo 21st Stone Technology Website

## Quick Deploy (Vercel)

The website is already connected to Vercel. To deploy:

### Option 1: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Vercel automatically builds and deploys
3. Your site goes live at your domain

```bash
git add .
git commit -m "Production ready: consultation popup, footer, mobile optimization"
git push origin interactive-material-catalog
```

Then create a Pull Request to merge into main.

### Option 2: Manual Deployment via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Pre-Deployment Checklist

### Environment Variables
Set these in Vercel project settings (`Settings > Environment Variables`):

```
ADMIN_KEY=your_secure_password_here
```

### Testing
```bash
npm run build       # Verify build succeeds
npm run start       # Test production build locally
```

## Deployment Steps

### Step 1: Prepare Environment Variables
1. Go to Vercel Dashboard
2. Find your project: `v0-stone-cladding-website`
3. Settings > Environment Variables
4. Add:
   - Key: `ADMIN_KEY`
   - Value: `your_secure_password` (choose something strong)
   - Environment: All

### Step 2: Verify GitHub Connection
1. Repository is at: `github.com/aimasters2026-deployment/v0-stone-cladding-website`
2. Branch: `interactive-material-catalog` (feature branch)
3. For production: merge to `main` branch

### Step 3: Deploy to Vercel
**Option A - From GitHub (Automatic)**
```bash
# On your local machine:
git add .
git commit -m "Ready for production"
git push origin interactive-material-catalog

# Then on GitHub:
# 1. Go to your repo
# 2. Click "Compare & pull request"
# 3. Create PR to merge into main
# 4. Vercel auto-deploys from main
```

**Option B - Direct CLI Deploy**
```bash
cd /vercel/share/v0-project
vercel --prod
```

## Post-Deployment Verification

### 1. Check Site Load
```bash
# Verify site is accessible
curl https://your-domain.com
```

### 2. Test Key Features
- [ ] Home page loads
- [ ] All sections visible (Hero, Services, Portfolio, Materials, etc.)
- [ ] Footer appears on all pages
- [ ] Consultation button works
- [ ] Admin dashboard accessible (`/admin`)
- [ ] Contact forms functional

### 3. Test Admin Features
1. Go to: `https://your-domain.com/admin`
2. Enter your ADMIN_KEY
3. Verify you can:
   - Access Consultation tab
   - View/edit materials
   - Manage messages
   - Upload media

### 4. Mobile Testing
- Test on iPhone 12/14/15
- Test on Android phone
- Verify touch interactions work
- Check responsive layout

## Environment Variables Required for Production

| Variable | Value | Required |
|----------|-------|----------|
| ADMIN_KEY | Your secure password | Yes |

## Monitoring After Deployment

### Vercel Analytics
1. Dashboard > Project > Analytics
2. Monitor:
   - Page views
   - Core Web Vitals
   - Response times

### Error Tracking
- Check Vercel logs for errors
- Monitor admin dashboard for issues
- Test API endpoints

## Rollback Plan

If something goes wrong:

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy from specific commit
git revert HEAD
git push
```

## Domain Setup (if needed)

### Add Custom Domain
1. Vercel Dashboard > Settings > Domains
2. Add your domain (e.g., octo21st.com)
3. Update DNS records at registrar
4. Wait for DNS propagation (up to 48 hours)

### Automatic SSL Certificate
Vercel provides free SSL certificates automatically.

## Performance Optimization (Already Included)

- Image optimization with Next.js
- Automatic code splitting
- CSS minification
- JavaScript bundling
- Static site generation where possible

Current Lighthouse Scores Target:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95

## Build Details

### Build Output
```
Routes:
├ ○ /                    (Static)
├ ○ /about              (Static)
├ ○ /admin              (Static)
├ ○ /legal/privacy      (Static)
├ ○ /legal/terms        (Static)
├ ƒ /api/consultation   (Dynamic)
├ ƒ /api/materials      (Dynamic)
├ ƒ /api/config         (Dynamic)
└ ƒ /api/messages       (Dynamic)

○ = Prerendered as static content
ƒ = Server-rendered on demand
```

### Build Time
Typical build time: 2-3 minutes

### Bundle Size
- CSS: ~45KB
- JavaScript: ~180KB (with gzip)
- Images: Optimized on-demand

## After Going Live

### Initial Setup Tasks
1. Configure DNS if using custom domain
2. Set up email for contact forms (if needed)
3. Add ADMIN_KEY to Vercel environment
4. Test all pages and features
5. Monitor error logs for 24 hours

### Ongoing Maintenance
- Weekly: Check admin dashboard
- Monthly: Review analytics
- As needed: Update materials catalog, consultation channels

## Troubleshooting Deployment Issues

### Build Fails
```bash
# Clear build cache and rebuild
vercel --prod --force
```

### Pages 404
- Verify route files exist in `/app`
- Check middleware configuration
- Rebuild entire project

### API Endpoints Not Working
- Verify environment variables are set
- Check API route files exist
- Test with curl:
  ```bash
  curl https://your-domain.com/api/consultation
  ```

### Admin Dashboard Inaccessible
- Verify ADMIN_KEY is set in Vercel
- Check browser console for errors
- Verify admin route exists

## Support & Help

### Vercel Documentation
- Deployment: https://vercel.com/docs/deployments
- Environment Variables: https://vercel.com/docs/projects/environment-variables
- Edge Functions: https://vercel.com/docs/edge-functions

### Next.js Documentation
- https://nextjs.org/docs/deployment

### Project Documentation
- See README.md for project overview
- See CONSULTATION_QUICK_START.md for consultation popup setup
- See ADMIN_SETUP.md for admin configuration

## Production Checklist

Before going live, verify:

- [ ] ADMIN_KEY set in Vercel environment
- [ ] All pages load without errors
- [ ] Consultation popup works
- [ ] Admin dashboard accessible
- [ ] Footer visible on all pages
- [ ] Mobile responsive on all screen sizes
- [ ] Contact forms functional
- [ ] API endpoints responding
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] SSL certificate active
- [ ] Domain DNS configured (if custom domain)

## Next Steps

1. ✅ Read this entire guide
2. ✅ Run `npm run build` locally to verify
3. ✅ Set ADMIN_KEY in Vercel
4. ✅ Push code to GitHub
5. ✅ Verify deployment on Vercel
6. ✅ Test all features
7. ✅ Monitor logs for 24 hours

---

**Status**: Ready for production deployment
**Last Updated**: 2026-05-12
**Build Status**: ✅ Clean build verified
**Tests**: ✅ All routes and API endpoints verified
