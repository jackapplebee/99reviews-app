'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' as const },
  { name: 'Customers', href: '/dashboard/customers' as const },
  { name: 'Reviews', href: '/dashboard/reviews' as const },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">99 REVIEWS</h1>
              <div className="flex items-center space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                  <option>{session.user.businessSlug?.toUpperCase()}</option>
                </select>
                <span className="text-gray-400">▼</span>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium ${
                      pathname === item.href
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-4'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">🔔</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {session.user.name?.toUpperCase() || 'USER'}
                </span>
                <button 
                  onClick={() => signOut()}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}