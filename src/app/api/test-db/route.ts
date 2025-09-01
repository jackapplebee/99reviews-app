import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try a simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    return NextResponse.json({ 
      success: true,
      message: 'Database connection successful!',
      result
    })
    
  } catch (error: any) {
    console.error('Database test error:', error)
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      message: 'Database connection failed'
    }, { status: 500 })
  }
}