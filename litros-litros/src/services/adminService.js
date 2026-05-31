import { supabase } from '@/services/supabase'

// ── CMS CONTENT ───────────────────────────────────────────────

export async function getCMSSection(section) {
  const { data, error } = await supabase
    .from('cms_content')
    .select('data')
    .eq('section', section)
    .single()
  if (error) throw error
  return data.data
}

export async function saveCMSSection(section, data) {
  const { error } = await supabase
    .from('cms_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('section', section)
  if (error) throw error
}

// ── MENU ITEMS ────────────────────────────────────────────────

export async function getMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('type')
    .order('sort_order')
  if (error) throw error
  return data
}

export async function createMenuItem(item) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([{
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url || item.image,
      category: item.category,
      type: item.type,
      featured: item.featured ?? false,
      sort_order: item.sort_order ?? 0,
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateMenuItem(id, item) {
  const { error } = await supabase
    .from('menu_items')
    .update({
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url || item.image,
      category: item.category,
      featured: item.featured ?? false,
    })
    .eq('id', id)
  if (error) throw error
}

export async function deleteMenuItem(id) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── EVENTS ────────────────────────────────────────────────────

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date')
  if (error) throw error
  return data
}

export async function createEvent(event) {
  const { data, error } = await supabase
    .from('events')
    .insert([{
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      image_url: event.image_url || event.image,
      price: event.price,
      featured: event.featured ?? false,
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateEvent(id, event) {
  const { error } = await supabase
    .from('events')
    .update({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      image_url: event.image_url || event.image,
      price: event.price,
      featured: event.featured ?? false,
    })
    .eq('id', id)
  if (error) throw error
}

export async function deleteEvent(id) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── SONGS ─────────────────────────────────────────────────────

export async function getSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return data
}

export async function createSong(song) {
  const { data, error } = await supabase
    .from('songs')
    .insert([{
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      language: song.language,
      sort_order: song.sort_order ?? 0,
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateSong(id, song) {
  const { error } = await supabase
    .from('songs')
    .update({
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      language: song.language,
    })
    .eq('id', id)
  if (error) throw error
}

export async function deleteSong(id) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── KARAOKE DATES ─────────────────────────────────────────────

export async function getKaraokeDates() {
  const { data, error } = await supabase
    .from('karaoke_dates')
    .select('*')
    .order('date')
  if (error) throw error
  return data
}

export async function createKaraokeDate(item) {
  const { data, error } = await supabase
    .from('karaoke_dates')
    .insert([{ date: item.date, theme: item.theme, time: item.time }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateKaraokeDate(id, item) {
  const { error } = await supabase
    .from('karaoke_dates')
    .update({ date: item.date, theme: item.theme, time: item.time })
    .eq('id', id)
  if (error) throw error
}

export async function deleteKaraokeDate(id) {
  const { error } = await supabase
    .from('karaoke_dates')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── SOCIALS ───────────────────────────────────────────────────

export async function getSocials() {
  const { data, error } = await supabase
    .from('socials')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return data
}

export async function upsertSocial(platform, url) {
  const { error } = await supabase
    .from('socials')
    .upsert({ platform, url }, { onConflict: 'platform' })
  if (error) throw error
}
