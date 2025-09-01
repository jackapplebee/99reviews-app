import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, email, name, password } = await request.json()

    // Basic validation
    if (!businessName || !email || !name || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create business slug from name
    const businessSlug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if business slug already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { slug: businessSlug }
    })

    if (existingBusiness) {
      return NextResponse.json(
        { error: 'Business name already taken, please choose another' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create business and user in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create business
      const business = await tx.business.create({
        data: {
          id: generateId(),
          name: businessName,
          slug: businessSlug
        }
      })

      // Create user
      const user = await tx.user.create({
        data: {
          id: generateId(),
          email,
          name,
          password: passwordHash,
          businessId: business.id,
          businessSlug: business.slug,
          role: 'OWNER'
        }
      })

      return { business, user }
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      businessSlug: result.business.slug
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}