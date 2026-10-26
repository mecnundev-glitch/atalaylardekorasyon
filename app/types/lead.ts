export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'

export interface LeadSubmission {
  id?: string
  fullName: string
  phone: string
  district: string
  serviceSlug?: string
  estimatedArea?: number
  notes?: string
  attachmentUrls?: string[]
  status?: LeadStatus
  createdAt?: string
}
