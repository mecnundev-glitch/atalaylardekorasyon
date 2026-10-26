import { useRuntimeConfig, useHead, useSeoMeta } from '#app'
import { BUSINESS_CONFIG } from '~/config/business'
import type { ServiceItem } from '~/types/service'
import type { ProjectItem } from '~/types/project'

export interface BreadcrumbEntry {
  name: string
  path: string
}

export interface SeoOptions {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, any> | Array<Record<string, any>>
}

/**
 * Merkezi SEO, Canonical, Open Graph ve Yapılandırılmış Veri (JSON-LD) composable'ı.
 */
export const useAppSeo = (options: SeoOptions) => {
  const runtime = useRuntimeConfig()
  const siteUrl = ((runtime.public?.siteUrl as string) || 'https://www.atalaylardekorasyon.com').replace(/\/$/, '')

  // Temiz canonical URL (varsa query/hash parametreleri temizlenir)
  const cleanPath = (options.path || '/').split('?')[0]?.split('#')[0] || '/'
  const canonicalUrl = `${siteUrl}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`

  // Mutlak görsel URL'i (OG ve Twitter için)
  const rawImage = options.image || '/images/hero-decoration.jpg'
  const absoluteImageUrl = rawImage.startsWith('http') ? rawImage : `${siteUrl}${rawImage.startsWith('/') ? rawImage : '/' + rawImage}`

  // Robots meta
  const robotsContent = options.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  // Script etiketleri (JSON-LD)
  const scripts: Array<{ type: 'application/ld+json'; innerHTML: string }> = []
  if (options.jsonLd) {
    const jsonLdPayload = Array.isArray(options.jsonLd) ? options.jsonLd : [options.jsonLd]
    for (const schema of jsonLdPayload) {
      scripts.push({
        type: 'application/ld+json' as const,
        innerHTML: JSON.stringify(schema)
      })
    }
  }

  useHead({
    title: options.title,
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    meta: [
      { name: 'robots', content: robotsContent }
    ],
    script: scripts
  })

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonicalUrl,
    ogType: options.type || 'website',
    ogImage: absoluteImageUrl,
    ogSiteName: 'Atalaylar Dekorasyon',
    ogLocale: 'tr_TR',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: absoluteImageUrl
  })

  return {
    canonicalUrl,
    absoluteImageUrl,
    siteUrl
  }
}

/**
 * Google & Schema.org uyumlu LocalBusiness / HomeAndConstructionBusiness Şeması
 * Sadece sayfada doğrulanabilir, gerçek işletme bilgilerini içerir.
 */
export const buildLocalBusinessSchema = () => {
  const siteUrl = 'https://www.atalaylardekorasyon.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: BUSINESS_CONFIG.name,
    alternateName: 'Atalaylar Dekorasyon İzmir',
    description: BUSINESS_CONFIG.description,
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    image: `${siteUrl}/images/hero-decoration.jpg`,
    telephone: BUSINESS_CONFIG.contact.phone,
    email: BUSINESS_CONFIG.contact.email,
    priceRange: '₺₺',
    currenciesAccepted: 'TRY',
    paymentAccepted: 'Nakit, Banka Havalesi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İzmir',
      addressRegion: 'İzmir',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '38.4237',
      longitude: '27.1428'
    },
    areaServed: [
      { '@type': 'City', name: 'İzmir' },
      { '@type': 'AdministrativeArea', name: 'Karşıyaka' },
      { '@type': 'AdministrativeArea', name: 'Bornova' },
      { '@type': 'AdministrativeArea', name: 'Konak' },
      { '@type': 'AdministrativeArea', name: 'Çiğli' },
      { '@type': 'AdministrativeArea', name: 'Bayraklı' },
      { '@type': 'AdministrativeArea', name: 'Buca' },
      { '@type': 'AdministrativeArea', name: 'Gaziemir' },
      { '@type': 'AdministrativeArea', name: 'Menemen' },
      { '@type': 'AdministrativeArea', name: 'Urla' },
      { '@type': 'AdministrativeArea', name: 'Balçova' },
      { '@type': 'AdministrativeArea', name: 'Narlıdere' }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '19:30'
      }
    ],
    sameAs: [
      BUSINESS_CONFIG.social.instagram,
      BUSINESS_CONFIG.social.facebook
    ].filter(Boolean)
  }
}

/**
 * Hizmet sayfaları için Schema.org Service Şeması
 */
export const buildServiceSchema = (service: ServiceItem, canonicalUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `${service.title} - İzmir`,
    serviceType: service.subtitle || service.title,
    description: service.shortDescription || service.description,
    url: canonicalUrl,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS_CONFIG.name,
      url: 'https://www.atalaylardekorasyon.com',
      telephone: BUSINESS_CONFIG.contact.phone
    },
    areaServed: {
      '@type': 'City',
      name: 'İzmir'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl
    }
  }
}

/**
 * Proje referans sayfaları için Schema.org CreativeWork / Project Şeması
 */
export const buildProjectSchema = (project: ProjectItem, canonicalUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${canonicalUrl}#project`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: canonicalUrl,
    image: project.afterImageUrl.startsWith('http') ? project.afterImageUrl : `https://atalaylardekarasyon.com${project.afterImageUrl}`,
    author: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS_CONFIG.name
    },
    locationCreated: {
      '@type': 'Place',
      name: project.location
    }
  }
}

/**
 * Schema.org BreadcrumbList Şeması
 */
export const buildBreadcrumbSchema = (items: BreadcrumbEntry[]) => {
  const siteUrl = 'https://atalaylardekarasyon.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const clean = item.path.startsWith('/') ? item.path : '/' + item.path
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${clean}`
      }
    })
  }
}
