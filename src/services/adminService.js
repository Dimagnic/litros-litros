import { supabase } from '@/services/supabase'

// ── CMS: leer sección ──────────────────────────────────────────
export async function getCMSSection(section) {
  const { data, error } = await supabase
    .from('cms_content')
    .select('data')
    .eq('section', section)
    .single()
  if (error) throw error
  return data?.data
}

// ── CMS: guardar sección (upsert) ──────────────────────────────
export async function saveCMSSection(section, data) {
  // Primero intentar update
  const { error: updateError } = await supabase
    .from('cms_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('section', section)

  if (!updateError) return

  // Si falla el update, intentar insert
  const { error: insertError } = await supabase
    .from('cms_content')
    .insert({ section, data, updated_at: new Date().toISOString() })

  if (insertError) throw new Error(insertError.message)
}

// ── STORAGE: subir imagen ──────────────────────────────────────
export async function uploadImage(file, path) {
  const ext  = file.name.split('.').pop()
  const name = `${path}_${Date.now()}.${ext}`
  const { data, error } = await supabase.storage
    .from('images (publico)')
    .upload(name, file, { upsert: true, contentType: file.type })
  if (error) throw error
  const { data: urlData } = supabase.storage
    .from('images (publico)')
    .getPublicUrl(name)
  return urlData.publicUrl
}
