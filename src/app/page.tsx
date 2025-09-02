'use client'

import { useSession, signOut } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact Current.com style */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-white text-2xl font-medium tracking-tight">
            99Reviews
          </a>
          <div className="flex items-center space-x-1">
            {status === 'authenticated' ? (
              <>
                <a 
                  href="/dashboard"
                  className="text-white hover:text-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-medium transition-colors ml-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/login"
                  className="text-white hover:text-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Help
                </a>
                <a 
                  href="/auth/login"
                  className="text-white hover:text-gray-300 px-4 py-2 text-sm font-medium"
                >
                  About
                </a>
                <a 
                  href="/auth/register"
                  className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-medium transition-colors ml-2"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Current.com style */}
      <div className="bg-gradient-to-b from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Power up your<br/>
            reviews today
          </h1>
          
          <div className="flex items-center justify-center max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="Enter your business email"
              className="flex-1 px-4 py-3 text-black text-sm rounded-l-full focus:outline-none"
            />
            <button className="bg-white text-black px-6 py-3 text-sm font-medium rounded-r-full hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Teen Banking Section - Current.com style */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">SMART REVIEW MANAGEMENT</div>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Give businesses their very own review filter
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Empower your business with automatic review routing, instant feedback capture, and real-time reputation alerts.
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-gray-500 text-lg">Review Management Dashboard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Safe and Secure Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-16">Safe and secure.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-600 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Privacy Protected</h3>
              <p className="text-gray-600">Your customer data stays private and secure with enterprise-grade encryption.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">GDPR Compliant</h3>
              <p className="text-gray-600">Fully compliant with data protection regulations and privacy standards.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-6 bg-blue-700 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Reliable Uptime</h3>
              <p className="text-gray-600">99.9% uptime guarantee ensures your review system is always working.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section - Current.com style */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black rounded-sm mr-1"></div>
                ))}
              </div>
              <p className="text-gray-800 mb-6">
                "99Reviews is just flat out awesome. I highly recommend Current as a primary or a second banking account. So many great benefits!"
              </p>
              <div className="flex items-center">
                <div className="text-sm font-medium text-black">App Store</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black rounded-sm mr-1"></div>
                ))}
              </div>
              <p className="text-gray-800 mb-6">
                "I absolutely love this service, it's super easy to sign up and use. Love that it gives me my reputation back on time, all the time."
              </p>
              <div className="flex items-center">
                <div className="text-sm font-medium text-black">App Store</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black rounded-sm mr-1"></div>
                ))}
              </div>
              <p className="text-gray-800 mb-6">
                "This is the best review management system, better than Yelp and Google combined, and as good as ReviewTrackers 360."
              </p>
              <div className="flex items-center">
                <div className="text-sm font-medium text-black">App Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Anywhere Section - Current.com style */}
      <div className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Manage reviews anywhere.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mr-4 flex items-center justify-center">
                <div className="text-white text-xl">📞</div>
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">24/7 fast and helpful support</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mr-4 flex items-center justify-center">
                <div className="text-white text-xl">💳</div>
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">50000+ reviews managed nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Building Section - Current.com style */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-pink-400 via-blue-400 to-green-400 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-white text-lg font-medium">Review Analytics Dashboard</div>
            </div>
            <div className="space-y-6">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">REPUTATION BUILDING</div>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Boost your online reputation by over 80 points after just six months.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Plus, get 5% more customers from improved search rankings.
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section - Current.com style */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-8">
            Join over 6 million businesses
          </h2>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-black mb-6">99</div>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Help</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-gray-600 hover:text-black">Blog</a></div>
                <div><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></div>
                <div><a href="#" className="text-gray-600 hover:text-black">Legal Docs</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-gray-600 hover:text-black">Our Story</a></div>
                <div><a href="#" className="text-gray-600 hover:text-black">Careers</a></div>
                <div><a href="#" className="text-gray-600 hover:text-black">Press</a></div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                <div className="text-sm font-medium mb-2">ACCREDITED BUSINESS</div>
                <div className="text-2xl font-bold">A</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <div>Copyright © 2024 99Reviews</div>
            <div className="flex space-x-4">
              <span>Sitemap</span>
              <span>Terms</span>
              <span>Licenses</span>
              <span>Privacy</span>
              <span>ESIGN Consent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}