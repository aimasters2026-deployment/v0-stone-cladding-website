import { NextRequest, NextResponse } from 'next/server'
import { getConfig, updateConfig, MessageConfig } from '@/lib/db'

// GET - Retrieve current configuration
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const config = getConfig()
    return NextResponse.json({ config })
  } catch (error) {
    console.error('[v0] Get config error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve configuration' },
      { status: 500 }
    )
  }
}

// PATCH - Update configuration
export async function PATCH(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const config = updateConfig(body as Partial<MessageConfig>)

    return NextResponse.json(
      {
        success: true,
        message: 'Configuration updated successfully',
        config,
      }
    )
  } catch (error) {
    console.error('[v0] Update config error:', error)
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    )
  }
}
