import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

async function runMigration() {
  const prisma = new PrismaClient()
  
  try {
    // This will create all tables based on your schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "businesses" (
        "id" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
      );
    `
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "businesses_slug_key" ON "businesses"("slug");
    `
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "businesses_email_key" ON "businesses"("email");
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "businessId" TEXT NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
      );
    `
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "customers" (
        "id" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "businessId" TEXT NOT NULL,
        CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
      );
    `
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "customers_businessId_email_key" ON "customers"("businessId", "email");
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "reviews" (
        "id" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "rating" INTEGER NOT NULL,
        "comment" TEXT,
        "isPublic" BOOLEAN NOT NULL DEFAULT false,
        "businessId" TEXT NOT NULL,
        "customerId" TEXT NOT NULL,
        CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
      );
    `

    // Add foreign key constraints
    await prisma.$executeRaw`
      ALTER TABLE "users" 
      ADD CONSTRAINT IF NOT EXISTS "users_businessId_fkey" 
      FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `

    await prisma.$executeRaw`
      ALTER TABLE "customers" 
      ADD CONSTRAINT IF NOT EXISTS "customers_businessId_fkey" 
      FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `

    await prisma.$executeRaw`
      ALTER TABLE "reviews" 
      ADD CONSTRAINT IF NOT EXISTS "reviews_businessId_fkey" 
      FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `

    await prisma.$executeRaw`
      ALTER TABLE "reviews" 
      ADD CONSTRAINT IF NOT EXISTS "reviews_customerId_fkey" 
      FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `

    await prisma.$disconnect()

    return { 
      success: true,
      message: 'Database tables created successfully!' 
    }
    
  } catch (error: any) {
    await prisma.$disconnect()
    console.error('Migration error:', error)
    
    return { 
      success: false,
      error: error.message 
    }
  }
}

export async function GET() {
  const result = await runMigration()
  return NextResponse.json(result, result.success ? {} : { status: 500 })
}

export async function POST() {
  const result = await runMigration()
  return NextResponse.json(result, result.success ? {} : { status: 500 })
}