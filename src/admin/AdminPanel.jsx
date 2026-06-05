import { useState, useEffect, useRef } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'
import { saveCMSSection, uploadImage } from '@/services/adminService'

// ── DESIGN TOKENS ─────────────────────────────────────────────
const BG   = '#0d1520'
const CARD = '#141f30'
const CARD2= '#1a2537'
const BDR  = 'rgba(41,90,158,.25)'
const BDRS = 'rgba(41,90,158,.5)'
const PRI  = '#295A9E'
const PRIL = '#3a7bd5'
const FG   = '#fff'
const FGM  = 'rgba(234,234,234,.65)'
const FGD  = 'rgba(234,234,234,.35)'

// ── UI PRIMITIVOS ──────────────────────────────────────────────
const INP = {
  width:'100%', background:CARD2, border:`1px solid ${BDR}`,
  borderRadius:'.5rem', padding:'.65rem .9rem', color:FG,
  fontSize:'.88rem', fontFamily:'var(--font-body)', outline:'none',
}
const TA = { ...INP, minHeight:'4.5rem', resize:'vertical' }

function Field({ label, value, onChange, textarea, type='text', hint, placeholder }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.68rem', fontWeight:700, color:FGD, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>{label}</label>
      <Tag type={type} value={value ?? ''} placeholder={placeholder || ''}
        onChange={e => onChange(e.target.value)}
        style={textarea ? TA : INP}
        onFocus={e => e.target.style.borderColor=BDRS}
        onBlur={e => e.target.style.borderColor=BDR} />
      {hint && <p style={{ fontSize:'.68rem', color:FGD, marginTop:'.25rem' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ label, value, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', padding:'.75rem', background:CARD2, borderRadius:'.5rem', border:`1px solid ${BDR}` }}>
      <label style={{ fontSize:'.9rem', color:FGM }}>{label}</label>
      <button onClick={() => onChange(!value)} style={{
        width:'3rem', height:'1.5rem', borderRadius:'999px', border:'none', cursor:'pointer',
        background: value ? PRI : '#2a3548', position:'relative', transition:'background .2s',
      }}>
        <span style={{ position:'absolute', top:'3px', left: value ? 'calc(100% - 21px)' : '3px', width:'18px', height:'18px', borderRadius:'50%', background:'#fff', transition:'left .2s', display:'block' }}/>
      </button>
    </div>
  )
}

function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background: loading ? '#1a3a6b' : PRI, color:'#fff', border:'none',
      borderRadius:'.6rem', padding:'.6rem 1.5rem', fontSize:'.88rem', fontWeight:700,
      cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font-body)',
      display:'inline-flex', alignItems:'center', gap:'.4rem',
      boxShadow: loading ? 'none' : `0 4px 16px rgba(41,90,158,.4)`,
      transition:'all .2s',
    }}>{loading ? '⏳ Guardando...' : '💾 Guardar cambios'}</button>
  )
}

function DeleteBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background:'rgba(220,38,38,.1)', color:'#f87171', border:'1px solid rgba(220,38,38,.3)',
      borderRadius:'.5rem', padding:'.45rem .9rem', fontSize:'.8rem', fontWeight:600,
      cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background='rgba(220,38,38,.2)' }}
      onMouseLeave={e => { e.currentTarget.style.background='rgba(220,38,38,.1)' }}
    >🗑 Eliminar</button>
  )
}

function AddBtn({ onClick, label='+ Agregar' }) {
  return (
    <button onClick={onClick} style={{
      background:'rgba(41,90,158,.12)', color:PRIL, border:`1px dashed ${BDR}`,
      borderRadius:'.5rem', padding:'.55rem 1rem', fontSize:'.85rem', fontWeight:600,
      cursor:'pointer', fontFamily:'var(--font-body)', width:'100%', transition:'all .2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background='rgba(41,90,158,.2)'; e.currentTarget.style.borderColor=BDRS }}
      onMouseLeave={e => { e.currentTarget.style.background='rgba(41,90,158,.12)'; e.currentTarget.style.borderColor=BDR }}
    >{label}</button>
  )
}

function Card({ title, subtitle, children, collapsible=false }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ background:CARD, border:`1px solid ${BDR}`, borderRadius:'.75rem', overflow:'hidden', marginBottom:'1.25rem' }}>
      <div onClick={collapsible ? () => setOpen(o=>!o) : undefined}
        style={{ padding:'.85rem 1.25rem', borderBottom: open ? `1px solid ${BDR}` : 'none',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor: collapsible ? 'pointer' : 'default',
          background:'rgba(41,90,158,.05)',
        }}>
        <div>
          <div style={{ fontSize:'.9rem', fontWeight:700, color:FG }}>{title}</div>
          {subtitle && <div style={{ fontSize:'.72rem', color:FGD, marginTop:'.15rem' }}>{subtitle}</div>}
        </div>
        {collapsible && <span style={{ color:FGD, transition:'transform .2s', display:'inline-block', transform: open ? 'rotate(180deg)' : '' }}>▾</span>}
      </div>
      {open && <div style={{ padding:'1.25rem' }}>{children}</div>}
    </div>
  )
}

