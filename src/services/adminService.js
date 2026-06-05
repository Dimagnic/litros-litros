import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const SERVICE = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// Cliente público para lectura
const supabase = createClient(URL, ANON)

// Cliente service_role para escritura — bypasea RLS completamente
const supabaseAdmin = createClient(URL, SERVICE)

// ── LEER sección ───────────────────────────────────────────────
export async function getCMSSection(section) {
  try {
    const { data, error } = await supabase
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
  const { error } = await supabaseAdmin
    .from('cms_content')
    .upsert(
      { section, data, updated_at: new Date().toISOString() },
      { onConflict: 'section' }
    )
  if (error) throw new Error(error.message)
}

// ── SUBIR imagen ───────────────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  const ext  = file.name.split('.').pop()
  const name = `${folder}_${Date.now()}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from('images (publico)')
    .upload(name, file, { upsert: true, contentType: file.type })
  if (error) throw new Error(error.message)
  const { data } = supabaseAdmin.storage
    .from('images (publico)')
    .getPublicUrl(name)
  return data.publicUrl
}
