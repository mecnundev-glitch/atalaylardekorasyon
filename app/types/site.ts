export interface SocialLinks {
  instagram?: string
  facebook?: string
  youtube?: string
  linkedin?: string
}

export interface BusinessContact {
  phone: string
  phoneFormatted: string
  whatsapp: string
  whatsappFormatted: string
  email: string
  address: string
  streetAddress?: string
  neighborhood?: string
  postalCode?: string
  district: string
  city: string
  workingHours: string
  mapsUrl?: string
}

export interface BusinessConfig {
  name: string
  masterCraftsman?: string
  tagline: string
  description: string
  legalName?: string
  taxOffice?: string
  taxNumber?: string
  contact: BusinessContact
  social: SocialLinks
}