// ── IMAGE UPLOADER ─────────────────────────────────────────────
function ImageUploader({ label, value, onChange, folder='cms' }) {
  const ref = useRef()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  useEffect(() => { setPreview(value) }, [value])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, folder)
      onChange(url)
      setPreview(url)
    } catch (err) {
      alert('Error al subir imagen: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.68rem', fontWeight:700, color:FGD, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>{label}</label>
      {preview && (
        <div style={{ marginBottom:'.6rem', borderRadius:'.5rem', overflow:'hidden', maxHeight:'160px', border:`1px solid ${BDR}` }}>
          <img src={preview} alt="preview" style={{ width:'100%', height:'160px', objectFit:'cover', objectPosition:'center' }} />
        </div>
      )}
      <div style={{ display:'flex', gap:'.5rem' }}>
        <input style={{ ...INP, flex:1, fontSize:'.8rem' }} value={value || ''} placeholder="URL de imagen..."
          onChange={e => { onChange(e.target.value); setPreview(e.target.value) }}
          onFocus={e => e.target.style.borderColor=BDRS}
          onBlur={e => e.target.style.borderColor=BDR} />
        <button onClick={() => ref.current.click()} disabled={uploading} style={{
          background: uploading ? '#1a3a6b' : 'rgba(41,90,158,.2)', color: uploading ? FGD : PRIL,
          border:`1px solid ${BDR}`, borderRadius:'.5rem', padding:'.5rem .9rem',
          fontSize:'.8rem', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)',
          whiteSpace:'nowrap', flexShrink:0,
        }}>
          {uploading ? '⏳ Subiendo...' : '📤 Subir'}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFile} />
      <p style={{ fontSize:'.65rem', color:FGD, marginTop:'.25rem' }}>Pega una URL o haz clic en Subir para cargar desde tu dispositivo</p>
    </div>
  )
}

// ── TABS DEFINICIÓN ────────────────────────────────────────────
const TABS = [
  { id:'header',       label:'🔝 Header'      },
  { id:'hero',         label:'🏠 Inicio'      },
  { id:'horario',      label:'🕐 Horario'     },
  { id:'menuPromo',    label:'🎉 Menú Promo'  },
  { id:'carta',        label:'🍹 Carta'       },
  { id:'reserva',      label:'📅 Reserva'     },
  { id:'alimentos',    label:'🍴 Alimentos'   },
  { id:'hamburguesa',  label:'🍔 Hamburguesa' },
  { id:'eventos',      label:'🎭 Eventos'     },
  { id:'footer',       label:'📄 Footer'      },
  { id:'socials',      label:'📲 Redes'       },
  { id:'waFlotante',   label:'💬 WhatsApp'    },
  { id:'contact',      label:'📍 Contacto'    },
  { id:'seo',          label:'🔍 SEO'         },
]

// ── EDITORES ────────────────────────────────────────────────────

function HeaderEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Logo y marca">
        <ImageUploader label="Logo (aparece en header)" value={d.logo} onChange={v => onChange('logo', v)} folder="logo" />
        <Field label="Nombre de la marca" value={d.brand} onChange={v => onChange('brand', v)} />
        <Field label="Slogan bajo el nombre" value={d.slogan} onChange={v => onChange('slogan', v)} placeholder="Karaoke Bar" />
      </Card>
      <Card title="Navegación" subtitle="Textos de los ítems del menú">
        <Field label="Item 1" value={d.nav1 || 'Inicio'} onChange={v => onChange('nav1', v)} />
        <Field label="Item 2" value={d.nav2 || 'Alimentos'} onChange={v => onChange('nav2', v)} />
        <Field label="Item 3" value={d.nav3 || 'Hamburguesas'} onChange={v => onChange('nav3', v)} />
        <Field label="Item 4" value={d.nav4 || 'Eventos Especiales'} onChange={v => onChange('nav4', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function HeroEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Imagen y logo">
        <ImageUploader label="Foto de fondo del Hero" value={d.bgImg} onChange={v => onChange('bgImg', v)} folder="hero" />
        <ImageUploader label="Logo grande centrado" value={d.logo} onChange={v => onChange('logo', v)} folder="logo" />
      </Card>
      <Card title="Textos principales">
        <Field label="Título" value={d.title} onChange={v => onChange('title', v)} />
        <Field label="Frase principal (en bloque)" value={d.frase} onChange={v => onChange('frase', v)} textarea />
      </Card>
      <Card title="Botones de acción">
        <Field label="Botón 1 — Ver Menú Promo" value={d.btn1} onChange={v => onChange('btn1', v)} />
        <Field label="Botón 2 — Ver Carta" value={d.btn2} onChange={v => onChange('btn2', v)} />
        <Field label="Botón 3 — Reservar" value={d.btn3} onChange={v => onChange('btn3', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function HorarioEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Horario de atención">
        <Field label="Título de la sección" value={d.titulo || 'HORARIO'} onChange={v => onChange('titulo', v)} />
        <Field label="Horas (ej: De 6:00 PM a 3:00 AM)" value={d.horas} onChange={v => onChange('horas', v)} />
        <Field label="Día de descanso" value={d.descanso} onChange={v => onChange('descanso', v)} placeholder="Lunes Descansamos" />
        <Field label="Texto adicional" value={d.dias} onChange={v => onChange('dias', v)} placeholder="Karaoke todos los demás días" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function MenuPromoEditor({ d, onChange, onSave, loading }) {
  function updateCard(i, key, val) {
    const cards = [...(d.cards || [])]
    cards[i] = { ...cards[i], [key]: val }
    onChange('cards', cards)
  }
  function addCard() {
    onChange('cards', [...(d.cards || []), { emoji:'🎯', title:'Nueva promo', precio:'$00', detalle:'Descripción' }])
  }
  function delCard(i) {
    onChange('cards', (d.cards || []).filter((_, idx) => idx !== i))
  }

  return (
    <>
      <Card title="Imagen y encabezado">
        <ImageUploader label="Foto de fondo (flyer promos)" value={d.fotoUrl} onChange={v => onChange('fotoUrl', v)} folder="promos" />
        <Field label="Título" value={d.titulo || 'MENÚ PROMO'} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
        <Field label="Nota al pie" value={d.nota} onChange={v => onChange('nota', v)} />
      </Card>
      <Card title="Cards de promociones" subtitle="CRUD — agrega, edita o elimina cada promo">
        {(d.cards || []).map((c, i) => (
          <div key={i} style={{ background:CARD2, borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem', border:`1px solid ${BDR}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.75rem' }}>
              <span style={{ fontSize:'.75rem', fontWeight:700, color:FGD }}>Promo #{i+1}</span>
              <DeleteBtn onClick={() => delCard(i)} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'3rem 1fr', gap:'.5rem' }}>
              <Field label="Emoji" value={c.emoji} onChange={v => updateCard(i,'emoji',v)} />
              <Field label="Nombre" value={c.title} onChange={v => updateCard(i,'title',v)} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem' }}>
              <Field label="Precio" value={c.precio} onChange={v => updateCard(i,'precio',v)} />
              <Field label="Detalle" value={c.detalle} onChange={v => updateCard(i,'detalle',v)} />
            </div>
          </div>
        ))}
        <AddBtn onClick={addCard} label="+ Agregar promoción" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function CartaEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Imagen de fondo">
        <ImageUploader label="Foto de fondo de la Carta" value={d.bgImg} onChange={v => onChange('bgImg', v)} folder="carta" />
      </Card>
      <Card title="Textos">
        <Field label="Título" value={d.titulo || 'CARTA DE BEBIDAS'} onChange={v => onChange('titulo', v)} />
        <Field label="Promo cumpleaños" value={d.promo} onChange={v => onChange('promo', v)} placeholder="🎂 Bebida gratis en tu cumpleaños" />
        <Field label="Nota al pie" value={d.nota} onChange={v => onChange('nota', v)} placeholder="*Propina opcional no incluida*" />
      </Card>
      <Card title="Precios del menú de bebidas" subtitle="Se editan en la tabla menuBebidas del CMS">
        <p style={{ fontSize:'.83rem', color:FGD, lineHeight:1.65 }}>
          Los precios de cada bebida (botella/copa) se gestionan directamente en Supabase → tabla <code style={{ color:PRIL }}>cms_content</code> → sección <code style={{ color:PRIL }}>menuBebidas</code>.
        </p>
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function ReservaEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Imagen de fondo">
        <ImageUploader label="Foto de fondo de Reservas" value={d.fotoUrl} onChange={v => onChange('fotoUrl', v)} folder="reserva" />
      </Card>
      <Card title="Textos de bienvenida">
        <Field label="Título" value={d.titulo || 'RESERVA TU MESA'} onChange={v => onChange('titulo', v)} />
        <Field label="Mensaje de bienvenida" value={d.bienvenida} onChange={v => onChange('bienvenida', v)} textarea />
      </Card>
      <Card title="WhatsApp de reservas">
        <Field label="Número (sin + ni espacios)" value={d.wa} onChange={v => onChange('wa', v)} hint="Ej: 522224302693" />
        <Field label="Mensaje predeterminado" value={d.waMsg} onChange={v => onChange('waMsg', v)} textarea />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function AlimentosEditor({ d, onChange, onSave, loading }) {
  const PLATILLOS = ['alitas','nachos','hotdog','papas']
  const LABELS = { alitas:'🍗 Alitas', nachos:'🧀 Nachos', hotdog:'🌭 Hot Dog', papas:'🍟 Papas Francesas' }

  function updateField(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val })
  }
  function updateArr(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val.split('\n').filter(Boolean) })
  }

  return (
    <>
      <Card title="Título de la página">
        <Field label="Título sección Alimentos" value={d.titulo || 'ALIMENTOS'} onChange={v => onChange('titulo', v)} />
      </Card>
      {PLATILLOS.map(key => (
        <Card key={key} title={LABELS[key]} collapsible>
          <ImageUploader label="Foto del platillo" value={d[key]?.img} onChange={v => updateField(key,'img',v)} folder={key} />
          <Field label="Nombre del platillo" value={d[key]?.title} onChange={v => updateField(key,'title',v)} />
          <Field label="Descripción" value={d[key]?.desc} onChange={v => updateField(key,'desc',v)} textarea />
          <Field label="Ingredientes (uno por línea)" value={(d[key]?.ingredientes||[]).join('\n')} onChange={v => updateArr(key,'ingredientes',v)} textarea />
          {key === 'nachos' && (
            <Field label="Especiales con (uno por línea)" value={(d[key]?.especiales||[]).join('\n')} onChange={v => updateArr(key,'especiales',v)} textarea hint="Ej: Carne Pastor" />
          )}
          <Field label="Aderezos (uno por línea)" value={(d[key]?.aderezos||[]).join('\n')} onChange={v => updateArr(key,'aderezos',v)} textarea />
        </Card>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function HamburguesaEditor({ d, onChange, onSave, loading }) {
  function updateArr(field, val) {
    onChange(field, val.split('\n').filter(Boolean))
  }
  return (
    <>
      <Card title="Imagen">
        <ImageUploader label="Foto principal de Hamburguesa" value={d.img} onChange={v => onChange('img', v)} folder="hamburguesa" />
      </Card>
      <Card title="Textos">
        <Field label="Título" value={d.titulo || 'HAMBURGUESAS'} onChange={v => onChange('titulo', v)} />
        <Field label="Descripción" value={d.desc} onChange={v => onChange('desc', v)} textarea />
      </Card>
      <Card title="Ingredientes" subtitle="CRUD — uno por línea">
        <Field label="Ingredientes (uno por línea)" textarea
          value={(d.ingredientes||['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza','Mayonesa']).join('\n')}
          onChange={v => updateArr('ingredientes', v)} />
      </Card>
      <Card title="Incluye" subtitle="CRUD — uno por línea">
        <Field label="Extras incluidos (uno por línea)" textarea
          value={(d.extras||['Papas onduladas','Aderezo de la casa']).join('\n')}
          onChange={v => updateArr('extras', v)} />
      </Card>
      <Card title="Botón">
        <Field label="Texto del botón" value={d.btnTexto || 'VER CARTA DE ALIMENTOS'} onChange={v => onChange('btnTexto', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function EventosEditor({ d, onChange, onSave, loading }) {
  const KEYS = ['puerta-cerrada','mejor-voz','karaoke','vs-mesero']
  const LABELS = { 'puerta-cerrada':'🚪 Puerta Cerrada','mejor-voz':'🏆 Mejor Voz','karaoke':'🎤 Karaoke c/Animador','vs-mesero':'⚔️ vs Mesero' }

  function updateEv(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val })
  }
  function updateEvArr(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val.split('\n').filter(Boolean) })
  }
  function updateCumple(field, val) {
    onChange('cumpleanos', { ...(d['cumpleanos']||{}), [field]: val })
  }
  function updateCumpleArr(field, val) {
    onChange('cumpleanos', { ...(d['cumpleanos']||{}), [field]: val.split('\n').filter(Boolean) })
  }

  return (
    <>
      <Card title="Imagen de fondo (banner superior)">
        <ImageUploader label="Foto eventos" value={d['puerta-cerrada']?.img} onChange={v => updateEv('puerta-cerrada','img',v)} folder="eventos" />
      </Card>
      {KEYS.map(key => (
        <Card key={key} title={LABELS[key]} collapsible>
          <Field label="Título" value={d[key]?.title} onChange={v => updateEv(key,'title',v)} />
          <Field label="Descripción / Items (uno por línea)" textarea
            value={(d[key]?.items||[]).join('\n')} onChange={v => updateEvArr(key,'items',v)} />
          {key === 'vs-mesero' && (
            <Field label="Premio destacado" value={d[key]?.premio} onChange={v => updateEv(key,'premio',v)} placeholder="🏆 Si ganas recibes bebida gratis" />
          )}
        </Card>
      ))}
      <Card title="🎂 Cumpleaños" collapsible>
        <Field label="Título" value={d['cumpleanos']?.titulo || 'CUMPLEAÑOS'} onChange={v => updateCumple('titulo',v)} />
        <Field label="Beneficios ✓ (uno por línea)" textarea
          value={(d['cumpleanos']?.checks||['Reserva con anticipación','Mesa decorada','Bebida de bienvenida','Bebida gratis para el cumpleañero','Bebida gratis para cada mesa']).join('\n')}
          onChange={v => updateCumpleArr('checks',v)} />
        <Field label="Nota informativa" value={d['cumpleanos']?.nota} onChange={v => updateCumple('nota',v)} textarea />
        <Field label="Texto botón Reservar" value={d['cumpleanos']?.cta || 'RESERVAR AHORA'} onChange={v => updateCumple('cta',v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function FooterEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Textos del footer">
        <Field label="Nombre de la marca" value={d.brand} onChange={v => onChange('brand', v)} />
        <Field label="Descripción corta" value={d.desc} onChange={v => onChange('desc', v)} textarea />
        <Field label="Texto de copyright" value={d.copyright} onChange={v => onChange('copyright', v)} placeholder="© Litros & Litros Karaoke Bar — Todos los derechos reservados." />
      </Card>
      <Card title="Links del footer" subtitle="CRUD — aparecen en la columna Legal">
        <Field label="Link 1 — Texto" value={d.link1 || 'Aviso Legal'} onChange={v => onChange('link1', v)} />
        <Field label="Link 1 — URL (opcional)" value={d.link1url || '#'} onChange={v => onChange('link1url', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function SocialsEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Redes sociales" subtitle="Pega la URL completa de cada red">
        <Field label="🔵 Facebook" value={d.fb} onChange={v => onChange('fb', v)} placeholder="https://www.facebook.com/..." />
        <Field label="📸 Instagram" value={d.ig} onChange={v => onChange('ig', v)} placeholder="https://www.instagram.com/..." />
        <Field label="🎵 TikTok (opcional)" value={d.tt} onChange={v => onChange('tt', v)} placeholder="https://www.tiktok.com/..." />
        <Field label="▶️ YouTube (opcional)" value={d.yt} onChange={v => onChange('yt', v)} placeholder="https://www.youtube.com/..." />
        <Field label="📱 WhatsApp número (sin + ni espacios)" value={d.wa} onChange={v => onChange('wa', v)} hint="Ej: 522224302693" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function WAEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Botón flotante de WhatsApp">
        <Toggle label="Visible en el sitio" value={d.visible !== false} onChange={v => onChange('visible', v)} />
        <Field label="Número (sin + ni espacios)" value={d.numero} onChange={v => onChange('numero', v)} hint="Ej: 522224302693" />
        <Field label="Mensaje al hacer clic" value={d.mensaje} onChange={v => onChange('mensaje', v)} textarea placeholder="¡Hola! Quiero reservar" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function ContactEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Información de contacto">
        <Field label="Dirección completa" value={d.address} onChange={v => onChange('address', v)} textarea />
        <Field label="Teléfono" value={d.phone} onChange={v => onChange('phone', v)} placeholder="+52 222 430 2693" />
        <Field label="Email" value={d.email} onChange={v => onChange('email', v)} />
        <Field label="Horario (texto)" value={d.hours} onChange={v => onChange('hours', v)} textarea />
        <Field label="WhatsApp número" value={d.wa} onChange={v => onChange('wa', v)} hint="Sin + ni espacios" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function SeoEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="SEO — Posicionamiento en Google">
        <Field label="Título (pestaña del navegador)" value={d.title} onChange={v => onChange('title', v)} />
        <Field label="Descripción para Google (160 caracteres max)" value={d.desc} onChange={v => onChange('desc', v)} textarea />
        <Field label="Palabras clave (separadas por coma)" value={d.kw} onChange={v => onChange('kw', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

// ── ADMIN PANEL PRINCIPAL ──────────────────────────────────────
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

  // Mapa: tab del admin → sección real en Supabase (cms_content.section)
  const SECTION_MAP = {
    header:      'header',
    hero:        'hero',
    horario:     'horario',
    menuPromo:   'menuPromo',
    carta:       'bebidas',
    reserva:     'reservas',
    alimentos:   'platillos',
    hamburguesa: 'platillos',
    eventos:     'espectaculos',
    footer:      'footer',
    socials:     'socials',
    waFlotante:  'waFlotante',
    contact:     'contact',
    seo:         'seo',
  }

  function handleChange(section, key, val) {
    const dbKey = SECTION_MAP[section] || section
    setLocalData(prev => ({ ...prev, [dbKey]: { ...(prev[dbKey]||{}), [key]: val } }))
  }

  async function handleSave(section) {
    setLoading(true)
    const dbKey = SECTION_MAP[section] || section
    try {
      if (section === 'hamburguesa') {
        // Hamburguesa vive dentro de platillos como sub-objeto
        const platillosActual = localData.platillos || {}
        const newPlatillos = { ...platillosActual, hamburguesa: platillosActual.hamburguesa }
        await saveCMSSection('platillos', newPlatillos)
        updateCMS('platillos', newPlatillos)
      } else {
        const dataToSave = localData[dbKey]
        await saveCMSSection(dbKey, dataToSave)
        updateCMS(dbKey, dataToSave)
      }
      showToast(`✅ Cambios guardados correctamente`)
    } catch (e) {
      showToast(`❌ Error al guardar: ${e.message}`)
    } finally { setLoading(false) }
  }

  const d  = localData
  const oc = section => (key, val) => handleChange(section, key, val)
  const os = section => () => handleSave(section)

  const ham = d.platillos?.hamburguesa || {}
  const hamChange = (key, val) => {
    setLocalData(prev => ({
      ...prev,
      platillos: { ...(prev.platillos||{}), hamburguesa: { ...(prev.platillos?.hamburguesa||{}), [key]: val } }
    }))
  }

  return (
    <>
      <style>{`
        .adm-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.85);display:flex;justify-content:center;}
        .adm-panel{width:100%;max-width:100vw;height:100dvh;background:${BG};display:flex;flex-direction:column;overflow:hidden;}
        .adm-header{padding:1rem 2rem;border-bottom:1px solid ${BDR};display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:rgba(41,90,158,.05);}
        .adm-tabs{display:flex;overflow-x:auto;border-bottom:1px solid ${BDR};flex-shrink:0;scrollbar-width:none;padding:0 1rem;}
        .adm-tabs::-webkit-scrollbar{display:none;}
        .adm-tab{padding:.65rem 1rem;font-size:.78rem;white-space:nowrap;background:none;border:none;cursor:pointer;font-family:var(--font-body);transition:color .2s;border-bottom:2px solid transparent;color:${FGD};}
        .adm-tab.active{color:${PRIL};border-bottom:2px solid ${PRI};}
        .adm-content{flex:1;overflow-y:auto;padding:1.5rem 2rem;}
        .adm-inner{max-width:860px;margin:0 auto;}
        @media(max-width:640px){
          .adm-header{padding:.85rem 1rem;}
          .adm-tab{padding:.55rem .65rem;font-size:.72rem;}
          .adm-content{padding:1rem;}
        }
      `}</style>

      <div className="adm-overlay">
        <div className="adm-panel">

          {/* Header */}
          <div className="adm-header">
            <div>
              <div style={{ fontWeight:800, fontSize:'1.05rem', color:PRIL, fontFamily:'var(--font-head)' }}>
                Panel Administrador
              </div>
              <div style={{ fontSize:'.72rem', color:FGD, marginTop:'.1rem' }}>
                Litros & Litros — Gestión de contenido completo
              </div>
            </div>
            <button onClick={() => setAdminPanelOpen(false)} style={{ background:'rgba(41,90,158,.1)', border:`1px solid ${BDR}`, color:FGM, cursor:'pointer', padding:'.5rem .75rem', borderRadius:'.5rem', fontSize:'.8rem', fontWeight:600, fontFamily:'var(--font-body)', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(220,38,38,.15)'; e.currentTarget.style.color='#f87171' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(41,90,158,.1)'; e.currentTarget.style.color=FGM }}
            >✕ Cerrar</button>
          </div>

          {/* Tabs */}
          <div className="adm-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`adm-tab${activeTab===t.id?' active':''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="adm-content">
            <div className="adm-inner">
              {activeTab==='header'      && <HeaderEditor      d={d.header||{}}      onChange={oc('header')}      onSave={os('header')}      loading={loading} />}
              {activeTab==='hero'        && <HeroEditor        d={d.hero||{}}        onChange={oc('hero')}        onSave={os('hero')}        loading={loading} />}
              {activeTab==='horario'     && <HorarioEditor     d={d.horario||{}}     onChange={oc('horario')}     onSave={os('horario')}     loading={loading} />}
              {activeTab==='menuPromo'   && <MenuPromoEditor   d={d.menuPromo||{}}   onChange={oc('menuPromo')}   onSave={os('menuPromo')}   loading={loading} />}
              {activeTab==='carta'       && <CartaEditor       d={d.bebidas||{}}     onChange={oc('carta')}       onSave={os('carta')}       loading={loading} />}
              {activeTab==='reserva'     && <ReservaEditor     d={d.reservas||{}}    onChange={oc('reserva')}     onSave={os('reserva')}     loading={loading} />}
              {activeTab==='alimentos'   && <AlimentosEditor   d={d.platillos||{}}   onChange={(k,v)=>handleChange('alimentos',k,v)} onSave={os('alimentos')} loading={loading} />}
              {activeTab==='hamburguesa' && <HamburguesaEditor d={ham}               onChange={hamChange}         onSave={os('hamburguesa')} loading={loading} />}
              {activeTab==='eventos'     && <EventosEditor     d={d.espectaculos||{}}onChange={(k,v)=>handleChange('eventos',k,v)} onSave={os('eventos')} loading={loading} />}
              {activeTab==='footer'      && <FooterEditor      d={d.footer||{}}      onChange={oc('footer')}      onSave={os('footer')}      loading={loading} />}
              {activeTab==='socials'     && <SocialsEditor     d={d.socials||{}}     onChange={oc('socials')}     onSave={os('socials')}     loading={loading} />}
              {activeTab==='waFlotante'  && <WAEditor          d={d.waFlotante||{}}  onChange={oc('waFlotante')}  onSave={os('waFlotante')}  loading={loading} />}
              {activeTab==='contact'     && <ContactEditor     d={d.contact||{}}     onChange={oc('contact')}     onSave={os('contact')}     loading={loading} />}
              {activeTab==='seo'         && <SeoEditor         d={d.seo||{}}         onChange={oc('seo')}         onSave={os('seo')}         loading={loading} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
