import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: ({ token, req }) => {
      console.log('Middleware check:', { 
        path: req.nextUrl.pathname, 
        hasToken: !!token,
        tokenData: token ? {
          email: token.email,
          businessId: token.businessId,
          businessSlug: token.businessSlug
        } : 'none'
      })
      
      // Protect dashboard routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        // Check if token exists and has required fields
        return !!token && !!token.email && !!token.businessId
      }
      return true
    }
  }
})

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
}