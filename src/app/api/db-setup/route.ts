import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test database connection and create tables
    await prisma.$connect()
    
    // Try to create a test query to ensure tables exist
    const businessCount = await prisma.business.count()
    const userCount = await prisma.user.count() 
    const customerCount = await prisma.customer.count()
    const reviewCount = await prisma.review.count()
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: true,
      message: 'Database connection successful',
      stats: {
        businesses: businessCount,
        users: userCount,
        customers: customerCount,
        reviews: reviewCount
      }
    })
    
  } catch (error: any) {
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      details: 'Run: npx prisma db push'
    }, { status: 500 })
  }
}