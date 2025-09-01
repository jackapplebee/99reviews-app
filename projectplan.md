# 99Reviews MVP Development Plan

## Current Status
✅ **Foundation Complete**
- Next.js 14 project initialized with TypeScript and Tailwind CSS
- Basic landing page working at localhost:3000
- Project structure with src/app, src/components, src/lib directories
- Basic environment configuration ready

## MVP Goal
Create a working multi-tenant SaaS platform where restaurant businesses can:
1. Sign up and log in securely
2. Upload customer data via CSV
3. Send review request emails with smart routing (4-5 stars → Google, 1-3 stars → internal)
4. View dashboard with review analytics and feedback

---

## Phase 1: Multi-Tenant Authentication (Priority: HIGH)
**Target: Amazing login/multi-tenant architecture**

### Task 1.1: Database Schema Setup
- [ ] Install Prisma and database dependencies  
- [ ] Create simple database schema (Business, User, Customer, Review models)
- [ ] Set up local PostgreSQL connection
- [ ] Run initial database migration

### Task 1.2: Basic Authentication Pages  
- [ ] Create `/auth/login` page with simple form
- [ ] Create `/auth/register` page for business signup  
- [ ] Add basic form validation and styling
- [ ] Test pages render correctly

### Task 1.3: NextAuth Configuration
- [ ] Install and configure NextAuth.js
- [ ] Set up credentials provider for email/password auth
- [ ] Create basic user registration logic
- [ ] Add session management and middleware

### Task 1.4: Multi-Tenant Business Logic
- [ ] Add business slug-based routing (e.g., /dashboard/acme-restaurant)
- [ ] Ensure data isolation between businesses  
- [ ] Create business onboarding flow
- [ ] Test multi-tenant access controls

---

## Phase 2: Core Dashboard (Priority: HIGH)
**Target: Working dashboard to track reviews**

### Task 2.1: Protected Dashboard Layout
- [ ] Create protected `/dashboard/[businessSlug]` layout
- [ ] Add sidebar navigation with basic menu items
- [ ] Implement logout functionality
- [ ] Add responsive design for mobile

### Task 2.2: Customer Management  
- [ ] Create simple customer list page (`/dashboard/[businessSlug]/customers`)
- [ ] Add basic CSV upload functionality for customer data
- [ ] Display customers in a simple table
- [ ] Add basic search/filter by name or email

### Task 2.3: Review Collection System
- [ ] Create review collection form accessible via public link
- [ ] Implement 1-5 star rating system
- [ ] Add logic to route 4-5 stars to Google Reviews, 1-3 stars stay internal
- [ ] Store all reviews in database

---

## Phase 3: Analytics Dashboard (Priority: MEDIUM)  
**Target: View review metrics and trends**

### Task 3.1: Review Analytics Page
- [ ] Create analytics page (`/dashboard/[businessSlug]/analytics`)
- [ ] Add simple charts showing review distribution (1-5 stars)
- [ ] Display total reviews, average rating, conversion rate
- [ ] Show recent reviews list with timestamps

### Task 3.2: Email Campaign Tracking
- [ ] Add email sending functionality (using Resend API)
- [ ] Track email opens and clicks
- [ ] Display email campaign performance metrics
- [ ] Add simple email template customization

---

## Phase 4: Polish & Deployment (Priority: MEDIUM)
**Target: Production-ready MVP**

### Task 4.1: Security & Performance
- [ ] Add input validation and sanitization
- [ ] Implement rate limiting on forms
- [ ] Add error handling and user feedback
- [ ] Basic performance optimizations

### Task 4.2: Deployment Setup
- [ ] Configure Vercel deployment
- [ ] Set up production database (Vercel Postgres or similar)
- [ ] Add environment variable management
- [ ] Test end-to-end functionality

---

## Technical Constraints & Principles

### Keep It Simple
- Each task should touch as few files as possible
- Use existing Next.js patterns and conventions  
- Minimal external dependencies initially
- Focus on functionality over fancy UI

### Multi-Tenant Architecture
- All data must be scoped to businessId
- URL structure: `/dashboard/[businessSlug]/page`
- Complete data isolation between businesses
- Secure tenant access controls

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM  
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Email**: Resend (simple and developer-friendly)

---

## Success Criteria for MVP Launch
- [ ] Business can register and create account
- [ ] Multi-tenant dashboard works with proper data isolation  
- [ ] CSV upload processes customer data correctly
- [ ] Review collection form works and routes reviews properly
- [ ] Dashboard shows basic analytics and review tracking
- [ ] Deployed and accessible via custom domain

---

## Questions for Review
1. Should we start with local SQLite for development or jump straight to PostgreSQL?
2. Any specific business onboarding fields you want (address, phone, etc.)?
3. Do you want email templates to be customizable in Phase 2 or defer to Phase 3?
4. Any specific chart/analytics requirements beyond basic review metrics?

---

## Review Section
*This section will be updated after implementation with summary of changes made.*