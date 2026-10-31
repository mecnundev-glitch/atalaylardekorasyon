import { defineEventHandler, setResponseHeader } from 'h3'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const STATIC_SERVICE_SLUGS = [
  'alci-uygulamalari',
  'ic-cephe-boya',
  'dis-cephe-boya',
  'siva-ve-duvar-uygulamalari',
  'cati-izolasyonu',
  'su-yalitimi',
  'isi-yalitimi',
  'dekorasyon-ve-tadilat'
]

const STATIC_PROJECT_SLUGS = [
  'karsiyaka-salon-asma-tavan-dekorasyon',
  'urla-villa-cati-izolasyonu-mantolama',
  'bornova-komple-daire-tadilat-boya',
  'cigli-bina-dis-cephe-boya-onarim',
  'cesme-teras-su-izolasyonu',
  'gaziemir-ofis-alcipan-bolme-duvar',
  'konak-guzelyali-ic-cephe-boya',
  'karsiyaka-bostanli-banyo-yenileme'
]

const STATIC_DISTRICT_SLUGS = [
  'bornova',
  'karsiyaka',
  'konak',
  'buca',
  'urla',
  'cesme',
  'cigli',
  'bayrakli',
  'gaziemir'
]

const STATIC_BLOG_SLUGS = [
  'cati-izolasyonu-fiyatini-etkileyen-faktorler',
  'mantolama-yatiriminin-geri-donusu',
  'tavandan-su-sizmasinin-nedenleri',
  'daire-tadilat-suresini-etkileyen-faktorler',
  'boya-badana-maliyeti-nasil-hesaplanir'
]

export default defineEventHandler(async (event) => {
  const siteUrl = (process.env.SITE_URL || 'https://www.atalaylardekorasyon.com').replace(/\/$/, '')
  const today = new Date().toISOString().split('T')[0]

  const urls: SitemapUrl[] = [
    // 1. Ana Sayfa
    { loc: `${siteUrl}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },

    // 2. Ana Dizin ve Bölüm Sayfaları
    { loc: `${siteUrl}/hakkimizda`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { loc: `${siteUrl}/hizmetlerimiz`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/fiyat-rehberi`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/blog`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/bolgeler`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/projeler`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/galeri`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
    { loc: `${siteUrl}/ucretsiz-kesif`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/iletisim`, lastmod: today, changefreq: 'monthly', priority: 0.8 },

    // 3. Yasal ve Bilgilendirme Sayfaları
    { loc: `${siteUrl}/yasal/kvkk-aydinlatma-metni`, lastmod: today, changefreq: 'yearly', priority: 0.3 },
    { loc: `${siteUrl}/yasal/gizlilik-politikasi`, lastmod: today, changefreq: 'yearly', priority: 0.3 },
    { loc: `${siteUrl}/yasal/cerez-politikasi`, lastmod: today, changefreq: 'yearly', priority: 0.3 }
  ]

  // 4. Hizmet Sayfaları
  for (const s of STATIC_SERVICE_SLUGS) {
    urls.push({
      loc: `${siteUrl}/hizmetlerimiz/${s}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85
    })
  }

  // 5. İlçe Sayfaları (Anti-Doorway Yerel SEO)
  for (const d of STATIC_DISTRICT_SLUGS) {
    urls.push({
      loc: `${siteUrl}/bolgeler/${d}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85
    })
  }

  // 6. Blog Rehber Makaleleri
  for (const b of STATIC_BLOG_SLUGS) {
    urls.push({
      loc: `${siteUrl}/blog/${b}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    })
  }

  // 7. Proje Sayfaları
  for (const p of STATIC_PROJECT_SLUGS) {
    urls.push({
      loc: `${siteUrl}/projeler/${p}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.75
    })
  }

  // XML Oluşturma
  const xmlEntries = urls
    .map((item) => {
      return `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority.toFixed(2)}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
  return xml
})
