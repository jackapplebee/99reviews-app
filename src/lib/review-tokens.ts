export function generateReviewToken(customerId: string, businessId: string): string {
  const timestamp = Date.now().toString()
  const tokenData = `${customerId}:${businessId}:${timestamp}`
  return Buffer.from(tokenData).toString('base64')
}

export function generateReviewLink(customerId: string, businessId: string): string {
  const token = generateReviewToken(customerId, businessId)
  return `/review/${token}`
}

export function getReviewUrl(customerId: string, businessId: string, baseUrl = 'http://localhost:3000'): string {
  const link = generateReviewLink(customerId, businessId)
  return `${baseUrl}${link}`
}