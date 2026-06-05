import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'
import { saveCMSSection } from '@/services/adminService'

// ── UI primitivos ─────────────────────────────────────────────
const F  = { width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'.5rem', padding:'.65rem .9rem', color:'#f2f2f2', fontSize:'.88rem', fontFamily:'var(--font-body)', outline:'none' }
const TA = { ...F, minHeight:'4rem', resize:'vertical' }

function Field({ label, value, onChange, textarea, type='text', hint }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.68rem', fontWeight:700, color:'#888', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.3rem' }}>{label}</label>
      <Tag type={type} value={value ?? ''} onChange={e => onChange(e.target.value)}
        style={textarea ? TA : F}
        onFocus={e => e.target.style.borderColor='rgba(239,68,68,.5)'}
        onBlur={e => e.target.style.borderColor='#2a2a2a'} />
      {hint && <p style={{ fontSize:'.68rem', color:'#555', marginTop:'.25rem' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ label, value, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
      <label style={{ fontSize:'.88rem', color:'#ccc' }}>{label}</label>
      <button onClick={() => onChange(!value)} style={{
        width:'2.8rem', height:'1.5rem', borderRadius:'999px', border:'none', cursor:'pointer',
        background: value ? '#22c55e' : '#333', position:'relative', transition:'background .2s',
      }}>
        <span style={{
          position:'absolute', top:'3px', left: value ? 'calc(100% - 21px)' : '3px',
          width:'18px', height:'18px', borderRadius:'50%', background:'#fff', transition:'left .2s',
        }}/>
      </button>
    </div>
  )
}

function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff', border:'none',
      borderRadius:'.6rem', padding:'.5rem 1.25rem', fontSize:'.85rem', fontWeight:700,
      cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1,
      display:'inline-flex', alignItems:'center', gap:'.35rem', fontFamily:'var(--font-body)',
    }}>{loading ? '⏳' : '💾'} Guardar</button>
  )
}

function Card({ title, children }) {
  return (
    <div style={{ background:'#141414', border:'1px solid #1f1f1f', borderRadius:'.75rem', overflow:'hidden', marginBottom:'1.25rem' }}>
      <div style={{ padding:'.75rem 1.25rem', borderBottom:'1px solid #1f1f1f', fontSize:'.85rem', fontWeight:700, color:'#ccc' }}>{title}</div>
      <div style={{ padding:'1.25rem' }}>{children}</div>
    </div>
  )
}

function ListEditor({ items, onChange, fields }) {
  function updateItem(i, key, val) {
    const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next)
  }
  function updateArrayField(i, key, val) {
    const next = [...items]; next[i] = { ...next[i], [key]: val.split('\n') }; onChange(next)
  }
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem', border:'1px solid #222' }}>
          <div style={{ fontSize:'.7rem', color:'#555', marginBottom:'.65rem', fontWeight:700 }}>#{i+1}</div>
          {fields.map(f => {
            if (f.type === 'array') {
              return <Field key={f.key} label={f.label} textarea
                value={(item[f.key] || []).join('\n')}
                onChange={v => updateArrayField(i, f.key, v)}
                hint={f.hint} />
            }
            return <Field key={f.key} label={f.label} textarea={f.textarea}
              value={item[f.key] || ''} onChange={v => updateItem(i, f.key, v)} hint={f.hint} />
          })}
        </div>
      ))}
    </div>
  )
}

// ── TABS ──────────────────────────────────────────────────────
const TABS = [
  { id:'hero',            label:'🏠 Inicio'       },
  { id:'homeCards',       label:'🃏 Cards Home'   },
  { id:'platillos',       label:'🍔 Platillos'    },
  { id:'espectaculos',    label:'🎭 Espectáculos' },
  { id:'menuPromo',       label:'🎉 Promos'       },
  { id:'bebidas',         label:'🍹 Bebidas'      },
  { id:'reservas',        label:'🏠 Cabinas'      },
  { id:'footer',          label:'📄 Footer'       },
  { id:'socials',         label:'📲 Redes'        },
  { id:'waFlotante',      label:'💬 WhatsApp'     },
  { id:'contact',         label:'📍 Contacto'     },
  { id:'seo',             label:'🔍 SEO'          },
]

