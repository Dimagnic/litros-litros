import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'
import { initialCMSData } from '@/utils/cmsData'

// Carga una sección del CMS desde Supabase
// Si falla, usa los datos locales como fallback
export function useCMSSection(section) {
  const [data, setData] = useState(initialCMSData[section] ?? {})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('cms_content')
      .select('data')
      .eq('section', section)
      .single()
      .then(({ data: row, error }) => {
        if (!error && row?.data) setData(row.data)
        setLoading(false)
      })
  }, [section])

  return { data, loading }
}

// Guarda una sección del CMS en Supabase
export async function saveCMSSection(section, data) {
  const { error } = await supabase
    .from('cms_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('section', section)

  if (error) throw error
}

// Carga todos los items del menú
export function useMenuItems() {
  const [food, setFood] = useState(initialCMSData.menuData.food)
  const [drinks, setDrinks] = useState(initialCMSData.menuData.drinks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) {
          setFood(data.filter(i => i.type === 'food').map(normalizeMenuItem))
          setDrinks(data.filter(i => i.type === 'drink').map(normalizeMenuItem))
        }
        setLoading(false)
      })
  }, [])

  return { food, drinks, loading }
}

function normalizeMenuItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    image: item.image_url,
    category: item.category,
    type: item.type,
    featured: item.featured,
  }
}

// Carga eventos
export function useEvents() {
  const [events, setEvents] = useState(initialCMSData.events)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('date')
      .then(({ data, error }) => {
        if (!error && data) setEvents(data.map(e => ({ ...e, image: e.image_url })))
        setLoading(false)
      })
  }, [])

  return { events, loading }
}

// Carga canciones
export function useSongs() {
  const [songs, setSongs] = useState(initialCMSData.songs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('songs')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setSongs(data)
        setLoading(false)
      })
  }, [])

  return { songs, loading }
}

// Carga noches de karaoke
export function useKaraokeDates() {
  const [dates, setDates] = useState(initialCMSData.karaokeDates)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('karaoke_dates')
      .select('*')
      .order('date')
      .then(({ data, error }) => {
        if (!error && data) setDates(data)
        setLoading(false)
      })
  }, [])

  return { dates, loading }
}

// Carga redes sociales
export function useSocials() {
  const [socials, setSocials] = useState(initialCMSData.socials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('socials')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) {
          const obj = {}
          data.forEach(s => { obj[s.platform] = s.url })
          setSocials(obj)
        }
        setLoading(false)
      })
  }, [])

  return { socials, loading }
}
