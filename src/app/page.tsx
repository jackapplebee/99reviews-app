'use client'

import { useSession, signOut } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-white landing-page">
      {/* Header - Current.com inspired */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-900">
            99Reviews
          </h1>
          <div className="flex items-center space-x-3">
            {status === 'authenticated' ? (
              <>
                <a 
                  href="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Dashboard
                </a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Sign In
                </a>
                <a 
                  href="/auth/register"
                  className="text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Current/7shifts inspired */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Pain-First Headline */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Your best customers never<br/>
            <span className="font-normal text-indigo-600">leave reviews</span>
          </h1>
          
          {/* Big Promise */}
          <p className="text-lg md:text-xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Turn silent satisfied customers into vocal advocates while keeping unhappy feedback private
          </p>

          {/* Primary CTA */}
          <div className="mb-16">
            <a 
              href="/auth/register"
              className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-base"
            >
              Start free trial
            </a>
            <div className="text-sm text-gray-500 mt-4">
              14-day free trial • No credit card required
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 border-t border-gray-100 pt-8">
            <span>1,200+ businesses protected</span>
            <span>47,000+ positive reviews generated</span>
            <span>3-minute setup</span>
          </div>
        </div>
      </div>

      {/* Features - 7shifts inspired */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
              Simple, automated review management that works behind the scenes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Smart routing</h3>
                <p className="text-gray-600 leading-relaxed">Happy customers automatically get sent to Google. Frustrated customers stay private where you can address their concerns.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Effortless collection</h3>
                <p className="text-gray-600 leading-relaxed">No more begging for reviews. Your satisfied customers finally speak up because we make it simple for them.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Damage prevention</h3>
                <p className="text-gray-600 leading-relaxed">Catch problems before they become public disasters. Turn frustrated customers into satisfied ones behind the scenes.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quick setup</h3>
                <p className="text-gray-600 leading-relaxed">Start seeing results within days. No technical knowledge required - works for any business size.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Current.com inspired */}
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Real results from real businesses
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">127% more reviews</div>
              <div className="text-sm text-gray-600 mb-4">"Finally, our happy customers are actually leaving reviews. We went from 23 to 52 five-star reviews in just one month."</div>
              <div className="text-xs text-gray-500">Mike Thompson, Auto Shop</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">$47K extra revenue</div>
              <div className="text-sm text-gray-600 mb-4">"Better online reputation means more customers finding us. The revenue increase has been incredible."</div>
              <div className="text-xs text-gray-500">Sarah Chen, Restaurant</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">4.9 average rating</div>
              <div className="text-sm text-gray-600 mb-4">"Negative reviews stopped appearing online. We handle issues privately and our rating reflects our actual service quality."</div>
              <div className="text-xs text-gray-500">Tom Rodriguez, Fitness</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA - Current.com inspired */}
      <div className="bg-indigo-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Ready to turn your silent customers into advocates?
          </h2>
          <p className="text-lg font-light text-gray-600 mb-8">
            Join 1,200+ businesses that stopped worrying about bad reviews
          </p>
          <a 
            href="/auth/register"
            className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-base mb-4"
          >
            Start free trial
          </a>
          <div className="text-sm text-gray-500">
            14-day free trial • No credit card required
          </div>
        </div>
      </div>
    </div>
  )
}