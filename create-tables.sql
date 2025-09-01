-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Create users table  
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  FOREIGN KEY ("businessId") REFERENCES businesses(id)
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  email TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  FOREIGN KEY ("businessId") REFERENCES businesses(id),
  UNIQUE("businessId", email)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rating INTEGER NOT NULL,
  comment TEXT,
  "isPublic" BOOLEAN DEFAULT FALSE,
  "businessId" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  FOREIGN KEY ("businessId") REFERENCES businesses(id),
  FOREIGN KEY ("customerId") REFERENCES customers(id)
);