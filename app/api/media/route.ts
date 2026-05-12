import { NextRequest, NextResponse } from 'next/server'
import { getMedia, addMediaAsset, deleteMediaAsset, updateMediaAsset, MediaAsset } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

// GET - Retrieve all media assets
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const media = getMedia()
    return NextResponse.json({ media })
  } catch (error) {
    console.error('[v0] Get media error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve media' },
      { status: 500 }
    )
  }
}

// POST - Upload new media asset
export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!file || !type || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: file, type, title' },
        { status: 400 }
      )
    }

    // Ensure upload directory exists
    await ensureUploadDir()

    // Generate unique filename
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`
    const filepath = join(UPLOAD_DIR, filename)

    // Save file
    const buffer = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(buffer))

    // Create media asset record
    const asset = addMediaAsset({
      type: type as MediaAsset['type'],
      title,
      description: description || '',
      filename,
      url: `/uploads/${filename}`,
      size: file.size,
      metadata: {
        originalName: file.name,
        mimeType: file.type,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Media uploaded successfully',
        asset,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Upload media error:', error)
    return NextResponse.json(
      { error: 'Failed to upload media' },
      { status: 500 }
    )
  }
}
