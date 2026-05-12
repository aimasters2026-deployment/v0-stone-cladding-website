import fs from 'fs'
import path from 'path'

const DB_DIR = path.join(process.cwd(), '.data')
const MESSAGES_FILE = path.join(DB_DIR, 'messages.json')
const CONFIG_FILE = path.join(DB_DIR, 'config.json')
const MEDIA_FILE = path.join(DB_DIR, 'media.json')
const MATERIALS_FILE = path.join(DB_DIR, 'materials.json')
const CONSULTATION_CONFIG_FILE = path.join(DB_DIR, 'consultation-config.json')

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

// Message Types
export type MessageType = 'consultation' | 'project' | 'support' | 'material' | 'partnership'

export interface Message {
  id: string
  type: MessageType
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  metadata?: Record<string, any>
  createdAt: string
  status: 'received' | 'processed' | 'archived'
}

export interface MessageConfig {
  messageTypes: {
    [key in MessageType]: {
      label: string
      description: string
      destinations: string[] // email addresses or webhook URLs
      enabled: boolean
    }
  }
  adminEmails: string[]
  webhooks: {
    [key: string]: {
      url: string
      active: boolean
      headers?: Record<string, string>
    }
  }
}

export interface MediaAsset {
  id: string
  type: 'hero-video' | 'hero-image' | 'portfolio-image' | 'thumbnail'
  title: string
  description: string
  filename: string
  url: string
  size: number
  uploadedAt: string
  metadata?: Record<string, any>
}

export interface Material {
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

export interface ConsultationChannel {
  id: string
  type: 'phone' | 'email' | 'gmail' | 'whatsapp' | 'telegram'
  label: string
  value: string // phone number, email, username, etc.
  enabled: boolean
  icon?: string // icon name for UI
}

export interface ConsultationConfig {
  id: string
  title: string
  subtitle: string
  channels: ConsultationChannel[]
  backgroundColor: string // hex color
  accentColor: string // hex color
  buttonColor: string // hex color
  buttonTextColor: string // hex color
  animationDuration: number // ms
  animationEnabled: boolean
  closeOnBackdropClick: boolean
  createdAt: string
  updatedAt: string
}

// Initialize default config if not exists
function initializeConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
  }

  const defaultConfig: MessageConfig = {
    messageTypes: {
      consultation: {
        label: 'Consultation Request',
        description: 'Request a consultation with our team',
        destinations: [],
        enabled: true,
      },
      project: {
        label: 'Project Inquiry',
        description: 'Discuss your upcoming project',
        destinations: [],
        enabled: true,
      },
      support: {
        label: 'Support Request',
        description: 'Request technical support',
        destinations: [],
        enabled: true,
      },
      material: {
        label: 'Material Inquiry',
        description: 'Ask about our stone materials',
        destinations: [],
        enabled: true,
      },
      partnership: {
        label: 'Partnership Proposal',
        description: 'Propose a partnership opportunity',
        destinations: [],
        enabled: true,
      },
    },
    adminEmails: [],
    webhooks: {},
  }

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2))
  return defaultConfig
}

// Initialize default messages array
function initializeMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2))
  }
}

// Initialize default media array
function initializeMedia() {
  if (!fs.existsSync(MEDIA_FILE)) {
    fs.writeFileSync(MEDIA_FILE, JSON.stringify([], null, 2))
  }
}

// Initialize default materials array
function initializeMaterials() {
  if (!fs.existsSync(MATERIALS_FILE)) {
    fs.writeFileSync(MATERIALS_FILE, JSON.stringify([], null, 2))
  }
}

// Initialize default consultation config
function initializeConsultationConfig() {
  if (fs.existsSync(CONSULTATION_CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONSULTATION_CONFIG_FILE, 'utf-8'))
  }

  const defaultConfig: ConsultationConfig = {
    id: '1',
    title: 'Get In Touch',
    subtitle: 'Choose your preferred contact method',
    channels: [
      {
        id: '1',
        type: 'phone',
        label: 'Call Us',
        value: '+234701234567',
        enabled: true,
        icon: 'Phone',
      },
      {
        id: '2',
        type: 'email',
        label: 'Email',
        value: 'info@octo21st.com',
        enabled: true,
        icon: 'Mail',
      },
      {
        id: '3',
        type: 'whatsapp',
        label: 'WhatsApp',
        value: '+234701234567',
        enabled: true,
        icon: 'MessageCircle',
      },
      {
        id: '4',
        type: 'telegram',
        label: 'Telegram',
        value: '@octo21st',
        enabled: true,
        icon: 'Send',
      },
    ],
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    accentColor: '#ff8c42',
    buttonColor: '#ff8c42',
    buttonTextColor: '#ffffff',
    animationDuration: 300,
    animationEnabled: true,
    closeOnBackdropClick: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(CONSULTATION_CONFIG_FILE, JSON.stringify(defaultConfig, null, 2))
  return defaultConfig
}

