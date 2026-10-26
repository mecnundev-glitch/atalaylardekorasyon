import { z } from 'zod'
import { createHash } from 'node:crypto'
import { sendQuoteNotification } from '../utils/mailer'

// Basit IP tabanlı Hız Sınırlandırma (Rate Limiting) Hafıza Deposu
// 10 dakika içinde en fazla 5 talep
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const requestLog = new Map<string, { count: number; resetAt: number }>()

// Temizlik döngüsü
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of requestLog.entries()) {
    if (val.resetAt <= now) {
      requestLog.delete(key)
    }
  }
}, 60000)

// Zod Doğrulama Şeması
const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .max(100, 'Ad Soyad çok uzun'),
  phone: z
    .string()
    .trim()
    .min(10, 'Telefon numarası zorunludur')
    .refine((val) => {
      const digits = val.replace(/\D/g, '')
      return digits.length === 10 || digits.length === 11 || (digits.length === 12 && digits.startsWith('90'))
    }, 'Geçerli bir telefon numarası giriniz (Örn: 0544 997 87 60)'),
  district: z
    .string()
    .min(2, 'Lütfen İzmir içindeki ilçenizi seçiniz'),
  serviceSlug: z.string().optional().default('genel'),
  estimatedArea: z.number().nullable().optional(),
  notes: z.string().max(1000, 'Açıklama 1000 karakterden uzun olamaz').optional().default(''),
  attachmentUrls: z.array(z.string()).optional().default([]),
  kvkkConsent: z.literal(true, {
    message: 'KVKK Aydınlatma Metnini onaylamanız gerekmektedir'
  }),
  marketingConsent: z.boolean().optional().default(false),
  // Bot / Honeypot tuzak alanları
  hp_website: z.string().optional().default(''),
  formStartTime: z.number().optional().default(0)
})

const SERVICE_TITLES: Record<string, string> = {
  'alci-uygulamalari': 'Alçı ve Asma Tavan Uygulamaları',
  'ic-cephe-boya': 'İç Cephe Boya ve Renklendirme',
  'dis-cephe-boya': 'Dış Cephe Boya ve Koruma',
  'siva-ve-duvar-uygulamalari': 'Sıva ve Bölme Duvar Uygulamaları',
  'cati-izolasyonu': 'Çatı İzolasyonu ve Tamiratı',
  'su-yalitimi': 'Su Yalıtımı ve İzolasyon',
  'isi-yalitimi': 'Isı Yalıtımı (Mantolama)',
  'dekorasyon-ve-tadilat': 'Komple Ev / İş Yeri Tadilatı & Dekorasyon',
  'genel': 'Genel Keşif ve Danışmanlık'
}

export default defineEventHandler(async (event) => {
  // 1. IP Tespiti ve SHA-256 Özeti
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
  const ipHash = createHash('sha256').update(clientIp).digest('hex')

  // 2. Hız Sınırlandırma (Rate Limiting) Kontrolü
  const now = Date.now()
  const rateData = requestLog.get(ipHash)

  if (rateData) {
    if (rateData.resetAt > now) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Kısa süre içinde çok fazla talep gönderdiniz. Lütfen 10 dakika sonra tekrar deneyiniz veya bizi doğrudan arayınız.'
        })
      }
      rateData.count++
    } else {
      requestLog.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    }
  } else {
    requestLog.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  }

  // 3. Gövde Verisini Oku ve Doğrula
  const body = await readBody(event)
  const validation = quoteSchema.safeParse(body)

  if (!validation.success) {
    const issues = validation.error.issues || []
    const firstError = issues[0]?.message || 'Lütfen form alanlarını kontrol ediniz.'
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of issues) {
      const field = issue.path[0] ? String(issue.path[0]) : 'general'
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    }

    throw createError({
      statusCode: 400,
      statusMessage: firstError,
      data: {
        fieldErrors
      }
    })
  }

  const data = validation.data

  // 4. Honeypot & Bot Tespiti
  if (data.hp_website && data.hp_website.trim().length > 0) {
    return {
      success: true,
      referenceCode: 'AT-BOT-OK',
      message: 'Talebiniz başarıyla alındı.'
    }
  }

  if (data.formStartTime > 0 && now - data.formStartTime < 1200) {
    return {
      success: true,
      referenceCode: 'AT-BOT-OK',
      message: 'Talebiniz başarıyla alındı.'
    }
  }

  // Benzersiz Referans Kodu Üret (Örn: AT-2026-7832)
  const referenceCode = `AT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const serviceTitle = SERVICE_TITLES[data.serviceSlug || 'genel'] || data.serviceSlug || 'Genel Keşif'

  // 5. E-posta Bildirimini Gönder (Arka planda çalışır, formu engellemez)
  try {
    await sendQuoteNotification({
      referenceCode,
      fullName: data.fullName,
      phone: data.phone,
      district: data.district,
      serviceTitle,
      estimatedArea: data.estimatedArea,
      notes: data.notes
    })
  } catch (emailErr) {
    console.warn('E-posta bildirim gönderme uyarısı:', emailErr)
  }

  // 6. Hazır WhatsApp Mesaj Metni Üret
  const waMessageParts = [
    `*Yeni Keşif & Teklif Talebi* [${referenceCode}]`,
    `👤 *Müşteri:* ${data.fullName}`,
    `📞 *Telefon:* ${data.phone}`,
    `📍 *İlçe:* ${data.district} / İzmir`,
    `🛠️ *Hizmet:* ${serviceTitle}`,
    data.estimatedArea ? `📐 *Tahmini Alan:* ${data.estimatedArea} m²` : null,
    data.notes ? `📝 *Not:* ${data.notes}` : null,
    `\nKeşif randevusu ve yerinde inceleme için bilgi alabilir miyim?`
  ].filter(Boolean)

  const prefilledWhatsAppText = waMessageParts.join('\n')

  return {
    success: true,
    referenceCode,
    fullName: data.fullName,
    serviceSlug: data.serviceSlug,
    serviceTitle,
    district: data.district,
    prefilledWhatsAppText,
    message: 'Keşif ve teklif talebiniz başarıyla alındı. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.'
  }
})
