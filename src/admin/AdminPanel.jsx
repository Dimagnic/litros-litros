import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'
import { getCMSSection, saveCMSSection } from '@/services/adminService'

// ── Primitivos UI ─────────────────────────────────────────────
const F = { width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'.5rem', padding:'.65rem .9rem', color:'#f2f2f2', fontSize:'.9rem', fontFamily:'var(--font-body)', outline:'none' }
const TA = { ...F, minHeight:'4.5rem', resize:'vertical' }

function Field({ label, value, onChange, textarea, type='text' }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'#888', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.35rem' }}>{label}</label>
      <Tag type={type} value={value ?? ''} onChange={e => onChange(e.target.value)}
        style={textarea ? TA : F}
        onFocus={e => e.target.style.borderColor='rgba(239,68,68,.5)'}
        onBlur={e => e.target.style.borderColor='#2a2a2a'} />
    </div>
  )
}

function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff', border:'none',
      borderRadius:'.6rem', padding:'.55rem 1.3rem', fontSize:'.875rem', fontWeight:700,
      cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font-body)',
      opacity: loading ? .7 : 1, display:'inline-flex', alignItems:'center', gap:'.4rem',
    }}>{loading ? '⏳' : '💾'} Guardar</button>
  )
}

function Card({ title, children }) {
  return (
    <div style={{ background:'#141414', border:'1px solid #1f1f1f', borderRadius:'.75rem', overflow:'hidden', marginBottom:'1.5rem' }}>
      <div style={{ padding:'.85rem 1.25rem', borderBottom:'1px solid #1f1f1f', fontSize:'.9rem', fontWeight:700 }}>{title}</div>
      <div style={{ padding:'1.25rem' }}>{children}</div>
    </div>
  )
}

// ── Tabs ──────────────────────────────────────────────────────
const TABS = [
  { id:'hero',      label:'🏠 Inicio'    },
  { id:'musica',    label:'🎵 Música'    },
  { id:'bebidas',   label:'🍹 Bebidas'   },
  { id:'alimentos', label:'🍔 Alimentos' },
  { id:'eventos',   label:'🎉 Eventos'   },
  { id:'reservas',  label:'📲 Reservas'  },
  { id:'seo',       label:'🔍 SEO'       },
]

