import { createClient } from '@supabase/supabase-js'

const URL_SB  = import.meta.env.VITE_SUPABASE_URL
const ANON    = import.meta.env.VITE_SUPABASE_ANON_KEY
const db      = createClient(URL_SB, ANON)

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
  } catch { return null }
}

// ── GUARDAR sección ────────────────────────────────────────────
export async function saveCMSSection(section, data) {
  const { error } = await db
    .from('cms_content')
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' })
  if (error) throw new Error(error.message)
}

// ── COMPRIMIR imagen (canvas) ──────────────────────────────────
function compressImage(file, maxW = 1920, quality = 0.85) {
  return new Promise((resolve, reject) => {
    // Verificar que estamos en navegador
    if (typeof window === 'undefined' || !window.URL) {
      resolve(file)
      return
    }
    const objectUrl = window.URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        let w = img.naturalWidth
        let h = img.naturalHeight
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
        canvas.width  = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        canvas.toBlob(blob => {
          window.URL.revokeObjectURL(objectUrl)
          if (!blob) { resolve(file); return }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type:'image/jpeg' }))
        }, 'image/jpeg', quality)
      } catch { resolve(file) }
    }
    img.onerror = () => { window.URL.revokeObjectURL(objectUrl); resolve(file) }
    img.src = objectUrl
  })
}

// ── SUBIR imagen ───────────────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  let toUpload = file
  try { toUpload = await compressImage(file) } catch { toUpload = file }

  const ext  = toUpload.type === 'image/jpeg' ? 'jpg' : file.name.split('.').pop()
  const name = `${folder}_${Date.now()}.${ext}`

  const { error } = await db.storage
    .from('litros-images')
    .upload(name, toUpload, { upsert: true, contentType: toUpload.type || file.type })
  if (error) throw new Error(error.message)

  const { data } = db.storage.from('litros-images').getPublicUrl(name)
  return data.publicUrl
}
