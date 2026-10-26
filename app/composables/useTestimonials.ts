import { TESTIMONIALS_DATA } from '~/data/testimonials'
import type { TestimonialItem } from '~/data/testimonials'

export const useTestimonials = () => {
  const testimonials = useState<TestimonialItem[]>('testimonials_list', () => TESTIMONIALS_DATA)

  const getAllTestimonials = (): TestimonialItem[] => {
    return testimonials.value
  }

  const getFeaturedTestimonials = (): TestimonialItem[] => {
    return testimonials.value.filter(t => t.isFeatured)
  }

  const getTestimonialsByService = (serviceSlug: string): TestimonialItem[] => {
    if (!serviceSlug || serviceSlug === 'all') {
      return testimonials.value
    }
    return testimonials.value.filter(t => t.serviceSlug === serviceSlug)
  }

  const getAverageRating = (): number => {
    if (testimonials.value.length === 0) return 5.0
    const sum = testimonials.value.reduce((acc, curr) => acc + curr.rating, 0)
    return Number((sum / testimonials.value.length).toFixed(1))
  }

  return {
    testimonials,
    getAllTestimonials,
    getFeaturedTestimonials,
    getTestimonialsByService,
    getAverageRating
  }
}
