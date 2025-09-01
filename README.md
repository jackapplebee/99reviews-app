# 99Reviews - Smart Review Management Platform

A modern review management SaaS that intelligently routes positive reviews to Google while keeping negative feedback internal for business improvement.

## Features

- **Smart Review Routing**: 4-5 star reviews → Google Reviews, 1-3 stars → Internal feedback
- **Neo-Brutalist Design**: Bold, modern interface with Space Grotesk font
- **Multi-Tenant Architecture**: Complete business isolation with custom branding
- **Customer Management**: CSV upload and review link generation
- **Dashboard Analytics**: Real-time insights and performance tracking
- **Authentication**: Secure login system with NextAuth.js

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with JWT
- **Deployment**: Vercel

## Quick Deploy to Vercel

### 1. Database Setup
Create a PostgreSQL database (recommended services):
- [Neon](https://neon.tech) (free tier available)
- [PlanetScale](https://planetscale.com) 
- [Supabase](https://supabase.com)

### 2. Environment Variables
Set these in Vercel dashboard:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-a-random-secret"
JWT_SECRET="generate-another-random-secret"
```

### 3. Deploy to Vercel
1. Push this repo to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Local Development

```bash
# Install dependencies
npm install

# Set up database
cp .env.example .env.local
# Edit .env.local with your database URL

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Start development server
npm run dev
```

## Database Schema

- **Business**: Multi-tenant business accounts
- **User**: Business staff/admin users  
- **Customer**: Customer database with review links
- **Review**: Smart-routed reviews with ratings and feedback

## API Endpoints

- `POST /api/auth/register` - User registration
- `GET/POST /api/customers` - Customer management
- `POST /api/customers/upload` - CSV customer upload
- `GET /api/reviews` - Review analytics
- `POST /api/review/[token]/submit` - Review submission

## Features in Development

- Email notification system
- Google Reviews API integration
- Advanced analytics and reporting
- Business settings and customization
- White-label solutions

---

Built with ❤️ for restaurant and service business owners who want to improve their online reputation intelligently.