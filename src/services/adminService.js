import { supabase } from '@/services/supabase'

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
  // Usar UPDATE con el usuario autenticado
  const { error: updateError } = await supabase
    .from('cms_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('section', section)

  if (!updateError) return

  // Si falla, intentar INSERT
  const { error: insertError } = await supabase
    .from('cms_content')
    .insert({ section, data, updated_at: new Date().toISOString() })

  if (insertError) throw new Error(insertError.message)
}

// ── SUBIR imagen ───────────────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  const ext  = file.name.split('.').pop()
  const name = `${folder}_${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('images (publico)')
    .upload(name, file, { upsert: true, contentType: file.type })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage
    .from('images (publico)')
    .getPublicUrl(name)
  return data.publicUrl
}
