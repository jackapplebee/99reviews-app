export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="brutalist-container border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold letter-spacing-logo uppercase text-black">
            99 REVIEWS
          </h1>
          <div className="flex space-x-3">
            <a 
              href="/auth/login"
              className="brutalist-button bg-transparent text-black border-2 border-black hover:bg-black hover:text-white"
            >
              SIGN IN
            </a>
            <a 
              href="/auth/register"
              className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black"
            >
              GET STARTED
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-black mb-6 uppercase letter-spacing-title tracking-tight">
            99REVIEWS
          </h1>
          <p className="text-lg font-bold letter-spacing-body uppercase text-gray-600 mb-8 max-w-3xl mx-auto">
            Smart review management platform that routes positive reviews to Google 
            while keeping negative feedback internal for business improvement.
          </p>
          <div className="flex space-x-5 justify-center">
            <a 
              href="/auth/login"
              className="brutalist-button bg-transparent text-black border-2 border-black hover:bg-black hover:text-white text-lg px-8 py-4"
            >
              SIGN IN
            </a>
            <a 
              href="/auth/register"
              className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black text-lg px-8 py-4"
            >
              GET STARTED
            </a>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Smart Routing</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Automatically route 4-5 star reviews to Google while keeping 1-3 star feedback internal.
            </p>
          </div>
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Multi-Tenant</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Complete business isolation with custom branding and separate data.
            </p>
          </div>
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Analytics</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Real-time dashboard with conversion tracking and business insights.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-5">
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">99.9%</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">UPTIME</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">10K+</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">BUSINESSES</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">1M+</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">REVIEWS</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">4.9★</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">RATING</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="brutalist-container border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="text-center">
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">
              © 2025 99 REVIEWS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}