// ── EDITORES ──────────────────────────────────────────────────
function HeroEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Textos principales">
        <Field label="Título" value={d.title} onChange={v => onChange('title', v)} />
        <Field label="Eslogan" value={d.subtitle} onChange={v => onChange('subtitle', v)} textarea />
        <Field label="Horario (pill bajo eslogan)" value={d.horario} onChange={v => onChange('horario', v)} />
      </Card>
      <Card title="Botones">
        <Field label="Botón 1 — Ver Menú Promo" value={d.btn1} onChange={v => onChange('btn1', v)} />
        <Field label="Botón 2 — Ver Carta" value={d.btn2} onChange={v => onChange('btn2', v)} />
        <Field label="Botón 3 — Reservar" value={d.btn3} onChange={v => onChange('btn3', v)} />
      </Card>
      <Card title="Imágenes">
        <Field label="URL Logo" value={d.logo} onChange={v => onChange('logo', v)} hint="URL completa de la imagen del logo" />
        <Field label="URL Foto de fondo (Hero)" value={d.bgImg} onChange={v => onChange('bgImg', v)} hint="Foto que aparece de fondo en la pantalla principal" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function PorqueEditor({ d, onChange, onSave, loading }) {
  function updatePill(i, key, val) {
    const pills = [...(d.pills || [])]; pills[i] = { ...pills[i], [key]: val }; onChange('pills', pills)
  }
  return (
    <>
      <Card title="Encabezado">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
      </Card>
      <Card title="Pills / Badges">
        {(d.pills || []).map((p, i) => (
          <div key={i} style={{ display:'flex', gap:'.75rem', marginBottom:'.5rem' }}>
            <div style={{ width:'4rem' }}><Field label="Ícono" value={p.icon} onChange={v => updatePill(i,'icon',v)} /></div>
            <div style={{ flex:1 }}><Field label="Etiqueta" value={p.label} onChange={v => updatePill(i,'label',v)} /></div>
          </div>
        ))}
      </Card>
      <Card title="Sección Música">
        <Field label="Título" value={d.musica?.titulo} onChange={v => onChange('musica', { ...d.musica, titulo: v })} />
        <Field label="Texto completo" value={d.musica?.texto} onChange={v => onChange('musica', { ...d.musica, texto: v })} textarea />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function HorarioEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Horario">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Horas (ej: 6:00 PM – 3:00 AM)" value={d.horas} onChange={v => onChange('horas', v)} />
        <Field label="Días" value={d.dias} onChange={v => onChange('dias', v)} />
        <Field label="Día de descanso" value={d.descanso} onChange={v => onChange('descanso', v)} />
        <Field label="URL Foto (barra)" value={d.fotoUrl} onChange={v => onChange('fotoUrl', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function ReservasEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Textos">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
        <Field label="Texto botón" value={d.btnTexto} onChange={v => onChange('btnTexto', v)} />
        <Field label="Teléfono visible" value={d.telefono} onChange={v => onChange('telefono', v)} />
      </Card>
      <Card title="WhatsApp">
        <Field label="Número (sin + ni espacios)" value={d.wa} onChange={v => onChange('wa', v)} hint="Ej: 522224302693" />
        <Field label="Mensaje predeterminado" value={d.waMsg} onChange={v => onChange('waMsg', v)} textarea />
      </Card>
      <Card title="Imagen">
        <Field label="URL Foto cabinas" value={d.fotoUrl} onChange={v => onChange('fotoUrl', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function AlimentosEditor({ d, onChange, onSave, loading }) {
  function updatePlatillo(i, key, val) {
    const platillos = [...(d.platillos || [])]; platillos[i] = { ...platillos[i], [key]: val }; onChange('platillos', platillos)
  }
  function updateArray(i, key, val) {
    const platillos = [...(d.platillos || [])]; platillos[i] = { ...platillos[i], [key]: val.split('\n').filter(Boolean) }; onChange('platillos', platillos)
  }
  return (
    <>
      <Card title="Encabezado">
        <Field label="Título página" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
      </Card>
      {(d.platillos || []).map((p, i) => (
        <Card key={i} title={`🍽 ${p.nombre}`}>
          <Field label="Nombre" value={p.nombre} onChange={v => updatePlatillo(i,'nombre',v)} />
          <Field label="Badge (ej: 🔥 Elige tu sabor)" value={p.badge} onChange={v => updatePlatillo(i,'badge',v)} />
          <Field label="Descripción corta" value={p.desc || ''} onChange={v => updatePlatillo(i,'desc',v)} textarea />
          <Field label="Ingredientes (uno por línea)" textarea
            value={(p.ingredientes || []).join('\n')} onChange={v => updateArray(i,'ingredientes',v)} />
          <Field label="Opcionales (uno por línea)" textarea
            value={(p.opcionales || []).join('\n')} onChange={v => updateArray(i,'opcionales',v)} />
          <Field label="Incluye / Extras (uno por línea)" textarea
            value={(p.extras || []).join('\n')} onChange={v => updateArray(i,'extras',v)} />
          <Field label="Especiales con (uno por línea)" textarea
            value={(p.especiales || []).join('\n')} onChange={v => updateArray(i,'especiales',v)} />
          <Field label="Aderezos (uno por línea)" textarea
            value={(p.aderezos || []).join('\n')} onChange={v => updateArray(i,'aderezos',v)} />
          <Field label="URL Foto" value={p.fotoUrl} onChange={v => updatePlatillo(i,'fotoUrl',v)} />
        </Card>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function BebidasEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Encabezado Carta de Bebidas">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
        <Field label="Texto promocional cumpleaños" value={d.promo} onChange={v => onChange('promo', v)} />
        <Field label="Nota al pie (ej: propina opcional)" value={d.nota} onChange={v => onChange('nota', v)} />
      </Card>
      <Card title="Precios del menú">
        <p style={{ fontSize:'.82rem', color:'#666', lineHeight:1.6 }}>
          Los precios individuales de cada bebida se editan directamente en Supabase → tabla <code style={{ color:'#a855f7' }}>cms_content</code> → sección <code style={{ color:'#a855f7' }}>menuBebidas</code>.
        </p>
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function EventosEditor({ d, onChange, onSave, loading }) {
  function updateSub(key, subKey, val) {
    onChange(key, { ...d[key], [subKey]: val })
  }
  function updateSubArray(key, subKey, val) {
    onChange(key, { ...d[key], [subKey]: val.split('\n').filter(Boolean) })
  }
  function updateChecks(val) {
    onChange('cumpleanos', { ...d.cumpleanos, checks: val.split('\n').filter(Boolean) })
  }
  return (
    <>
      <Card title="Encabezado">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo', v)} textarea />
        <Field label="URL Foto de fondo" value={d.fotoUrl} onChange={v => onChange('fotoUrl', v)} />
      </Card>
      <Card title="🎭 Shows de Puerta Cerrada">
        <Field label="Título" value={d.puertaCerrada?.titulo} onChange={v => updateSub('puertaCerrada','titulo',v)} />
        <Field label="Items (uno por línea)" textarea
          value={(d.puertaCerrada?.items || []).join('\n')}
          onChange={v => updateSubArray('puertaCerrada','items',v)} />
      </Card>
      <Card title="🏆 Compite por la Mejor Voz">
        <Field label="Título" value={d.mejorVoz?.titulo} onChange={v => updateSub('mejorVoz','titulo',v)} />
        <Field label="Items (uno por línea)" textarea
          value={(d.mejorVoz?.items || []).join('\n')}
          onChange={v => updateSubArray('mejorVoz','items',v)} />
      </Card>
      <Card title="🎤 Karaoke con Animador">
        <Field label="Título" value={d.karaoke?.titulo} onChange={v => updateSub('karaoke','titulo',v)} />
        <Field label="Items (uno por línea)" textarea
          value={(d.karaoke?.items || []).join('\n')}
          onChange={v => updateSubArray('karaoke','items',v)} />
        <Field label="Premio / incentivo" value={d.karaoke?.premio} onChange={v => updateSub('karaoke','premio',v)} />
      </Card>
      <Card title="🎂 Cumpleaños">
        <Field label="Título" value={d.cumpleanos?.titulo} onChange={v => updateSub('cumpleanos','titulo',v)} />
        <Field label="Subtítulo / descripción" textarea value={d.cumpleanos?.subtitulo} onChange={v => updateSub('cumpleanos','subtitulo',v)} />
        <Field label="Lista de beneficios (uno por línea)" textarea
          value={(d.cumpleanos?.checks || []).join('\n')}
          onChange={updateChecks} />
        <Field label="Nota informativa" textarea value={d.cumpleanos?.nota} onChange={v => updateSub('cumpleanos','nota',v)} />
      </Card>
      <Card title="Botón Reservar">
        <Field label="Texto del botón" value={d.btnTexto} onChange={v => onChange('btnTexto', v)} />
        <Field label="Número WhatsApp" value={d.wa} onChange={v => onChange('wa', v)} hint="Sin + ni espacios" />
        <Field label="Mensaje WhatsApp" textarea value={d.waMsg} onChange={v => onChange('waMsg', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function FooterEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Pie de página">
        <Field label="Nombre marca" value={d.brand} onChange={v => onChange('brand', v)} />
        <Field label="Descripción" textarea value={d.desc} onChange={v => onChange('desc', v)} />
        <Field label="Texto copyright" value={d.copyright} onChange={v => onChange('copyright', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function SocialsEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Redes Sociales">
        <Field label="🔵 Facebook — URL completa" value={d.fb} onChange={v => onChange('fb', v)} hint="Ej: https://www.facebook.com/profile.php?id=..." />
        <Field label="📸 Instagram — URL completa" value={d.ig} onChange={v => onChange('ig', v)} hint="Ej: https://www.instagram.com/usuario/" />
        <Field label="🎵 TikTok — URL completa (opcional)" value={d.tt} onChange={v => onChange('tt', v)} />
        <Field label="▶️ YouTube — URL completa (opcional)" value={d.yt} onChange={v => onChange('yt', v)} />
        <Field label="📱 WhatsApp número (sin + ni espacios)" value={d.wa} onChange={v => onChange('wa', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function WAEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Botón WhatsApp Flotante">
        <Toggle label="Visible en el sitio" value={d.visible !== false} onChange={v => onChange('visible', v)} />
        <Field label="Número (sin + ni espacios)" value={d.numero} onChange={v => onChange('numero', v)} hint="Ej: 522224302693" />
        <Field label="Mensaje predeterminado" textarea value={d.mensaje} onChange={v => onChange('mensaje', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function ContactEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="Información de Contacto">
        <Field label="Dirección" textarea value={d.address} onChange={v => onChange('address', v)} />
        <Field label="Teléfono (con código país)" value={d.phone} onChange={v => onChange('phone', v)} />
        <Field label="Email" value={d.email} onChange={v => onChange('email', v)} />
        <Field label="Horario (texto)" textarea value={d.hours} onChange={v => onChange('hours', v)} />
        <Field label="WhatsApp número" value={d.wa} onChange={v => onChange('wa', v)} hint="Sin + ni espacios" />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function SeoEditor({ d, onChange, onSave, loading }) {
  return (
    <>
      <Card title="SEO y Metadatos">
        <Field label="Título (pestaña navegador)" value={d.title} onChange={v => onChange('title', v)} />
        <Field label="Descripción para Google" textarea value={d.desc} onChange={v => onChange('desc', v)} />
        <Field label="Palabras clave (separadas por coma)" value={d.kw} onChange={v => onChange('kw', v)} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

// ── NUEVOS EDITORES ───────────────────────────────────────────

function HomeCardsEditor({ d, onChange, onSave, loading }) {
  function updateCard(key, i, field, val) {
    const arr = [...(d[key] || [])]
    arr[i] = { ...arr[i], [field]: val }
    onChange(key, arr)
  }
  return (
    <>
      <Card title="🍔 Alimentos — Cards del inicio">
        {(d.alimentos || []).map((c, i) => (
          <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem' }}>
            <div style={{ display:'flex', gap:'.5rem' }}>
              <div style={{ width:'4rem' }}><Field label="Ícono" value={c.icon} onChange={v => updateCard('alimentos',i,'icon',v)} /></div>
              <div style={{ flex:1 }}><Field label="Título" value={c.title} onChange={v => updateCard('alimentos',i,'title',v)} /></div>
            </div>
            <Field label="Descripción corta" value={c.desc} onChange={v => updateCard('alimentos',i,'desc',v)} textarea />
            <Field label="URL Foto" value={c.img} onChange={v => updateCard('alimentos',i,'img',v)} />
          </div>
        ))}
      </Card>
      <Card title="🍔 Hamburguesa — Card del inicio">
        <div style={{ display:'flex', gap:'.5rem' }}>
          <div style={{ width:'4rem' }}><Field label="Ícono" value={d.hamburguesa?.icon} onChange={v => onChange('hamburguesa',{...d.hamburguesa,icon:v})} /></div>
          <div style={{ flex:1 }}><Field label="Título" value={d.hamburguesa?.title} onChange={v => onChange('hamburguesa',{...d.hamburguesa,title:v})} /></div>
        </div>
        <Field label="Descripción" value={d.hamburguesa?.desc} onChange={v => onChange('hamburguesa',{...d.hamburguesa,desc:v})} textarea />
        <Field label="URL Foto" value={d.hamburguesa?.img} onChange={v => onChange('hamburguesa',{...d.hamburguesa,img:v})} />
      </Card>
      <Card title="🎭 Espectáculos — Cards del inicio">
        {(d.espectaculos || []).map((c, i) => (
          <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem' }}>
            <div style={{ display:'flex', gap:'.5rem' }}>
              <div style={{ width:'4rem' }}><Field label="Ícono" value={c.icon} onChange={v => updateCard('espectaculos',i,'icon',v)} /></div>
              <div style={{ flex:1 }}><Field label="Título" value={c.title} onChange={v => updateCard('espectaculos',i,'title',v)} /></div>
            </div>
            <Field label="Descripción corta" value={c.desc} onChange={v => updateCard('espectaculos',i,'desc',v)} textarea />
            <Field label="URL Foto" value={c.img} onChange={v => updateCard('espectaculos',i,'img',v)} />
          </div>
        ))}
      </Card>
      <Card title="🎂 Cumpleaños — Card del inicio">
        <div style={{ display:'flex', gap:'.5rem' }}>
          <div style={{ width:'4rem' }}><Field label="Ícono" value={d.cumpleanos?.icon} onChange={v => onChange('cumpleanos',{...d.cumpleanos,icon:v})} /></div>
          <div style={{ flex:1 }}><Field label="Título" value={d.cumpleanos?.title} onChange={v => onChange('cumpleanos',{...d.cumpleanos,title:v})} /></div>
        </div>
        <Field label="Descripción" value={d.cumpleanos?.desc} onChange={v => onChange('cumpleanos',{...d.cumpleanos,desc:v})} textarea />
        <Field label="URL Foto" value={d.cumpleanos?.img} onChange={v => onChange('cumpleanos',{...d.cumpleanos,img:v})} />
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function PlatillosEditor({ d, onChange, onSave, loading }) {
  const keys = ['alitas','nachos','hotdog','papas','hamburguesa']
  const labels = { alitas:'🍗 Alitas', nachos:'🧀 Nachos', hotdog:'🌭 Hot Dog', papas:'🍟 Papas Francesas', hamburguesa:'🍔 Hamburguesa' }

  function updateArr(key, field, val) {
    onChange(key, { ...d[key], [field]: val.split('\n').filter(Boolean) })
  }
  function updateField(key, field, val) {
    onChange(key, { ...d[key], [field]: val })
  }

  return (
    <>
      {keys.map(key => (
        <Card key={key} title={labels[key]}>
          <div style={{ display:'flex', gap:'.5rem' }}>
            <div style={{ width:'4rem' }}><Field label="Ícono" value={d[key]?.icon} onChange={v => updateField(key,'icon',v)} /></div>
            <div style={{ flex:1 }}><Field label="Nombre" value={d[key]?.title} onChange={v => updateField(key,'title',v)} /></div>
          </div>
          <Field label="Descripción" value={d[key]?.desc} onChange={v => updateField(key,'desc',v)} textarea />
          <Field label="URL Foto" value={d[key]?.img} onChange={v => updateField(key,'img',v)} />
          <Field label="Ingredientes (uno por línea)" textarea value={(d[key]?.ingredientes||[]).join('\n')} onChange={v => updateArr(key,'ingredientes',v)} />
          <Field label="Especiales con (uno por línea)" textarea value={(d[key]?.especiales||[]).join('\n')} onChange={v => updateArr(key,'especiales',v)} />
          <Field label="Opcionales (uno por línea)" textarea value={(d[key]?.opcionales||[]).join('\n')} onChange={v => updateArr(key,'opcionales',v)} />
          <Field label="Incluye / Extras (uno por línea)" textarea value={(d[key]?.extras||[]).join('\n')} onChange={v => updateArr(key,'extras',v)} />
          <Field label="Aderezos (uno por línea)" textarea value={(d[key]?.aderezos||[]).join('\n')} onChange={v => updateArr(key,'aderezos',v)} />
        </Card>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function EspectaculosEditor({ d, onChange, onSave, loading }) {
  const keys = ['puerta-cerrada','mejor-voz','karaoke','vs-mesero','cumpleanos']
  const labels = { 'puerta-cerrada':'🚪 Puerta Cerrada','mejor-voz':'🏆 Mejor Voz','karaoke':'🎤 Karaoke','vs-mesero':'⚔️ vs Mesero','cumpleanos':'🎂 Cumpleaños' }

  function updateArr(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val.split('\n').filter(Boolean) })
  }
  function updateField(key, field, val) {
    onChange(key, { ...(d[key]||{}), [field]: val })
  }

  return (
    <>
      {keys.map(key => (
        <Card key={key} title={labels[key]}>
          <div style={{ display:'flex', gap:'.5rem' }}>
            <div style={{ width:'4rem' }}><Field label="Ícono" value={d[key]?.icon} onChange={v => updateField(key,'icon',v)} /></div>
            <div style={{ flex:1 }}><Field label="Título" value={d[key]?.title} onChange={v => updateField(key,'title',v)} /></div>
          </div>
          <Field label="Descripción" value={d[key]?.desc} onChange={v => updateField(key,'desc',v)} textarea />
          <Field label="URL Foto" value={d[key]?.img} onChange={v => updateField(key,'img',v)} />
          <Field label="Items 〜 (uno por línea)" textarea value={(d[key]?.items||[]).join('\n')} onChange={v => updateArr(key,'items',v)} hint="Para puerta cerrada, mejor voz, karaoke, vs mesero" />
          {key==='cumpleanos' && <Field label="Checks ✓ (uno por línea)" textarea value={(d[key]?.checks||[]).join('\n')} onChange={v => updateArr(key,'checks',v)} />}
          <Field label="Premio destacado (opcional)" value={d[key]?.premio} onChange={v => updateField(key,'premio',v)} />
          <Field label="Nota informativa (opcional)" value={d[key]?.nota} onChange={v => updateField(key,'nota',v)} textarea />
          <Field label="Texto del botón CTA" value={d[key]?.cta} onChange={v => updateField(key,'cta',v)} />
        </Card>
      ))}
      <SaveBtn onClick={onSave} loading={loading} />
    </>
  )
}

function MenuPromoEditor({ d, onChange, onSave, loading }) {
  function updateCard(i, field, val) {
    const cards = [...(d.cards||[])]
    cards[i] = { ...cards[i], [field]: val }
    onChange('cards', cards)
  }
  return (
    <>
      <Card title="Encabezado">
        <Field label="Título" value={d.titulo} onChange={v => onChange('titulo',v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => onChange('subtitulo',v)} textarea />
        <Field label="URL Foto flyer promos" value={d.fotoUrl} onChange={v => onChange('fotoUrl',v)} hint="Imagen principal del flyer de promociones" />
        <Field label="Nota al pie" value={d.nota} onChange={v => onChange('nota',v)} />
      </Card>
      <Card title="Cards de promos">
        {(d.cards||[]).map((c, i) => (
          <div key={i} style={{ background:'#1a1a1a', borderRadius:'.5rem', padding:'1rem', marginBottom:'.75rem', display:'flex', gap:'.75rem' }}>
            <div style={{ width:'5rem' }}><Field label="Emoji" value={c.emoji} onChange={v => updateCard(i,'emoji',v)} /></div>
            <div style={{ flex:1 }}>
              <Field label="Título" value={c.title} onChange={v => updateCard(i,'title',v)} />
              <Field label="Precio / descripción" value={c.desc} onChange={v => updateCard(i,'desc',v)} />
            </div>
          </div>
        ))}
      </Card>
      <SaveBtn onClick={onSave} loading={loading} />
    </>
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
      showToast(`✅ "${section}" guardado`)
    } catch (e) {
      showToast(`❌ Error: ${e.message}`)
    } finally { setLoading(false) }
  }

  const d  = localData
  const oc = section => (key, val) => handleChange(section, key, val)
  const os = section => () => handleSave(section)

  return (
    <>
      <style>{`
        .adm-overlay { position:fixed;inset:0;z-index:200;background:#0f0f0f;display:flex;justify-content:center; }
        .adm-panel   { width:100%;max-width:100vw;height:100dvh;background:#0f0f0f;display:flex;flex-direction:column;overflow:hidden; }
        .adm-header  { padding:1rem 2rem;border-bottom:1px solid #1f1f1f;display:flex;align-items:center;justify-content:space-between;flex-shrink:0; }
        .adm-tabs    { display:flex;overflow-x:auto;border-bottom:1px solid #1f1f1f;flex-shrink:0;scrollbar-width:none;padding:0 1rem; }
        .adm-tabs::-webkit-scrollbar { display:none; }
        .adm-tab     { padding:.65rem 1.1rem;font-size:.8rem;white-space:nowrap;background:none;border:none;cursor:pointer;font-family:var(--font-body);transition:color .2s;border-bottom:2px solid transparent; }
        .adm-content { flex:1;overflow-y:auto;padding:2rem; }
        .adm-inner   { max-width:860px;margin:0 auto; }
        .adm-close   { background:none;border:none;color:#555;cursor:pointer;padding:.5rem;border-radius:.4rem;line-height:0; }
        .adm-close:hover { background:#1a1a1a;color:#ccc; }
        @media(max-width:640px){
          .adm-panel  { width:100vw !important;border-left:none !important; }
          .adm-header { padding:.85rem 1rem; }
          .adm-tab    { padding:.55rem .7rem !important;font-size:.72rem !important; }
          .adm-content{ padding:.9rem !important; }
          .adm-content input,.adm-content textarea { font-size:1rem !important;padding:.75rem .9rem !important; }
          .adm-content label { font-size:.72rem !important; }
        }
      `}</style>

      <div className="adm-overlay">
        <div className="adm-panel">

          {/* Header */}
          <div className="adm-header">
            <div>
              <div style={{ fontWeight:800, fontSize:'1rem', fontFamily:'var(--font-head)', background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Panel Admin
              </div>
              <div style={{ fontSize:'.7rem', color:'#555', marginTop:'.1rem' }}>Litros & Litros — Todo editable</div>
            </div>
            <button className="adm-close" onClick={() => setAdminPanelOpen(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Tabs — scrollables en móvil */}
          <div className="adm-tabs">
            {TABS.map(t => (
              <button key={t.id} className="adm-tab" onClick={() => setActiveTab(t.id)} style={{
                fontWeight: activeTab === t.id ? 700 : 500,
                color: activeTab === t.id ? 'var(--primary)' : '#555',
                borderBottom: activeTab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
              }}>{t.label}</button>
            ))}
          </div>

          {/* Content */}
          <div className="adm-content">
            <div className="adm-inner">
            {d.hero            && activeTab==='hero'            && <HeroEditor         d={d.hero}            onChange={oc('hero')}            onSave={os('hero')}            loading={loading} />}
            {d.homeCards       && activeTab==='homeCards'       && <HomeCardsEditor    d={d.homeCards}       onChange={(k,v) => handleChange('homeCards',k,v)} onSave={os('homeCards')} loading={loading} />}
            {d.platillos       && activeTab==='platillos'       && <PlatillosEditor    d={d.platillos}       onChange={(k,v) => handleChange('platillos',k,v)} onSave={os('platillos')} loading={loading} />}
            {d.espectaculos    && activeTab==='espectaculos'    && <EspectaculosEditor d={d.espectaculos}    onChange={(k,v) => handleChange('espectaculos',k,v)} onSave={os('espectaculos')} loading={loading} />}
            {d.menuPromo       && activeTab==='menuPromo'       && <MenuPromoEditor    d={d.menuPromo}       onChange={oc('menuPromo')}       onSave={os('menuPromo')}       loading={loading} />}
            {d.bebidas         && activeTab==='bebidas'         && <BebidasEditor      d={d.bebidas}         onChange={oc('bebidas')}         onSave={os('bebidas')}         loading={loading} />}
            {d.reservas        && activeTab==='reservas'        && <ReservasEditor     d={d.reservas}        onChange={oc('reservas')}        onSave={os('reservas')}        loading={loading} />}
            {d.footer          && activeTab==='footer'          && <FooterEditor       d={d.footer}          onChange={oc('footer')}          onSave={os('footer')}          loading={loading} />}
            {d.socials         && activeTab==='socials'         && <SocialsEditor      d={d.socials}         onChange={oc('socials')}         onSave={os('socials')}         loading={loading} />}
            {d.waFlotante      && activeTab==='waFlotante'      && <WAEditor           d={d.waFlotante}      onChange={oc('waFlotante')}      onSave={os('waFlotante')}      loading={loading} />}
            {d.contact         && activeTab==='contact'         && <ContactEditor      d={d.contact}         onChange={oc('contact')}         onSave={os('contact')}         loading={loading} />}
            {d.seo             && activeTab==='seo'             && <SeoEditor          d={d.seo}             onChange={oc('seo')}             onSave={os('seo')}             loading={loading} />}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
