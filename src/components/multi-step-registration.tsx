'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RegistrationData {
  // Step 1: Basic Info
  businessName: string
  email: string
  name: string
  password: string
  
  // Step 2: Business Details
  businessType: string
  phoneNumber: string
  address: string
  city: string
  state: string
  zipCode: string
  googleBusinessUrl: string
  
  // Step 3: Goals & Setup
  monthlyCustomers: string
  primaryGoals: string[]
  currentProcess: string
  websiteUrl: string
}

const BUSINESS_TYPES = [
  'Restaurant',
  'Retail Store', 
  'Healthcare/Medical',
  'Professional Services',
  'Beauty/Spa',
  'Automotive',
  'Home Services',
  'Hotel/Hospitality',
  'Fitness/Gym',
  'Other'
]

const PRIMARY_GOALS = [
  'Get more online reviews',
  'Improve overall rating',
  'Manage negative feedback',
  'Increase local visibility',
  'Monitor reputation',
  'Automate review requests'
]

export default function MultiStepRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<RegistrationData>({
    businessName: '',
    email: '',
    name: '',
    password: '',
    businessType: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    googleBusinessUrl: '',
    monthlyCustomers: '',
    primaryGoals: [],
    currentProcess: '',
    websiteUrl: ''
  })

  const updateFormData = (updates: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleGoalToggle = (goal: string) => {
    const goals = formData.primaryGoals.includes(goal)
      ? formData.primaryGoals.filter(g => g !== goal)
      : [...formData.primaryGoals, goal]
    updateFormData({ primaryGoals: goals })
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register-enhanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Registration failed')
        return
      }

      // Success - redirect to login
      router.push('/auth/login?message=Account created successfully! Please sign in to complete setup.')
      
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-black mb-3 uppercase letter-spacing-title">
          GET STARTED
        </h2>
        <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
          STEP 1 OF 3: BASIC ACCOUNT INFO
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          BUSINESS NAME
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => updateFormData({ businessName: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body uppercase text-sm focus:outline-none focus:bg-gray-50"
          placeholder="ACME RESTAURANT"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          YOUR NAME
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body uppercase text-sm focus:outline-none focus:bg-gray-50"
          placeholder="JOHN SMITH"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body text-sm focus:outline-none focus:bg-gray-50"
          placeholder="your@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          PASSWORD
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        onClick={nextStep}
        disabled={!formData.businessName || !formData.name || !formData.email || !formData.password}
        className="brutalist-button w-full py-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black letter-spacing-label uppercase"
      >
        CONTINUE TO BUSINESS DETAILS
      </button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-black mb-3 uppercase letter-spacing-title">
          BUSINESS DETAILS
        </h2>
        <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
          STEP 2 OF 3: TELL US ABOUT YOUR BUSINESS
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          BUSINESS TYPE
        </label>
        <select
          value={formData.businessType}
          onChange={(e) => updateFormData({ businessType: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body text-sm focus:outline-none focus:bg-gray-50"
          required
        >
          <option value="">SELECT BUSINESS TYPE</option>
          {BUSINESS_TYPES.map(type => (
            <option key={type} value={type}>{type.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          PHONE NUMBER
        </label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          BUSINESS ADDRESS
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body uppercase text-sm focus:outline-none focus:bg-gray-50"
          placeholder="123 MAIN STREET"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
            CITY
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body uppercase text-sm focus:outline-none focus:bg-gray-50"
            placeholder="CITY"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
            ZIP CODE
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
            placeholder="12345"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          GOOGLE BUSINESS PROFILE URL (OPTIONAL)
        </label>
        <input
          type="url"
          value={formData.googleBusinessUrl}
          onChange={(e) => updateFormData({ googleBusinessUrl: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
          placeholder="https://g.page/your-business"
        />
        <p className="text-xs text-gray-600 mt-1">We'll help you set this up if you don't have one</p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="brutalist-button flex-1 py-4 bg-transparent text-black border-2 border-black hover:bg-black hover:text-white text-sm font-black letter-spacing-label uppercase"
        >
          BACK
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.businessType || !formData.phoneNumber || !formData.address || !formData.city || !formData.zipCode}
          className="brutalist-button flex-1 py-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black letter-spacing-label uppercase"
        >
          CONTINUE TO GOALS
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-black mb-3 uppercase letter-spacing-title">
          GOALS & SETUP
        </h2>
        <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
          STEP 3 OF 3: CUSTOMIZE YOUR EXPERIENCE
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          MONTHLY CUSTOMER VOLUME
        </label>
        <select
          value={formData.monthlyCustomers}
          onChange={(e) => updateFormData({ monthlyCustomers: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold letter-spacing-body text-sm focus:outline-none focus:bg-gray-50"
          required
        >
          <option value="">SELECT VOLUME</option>
          <option value="1-50">1-50 CUSTOMERS</option>
          <option value="51-200">51-200 CUSTOMERS</option>
          <option value="201-500">201-500 CUSTOMERS</option>
          <option value="500+">500+ CUSTOMERS</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-3">
          PRIMARY GOALS (SELECT ALL THAT APPLY)
        </label>
        <div className="grid grid-cols-1 gap-2">
          {PRIMARY_GOALS.map(goal => (
            <label key={goal} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.primaryGoals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                className="w-4 h-4"
              />
              <span className="text-xs font-bold letter-spacing-body uppercase">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
          WEBSITE URL (OPTIONAL)
        </label>
        <input
          type="url"
          value={formData.websiteUrl}
          onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
          className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
          placeholder="https://yourwebsite.com"
        />
      </div>

      {error && (
        <div className="brutalist-container border-2 border-red-600 bg-red-50 text-red-800 px-4 py-3">
          <div className="text-xs font-bold letter-spacing-body uppercase">
            {error}
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="brutalist-button flex-1 py-4 bg-transparent text-black border-2 border-black hover:bg-black hover:text-white text-sm font-black letter-spacing-label uppercase"
        >
          BACK
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !formData.monthlyCustomers || formData.primaryGoals.length === 0}
          className="brutalist-button flex-1 py-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black letter-spacing-label uppercase"
        >
          {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="brutalist-container border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-lg font-bold letter-spacing-logo uppercase hover:opacity-80 transition-opacity" 
            style={{ color: 'var(--primary)', background: 'none', border: 'none' }}
          >
            99 REVIEWS
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 border-b-2 border-black">
        <div className="max-w-md mx-auto px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold ${
                    step <= currentStep ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className="w-16 h-1 bg-gray-300 mx-2"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="brutalist-card p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  )
}