// ── Secciones editables ───────────────────────────────────────
function HeroEditor({ data, onChange, onSave, loading }) {
  return (
    <Card title="Sección Hero (Inicio)">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Eslogan / Subtítulo" value={data.subtitle} onChange={v => onChange('subtitle', v)} textarea />
      <Field label="Badge (ej: Karaoke Bar · Puebla)" value={data.badge} onChange={v => onChange('badge', v)} />
      <Field label="Horario" value={data.horario} onChange={v => onChange('horario', v)} />
      <Field label="Botón 1 (promos)" value={data.btn1} onChange={v => onChange('btn1', v)} />
      <Field label="Botón 2 (reservar)" value={data.btn2} onChange={v => onChange('btn2', v)} />
      <Field label="URL Logo" value={data.logo} onChange={v => onChange('logo', v)} />
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function MusicaEditor({ data, onChange, onSave, loading }) {
  function updateFeature(i, key, val) {
    const features = [...(data.features || [])]
    features[i] = { ...features[i], [key]: val }
    onChange('features', features)
  }
  return (
    <Card title="Sección Música">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Subtítulo" value={data.sub} onChange={v => onChange('sub', v)} textarea />
      <div style={{ marginTop:'1rem' }}>
        <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'#888', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.75rem' }}>Características</label>
        {(data.features || []).map((f, i) => (
          <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem' }}>
            <Field label={`Ícono ${i+1}`} value={f.icon} onChange={v => updateFeature(i,'icon',v)} />
            <Field label="Título" value={f.title} onChange={v => updateFeature(i,'title',v)} />
            <Field label="Descripción" value={f.desc} onChange={v => updateFeature(i,'desc',v)} textarea />
          </div>
        ))}
      </div>
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function BebidasEditor({ data, onChange, onSave, loading }) {
  return (
    <Card title="Sección Bebidas">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Subtítulo" value={data.sub} onChange={v => onChange('sub', v)} textarea />
      <Field label="Texto promocional (ej: bebida gratis cumpleaños)" value={data.promo} onChange={v => onChange('promo', v)} />
      <p style={{ fontSize:'.8rem', color:'#666', marginTop:'.5rem' }}>Los precios del menú de bebidas se editan directamente en la base de datos Supabase (tabla: cms_content, sección: menuBebidas).</p>
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function AlimentosEditor({ data, onChange, onSave, loading }) {
  function updateItem(i, key, val) {
    const items = [...(data.items || [])]
    items[i] = { ...items[i], [key]: val }
    onChange('items', items)
  }
  return (
    <Card title="Sección Alimentos">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Subtítulo" value={data.sub} onChange={v => onChange('sub', v)} textarea />
      {(data.items || []).map((item, i) => (
        <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem' }}>
          <div style={{ display:'flex', gap:'.75rem' }}>
            <div style={{ flex:1 }}><Field label="Nombre" value={item.name} onChange={v => updateItem(i,'name',v)} /></div>
            <div style={{ width:'8rem' }}><Field label="Precio" value={item.price} onChange={v => updateItem(i,'price',v)} /></div>
            <div style={{ width:'4rem' }}><Field label="Ícono" value={item.icon} onChange={v => updateItem(i,'icon',v)} /></div>
          </div>
          <Field label="Descripción / Ingredientes" value={item.desc} onChange={v => updateItem(i,'desc',v)} textarea />
        </div>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function EventosEditor({ data, onChange, onSave, loading }) {
  function updateItem(i, key, val) {
    const items = [...(data.items || [])]
    items[i] = { ...items[i], [key]: val }
    onChange('items', items)
  }
  return (
    <Card title="Sección Eventos">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Subtítulo" value={data.sub} onChange={v => onChange('sub', v)} textarea />
      {(data.items || []).map((item, i) => (
        <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem' }}>
          <div style={{ display:'flex', gap:'.75rem' }}>
            <div style={{ width:'4rem' }}><Field label="Ícono" value={item.icon} onChange={v => updateItem(i,'icon',v)} /></div>
            <div style={{ flex:1 }}><Field label="Título" value={item.title} onChange={v => updateItem(i,'title',v)} /></div>
          </div>
          <Field label="Descripción" value={item.desc} onChange={v => updateItem(i,'desc',v)} textarea />
        </div>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function ReservasEditor({ data, onChange, onSave, loading }) {
  return (
    <Card title="Sección Reservas">
      <Field label="Título" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Subtítulo" value={data.sub} onChange={v => onChange('sub', v)} textarea />
      <Field label="Número WhatsApp (sin + ni espacios)" value={data.wa} onChange={v => onChange('wa', v)} />
      <Field label="Mensaje predeterminado WhatsApp" value={data.waMsg} onChange={v => onChange('waMsg', v)} />
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

function SeoEditor({ data, onChange, onSave, loading }) {
  return (
    <Card title="SEO y Metadatos">
      <Field label="Título (aparece en pestaña del navegador)" value={data.title} onChange={v => onChange('title', v)} />
      <Field label="Descripción (Google)" value={data.desc} onChange={v => onChange('desc', v)} textarea />
      <Field label="Palabras clave" value={data.kw} onChange={v => onChange('kw', v)} />
      <SaveBtn onClick={onSave} loading={loading} />
    </Card>
  )
}

// ── ADMIN PANEL ───────────────────────────────────────────────
export default function AdminPanel() {
  const { adminPanelOpen, setAdminPanelOpen, showToast, cms, updateCMS } = useCMS()
  const { isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('hero')
  const [localData, setLocalData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (adminPanelOpen && cms) setLocalData(JSON.parse(JSON.stringify(cms)))
  }, [adminPanelOpen])

  if (!adminPanelOpen || !isAdmin) return null

  function handleChange(section, key, val) {
    setLocalData(prev => ({ ...prev, [section]: { ...prev[section], [key]: val } }))
  }

  async function handleSave(section) {
    setLoading(true)
    try {
      await saveCMSSection(section, localData[section])
      updateCMS(section, localData[section])
      showToast(`✅ ${section} guardado correctamente`)
    } catch (e) {
      showToast(`❌ Error al guardar: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const d = localData
  const onChange = section => (key, val) => handleChange(section, key, val)
  const onSave   = section => () => handleSave(section)

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,.8)', backdropFilter:'blur(6px)', display:'flex', justifyContent:'flex-end' }}
      onClick={e => e.target === e.currentTarget && setAdminPanelOpen(false)}>
      <div style={{ width:'min(700px,100vw)', height:'100vh', background:'#0f0f0f', borderLeft:'1px solid #1f1f1f', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid #1f1f1f', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:'1rem', fontFamily:'var(--font-head)' }}>Panel Admin</div>
            <div style={{ fontSize:'.75rem', color:'#666' }}>Litros & Litros CMS</div>
          </div>
          <button onClick={() => setAdminPanelOpen(false)} style={{ background:'none', border:'none', color:'#666', cursor:'pointer', padding:'.35rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', overflowX:'auto', borderBottom:'1px solid #1f1f1f', flexShrink:0, scrollbarWidth:'none' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:'.65rem 1rem', fontSize:'.78rem', fontWeight: activeTab === t.id ? 700 : 500,
              color: activeTab === t.id ? 'var(--primary)' : '#666',
              borderBottom: activeTab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
              background:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap',
              fontFamily:'var(--font-body)', transition:'color .2s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:'auto', padding:'1.25rem' }}>
          {d.hero      && activeTab==='hero'      && <HeroEditor      data={d.hero}      onChange={onChange('hero')}      onSave={onSave('hero')}      loading={loading} />}
          {d.musica    && activeTab==='musica'    && <MusicaEditor    data={d.musica}    onChange={onChange('musica')}    onSave={onSave('musica')}    loading={loading} />}
          {d.bebidas   && activeTab==='bebidas'   && <BebidasEditor   data={d.bebidas}   onChange={onChange('bebidas')}   onSave={onSave('bebidas')}   loading={loading} />}
          {d.alimentos && activeTab==='alimentos' && <AlimentosEditor data={d.alimentos} onChange={onChange('alimentos')} onSave={onSave('alimentos')} loading={loading} />}
          {d.eventos   && activeTab==='eventos'   && <EventosEditor   data={d.eventos}   onChange={onChange('eventos')}   onSave={onSave('eventos')}   loading={loading} />}
          {d.reservas  && activeTab==='reservas'  && <ReservasEditor  data={d.reservas}  onChange={onChange('reservas')}  onSave={onSave('reservas')}  loading={loading} />}
          {d.seo       && activeTab==='seo'       && <SeoEditor       data={d.seo}       onChange={onChange('seo')}       onSave={onSave('seo')}       loading={loading} />}
        </div>
      </div>
    </div>
  )
}
