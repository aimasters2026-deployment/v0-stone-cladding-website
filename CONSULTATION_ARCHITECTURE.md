# Consultation Popup System - Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ROOT LAYOUT (app/layout.tsx)                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           ConsultationProvider (Context)                   │  │
│  │  • Manages global popup state (isOpen)                    │  │
│  │  • Provides openConsultation/closeConsultation methods    │  │
│  │  • Handles body scroll prevention                         │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │           Application Content                        │  │  │
│  │  │                                                       │  │  │
│  │  │  ┌──────────────────────────────────────────────┐   │  │  │
│  │  │  │          Page Component                       │   │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │   │  │  │
│  │  │  │  │   ConsultationButton                    │ │   │  │  │
│  │  │  │  │   • Click → openConsultation()         │ │   │  │  │
│  │  │  │  │   • Configurable text/size/style       │ │   │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │   │  │  │
│  │  │  │                                                │   │  │  │
│  │  │  └──────────────────────────────────────────────┘   │  │  │
│  │  │                                                       │  │  │
│  │  │  ┌──────────────────────────────────────────────┐   │  │  │
│  │  │  │          Admin Dashboard                     │   │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │   │  │  │
│  │  │  │  │ ConsultationManagement (Admin Panel)   │ │   │  │  │
│  │  │  │  │ • Edit popup content                   │ │   │  │  │
│  │  │  │  │ • Manage channels                      │ │   │  │  │
│  │  │  │  │ • Customize colors                     │ │   │  │  │
│  │  │  │  │ • Preview + Save                       │ │   │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │   │  │  │
│  │  │  │                                                │   │  │  │
│  │  │  └──────────────────────────────────────────────┘   │  │  │
│  │  │                                                       │  │  │
│  │  │  ┌──────────────────────────────────────────────┐   │  │  │
│  │  │  │        ConsultationPopup                      │   │  │  │
│  │  │  │  • Modal with backdrop                       │   │  │  │
│  │  │  │  • Animated entrance/exit                    │   │  │  │
│  │  │  │  • Displays config from API                  │   │  │  │
│  │  │  │  • Renders contact channels                  │   │  │  │
│  │  │  │  • Handles deep linking                      │   │  │  │
│  │  │  │  • Copy-to-clipboard                         │   │  │  │
│  │  │  └──────────────────────────────────────────────┘   │  │  │
│  │  │                                                       │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
│                  /api/consultation/route.ts                      │
│                                                                 │
│  GET /api/consultation                                          │
│  • Retrieves configuration (public)                             │
│  • Response: ConsultationConfig JSON                            │
│                                                                 │
│  PUT /api/consultation                                          │
│  • Updates configuration (admin-only)                           │
│  • Requires: x-admin-key header                                 │
│  • Input: Partial<ConsultationConfig>                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                    │
│                        (Database)                                │
│                                                                 │
│  lib/db.ts                                                      │
│  • ConsultationChannel type                                     │
│  • ConsultationConfig type                                      │
│  • getConsultationConfig()                                      │
│  • saveConsultationConfig()                                     │
│  • updateConsultationConfig()                                   │
│                                                                 │
│  .data/consultation-config.json                                 │
│  • Persistent JSON storage                                      │
│  • Server-side (survives restarts)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
ConsultationProvider (Context Provider)
    │
    ├── Provides: { isOpen, openConsultation, closeConsultation }
    │
    └── ConsultationPopup (Portal-like)
        │
        ├── Backdrop (AnimatePresence)
        │   └── onClick: closeConsultation if enabled
        │
        ├── Modal Container (Animated)
        │   │
        │   ├── Header
        │   │   ├── Title (Animated)
        │   │   ├── Subtitle (Animated)
        │   │   └── Close Button (Animated)
        │   │
        │   ├── Channels Grid (Responsive: 1-3 columns)
        │   │   │
        │   │   ├── ContactChannelButton (Animated)
        │   │   │   ├── Icon (Animated on hover)
        │   │   │   ├── Label
        │   │   │   ├── Value
        │   │   │   └── Copy Button
        │   │   │
        │   │   ├── ContactChannelButton
        │   │   │
        │   │   └── ... (more buttons per enabled channels)
        │   │
        │   └── Footer
        │       └── "We typically respond within 24 hours"
        │
        └── (Only renders when isOpen === true)

ConsultationButton (Trigger)
    │
    ├── Props: { text?, variant?, size?, className? }
    │
    └── onClick: useConsultation().openConsultation()

ConsultationManagement (Admin Panel)
    │
    ├── Fetch current config (GET /api/consultation)
    │
    ├── Form Section
    │   ├── Title Input
    │   ├── Subtitle Input
    │   ├── Color Pickers
    │   └── Animation Controls
    │
    ├── Channel Management
    │   ├── Add Button
    │   └── Channel List (map over channels)
    │       ├── Type Dropdown
    │       ├── Label Input
    │       ├── Value Input
    │       ├── Active Toggle
    │       └── Delete Button
    │
    ├── Preview Panel
    │   └── Mock ConsultationPopup (read-only)
    │
    └── Save Button
        └── PUT /api/consultation (with x-admin-key header)
