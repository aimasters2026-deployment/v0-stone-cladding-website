import { getConsultationConfig, updateConsultationConfig } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const config = getConsultationConfig()
    return NextResponse.json(config, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch consultation config' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check for admin authentication
    const adminKey = request.headers.get('x-admin-key')
    const expectedKey = process.env.ADMIN_KEY

    if (!adminKey || !expectedKey || adminKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const config = updateConsultationConfig(body)

    return NextResponse.json(config, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update consultation config' },
      { status: 500 }
    )
  }
}
