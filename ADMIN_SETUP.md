# Admin Dashboard Setup Guide

## Quick Start

### 1. Set Your Admin Key

Create a `.env.local` file in the project root:

```env
ADMIN_KEY=your_secure_admin_key_here
```

**Example for development:**
```env
ADMIN_KEY=demo123456
```

**For production, use a strong key:**
```env
ADMIN_KEY=super_secret_key_with_random_characters_123456789
```

### 2. Restart the Development Server

After adding the environment variable, restart your dev server:

```bash
npm run dev
```

The environment variable will be loaded automatically.

### 3. Access the Admin Dashboard

1. Navigate to `http://localhost:3000/admin`
2. You'll see a login form requesting the admin key
3. Enter the `ADMIN_KEY` value you set in `.env.local`
4. Click "Authenticate"

### 4. Admin Features

Once authenticated, you can manage:

#### **Message Routing**
- Configure where contact form submissions go
- Manage multiple email recipients
- Set up forwarding rules

#### **Messages**
- View all contact form submissions
- Search and filter messages
- Delete old messages
- Export message data

#### **Media Management**
- Upload images and videos
- Manage media assets
- View file sizes and metadata
- Delete unused media

#### **Materials Catalog** (New)
- Add new stone materials
- Edit existing materials
- Delete materials with confirmation
- Upload material images
- Set material specifications:
  - Category
  - Durability
  - Cost level
  - Maintenance requirements
  - Applications
  - Features/benefits

---

## Materials Catalog Admin Features

### Adding a Material

1. Go to **Materials** tab
2. Click **"Add Material"**
3. Fill in the form:
   - **Name**: Material name (e.g., "Black Granite Classic")
   - **Category**: Type of stone (e.g., "Natural Stone")
   - **Description**: Brief description
   - **Durability**: Expected lifespan (e.g., "50+ years")
   - **Cost**: Price level (Premium, Mid-range, Budget)
   - **Maintenance**: Maintenance frequency (Low, Medium, High)
   - **Applications**: Where it's used
   - **Image URL**: Link to material image
   - **Features**: Comma-separated list of features
4. Click **"Add Material"**
5. Material appears immediately in catalog

### Editing a Material

1. Find the material in the list
2. Click the **Edit** button (pencil icon)
3. Modal opens with current values pre-filled
4. Update any fields
5. Click **"Update Material"**
6. Changes appear immediately on the website

### Deleting a Material

1. Find the material in the list
2. Click the **Delete** button (trash icon)
3. Confirmation dialog appears
4. Click **"Delete"** to confirm
5. Material is removed from catalog

---

## API Authentication Details

### How It Works

All material operations send your admin key in the request header:

```
x-admin-key: your_secure_admin_key_here
```

### Protected Endpoints

#### GET /api/materials
**Public** - No authentication needed

```bash
curl https://yoursite.com/api/materials
```

Response:
```json
{
  "materials": [
    {
      "id": "1715123456789",
      "name": "Black Granite Classic",
      "category": "Natural Stone",
      ...
    }
  ]
}
```

#### POST /api/materials
**Admin only** - Requires valid admin key

```bash
curl -X POST https://yoursite.com/api/materials \
  -H "x-admin-key: your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Material",
    "category": "Natural Stone",
    ...
  }'
```

#### PUT /api/materials
**Admin only** - Requires valid admin key

```bash
curl -X PUT https://yoursite.com/api/materials \
  -H "x-admin-key: your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1715123456789",
    "name": "Updated Material",
    ...
  }'
```

#### DELETE /api/materials?id=1715123456789
**Admin only** - Requires valid admin key

```bash
curl -X DELETE "https://yoursite.com/api/materials?id=1715123456789" \
  -H "x-admin-key: your_key"
```

---

## Security Best Practices

### Development
- Use simple keys for testing (demo123456)
- Store `.env.local` in `.gitignore` (already configured)
- Never commit real keys to git

### Production
- Generate strong random key: `openssl rand -hex 32`
- Store key in production environment variables (Vercel dashboard)
- Use HTTPS for all API calls
- Rotate keys periodically
- Monitor admin access logs

### Example Strong Key
```
ADMIN_KEY=a7f3d9c2e1b4a6f5d8c2e1b4a6f5d8c2e1b4a6f5d8c2e1b4a6f5d8c2e1b4
```

---

## Troubleshooting

### "Unauthorized" Error

**Problem**: Admin key is invalid

**Solution**:
1. Check `.env.local` file exists
2. Verify the key matches exactly (case-sensitive)
3. Restart dev server after changing `.env.local`
4. Check for extra spaces before/after key

### Materials Not Appearing

**Problem**: New materials not showing in catalog

**Solution**:
1. Refresh the page
2. Check browser console for API errors
3. Verify admin key was correct when adding
4. Check `.data/materials.json` file exists

### Admin Page Not Loading

**Problem**: Admin dashboard shows blank

**Solution**:
1. Check browser console for JavaScript errors
2. Verify `/admin` route exists
3. Try hard refresh (Ctrl+Shift+R)
4. Clear browser cache

---

## Default Sample Data

The system comes with 6 sample materials:
1. Black Granite Classic
2. White Marble Elegance
3. Sandstone Warm Tone
4. Slate Grey Contemporary
5. Limestone Soft Beige
6. Basalt Dark Premium

You can edit or delete these materials anytime through the admin panel.

---

## Support

For issues or questions:
1. Check `REFINEMENTS.md` for detailed feature documentation
2. Review API route code in `/app/api/materials/route.ts`
3. Check material management component at `/components/admin/materials-management.tsx`
4. Verify database structure in `/lib/db.ts`

Happy managing! 🎉
