import { useState, useEffect, useCallback } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'
import {
  getCMSSection, saveCMSSection,
  getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem,
  getEvents, createEvent, updateEvent, deleteEvent,
  getSongs, createSong, updateSong, deleteSong,
  getKaraokeDates, createKaraokeDate, updateKaraokeDate, deleteKaraokeDate,
  getSocials, upsertSocial,
} from '@/services/adminService'

// ── Shared primitives ─────────────────────────────────────────
const fieldStyle = {
  width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a',
  borderRadius: '.5rem', padding: '.65rem .9rem', color: '#f2f2f2',
  fontSize: '.9rem', fontFamily: 'var(--font-body)',
  outline: 'none', transition: 'border-color .2s',
}

function Field({ label, type = 'text', value, onChange, textarea }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.4rem' }}>
        {label}
      </label>
      <Tag
        type={type} value={value ?? ''} onChange={e => onChange(e.target.value)}
        style={{ ...fieldStyle, ...(textarea ? { minHeight: '4.5rem', resize: 'vertical' } : {}) }}
        onFocus={e => e.target.style.borderColor = 'rgba(239,68,68,.5)'}
        onBlur={e => e.target.style.borderColor = '#2a2a2a'}
      />
    </div>
  )
}

function SaveBtn({ onClick, loading, label = 'Guardar' }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background: 'linear-gradient(135deg,#ef4444,#a855f7)',
      color: '#fff', border: 'none', borderRadius: '.6rem',
      padding: '.6rem 1.4rem', fontSize: '.875rem', fontWeight: 700,
      cursor: loading ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)', opacity: loading ? .7 : 1,
      display: 'inline-flex', alignItems: 'center', gap: '.5rem',
    }}>
      {loading ? '⏳' : '💾'} {label}
    </button>
  )
}

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)',
      color: '#ef4444', borderRadius: '.5rem', padding: '.45rem .9rem',
      fontSize: '.82rem', fontWeight: 700, cursor: 'pointer',
      fontFamily: 'var(--font-body)', transition: 'all .2s',
    }}>
      + {label}
    </button>
  )
}

function DelBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)',
      color: '#ef4444', borderRadius: '.4rem', padding: '.3rem .65rem',
      fontSize: '.75rem', cursor: 'pointer', flexShrink: 0,
    }}>✕</button>
  )
}

function AdminCard({ title, action, children }) {
  return (
    <div style={{ background: '#141414', border: '1px solid #1f1f1f', borderRadius: '.75rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '.9rem', fontWeight: 700 }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: '1.5rem' }}>{children}</div>
    </div>
  )
}

function Spinner() {
  return <div style={{ color: '#666', fontSize: '.875rem', padding: '1rem 0' }}>⏳ Cargando desde Supabase...</div>
}

// ── DASHBOARD ─────────────────────────────────────────────────
function Dashboard({ stats }) {
  const items = [
    { label: 'Platillos', value: stats.food },
    { label: 'Bebidas', value: stats.drinks },
    { label: 'Eventos', value: stats.events },
    { label: 'Canciones', value: stats.songs },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {items.map(c => (
          <div key={c.label} style={{ background: '#141414', border: '1px solid #1f1f1f', borderRadius: '.75rem', padding: '1.25rem' }}>
            <div style={{ fontSize: '.72rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.5rem' }}>{c.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-head)' }}>{c.value ?? '—'}</div>
          </div>
        ))}
      </div>
      <AdminCard title="Base de datos">
        <p style={{ color: '#666', fontSize: '.875rem' }}>
          Todos los cambios se guardan directamente en Supabase y se reflejan en tiempo real en el sitio público.
        </p>
      </AdminCard>
    </div>
  )
}

// ── CMS SECTIONS (Hero, CTA, Contact, Footer, About, SEO) ─────
function CMSSection({ sectionKey, title, fields, showToast }) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCMSSection(sectionKey)
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sectionKey])

  async function handleSave() {
    setSaving(true)
    try {
      await saveCMSSection(sectionKey, data)
      showToast(`✅ ${title} guardado`)
    } catch {
      showToast('❌ Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />
  return (
    <AdminCard title={title}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '0 1rem' }}>
        {fields.map(f => (
          <div key={f.key} style={f.full ? { gridColumn: '1/-1' } : {}}>
            <Field
              label={f.label}
              type={f.type || 'text'}
              value={data[f.key] ?? ''}
              onChange={v => setData(p => ({ ...p, [f.key]: v }))}
              textarea={f.textarea}
            />
          </div>
        ))}
      </div>
      <SaveBtn onClick={handleSave} loading={saving} />
    </AdminCard>
  )
}

