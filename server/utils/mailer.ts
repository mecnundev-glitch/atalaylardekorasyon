import nodemailer from 'nodemailer'

interface SendQuoteEmailOptions {
  referenceCode: string
  fullName: string
  phone: string
  district: string
  serviceTitle: string
  estimatedArea?: number | null
  notes?: string
}

export async function sendQuoteNotification(data: SendQuoteEmailOptions): Promise<{ success: boolean; error?: string }> {
  const config = useRuntimeConfig()

  // 1. SMTP Yapılandırması kontrolü
  const smtpHost = process.env.SMTP_HOST || (config as any).smtpHost
  const smtpPort = Number(process.env.SMTP_PORT || (config as any).smtpPort || 465)
  const smtpUser = process.env.SMTP_USER || (config as any).smtpUser
  const smtpPass = process.env.SMTP_PASS || (config as any).smtpPass
  const smtpFrom = process.env.SMTP_FROM || (config as any).smtpFrom || smtpUser || 'noreply@atalaylardekorasyon.com'
  const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'info@atalaylardekorasyon.com'

  // Resend API desteği (opsiyonel)
  const resendApiKey = process.env.RESEND_API_KEY

  const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
  const cleanPhone = data.phone.replace(/\D/g, '')
  const whatsappReplyUrl = `https://wa.me/${cleanPhone.startsWith('90') ? cleanPhone : '90' + cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(`Merhaba ${data.fullName}, Atalay Dekorasyon'a yapmış olduğunuz keşif talebiniz (${data.referenceCode}) hakkında görüşmek istedik.`)}`

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
        .card { background-color: #ffffff; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #121316 0%, #1e2024 100%); color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #D4AF37; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #D4AF37; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
        .content { padding: 24px; }
        .ref-box { background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; margin-bottom: 20px; }
        .ref-code { font-size: 18px; font-weight: 700; color: #0f172a; font-family: monospace; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .row:last-child { border-bottom: none; }
        .label { color: #64748b; font-weight: 500; }
        .value { color: #0f172a; font-weight: 600; text-align: right; }
        .notes-box { background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #92400e; }
        .btn-container { text-align: center; margin-top: 24px; }
        .whatsapp-btn { display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; }
        .footer { background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Atalaylar Dekorasyon</h1>
          <p>Yeni Web Keşif & Teklif Talebi</p>
        </div>
        <div class="content">
          <div class="ref-box">
            <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; display: block;">Takip Referans Kodu</span>
            <span class="ref-code">${data.referenceCode}</span>
          </div>

          <div class="row">
            <span class="label">Müşteri Ad Soyad:</span>
            <span class="value">${data.fullName}</span>
          </div>
          <div class="row">
            <span class="label">Telefon Numarası:</span>
            <span class="value"><a href="tel:${data.phone}" style="color: #0284c7; text-decoration: none;">${data.phone}</a></span>
          </div>
          <div class="row">
            <span class="label">Hizmet Türü:</span>
            <span class="value">${data.serviceTitle}</span>
          </div>
          <div class="row">
            <span class="label">İzmir İlçesi:</span>
            <span class="value">${data.district}</span>
          </div>
          ${data.estimatedArea ? `
          <div class="row">
            <span class="label">Tahmini Alan:</span>
            <span class="value">${data.estimatedArea} m²</span>
          </div>` : ''}
          <div class="row">
            <span class="label">Talep Tarihi:</span>
            <span class="value">${now}</span>
          </div>

          ${data.notes ? `
          <div class="notes-box">
            <strong>Müşteri Notu / Açıklama:</strong><br>
            ${data.notes}
          </div>` : ''}

          <div class="btn-container">
            <a href="${whatsappReplyUrl}" class="whatsapp-btn" target="_blank">
              Müşteriye WhatsApp'tan Yanıt Ver
            </a>
          </div>
        </div>
        <div class="footer">
          Bu bildirim atalaylardekorasyon.com web sitesi üzerinden gönderilmiştir.
        </div>
      </div>
    </body>
    </html>
  `

  // A) Resend API ile Gönderim (Eğer RESEND_API_KEY varsa)
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: smtpFrom.includes('<') ? smtpFrom : `Atalaylar Dekorasyon <${smtpFrom}>`,
          to: [targetEmail],
          subject: `Yeni Keşif Talebi: ${data.fullName} (${data.district}) - ${data.referenceCode}`,
          html: htmlContent
        })
      })

      if (response.ok) {
        return { success: true }
      }
      const errText = await response.text()
      console.warn('Resend mail gönderme uyarısı:', errText)
    } catch (err: any) {
      console.warn('Resend bağlantı hatası:', err.message)
    }
  }

  // B) SMTP (Nodemailer) ile Gönderim
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // 465 için true, 587 için false
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      })

      await transporter.sendMail({
        from: `"Atalaylar Dekorasyon" <${smtpFrom}>`,
        to: targetEmail,
        replyTo: data.phone,
        subject: `Yeni Keşif Talebi: ${data.fullName} (${data.district}) - [${data.referenceCode}]`,
        html: htmlContent
      })

      return { success: true }
    } catch (smtpErr: any) {
      console.warn('SMTP mail gönderim uyarısı:', smtpErr.message)
      return { success: false, error: smtpErr.message }
    }
  }

  // SMTP bilgileri henüz tanımlanmamışsa hata vermeden logla
  console.info(`[BİLGİ] Yeni keşif talebi alındı ancak SMTP bilgileri tanımlanmadığı için e-posta gönderilmedi. Ref: ${data.referenceCode}, Müşteri: ${data.fullName}`)
  return { success: true }
}
