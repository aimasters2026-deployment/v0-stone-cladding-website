# Admin Dashboard & Message Routing System

## Overview

The advanced messaging and media management system provides administrators with:
- Dynamic message routing based on message type
- Real-time message history and analytics
- Portfolio media management with upload and organization
- No-code configuration of message destinations

## Access

### Admin Dashboard URL
```
/admin
```

### Authentication
1. Navigate to `/admin`
2. Enter your `ADMIN_KEY` from environment variables
3. Access granted to all admin features

## Features

### 1. Message Routing Configuration

**Location:** Admin Dashboard > Routing Tab

Configure where messages are routed based on their type:

#### Message Types
- **Consultation**: General project consultations
- **Project**: Specific project inquiries
- **Support**: Technical support requests
- **Material**: Material selection and specifications
- **Partnership**: Business partnership opportunities

#### Routing Destinations
For each message type, configure:
- **Email**: Send to specific email addresses
- **Webhook**: POST to external services (Slack, Discord, Teams)
- **Database**: Store in message history (always enabled)

#### Example Configuration
```json
{
  "Consultation": {
    "email": ["sales@octo21st.com"],
    "webhook": "https://hooks.slack.com/services/YOUR/WEBHOOK"
  },
  "Project": {
    "email": ["projects@octo21st.com", "ceo@octo21st.com"]
  }
}
```

### 2. Message History

**Location:** Admin Dashboard > Messages Tab

View all received messages with:
- Message type and content
- Sender information (name, email, phone)
- Timestamp and status
- Search and filter capabilities
- Export options (coming soon)

### 3. Media Management

**Location:** Admin Dashboard > Media Tab

#### Supported Formats
- **Images**: JPG, PNG, WebP (max 10MB)
- **Videos**: MP4, WebM (max 100MB)

#### Available Categories
- Hero Images
- Portfolio Projects
- Process Images
- Team Images
- Testimonial Images

#### Operations
- Upload new media with category
- Edit metadata (title, description, alt text)
- Set featured status
- Delete media
- Preview before publishing

## API Endpoints

### Messages API

#### Create Message
```
POST /api/messages
Content-Type: application/json

{
  "type": "Consultation",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234...",
  "company": "Acme Corp",
  "message": "Interested in stone cladding"
}
```

#### Get All Messages
```
GET /api/messages?type=Consultation&limit=10
```

#### Delete Message
```
DELETE /api/messages/[id]
Headers: x-admin-key: YOUR_ADMIN_KEY
```

### Configuration API

#### Get Current Configuration
```
GET /api/config
Headers: x-admin-key: YOUR_ADMIN_KEY
```

#### Update Configuration
```
POST /api/config
Headers: x-admin-key: YOUR_ADMIN_KEY
Content-Type: application/json

{
  "Consultation": {
    "email": ["email@example.com"],
    "webhook": "https://webhook.url"
  }
}
```

### Media API

#### Upload Media
```
POST /api/media
Headers: x-admin-key: YOUR_ADMIN_KEY
Content-Type: multipart/form-data

FormData:
- file: <File>
- category: "Hero Images"
- title: "Building Facade"
- description: "Professional stone cladding installation"
- altText: "Modern building with stone cladding"
```

#### Get All Media
```
GET /api/media?category=Hero Images
```

#### Update Media
```
PUT /api/media/[id]
Headers: x-admin-key: YOUR_ADMIN_KEY
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "New description",
  "featured": true
}
```

#### Delete Media
```
DELETE /api/media/[id]
Headers: x-admin-key: YOUR_ADMIN_KEY
```

## Frontend Components

### Advanced Consultation Component

Integrated into the contact section with:
- Visual message type selector with SVG icons
- Form validation
- Auto-routing based on configuration
- Success/error feedback

### Usage
```tsx
import AdvancedConsultation from '@/components/advanced-consultation'

export default function ContactPage() {
  return (
    <div>
      <AdvancedConsultation />
    </div>
  )
}
```

## Database Structure

### Messages Collection
```
{
  id: string
  type: "Consultation" | "Project" | "Support" | "Material" | "Partnership"
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  createdAt: string
  status: "new" | "read" | "responded"
}
```

### Configuration Structure
```
{
  [MessageType]: {
    email: string[]
    webhook?: string
  }
}
```

### Media Structure
```
{
  id: string
  url: string
  category: string
  title: string
  description: string
  altText: string
  featured: boolean
  uploadedAt: string
  size: number
}
```

## Best Practices

1. **Message Routing**: Always configure at least email routing for important message types
2. **Webhook Integration**: Test webhook URLs before saving
3. **Media Organization**: Use consistent naming for media files
4. **Backups**: Regularly export message data as backup
5. **Admin Key**: Keep your ADMIN_KEY secure, never commit to git

## Troubleshooting

### Authentication Failed
- Verify ADMIN_KEY environment variable is set
- Check key format (no spaces or special characters)
- Clear browser cache and try again

### Messages Not Routing
- Confirm routing configuration is saved
- Check webhook URLs are valid and responding
- Verify email addresses are correct
- Check server logs for routing errors

### Media Upload Issues
- Ensure file size is within limits
- Verify file format is supported
- Check browser file permissions
- Try different browser if issues persist

## Environment Variables

Required:
```
ADMIN_KEY=your_secure_admin_key
```

Optional:
```
NEXT_PUBLIC_ADMIN_KEY=same_as_admin_key  # For frontend auth
```

## Security Notes

- Admin endpoints require valid ADMIN_KEY header
- All data is validated and sanitized
- Messages are stored securely
- Webhook payloads are rate-limited
- Consider adding additional authentication layers for production
