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
  titleTemplate?: string | null
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
  const canonicalUrl = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`

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

  const isHomePage = cleanPath === '/'

  useHead({
    title: options.title,
    titleTemplate: isHomePage ? '%s' : (options.titleTemplate ?? undefined),
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
    ogSiteName: 'Atalay Dekorasyon',
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
 * Google & Schema.org uyumlu GeneralContractor ve Person Şeması (@graph)
 * Atalay Dekorasyon işletme bilgileri ve Mehmet Usta profilini birbirine bağlar.
 */
export const buildLocalBusinessSchema = () => {
  const siteUrl = 'https://www.atalaylardekorasyon.com'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GeneralContractor',
        '@id': `${siteUrl}/#business`,
        name: 'Atalay Dekorasyon',
        alternateName: ['Atalaylar Dekorasyon'],
        slogan: "Mehmet Usta güvencesiyle İzmir'de tadilat ve yalıtım",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/images/hero-decoration.jpg`,
        description: "Atalay Dekorasyon, İzmir'de müşterinin adresine giderek anahtar teslim tadilat, alçıpan asma tavan, iç ve dış cephe boya, çatı izolasyonu, su yalıtımı ve mantolama hizmeti sunar.",
        telephone: '+905449978760',
        email: 'info@atalaylardekorasyon.com',
        priceRange: '₺₺',
        founder: { '@id': `${siteUrl}/hakkimizda#mehmet-usta` },
        employee: { '@id': `${siteUrl}/hakkimizda#mehmet-usta` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'İzmir',
          addressRegion: 'İzmir',
          addressCountry: 'TR'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:30',
            closes: '19:30'
          }
        ],
        areaServed: [
          { '@type': 'City', name: 'İzmir' },
          { '@type': 'AdministrativeArea', name: 'Karşıyaka' },
          { '@type': 'AdministrativeArea', name: 'Bornova' },
          { '@type': 'AdministrativeArea', name: 'Urla' },
          { '@type': 'AdministrativeArea', name: 'Çiğli' },
          { '@type': 'AdministrativeArea', name: 'Konak' },
          { '@type': 'AdministrativeArea', name: 'Buca' },
          { '@type': 'AdministrativeArea', name: 'Gaziemir' },
          { '@type': 'AdministrativeArea', name: 'Menemen' },
          { '@type': 'AdministrativeArea', name: 'Torbalı' },
          { '@type': 'AdministrativeArea', name: 'Bayraklı' },
          { '@type': 'AdministrativeArea', name: 'Güzelbahçe' },
          { '@type': 'AdministrativeArea', name: 'Narlıdere' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Hizmetlerimiz',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Alçıpan Asma Tavan',
                url: `${siteUrl}/hizmetlerimiz/alci-uygulamalari`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'İç Cephe Boya',
                url: `${siteUrl}/hizmetlerimiz/ic-cephe-boya`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Dış Cephe Boya',
                url: `${siteUrl}/hizmetlerimiz/dis-cephe-boya`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Çatı İzolasyonu',
                url: `${siteUrl}/hizmetlerimiz/cati-izolasyonu`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Su Yalıtımı',
                url: `${siteUrl}/hizmetlerimiz/su-yalitimi`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Isı Yalıtımı (Mantolama)',
                url: `${siteUrl}/hizmetlerimiz/isi-yalitimi`
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Komple Ev Tadilatı ve Dekorasyon',
                url: `${siteUrl}/hizmetlerimiz/dekorasyon-ve-tadilat`
              }
            }
          ]
        },
        sameAs: [
          BUSINESS_CONFIG.contact.mapsUrl || 'https://maps.google.com/?q=İzmir',
          BUSINESS_CONFIG.social.instagram || 'https://instagram.com/atalaydekorasyon',
          BUSINESS_CONFIG.social.facebook || 'https://facebook.com/atalaydekorasyon'
        ].filter(Boolean)
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/hakkimizda#mehmet-usta`,
        name: 'Mehmet Usta',
        jobTitle: 'Usta / Kurucu',
        worksFor: { '@id': `${siteUrl}/#business` },
        url: `${siteUrl}/hakkimizda`
      }
    ]
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
      '@type': 'GeneralContractor',
      '@id': 'https://www.atalaylardekorasyon.com/#business',
      name: BUSINESS_CONFIG.name,
      url: 'https://www.atalaylardekorasyon.com/',
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
    image: project.afterImageUrl.startsWith('http') ? project.afterImageUrl : `https://www.atalaylardekorasyon.com${project.afterImageUrl}`,
    author: {
      '@type': 'GeneralContractor',
      '@id': 'https://www.atalaylardekorasyon.com/#business',
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
  const siteUrl = 'https://www.atalaylardekorasyon.com'

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

/**
 * İlçe Sayfaları için özgün LocalBusiness & Service Şeması (Anti-Doorway SEO)
 */
export const buildDistrictSchema = (districtName: string, neighborhoods: string[]) => {
  const siteUrl = 'https://www.atalaylardekorasyon.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteUrl}/bolgeler/${districtName.toLowerCase()}#localbusiness`,
    name: `Atalay Dekorasyon - ${districtName} Boya, Alçı & Tadilat`,
    description: `İzmir ${districtName} ilçesinde ${neighborhoods.slice(0, 4).join(', ')} mahallelerinde Mehmet Usta güvencesiyle boya, alçı, çatı izolasyonu ve anahtar teslim tadilat.`,
    url: `${siteUrl}/bolgeler/${districtName.toLowerCase()}`,
    telephone: BUSINESS_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: districtName,
      addressRegion: 'İzmir',
      addressCountry: 'TR'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: districtName,
      containedInPlace: {
        '@type': 'City',
        name: 'İzmir'
      }
    }
  }
}
