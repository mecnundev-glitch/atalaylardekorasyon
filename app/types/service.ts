export interface ServiceProcessStep {
  title: string
  description: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceItem {
  id: string
  slug: string
  title: string
  subtitle: string
  shortDescription: string
  description: string
  scope: string[]
  processSteps: ServiceProcessStep[]
  technicalStandards: string[]
  iconName: string
  coverImageUrl: string
  features: string[]
  faqs?: ServiceFaq[]
  relatedSlugs: string[]
  displayOrder: number
}
