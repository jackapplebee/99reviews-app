import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({ 
      hasSession: !!session,
      session: session,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      hasSession: false
    }, { status: 500 })
  }
}