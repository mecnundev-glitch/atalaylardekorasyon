import { computed } from 'vue'
import { BUSINESS_CONFIG, MAIN_NAV_LINKS } from '~/config/business'

export const useSiteConfig = () => {
  const runtime = useRuntimeConfig()

  const config = useState('site_config', () => {
    const pub = runtime?.public
    const phone = (pub?.contactPhone as string) || BUSINESS_CONFIG.contact.phone
    const whatsapp = (pub?.whatsappPhone as string) || BUSINESS_CONFIG.contact.whatsapp
    const email = (pub?.contactEmail as string) || BUSINESS_CONFIG.contact.email
    const city = (pub?.locationCity as string) || BUSINESS_CONFIG.contact.city
    const name = (pub?.siteName as string) || BUSINESS_CONFIG.name

    return {
      ...BUSINESS_CONFIG,
      name,
      contact: {
        ...BUSINESS_CONFIG.contact,
        phone,
        whatsapp,
        email,
        city
      }
    }
  })

  const navLinks = useState('nav_links', () => MAIN_NAV_LINKS)

  // Gerçek numara doğrulaması: Boş, şablon (0000000, 5555555, example, ornek) olmayan geçerli telefon
  const isRealPhoneNumber = (raw: unknown): boolean => {
    if (raw === undefined || raw === null) return false
    const str = String(raw).trim().toLowerCase()
    if (!str) return false
    if (
      str.includes('0000000') ||
      str.includes('example') ||
      str.includes('ornek') ||
      str.includes('5555555') ||
      str.includes('1234567')
    ) {
      return false
    }
    const digits = str.replace(/\D/g, '')
    return digits.length >= 10 && !digits.endsWith('000000')
  }

  const isPhoneConfigured = computed(() => isRealPhoneNumber(config.value?.contact?.phone))
  const isWhatsAppConfigured = computed(() => isRealPhoneNumber(config.value?.contact?.whatsapp))

  const getWhatsAppUrl = (customMessage?: string) => {
    if (!isWhatsAppConfigured.value) return '#'
    let rawDigits = String(config.value?.contact?.whatsapp || '').replace(/\D/g, '')
    // Türkiye numarası ise ve 0 ile başlıyorsa 90'a çevir
    if (rawDigits.startsWith('0') && rawDigits.length === 11) {
      rawDigits = `9${rawDigits}`
    } else if (rawDigits.length === 10) {
      rawDigits = `90${rawDigits}`
    }

    const defaultMsg = `Merhaba, ${config.value.name} hizmetleriniz hakkında bilgi ve yerinde keşif randevusu almak istiyorum.`
    const encoded = encodeURIComponent(customMessage || defaultMsg)
    return `https://wa.me/${rawDigits}?text=${encoded}`
  }

  const getPhoneCallUrl = () => {
    if (!isPhoneConfigured.value) return '#'
    return `tel:${String(config.value?.contact?.phone || '').replace(/\s+/g, '')}`
  }

  return {
    config,
    navLinks,
    isPhoneConfigured,
    isWhatsAppConfigured,
    getWhatsAppUrl,
    getPhoneCallUrl
  }
}
