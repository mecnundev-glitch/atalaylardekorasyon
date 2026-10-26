import { useServerSupabase } from '../utils/supabase'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)

  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lütfen yüklenecek bir fotoğraf veya belge seçiniz.'
    })
  }

  const uploadedFiles: Array<{ originalName: string; url: string; size: number }> = []
  const { serverClient, isConfigured } = useServerSupabase()

  for (const part of parts) {
    // Sadece dosya alanlarını işle (name !== 'file' kontrolü yerine dosya verisi olanları al)
    if (!part.filename || !part.data || part.data.length === 0) {
      continue
    }

    const mimeType = part.type || 'application/octet-stream'
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Desteklenmeyen dosya türü (${mimeType}). Yalnızca JPG, PNG, WEBP veya PDF yükleyebilirsiniz.`
      })
    }

    if (part.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: `Dosya boyutu 5 MB sınırını aşıyor (${(part.data.length / (1024 * 1024)).toFixed(1)} MB).`
      })
    }

    // Güvenli dosya adı üret
    const ext = part.filename.split('.').pop()?.toLowerCase() || 'jpg'
    const safeName = `quote-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

    let fileUrl = `client-media://${safeName}`

    // Supabase Storage 'quote-attachments' bucketına yüklemeyi dene
    if (isConfigured && serverClient) {
      try {
        const { data, error } = await serverClient.storage
          .from('quote-attachments')
          .upload(safeName, part.data, {
            contentType: mimeType,
            upsert: false
          })

        if (!error && data?.path) {
          fileUrl = data.path
        } else if (error) {
          console.warn('Supabase storage upload error:', error.message)
        }
      } catch (err) {
        console.warn('Supabase storage exception:', err)
      }
    }

    uploadedFiles.push({
      originalName: part.filename,
      url: fileUrl,
      size: part.data.length
    })
  }

  return {
    success: true,
    files: uploadedFiles
  }
})
