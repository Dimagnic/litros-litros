import { supabase } from '@/services/supabase'

// ── CMS: leer sección ──────────────────────────────────────────
export async function getCMSSection(section) {
  const { data, error } = await supabase
    .from('cms_content')
    .select('data')
    .eq('section', section)
    .single()
  if (error) {
    if (error.code === 'PGRST116') return null // No existe la fila
    throw error
  }
  return data?.data
}

// ── CMS: guardar sección ───────────────────────────────────────
export async function saveCMSSection(section, data) {
  // Intentar UPDATE primero
  const { error: updateError, count } = await supabase
    .from('cms_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('section', section)
    .select('section')

  // Si el UPDATE no encontró la fila, hacer INSERT
  if (!updateError && count === 0) {
    const { error: insertError } = await supabase
      .from('cms_content')
      .insert({ section, data, updated_at: new Date().toISOString() })
    if (insertError) throw new Error('Error al crear sección: ' + insertError.message)
    return
  }

  if (updateError) throw new Error('Error al guardar: ' + updateError.message)
}

// ── STORAGE: subir imagen ──────────────────────────────────────
export async function uploadImage(file, folder = 'cms') {
  const ext  = file.name.split('.').pop()
  const name = `${folder}_${Date.now()}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('images (publico)')
    .upload(name, file, { upsert: true, contentType: file.type })
  if (uploadError) throw new Error('Error al subir imagen: ' + uploadError.message)
  const { data } = supabase.storage
    .from('images (publico)')
    .getPublicUrl(name)
  return data.publicUrl
}
