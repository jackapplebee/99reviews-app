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
        token: token ? 'exists' : 'none'
      })
      
      // Protect dashboard routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token
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