// Ensure files exist
initializeConfig()
initializeMessages()
initializeMedia()
initializeMaterials()
initializeConsultationConfig()

// Read functions
export function getMessages(): Message[] {
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'))
  } catch {
    return []
  }
}

export function getConfig(): MessageConfig {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
  } catch {
    return initializeConfig()
  }
}

export function getMedia(): MediaAsset[] {
  try {
    return JSON.parse(fs.readFileSync(MEDIA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

export function getMaterials(): Material[] {
  try {
    return JSON.parse(fs.readFileSync(MATERIALS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

// Write functions
export function saveMessages(messages: Message[]): void {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
}

export function saveConfig(config: MessageConfig): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
}

export function saveMedia(media: MediaAsset[]): void {
  fs.writeFileSync(MEDIA_FILE, JSON.stringify(media, null, 2))
}

export function saveMaterials(materials: Material[]): void {
  fs.writeFileSync(MATERIALS_FILE, JSON.stringify(materials, null, 2))
}

// Helper functions
export function addMessage(message: Omit<Message, 'id' | 'createdAt' | 'status'>): Message {
  const messages = getMessages()
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'received',
  }
  messages.push(newMessage)
  saveMessages(messages)
  return newMessage
}

export function updateConfig(updates: Partial<MessageConfig>): MessageConfig {
  const config = getConfig()
  const updated = { ...config, ...updates }
  saveConfig(updated)
  return updated
}

export function addMediaAsset(asset: Omit<MediaAsset, 'id' | 'uploadedAt'>): MediaAsset {
  const media = getMedia()
  const newAsset: MediaAsset = {
    ...asset,
    id: Date.now().toString(),
    uploadedAt: new Date().toISOString(),
  }
  media.push(newAsset)
  saveMedia(media)
  return newAsset
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages()
  const filtered = messages.filter((m) => m.id !== id)
  if (filtered.length < messages.length) {
    saveMessages(filtered)
    return true
  }
  return false
}

export function deleteMediaAsset(id: string): boolean {
  const media = getMedia()
  const filtered = media.filter((m) => m.id !== id)
  if (filtered.length < media.length) {
    saveMedia(filtered)
    return true
  }
  return false
}

export function updateMessage(
  id: string,
  updates: Partial<Message>
): Message | null {
  const messages = getMessages()
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) return null

  messages[index] = { ...messages[index], ...updates }
  saveMessages(messages)
  return messages[index]
}

export function updateMediaAsset(
  id: string,
  updates: Partial<MediaAsset>
): MediaAsset | null {
  const media = getMedia()
  const index = media.findIndex((m) => m.id === id)
  if (index === -1) return null

  media[index] = { ...media[index], ...updates }
  saveMedia(media)
  return media[index]
}

export function addMaterial(material: Omit<Material, 'id' | 'createdAt'>): Material {
  const materials = getMaterials()
  const newMaterial: Material = {
    ...material,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  materials.push(newMaterial)
  saveMaterials(materials)
  return newMaterial
}

export function updateMaterial(
  id: string,
  updates: Partial<Material>
): Material | null {
  const materials = getMaterials()
  const index = materials.findIndex((m) => m.id === id)
  if (index === -1) return null

  materials[index] = { ...materials[index], ...updates }
  saveMaterials(materials)
  return materials[index]
}

export function deleteMaterial(id: string): boolean {
  const materials = getMaterials()
  const filtered = materials.filter((m) => m.id !== id)
  if (filtered.length < materials.length) {
    saveMaterials(filtered)
    return true
  }
  return false
}

export function getConsultationConfig(): ConsultationConfig {
  try {
    return JSON.parse(fs.readFileSync(CONSULTATION_CONFIG_FILE, 'utf-8'))
  } catch {
    return initializeConsultationConfig()
  }
}

export function saveConsultationConfig(config: ConsultationConfig): void {
  fs.writeFileSync(CONSULTATION_CONFIG_FILE, JSON.stringify(config, null, 2))
}

export function updateConsultationConfig(
  updates: Partial<ConsultationConfig>
): ConsultationConfig {
  const config = getConsultationConfig()
  const updated: ConsultationConfig = {
    ...config,
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveConsultationConfig(updated)
  return updated
}
