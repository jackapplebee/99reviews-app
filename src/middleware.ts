import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      // Simply check if token exists - NextAuth handles the rest
      return !!token
    }
  }
})

export const config = {
  matcher: [
    // Disable middleware completely for now
    // '/dashboard/:path*'
  ]
}