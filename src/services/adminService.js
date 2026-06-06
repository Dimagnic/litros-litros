import { createClient } from '@supabase/supabase-js'

const URL     = import.meta.env.VITE_SUPABASE_URL
const ANON    = import.meta.env.VITE_SUPABASE_ANON_KEY

// Un solo cliente — el usuario autenticado tendrá permisos via RLS
const db = createClient(URL, ANON)

// ── LEER sección ───────────────────────────────────────────────
export async function getCMSSection(section) {
  try {
    const { data, error } = await db
      .from('cms_content')
      .select('data')
      .eq('section', section)
      .single()
    if (error) return null
    return data?.data ?? null
  } catch {
    return null
  }
}

// ── GUARDAR sección ────────────────────────────────────────────
export async function saveCMSSection(section, data) {
  const { error } = await db
    .from('cms_content')
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' })
  if (error) throw new Error(error.message)
}

// ── COMPRIMIR imagen antes de subir ───────────────────────────
async function compressImage(file, maxW = 1920, quality = 0.85) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img

      // Redimensionar si es más grande que maxW
      if (width > maxW) {
        height = Math.round(height * maxW / width)
        width = maxW
      }

      canvas.width  = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        blob => {
          URL.revokeObjectURL(url)
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type:'image/jpeg' }))
        },
        'image/jpeg',
        quality
      )
    }
    img.src = url
  })
}

// ── SUBIR imagen ───────────────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  // Comprimir antes de subir
  const compressed = await compressImage(file)
  const name = `${folder}_${Date.now()}.jpg`
  const { error } = await db.storage
    .from('litros-images')
    .upload(name, compressed, { upsert: true, contentType: 'image/jpeg' })
  if (error) throw new Error(error.message)
  const { data } = db.storage.from('litros-images').getPublicUrl(name)
  return data.publicUrl
}
