import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const prisma = new PrismaClient()
    
    // Test database connection
    await prisma.$connect()
    
    // Check if tables exist and get schema info
    const businesses = await prisma.business.findMany({ take: 1 })
    const users = await prisma.user.findMany({ take: 1 })
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      status: 'Database connection successful',
      businessesCount: businesses.length,
      usersCount: users.length,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      error: error.message,
      status: 'Database connection failed'
    }, { status: 500 })
  }
}