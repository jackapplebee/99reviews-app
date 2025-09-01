import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      businessId: string
      businessSlug: string
    }
  }

  interface User {
    businessId: string
    businessSlug: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    businessId: string
    businessSlug: string
  }
}