// ── MENU ADMIN ────────────────────────────────────────────────
function MenuAdmin({ showToast }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)

  const load = useCallback(() => {
    getMenuItems().then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleAdd(type) {
    const newItem = { name: 'Nuevo item', price: '$0.00', description: '', image_url: '', category: 'General', type, featured: false, sort_order: 0 }
    try {
      const created = await createMenuItem(newItem)
      setItems(p => [...p, created])
      showToast('✅ Item agregado')
    } catch { showToast('❌ Error al agregar') }
  }

  async function handleUpdate(item) {
    setSaving(item.id)
    try {
      await updateMenuItem(item.id, { ...item, image: item.image_url })
      showToast('✅ Guardado')
    } catch { showToast('❌ Error al guardar') }
    finally { setSaving(null) }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este item?')) return
    try {
      await deleteMenuItem(id)
      setItems(p => p.filter(i => i.id !== id))
      showToast('✅ Eliminado')
    } catch { showToast('❌ Error al eliminar') }
  }

  function updateLocal(id, field, val) {
    setItems(p => p.map(i => i.id === id ? { ...i, [field]: val } : i))
  }

  if (loading) return <Spinner />

  const food = items.filter(i => i.type === 'food')
  const drinks = items.filter(i => i.type === 'drink')

  function ItemList({ list }) {
    return list.map(item => (
      <div key={item.id} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '.6rem', padding: '1rem', marginBottom: '.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '.6rem', marginBottom: '.75rem' }}>
          {[['Nombre','name'],['Precio','price'],['Categoría','category']].map(([label, field]) => (
            <div key={field}>
              <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>{label}</div>
              <input value={item[field] ?? ''} onChange={e => updateLocal(item.id, field, e.target.value)}
                style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem' }} />
            </div>
          ))}
          <div style={{ gridColumn: '1/-1' }}>
            <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>Descripción</div>
            <input value={item.description ?? ''} onChange={e => updateLocal(item.id, 'description', e.target.value)}
              style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>URL imagen</div>
            <input value={item.image_url ?? ''} onChange={e => updateLocal(item.id, 'image_url', e.target.value)}
              style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          <SaveBtn onClick={() => handleUpdate(item)} loading={saving === item.id} label="Guardar" />
          <DelBtn onClick={() => handleDelete(item.id)} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: '#888', cursor: 'pointer' }}>
            <input type="checkbox" checked={item.featured ?? false} onChange={e => updateLocal(item.id, 'featured', e.target.checked)} />
            Promoción
          </label>
        </div>
      </div>
    ))
  }

  return (
    <>
      <AdminCard title="Comida" action={<AddBtn onClick={() => handleAdd('food')} label="Agregar platillo" />}>
        <ItemList list={food} />
      </AdminCard>
      <AdminCard title="Bebidas" action={<AddBtn onClick={() => handleAdd('drink')} label="Agregar bebida" />}>
        <ItemList list={drinks} />
      </AdminCard>
    </>
  )
}

