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

// ── SUBIR imagen ───────────────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  const ext  = file.name.split('.').pop()
  const name = `${folder}_${Date.now()}.${ext}`
  const { error } = await db.storage
    .from('litros-images')
    .upload(name, file, { upsert: true, contentType: file.type })
  if (error) throw new Error(error.message)
  const { data } = db.storage.from('litros-images').getPublicUrl(name)
  return data.publicUrl
}