```

## Data Flow Diagram

### User Opens Popup

```
User clicks ConsultationButton
        │
        ├─→ useConsultation() hook
        │   └─→ openConsultation()
        │       └─→ setIsOpen(true)
        │
        └─→ ConsultationPopup
            ├─→ useEffect: fetchConfig()
            │   └─→ GET /api/consultation
            │       └─→ Retrieve ConsultationConfig
            │
            └─→ Render with config
                ├─→ Animate entrance (scale + fade)
                ├─→ Map over enabled channels
                └─→ Render ContactChannelButton for each
```

### User Selects Contact Method

```
User clicks ContactChannelButton
        │
        ├─→ handleContactClick(channel)
        │
        ├─→ Build deep link based on channel.type
        │   ├─→ phone: tel://number
        │   ├─→ email: mailto://email
        │   ├─→ gmail: mailto://email
        │   ├─→ whatsapp: https://wa.me/number
        │   └─→ telegram: https://t.me/username
        │
        └─→ window.open(url, '_blank')
            └─→ Opens in native app or web service
```

### Admin Updates Configuration

```
Admin clicks Save in ConsultationManagement
        │
        ├─→ Validate form inputs
        │
        ├─→ PUT /api/consultation
        │   ├─→ Header: x-admin-key
        │   └─→ Body: Updated ConsultationConfig
        │
        ├─→ API checks admin key (authenticates)
        │
        ├─→ updateConsultationConfig(updates)
        │   ├─→ Read current config
        │   ├─→ Merge updates
        │   ├─→ Update timestamp
        │   └─→ Write to JSON file
        │
        └─→ Response: Updated ConsultationConfig
            ├─→ Admin sees success message
            └─→ Preview automatically updates
```

## Type System

```typescript
// Core Types
interface ConsultationChannel {
  id: string
  type: 'phone' | 'email' | 'gmail' | 'whatsapp' | 'telegram'
  label: string
  value: string
  enabled: boolean
  icon?: string
}

interface ConsultationConfig {
  id: string
  title: string
  subtitle: string
  channels: ConsultationChannel[]
  backgroundColor: string     // CSS color
  accentColor: string         // CSS color
  buttonColor: string         // CSS color
  buttonTextColor: string     // CSS color
  animationDuration: number   // milliseconds
  animationEnabled: boolean
  closeOnBackdropClick: boolean
  createdAt: string          // ISO timestamp
  updatedAt: string          // ISO timestamp
}

// Context Type
interface ConsultationContextType {
  isOpen: boolean
  openConsultation: () => void
  closeConsultation: () => void
}