// ── EVENTS ADMIN ──────────────────────────────────────────────
function EventsAdmin({ showToast }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)

  useEffect(() => {
    getEvents().then(d => { setEvents(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  async function handleAdd() {
    const item = { title: 'Nuevo evento', date: new Date().toISOString().slice(0,10), time: '21:00', description: '', image_url: '', price: '$0.00', featured: false }
    try {
      const created = await createEvent(item)
      setEvents(p => [...p, created])
      showToast('✅ Evento agregado')
    } catch { showToast('❌ Error al agregar') }
  }

  async function handleSave(event) {
    setSaving(event.id)
    try { await updateEvent(event.id, event); showToast('✅ Evento guardado') }
    catch { showToast('❌ Error al guardar') }
    finally { setSaving(null) }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este evento?')) return
    try { await deleteEvent(id); setEvents(p => p.filter(e => e.id !== id)); showToast('✅ Eliminado') }
    catch { showToast('❌ Error al eliminar') }
  }

  function upd(id, field, val) { setEvents(p => p.map(e => e.id === id ? { ...e, [field]: val } : e)) }

  if (loading) return <Spinner />
  return (
    <AdminCard title="Eventos" action={<AddBtn onClick={handleAdd} label="Agregar evento" />}>
      {events.map(e => (
        <div key={e.id} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '.6rem', padding: '1rem', marginBottom: '.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '.6rem', marginBottom: '.75rem' }}>
            {[['Título','title','text'],['Fecha','date','date'],['Hora','time','text'],['Precio','price','text']].map(([label,field,type]) => (
              <div key={field}>
                <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>{label}</div>
                <input type={type} value={e[field] ?? ''} onChange={ev => upd(e.id, field, ev.target.value)}
                  style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
              </div>
            ))}
            {[['Descripción','description'],['URL imagen','image_url']].map(([label,field]) => (
              <div key={field} style={{ gridColumn: '1/-1' }}>
                <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>{label}</div>
                <input value={e[field] ?? ''} onChange={ev => upd(e.id, field, ev.target.value)}
                  style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
            <SaveBtn onClick={() => handleSave(e)} loading={saving === e.id} label="Guardar" />
            <DelBtn onClick={() => handleDelete(e.id)} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: '#888', cursor: 'pointer' }}>
              <input type="checkbox" checked={e.featured ?? false} onChange={ev => upd(e.id, 'featured', ev.target.checked)} />
              Destacado
            </label>
          </div>
        </div>
      ))}
    </AdminCard>
  )
}

// ── KARAOKE ADMIN ─────────────────────────────────────────────
function KaraokeAdmin({ showToast }) {
  const [dates, setDates] = useState([])
  const [songs, setSongs] = useState([])
  const [loadingD, setLoadingD] = useState(true)
  const [loadingS, setLoadingS] = useState(true)
  const [savingD, setSavingD] = useState(null)
  const [savingS, setSavingS] = useState(null)

  useEffect(() => {
    getKaraokeDates().then(d => { setDates(d); setLoadingD(false) })
    getSongs().then(d => { setSongs(d); setLoadingS(false) })
  }, [])

  async function addDate() {
    const item = { date: new Date().toISOString().slice(0,10), theme: 'Nueva noche temática', time: '21:00' }
    try { const c = await createKaraokeDate(item); setDates(p => [...p, c]); showToast('✅ Fecha agregada') }
    catch { showToast('❌ Error') }
  }

  async function saveDate(d) {
    setSavingD(d.id)
    try { await updateKaraokeDate(d.id, d); showToast('✅ Guardado') }
    catch { showToast('❌ Error') }
    finally { setSavingD(null) }
  }

  async function delDate(id) {
    if (!confirm('¿Eliminar?')) return
    try { await deleteKaraokeDate(id); setDates(p => p.filter(x => x.id !== id)); showToast('✅ Eliminado') }
    catch { showToast('❌ Error') }
  }

  async function addSong() {
    const item = { title: 'Nueva canción', artist: 'Artista', genre: 'Pop', language: 'Español', sort_order: songs.length }
    try { const c = await createSong(item); setSongs(p => [...p, c]); showToast('✅ Canción agregada') }
    catch { showToast('❌ Error') }
  }

  async function saveSong(s) {
    setSavingS(s.id)
    try { await updateSong(s.id, s); showToast('✅ Guardado') }
    catch { showToast('❌ Error') }
    finally { setSavingS(null) }
  }

  async function delSong(id) {
    if (!confirm('¿Eliminar?')) return
    try { await deleteSong(id); setSongs(p => p.filter(x => x.id !== id)); showToast('✅ Eliminado') }
    catch { showToast('❌ Error') }
  }

  function updD(id, f, v) { setDates(p => p.map(x => x.id === id ? { ...x, [f]: v } : x)) }
  function updS(id, f, v) { setSongs(p => p.map(x => x.id === id ? { ...x, [f]: v } : x)) }

  return (
    <>
      <AdminCard title="Noches temáticas" action={<AddBtn onClick={addDate} label="Agregar fecha" />}>
        {loadingD ? <Spinner /> : dates.map(d => (
          <div key={d.id} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '.6rem', padding: '1rem', marginBottom: '.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '.6rem', marginBottom: '.75rem' }}>
              {[['Fecha','date','date'],['Hora','time','text']].map(([label,field,type]) => (
                <div key={field}>
                  <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>{label}</div>
                  <input type={type} value={d[field] ?? ''} onChange={e => updD(d.id, field, e.target.value)}
                    style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1' }}>
                <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>Tema</div>
                <input value={d.theme ?? ''} onChange={e => updD(d.id, 'theme', e.target.value)}
                  style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <SaveBtn onClick={() => saveDate(d)} loading={savingD === d.id} label="Guardar" />
              <DelBtn onClick={() => delDate(d.id)} />
            </div>
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Catálogo de canciones" action={<AddBtn onClick={addSong} label="Agregar canción" />}>
        {loadingS ? <Spinner /> : songs.map(s => (
          <div key={s.id} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '.6rem', padding: '1rem', marginBottom: '.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '.6rem', marginBottom: '.75rem' }}>
              {[['Título','title'],['Artista','artist'],['Género','genre'],['Idioma','language']].map(([label,field]) => (
                <div key={field}>
                  <div style={{ fontSize: '.65rem', color: '#555', textTransform: 'uppercase', marginBottom: '.2rem' }}>{label}</div>
                  <input value={s[field] ?? ''} onChange={e => updS(s.id, field, e.target.value)}
                    style={{ ...fieldStyle, background: '#141414', fontSize: '.82rem', padding: '.4rem .6rem', width: '100%' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <SaveBtn onClick={() => saveSong(s)} loading={savingS === s.id} label="Guardar" />
              <DelBtn onClick={() => delSong(s.id)} />
            </div>
          </div>
        ))}
      </AdminCard>
    </>
  )
}

// ── CONTACT ADMIN ─────────────────────────────────────────────
function ContactAdmin({ showToast }) {
  return (
    <>
      <CMSSection sectionKey="contact" title="Información de contacto" showToast={showToast}
        fields={[
          { key: 'address', label: 'Dirección', full: true },
          { key: 'phone',   label: 'Teléfono' },
          { key: 'email',   label: 'Email', type: 'email' },
          { key: 'hours',   label: 'Horario' },
          { key: 'wa',      label: 'WhatsApp (solo dígitos)' },
        ]}
      />
      <CMSSection sectionKey="footer" title="Footer" showToast={showToast}
        fields={[
          { key: 'brand',     label: 'Nombre de la marca' },
          { key: 'desc',      label: 'Descripción', full: true },
          { key: 'copyright', label: 'Copyright', full: true },
        ]}
      />
    </>
  )
}

// ── SOCIALS ADMIN ─────────────────────────────────────────────
function SocialsAdmin({ showToast }) {
  const [data, setData] = useState({ fb: '', ig: '', tt: '', yt: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSocials().then(rows => {
      const obj = {}
      rows.forEach(r => { obj[r.platform] = r.url })
      setData(d => ({ ...d, ...obj }))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      await Promise.all(
        Object.entries(data).map(([platform, url]) => upsertSocial(platform, url))
      )
      showToast('✅ Redes sociales guardadas')
    } catch { showToast('❌ Error al guardar') }
    finally { setSaving(false) }
  }

  if (loading) return <Spinner />
  return (
    <AdminCard title="Redes Sociales">
      {[['fb','Facebook'],['ig','Instagram'],['tt','TikTok'],['yt','YouTube']].map(([key,label]) => (
        <Field key={key} label={`${label} URL`} type="url"
          value={data[key]} onChange={v => setData(p => ({ ...p, [key]: v }))} />
      ))}
      <SaveBtn onClick={handleSave} loading={saving} label="Guardar redes" />
    </AdminCard>
  )
}

// ── SECURITY ADMIN ────────────────────────────────────────────
function SecurityAdmin({ showToast }) {
  const { signOut } = useAuth()
  return (
    <AdminCard title="Sesión">
      <p style={{ color: '#666', fontSize: '.875rem', marginBottom: '1.25rem' }}>
        Sesión activa con Supabase Auth. Tu sesión persiste entre recargas de página.
      </p>
      <button onClick={() => { signOut(); showToast('✅ Sesión cerrada') }} style={{
        background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
        color: '#ef4444', borderRadius: '.6rem', padding: '.65rem 1.4rem',
        fontSize: '.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)',
      }}>
        🚪 Cerrar sesión
      </button>
    </AdminCard>
  )
}

// ── NAV CONFIG ────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard',        section: 'Principal' },
  { id: 'hero',      label: 'Hero',             section: 'Contenido' },
  { id: 'menu',      label: 'Menú & Bebidas' },
  { id: 'eventos',   label: 'Eventos' },
  { id: 'karaoke',   label: 'Karaoke' },
  { id: 'contacto',  label: 'Contacto & Footer',section: 'Config' },
  { id: 'redes',     label: 'Redes Sociales' },
  { id: 'nosotros',  label: 'Nosotros' },
  { id: 'seo',       label: 'SEO' },
  { id: 'seguridad', label: 'Seguridad' },
]

const TITLES = {
  dashboard:'Dashboard', hero:'Hero', menu:'Menú & Bebidas',
  eventos:'Eventos', karaoke:'Karaoke', contacto:'Contacto & Footer',
  redes:'Redes Sociales', nosotros:'Nosotros', seo:'SEO', seguridad:'Seguridad',
}

// ── MAIN PANEL ────────────────────────────────────────────────
export default function AdminPanel() {
  const { cms, adminPanelOpen, setAdminPanelOpen, showToast } = useCMS()
  const { isAdmin, signOut } = useAuth()
  const [active, setActive] = useState('dashboard')
  const [stats, setStats] = useState({ food: '…', drinks: '…', events: '…', songs: '…' })

  useEffect(() => {
    if (!adminPanelOpen || !isAdmin) return
    Promise.all([getMenuItems(), getEvents(), getSongs()]).then(([menu, events, songs]) => {
      setStats({
        food:   menu.filter(i => i.type === 'food').length,
        drinks: menu.filter(i => i.type === 'drink').length,
        events: events.length,
        songs:  songs.length,
      })
    }).catch(() => {})
  }, [adminPanelOpen, isAdmin])

  function logout(viewSite = false) {
    if (!viewSite) signOut()
    setAdminPanelOpen(false)
  }

  if (!adminPanelOpen || !isAdmin) return null

  function renderSection() {
    const p = { showToast, cms }
    switch (active) {
      case 'dashboard': return <Dashboard stats={stats} />
      case 'hero':      return (
        <>
          <CMSSection sectionKey="hero" title="Hero principal" showToast={showToast}
            fields={[
              { key: 'title',    label: 'Título principal' },
              { key: 'subtitle', label: 'Subtítulo', full: true },
              { key: 'btn1',     label: 'Botón primario' },
              { key: 'btn2',     label: 'Botón secundario' },
              { key: 'logo',     label: 'URL del logo', full: true },
            ]}
          />
          <CMSSection sectionKey="cta" title="Sección CTA" showToast={showToast}
            fields={[
              { key: 'title', label: 'Título CTA' },
              { key: 'sub',   label: 'Subtítulo CTA' },
              { key: 'btn',   label: 'Texto del botón' },
            ]}
          />
        </>
      )
      case 'menu':      return <MenuAdmin showToast={showToast} />
      case 'eventos':   return <EventsAdmin showToast={showToast} />
      case 'karaoke':   return <KaraokeAdmin showToast={showToast} />
      case 'contacto':  return <ContactAdmin showToast={showToast} />
      case 'redes':     return <SocialsAdmin showToast={showToast} />
      case 'nosotros':  return (
        <CMSSection sectionKey="about" title="Nosotros" showToast={showToast}
          fields={[
            { key: 'title', label: 'Título' },
            { key: 'sub',   label: 'Subtítulo', full: true },
            { key: 'h2',    label: 'Heading secundario' },
            { key: 'img',   label: 'URL imagen', full: true },
            { key: 'p1',    label: 'Párrafo 1', full: true, textarea: true },
            { key: 'p2',    label: 'Párrafo 2', full: true, textarea: true },
            { key: 'p3',    label: 'Párrafo 3', full: true, textarea: true },
          ]}
        />
      )
      case 'seo':       return (
        <CMSSection sectionKey="seo" title="SEO" showToast={showToast}
          fields={[
            { key: 'title', label: 'Meta título', full: true },
            { key: 'desc',  label: 'Meta descripción', full: true, textarea: true },
            { key: 'kw',    label: 'Keywords', full: true },
          ]}
        />
      )
      case 'seguridad': return <SecurityAdmin showToast={showToast} />
      default: return null
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', background: '#0a0a0a' }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#0d0d0d', borderRight: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '1.1rem', borderBottom: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', gap: '.65rem' }}>
          <img src={cms.hero.logo} alt="Logo" style={{ width: '1.8rem', height: '1.8rem', borderRadius: '.3rem' }} />
          <span style={{ fontSize: '.85rem', fontWeight: 800, fontFamily: 'var(--font-head)', background: 'linear-gradient(135deg,#ef4444,#a855f7,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Litros & Litros
          </span>
        </div>
        <div style={{ padding: '.6rem .5rem', flex: 1 }}>
          {NAV.map(item => (
            <div key={item.id}>
              {item.section && (
                <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#444', padding: '.65rem .6rem .3rem' }}>
                  {item.section}
                </div>
              )}
              <button onClick={() => setActive(item.id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '.5rem .7rem', borderRadius: '.45rem',
                fontSize: '.83rem', fontWeight: 500, border: 'none',
                color: active === item.id ? '#ef4444' : '#888',
                background: active === item.id ? 'rgba(239,68,68,.12)' : 'none',
                cursor: 'pointer', transition: 'all .15s', marginBottom: '.05rem',
              }}>
                {item.label}
              </button>
            </div>
          ))}
        </div>
        <div style={{ padding: '.75rem .5rem', borderTop: '1px solid #1f1f1f' }}>
          <button onClick={() => logout()} style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '.5rem .7rem', borderRadius: '.45rem',
            fontSize: '.83rem', fontWeight: 500, color: '#666',
            border: 'none', background: 'none', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#666'; e.currentTarget.style.background = 'none' }}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid #1f1f1f', padding: '0 1.75rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d0d0d', flexShrink: 0 }}>
          <h1 style={{ fontSize: '.95rem', fontWeight: 700 }}>{TITLES[active]}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{ background: 'rgba(239,68,68,.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,.25)', padding: '.18rem .55rem', borderRadius: 999, fontSize: '.72rem', fontWeight: 700 }}>
              Admin
            </span>
            <button onClick={() => logout(true)} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: '.4rem', padding: '.28rem .6rem', fontSize: '.78rem', cursor: 'pointer' }}>
              Ver sitio
            </button>
          </div>
        </div>
        <div style={{ padding: '1.75rem', flex: 1 }}>
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
