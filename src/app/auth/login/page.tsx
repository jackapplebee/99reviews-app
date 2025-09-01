'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('INVALID EMAIL OR PASSWORD')
        console.log('Sign-in error:', result.error)
      } else {
        console.log('Sign-in successful, redirecting...')
        // Use window.location for more reliable redirect
        window.location.href = '/dashboard'
      }
    } catch (error) {
      setError('SOMETHING WENT WRONG. PLEASE TRY AGAIN.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="brutalist-container border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center">
          <h1 className="text-lg font-bold letter-spacing-logo uppercase text-black">
            99 REVIEWS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="brutalist-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-black mb-3 uppercase letter-spacing-title">
                SIGN IN
              </h1>
              <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
                ACCESS YOUR 99REVIEWS DASHBOARD
              </p>
            </div>
            
            {message && (
              <div className="brutalist-container border-2 border-green-600 bg-green-50 text-green-800 px-4 py-3 mb-6">
                <div className="text-xs font-bold letter-spacing-body uppercase">
                  {message}
                </div>
              </div>
            )}
            
            {error && (
              <div className="brutalist-container border-2 border-red-600 bg-red-50 text-red-800 px-4 py-3 mb-6">
                <div className="text-xs font-bold letter-spacing-body uppercase">
                  {error}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body uppercase text-sm focus:outline-none focus:bg-gray-50"
                  placeholder="YOUR@EMAIL.COM"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
                  PASSWORD
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="brutalist-button w-full py-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black letter-spacing-label uppercase"
                >
                  {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">
                  DON'T HAVE AN ACCOUNT?{' '}
                  <a href="/auth/register" className="text-black hover:underline">
                    SIGN UP
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}