// Component Props
interface ConsultationButtonProps {
  text?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface ConsultationManagementProps {
  adminKey: string
}
```

## State Management

### Global State (Context)
```typescript
ConsultationProvider
├── isOpen: boolean
├── openConsultation: () => void
└── closeConsultation: () => void
```

### Component State (ConsultationPopup)
```typescript
const [config, setConfig] = useState<ConsultationConfig>()
const [loading, setLoading] = useState(boolean)
const [copiedId, setCopiedId] = useState<string>()
```

### Component State (ConsultationManagement)
```typescript
const [config, setConfig] = useState<ConsultationConfig>()
const [loading, setLoading] = useState(boolean)
const [saving, setSaving] = useState(boolean)
const [message, setMessage] = useState<{ type, text }>()
const [showPreview, setShowPreview] = useState(boolean)
```

### Persistent State
```
.data/consultation-config.json (Server-side)
localStorage (Admin session key only)
```

## API Endpoints

### GET /api/consultation
```
Request:  GET /api/consultation

Response: ConsultationConfig
{
  "id": "1",
  "title": "Get In Touch",
  "subtitle": "Choose your preferred contact method",
  "channels": [...],
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

Status: 200 OK
Errors: 500 Internal Server Error
```

### PUT /api/consultation
```
Request:
  Headers:
    x-admin-key: <your_admin_key>
    Content-Type: application/json
  
  Body: Partial<ConsultationConfig>
  {
    "title": "New Title",
    "accentColor": "#3b82f6",
    ...
  }

Response: Updated ConsultationConfig

Status: 200 OK
Errors:
  - 401 Unauthorized (invalid/missing admin key)
  - 500 Internal Server Error
```

## File Storage

### Directory Structure
```
.data/
├── consultation-config.json      (Main configuration)
├── consultation-config.backup.json (Manual backup)
├── messages.json
├── config.json
├── media.json
└── materials.json
```

### consultation-config.json Format
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
    },
    // ... more channels
  ],
  "backgroundColor": "rgba(10, 10, 10, 0.95)",
  "accentColor": "#ff8c42",
  "buttonColor": "#ff8c42",
  "buttonTextColor": "#ffffff",
  "animationDuration": 300,
  "animationEnabled": true,
  "closeOnBackdropClick": true,
  "createdAt": "2024-05-12T00:00:00.000Z",
  "updatedAt": "2024-05-12T00:00:00.000Z"
}
```

## Responsive Breakpoints

### Tailwind Classes Used
```
Mobile (<640px):
  - Modal: full width (w-full max-w-md with p-4)
  - Grid: 1 column
  - Padding: p-3 sm:p-8 (scales up)
  - Font: text-sm sm:text-base

Tablet (640px - 1024px):
  - Modal: centered, flexible width
  - Grid: 2-3 columns gap-3 sm:gap-4
  - Padding: balanced

Desktop (>1024px):
  - Modal: 500px max width, centered
  - Grid: 3 columns gap-4
  - Padding: generous (p-8)
  - Font: text-base and above
```

## Animation System

### Framer Motion Configuration
```typescript
// Container variants
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: animationDuration / 1000 }
}

// Modal variants
{
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: {
    duration: animationDuration / 1000,
    type: 'spring',
    stiffness: 400,
    damping: 30
  }
}

// Channel items (staggered)
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: animationDuration * (0.1 + index * 0.1) }
}

// Button hover
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
```

## Performance Considerations

### Optimizations
1. **No layout shifts**: Uses `transform` and `opacity` only
2. **GPU acceleration**: Animations use `will-change`
3. **Lazy loading**: Config fetched on mount
4. **Context memoization**: Provider doesn't recreate context object
5. **AnimatePresence**: Proper exit animations without janky transitions
6. **Zero runtime overhead**: Type-safe with no prop drilling

### Bundle Impact
- ConsultationPopup: ~241 lines
- ConsultationButton: ~45 lines
- ConsultationProvider: ~42 lines
- Dependencies: Framer Motion (already in project)
- **Total addition**: ~8KB gzipped

## Security Architecture

### Authentication Flow
```
Admin accesses /admin
    │
    ├─→ Request localStorage for adminKey
    │   └─→ If exists, show dashboard
    │
    └─→ If not, show login form
        │
        ├─→ User enters ADMIN_KEY
        │
        ├─→ Verify by calling GET /api/config with x-admin-key header
        │   └─→ If 200 OK, key is valid
        │
        └─→ Store in localStorage for session
            └─→ Show dashboard
```

### API Security
```
PUT /api/consultation
    │
    ├─→ Extract x-admin-key header
    │
    ├─→ Compare with process.env.ADMIN_KEY
    │   ├─→ If match: process request
    │   └─→ If no match: return 401 Unauthorized
    │
    └─→ Update configuration
        └─→ Return success response
```

## Extensibility

### Adding New Channel Type

1. **Update type**:
```typescript
type ChannelType = 'phone' | 'email' | 'gmail' | 'whatsapp' | 'telegram' | 'linkedin'
```

2. **Add handler**:
```typescript
case 'linkedin':
  url = `https://linkedin.com/company/octo21st`
  break
```

3. **Add icon**:
```typescript
case 'linkedin':
  return <Linkedin className="w-6 h-6" />
```

4. **Add to admin select**:
```typescript
<option value="linkedin">LinkedIn</option>
```

### Adding New Customization Option

1. **Add to ConsultationConfig type**:
```typescript
interface ConsultationConfig {
  // ... existing fields
  customNewField: string
}
```

2. **Update API**:
```typescript
// Handled automatically by PUT endpoint
```

3. **Add admin control**:
```typescript
<input
  value={config.customNewField}
  onChange={(e) => setConfig({...config, customNewField: e.target.value})}
/>
```

4. **Use in popup**:
```typescript
<div>{config.customNewField}</div>
```

## Testing Strategy

### Unit Tests (Components)
- ConsultationButton renders with props
- ConsultationPopup renders when isOpen
- Channel buttons trigger handleContactClick

### Integration Tests
- Admin creates channel
- Configuration persists
- Popup shows updated config

### E2E Tests
- User clicks button → popup opens
- User selects channel → deep link works
- Admin updates config → popup reflects changes

## Deployment Considerations

### Environment Variables
```env
ADMIN_KEY=your_secure_password_here
NODE_ENV=production
```

### File Permissions
- `.data/` directory must be writable
- No special permissions needed (standard app directory)

### Database
- File-based (no external DB required)
- Survives server restarts
- Can be backed up with `.data/` directory

### Scaling
- Single-instance deployment (file-based)
- For multi-instance: migrate to database
- Current implementation suitable for SMB

## Future Architecture Improvements

### For Multi-Instance
- Migrate `.data/consultation-config.json` to database
- Add cache layer (Redis) for config
- Webhook/event system for config updates

### For Enhanced Features
- Add audit logging for admin actions
- Implement versioning for configurations
- Add A/B testing framework
- Email notification system

### For Advanced Analytics
- Track popup opens/closes
- Track channel selections
- Track engagement metrics
- Export analytics reports
