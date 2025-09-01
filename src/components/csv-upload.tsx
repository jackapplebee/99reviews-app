'use client'

import { useState } from 'react'
import Papa from 'papaparse'

interface CsvUploadProps {
  onUploadSuccess: () => void
}

export function CsvUpload({ onUploadSuccess }: CsvUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    setError('')
    
    try {
      // Parse CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          if (results.errors.length > 0) {
            setError('Error parsing CSV file')
            setIsUploading(false)
            return
          }
          
          // Send to API
          const response = await fetch('/api/customers/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: results.data })
          })
          
          const result = await response.json()
          
          if (!response.ok) {
            setError(result.error || 'Upload failed')
          } else {
            onUploadSuccess()
          }
          
          setIsUploading(false)
        },
        error: (error) => {
          setError('Failed to parse CSV file')
          setIsUploading(false)
        }
      })
    } catch (error) {
      setError('Something went wrong')
      setIsUploading(false)
    }
    
    // Reset file input
    event.target.value = ''
  }
  
  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border-2 border-black text-red-700 px-4 py-3">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="sr-only"
          />
          <div className="bg-blue-600 text-white px-4 py-2 border-2 border-black text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {isUploading ? 'Uploading...' : 'Upload CSV'}
          </div>
        </label>
        
        <p className="text-sm text-gray-600">
          Expected format: firstName, lastName, email
        </p>
      </div>
    </div>
  )
}