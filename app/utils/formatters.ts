/**
 * Telefon numarasını Türkiye standart formatına (+90 5XX XXX XX XX) dönüştürür.
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+90 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`
  }
  if (cleaned.length === 12 && cleaned.startsWith('90')) {
    return `+90 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`
  }
  return phone
}

/**
 * Sayıyı m² formatına dönüştürür.
 */
export function formatArea(m2: number): string {
  return `${m2.toLocaleString('tr-TR')} m²`
}
