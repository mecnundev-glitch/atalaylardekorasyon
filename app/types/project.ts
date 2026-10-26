export interface ProjectGalleryImage {
  url: string
  caption?: string
  alt: string
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  serviceSlug: string
  serviceTitle: string
  category: 'alci' | 'boya' | 'siva' | 'cati' | 'yalitim' | 'tadilat'
  location: string
  completionDuration: string
  completionDate?: string
  beforeImageUrl?: string
  afterImageUrl: string
  galleryImages: ProjectGalleryImage[]
  summary: string
  details: string
  materialsUsed: string[]
  isFeatured: boolean
  isDemo: boolean
  displayOrder: number
}
