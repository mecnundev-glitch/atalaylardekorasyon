import { SERVICES_DATA } from '~/data/services'
import type { ServiceItem } from '~/types/service'

// Aliases mapping for backward compatibility and alternative URL slugs
const SLUG_ALIASES: Record<string, string> = {
  'ic-dis-cephe-boya': 'ic-cephe-boya',
  'su-ve-isi-yalitimi': 'su-yalitimi',
  'siva-duvar-uygulamalari': 'siva-ve-duvar-uygulamalari'
}

export const useServices = () => {
  const services = useState<ServiceItem[]>('services_list', () => SERVICES_DATA)

  const getAllServices = (): ServiceItem[] => {
    return services.value.sort((a, b) => a.displayOrder - b.displayOrder)
  }

  const getServiceBySlug = (rawSlug: string): ServiceItem | undefined => {
    const slug = SLUG_ALIASES[rawSlug] || rawSlug
    return services.value.find(s => s.slug === slug)
  }

  const getRelatedServices = (slugs: string[]): ServiceItem[] => {
    return services.value.filter(s => slugs.includes(s.slug))
  }

  return {
    getAllServices,
    getServiceBySlug,
    getRelatedServices
  }
}
