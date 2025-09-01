import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function generateSlug(businessName: string) {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      businessName, 
      email, 
      name, 
      password,
      businessType,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      googleBusinessUrl,
      monthlyCustomers,
      primaryGoals,
      currentProcess,
      websiteUrl
    } = body

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate business slug
    const baseSlug = generateSlug(businessName)
    let businessSlug = baseSlug
    let counter = 1

    // Check if slug already exists and make it unique
    while (await prisma.business.findUnique({ where: { slug: businessSlug } })) {
      businessSlug = `${baseSlug}-${counter}`
      counter++
    }

    // Create business first
    const business = await prisma.business.create({
      data: {
        id: generateId(),
        name: businessName,
        slug: businessSlug,
        businessType,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        googleBusinessUrl: googleBusinessUrl || null,
        monthlyCustomers,
        primaryGoals: JSON.stringify(primaryGoals),
        websiteUrl: websiteUrl || null,
      }
    })

    // Create user
    const user = await prisma.user.create({
      data: {
        id: generateId(),
        email,
        name,
        password: hashedPassword,
        businessId: business.id,
        businessSlug: business.slug,
        role: 'OWNER'
      }
    })

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        businessId: user.businessId,
        businessSlug: user.businessSlug
      },
      business: {
        id: business.id,
        name: business.name,
        slug: business.slug
      }
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}