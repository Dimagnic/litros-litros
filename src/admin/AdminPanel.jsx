import { useState, useEffect, useRef } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'
import { saveCMSSection, uploadImage } from '@/services/adminService'

const C = { bg:'#0d1520', card:'#141f30', card2:'#1a2537', bdr:'rgba(41,90,158,.25)', bdrs:'rgba(41,90,158,.5)', pri:'#295A9E', pril:'#3a7bd5', fg:'#fff', fgm:'rgba(234,234,234,.65)', fgd:'rgba(234,234,234,.35)' }
const INP = { width:'100%', background:C.card2, border:`1px solid ${C.bdr}`, borderRadius:'.5rem', padding:'.65rem .9rem', color:C.fg, fontSize:'.88rem', fontFamily:'var(--font-body)', outline:'none' }
const TA  = { ...INP, minHeight:'4.5rem', resize:'vertical' }

function Field({ label, value, onChange, textarea, type='text', hint, placeholder }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.68rem', fontWeight:700, color:C.fgd, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>{label}</label>
      <Tag type={type} value={value ?? ''} placeholder={placeholder || ''} onChange={e => onChange(e.target.value)}
        style={textarea ? TA : INP}
        onFocus={e => e.target.style.borderColor=C.bdrs}
        onBlur={e => e.target.style.borderColor=C.bdr} />
      {hint && <p style={{ fontSize:'.68rem', color:C.fgd, marginTop:'.25rem' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ label, value, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', padding:'.75rem', background:C.card2, borderRadius:'.5rem', border:`1px solid ${C.bdr}` }}>
      <label style={{ fontSize:'.9rem', color:C.fgm }}>{label}</label>
      <button onClick={() => onChange(!value)} style={{ width:'3rem', height:'1.5rem', borderRadius:'999px', border:'none', cursor:'pointer', background: value ? C.pri : '#2a3548', position:'relative', transition:'background .2s' }}>
        <span style={{ position:'absolute', top:'3px', left: value ? 'calc(100% - 21px)' : '3px', width:'18px', height:'18px', borderRadius:'50%', background:'#fff', transition:'left .2s', display:'block' }}/>
      </button>
    </div>
  )
}

function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{ background: loading ? '#1a3a6b' : C.pri, color:'#fff', border:'none', borderRadius:'.6rem', padding:'.6rem 1.5rem', fontSize:'.88rem', fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font-body)', display:'inline-flex', alignItems:'center', gap:'.4rem', transition:'all .2s' }}>
      {loading ? '⏳ Guardando...' : '💾 Guardar cambios'}
    </button>
  )
}

function Card({ title, children }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.bdr}`, borderRadius:'.75rem', overflow:'hidden', marginBottom:'1.25rem' }}>
      <div style={{ padding:'.85rem 1.25rem', borderBottom:`1px solid ${C.bdr}`, fontSize:'.9rem', fontWeight:700, color:C.fg, background:'rgba(41,90,158,.05)' }}>{title}</div>
      <div style={{ padding:'1.25rem' }}>{children}</div>
    </div>
  )
}

function ImageUploader({ label, value, onChange, folder='cms' }) {
  const ref = useRef()
  const [uploading, setUploading] = useState(false)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try { onChange(await uploadImage(file, folder)) }
    catch (err) { alert('Error: ' + err.message) }
    finally { setUploading(false) }
  }

  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'.68rem', fontWeight:700, color:C.fgd, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>{label}</label>
      {value && <div style={{ marginBottom:'.5rem', borderRadius:'.5rem', overflow:'hidden', maxHeight:'120px', border:`1px solid ${C.bdr}` }}><img src={value} alt="" style={{ width:'100%', height:'120px', objectFit:'cover' }} /></div>}
      <div style={{ display:'flex', gap:'.5rem' }}>
        <input style={{ ...INP, flex:1, fontSize:'.8rem' }} value={value || ''} placeholder="URL de imagen..." onChange={e => onChange(e.target.value)} onFocus={e => e.target.style.borderColor=C.bdrs} onBlur={e => e.target.style.borderColor=C.bdr} />
        <button onClick={() => ref.current.click()} disabled={uploading} style={{ background:'rgba(41,90,158,.2)', color:C.pril, border:`1px solid ${C.bdr}`, borderRadius:'.5rem', padding:'.5rem .9rem', fontSize:'.8rem', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
          {uploading ? '⏳' : '📤 Subir'}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFile} />
    </div>
  )
}

const TABS = [
  { id:'hero',        label:'🏠 Inicio'    },
  { id:'horario',     label:'🕐 Horario'   },
  { id:'menuPromo',   label:'🎉 Promos'    },
  { id:'carta',       label:'🍹 Carta'     },
  { id:'reservas',    label:'📅 Reservas'  },
  { id:'alimentos',   label:'🍴 Alimentos' },
  { id:'hamburguesa', label:'🍔 Hamburgesa'},
  { id:'eventos',     label:'🎭 Eventos'   },
  { id:'footer',      label:'📄 Footer'    },
  { id:'socials',     label:'📲 Redes'     },
  { id:'waFlotante',  label:'💬 WhatsApp'  },
  { id:'contact',     label:'📍 Contacto'  },
  { id:'seo',         label:'🔍 SEO'       },
]

export default function AdminPanel() {
  const { adminPanelOpen, setAdminPanelOpen, showToast, cms, updateCMS } = useCMS()
  const { isAdmin, signOut } = useAuth()
  const [tab, setTab] = useState('hero')
  const [d, setD] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (adminPanelOpen && cms) setD(JSON.parse(JSON.stringify(cms))) }, [adminPanelOpen])

  if (!adminPanelOpen || !isAdmin) return null

  const DB_KEY = { hero:'hero', horario:'horario', menuPromo:'menuPromo', carta:'bebidas', reservas:'reservas', alimentos:'platillos', hamburguesa:'platillos', eventos:'espectaculos', footer:'footer', socials:'socials', waFlotante:'waFlotante', contact:'contact', seo:'seo' }

  function ch(section, key, val) {
    const k = DB_KEY[section] || section
    setD(prev => ({ ...prev, [k]: { ...(prev[k]||{}), [key]: val } }))
  }

  async function save(section) {
    setLoading(true)
    const k = DB_KEY[section] || section
    const timeout = setTimeout(() => { setLoading(false); showToast('⚠️ Timeout — revisa conexión') }, 10000)
    try {
      await saveCMSSection(k, d[k])
      updateCMS(k, d[k])
      showToast('✅ Guardado correctamente')
    } catch(e) { showToast('❌ Error: ' + e.message) }
    finally { clearTimeout(timeout); setLoading(false) }
  }

  const hero = d.hero || {}
  const ho   = d.horario || {}
  const mp   = d.menuPromo || {}
  const beb  = d.bebidas || {}
  const res  = d.reservas || {}
  const plt  = d.platillos || {}
  const ham  = plt.hamburguesa || {}
  const ev   = d.espectaculos || {}
  const ft   = d.footer || {}
  const soc  = d.socials || {}
  const wa   = d.waFlotante || {}
  const con  = d.contact || {}
  const seo  = d.seo || {}

  return (
    <>
      <style>{`
        .ap{position:fixed;inset:0;z-index:200;background:#0d1520;display:flex;flex-direction:column;overflow:hidden;}
        .ap-hdr{padding:1rem 2rem;border-bottom:1px solid ${C.bdr};display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:rgba(41,90,158,.05);}
        .ap-tabs{display:flex;overflow-x:auto;border-bottom:1px solid ${C.bdr};flex-shrink:0;scrollbar-width:none;padding:0 1rem;}
        .ap-tabs::-webkit-scrollbar{display:none;}
        .ap-tab{padding:.65rem 1rem;font-size:.78rem;white-space:nowrap;background:none;border:none;cursor:pointer;font-family:var(--font-body);color:${C.fgd};border-bottom:2px solid transparent;transition:color .2s;}
        .ap-tab.on{color:${C.pril};border-bottom-color:${C.pri};}
        .ap-body{flex:1;overflow-y:auto;padding:1.5rem 2rem;}
        .ap-inner{max-width:860px;margin:0 auto;}
        @media(max-width:640px){.ap-hdr{padding:.85rem 1rem;}.ap-tab{padding:.55rem .65rem;font-size:.72rem;}.ap-body{padding:1rem;}}
      `}</style>
      <div className="ap">
        <div className="ap-hdr">
          <div>
            <div style={{ fontWeight:800, fontSize:'1.05rem', color:C.pril, fontFamily:'var(--font-head)' }}>Panel Administrador</div>
            <div style={{ fontSize:'.72rem', color:C.fgd }}>Litros & Litros — Gestión de contenido</div>
          </div>
          <div style={{ display:'flex', gap:'.5rem' }}>
            <button onClick={signOut} style={{ background:'none', border:`1px solid ${C.bdr}`, color:C.fgd, cursor:'pointer', padding:'.4rem .8rem', borderRadius:'.5rem', fontSize:'.8rem', fontFamily:'var(--font-body)' }}>Salir</button>
            <button onClick={() => setAdminPanelOpen(false)} style={{ background:'rgba(220,38,38,.1)', border:'1px solid rgba(220,38,38,.3)', color:'#f87171', cursor:'pointer', padding:'.4rem .8rem', borderRadius:'.5rem', fontSize:'.8rem', fontFamily:'var(--font-body)' }}>✕ Cerrar</button>
          </div>
        </div>

        <div className="ap-tabs">
          {TABS.map(t => <button key={t.id} className={`ap-tab${tab===t.id?' on':''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
        </div>

        <div className="ap-body"><div className="ap-inner">

          {/* INICIO */}
          {tab==='hero' && <>
            <Card title="Imagen y Logo">
              <ImageUploader label="Foto de fondo" value={hero.bgImg} onChange={v => ch('hero','bgImg',v)} folder="hero" />
              <ImageUploader label="Logo" value={hero.logo} onChange={v => ch('hero','logo',v)} folder="logo" />
            </Card>
            <Card title="Textos">
              <Field label="Título" value={hero.title} onChange={v => ch('hero','title',v)} />
              <Field label="Frase principal" value={hero.frase} onChange={v => ch('hero','frase',v)} textarea />
            </Card>
            <Card title="Botones">
              <Field label="Botón 1" value={hero.btn1} onChange={v => ch('hero','btn1',v)} />
              <Field label="Botón 2" value={hero.btn2} onChange={v => ch('hero','btn2',v)} />
              <Field label="Botón 3" value={hero.btn3} onChange={v => ch('hero','btn3',v)} />
            </Card>
            <SaveBtn onClick={() => save('hero')} loading={loading} />
          </>}

          {/* HORARIO */}
          {tab==='horario' && <>
            <Card title="Horario">
              <Field label="Horas" value={ho.horas} onChange={v => ch('horario','horas',v)} placeholder="De 6:00 PM a 3:00 AM" />
              <Field label="Día de descanso" value={ho.descanso} onChange={v => ch('horario','descanso',v)} placeholder="Lunes Descansamos" />
              <Field label="Texto adicional" value={ho.dias} onChange={v => ch('horario','dias',v)} placeholder="Karaoke todos los demás días" />
            </Card>
            <SaveBtn onClick={() => save('horario')} loading={loading} />
          </>}

          {/* PROMOS */}
          {tab==='menuPromo' && <>
            <Card title="Imagen y encabezado">
              <ImageUploader label="Foto de fondo" value={mp.fotoUrl} onChange={v => ch('menuPromo','fotoUrl',v)} folder="promos" />
              <Field label="Título" value={mp.titulo} onChange={v => ch('menuPromo','titulo',v)} />
              <Field label="Subtítulo" value={mp.subtitulo} onChange={v => ch('menuPromo','subtitulo',v)} textarea />
              <Field label="Nota al pie" value={mp.nota} onChange={v => ch('menuPromo','nota',v)} />
            </Card>
            <SaveBtn onClick={() => save('menuPromo')} loading={loading} />
          </>}

          {/* CARTA BEBIDAS */}
          {tab==='carta' && <>
            <Card title="Encabezado Carta de Bebidas">
              <Field label="Título" value={beb.titulo} onChange={v => ch('carta','titulo',v)} />
              <Field label="Promo cumpleaños" value={beb.promo} onChange={v => ch('carta','promo',v)} />
              <Field label="Nota al pie" value={beb.nota} onChange={v => ch('carta','nota',v)} />
            </Card>
            <SaveBtn onClick={() => save('carta')} loading={loading} />
          </>}

          {/* RESERVAS */}
          {tab==='reservas' && <>
            <Card title="Reservas">
              <ImageUploader label="Foto de fondo" value={res.fotoUrl} onChange={v => ch('reservas','fotoUrl',v)} folder="reservas" />
              <Field label="Título" value={res.titulo} onChange={v => ch('reservas','titulo',v)} />
              <Field label="Mensaje de bienvenida" value={res.bienvenida} onChange={v => ch('reservas','bienvenida',v)} textarea />
              <Field label="WhatsApp número" value={res.wa} onChange={v => ch('reservas','wa',v)} hint="Sin + ni espacios" />
            </Card>
            <SaveBtn onClick={() => save('reservas')} loading={loading} />
          </>}

          {/* ALIMENTOS */}
          {tab==='alimentos' && <>
            {['alitas','nachos','hotdog','papas'].map(k => (
              <Card key={k} title={`🍽 ${k.charAt(0).toUpperCase()+k.slice(1)}`}>
                <ImageUploader label="Foto" value={plt[k]?.img} onChange={v => { const p = {...d.platillos||{}, [k]:{...(d.platillos?.[k]||{}),img:v}}; setD(prev=>({...prev,platillos:p})) }} folder={k} />
                <Field label="Descripción" value={plt[k]?.desc} onChange={v => { const p = {...d.platillos||{}, [k]:{...(d.platillos?.[k]||{}),desc:v}}; setD(prev=>({...prev,platillos:p})) }} textarea />
                <Field label="Ingredientes (uno por línea)" textarea value={(plt[k]?.ingredientes||[]).join('\n')} onChange={v => { const p = {...d.platillos||{}, [k]:{...(d.platillos?.[k]||{}),ingredientes:v.split('\n').filter(Boolean)}}; setD(prev=>({...prev,platillos:p})) }} />
              </Card>
            ))}
            <SaveBtn onClick={() => save('alimentos')} loading={loading} />
          </>}

          {/* HAMBURGUESA */}
          {tab==='hamburguesa' && <>
            <Card title="Hamburguesa">
              <ImageUploader label="Foto" value={ham.img} onChange={v => setD(prev=>({...prev,platillos:{...prev.platillos,hamburguesa:{...prev.platillos?.hamburguesa,img:v}}}))} folder="hamburguesa" />
              <Field label="Ingredientes (uno por línea)" textarea value={(ham.ingredientes||[]).join('\n')} onChange={v => setD(prev=>({...prev,platillos:{...prev.platillos,hamburguesa:{...prev.platillos?.hamburguesa,ingredientes:v.split('\n').filter(Boolean)}}}))} />
              <Field label="Incluye (uno por línea)" textarea value={(ham.extras||[]).join('\n')} onChange={v => setD(prev=>({...prev,platillos:{...prev.platillos,hamburguesa:{...prev.platillos?.hamburguesa,extras:v.split('\n').filter(Boolean)}}}))} />
            </Card>
            <SaveBtn onClick={() => save('hamburguesa')} loading={loading} />
          </>}

          {/* EVENTOS */}
          {tab==='eventos' && <>
            <Card title="Imagen de fondo">
              <ImageUploader label="Foto eventos" value={ev['puerta-cerrada']?.img} onChange={v => { const e2={...d.espectaculos||{}, 'puerta-cerrada':{...(d.espectaculos?.['puerta-cerrada']||{}),img:v}}; setD(prev=>({...prev,espectaculos:e2})) }} folder="eventos" />
            </Card>
            {['puerta-cerrada','mejor-voz','karaoke','vs-mesero'].map(k => (
              <Card key={k} title={k}>
                <Field label="Título" value={ev[k]?.title} onChange={v => { const e2={...d.espectaculos||{},[k]:{...(d.espectaculos?.[k]||{}),title:v}}; setD(prev=>({...prev,espectaculos:e2})) }} />
                <Field label="Items (uno por línea)" textarea value={(ev[k]?.items||[]).join('\n')} onChange={v => { const e2={...d.espectaculos||{},[k]:{...(d.espectaculos?.[k]||{}),items:v.split('\n').filter(Boolean)}}; setD(prev=>({...prev,espectaculos:e2})) }} />
              </Card>
            ))}
            <Card title="Cumpleaños">
              <Field label="Beneficios ✓ (uno por línea)" textarea value={(ev['cumpleanos']?.checks||[]).join('\n')} onChange={v => { const e2={...d.espectaculos||{},'cumpleanos':{...(d.espectaculos?.['cumpleanos']||{}),checks:v.split('\n').filter(Boolean)}}; setD(prev=>({...prev,espectaculos:e2})) }} />
              <Field label="Nota" value={ev['cumpleanos']?.nota} onChange={v => { const e2={...d.espectaculos||{},'cumpleanos':{...(d.espectaculos?.['cumpleanos']||{}),nota:v}}; setD(prev=>({...prev,espectaculos:e2})) }} textarea />
            </Card>
            <SaveBtn onClick={() => save('eventos')} loading={loading} />
          </>}

          {/* FOOTER */}
          {tab==='footer' && <>
            <Card title="Footer">
              <Field label="Nombre marca" value={ft.brand} onChange={v => ch('footer','brand',v)} />
              <Field label="Descripción" value={ft.desc} onChange={v => ch('footer','desc',v)} textarea />
              <Field label="Copyright" value={ft.copyright} onChange={v => ch('footer','copyright',v)} />
            </Card>
            <SaveBtn onClick={() => save('footer')} loading={loading} />
          </>}

          {/* REDES */}
          {tab==='socials' && <>
            <Card title="Redes Sociales" >
              <Field label="🔵 Facebook URL" value={soc.fb} onChange={v => ch('socials','fb',v)} placeholder="https://www.facebook.com/..." />
              <Field label="📸 Instagram URL" value={soc.ig} onChange={v => ch('socials','ig',v)} placeholder="https://www.instagram.com/..." />
              <Field label="🎵 TikTok URL (opcional)" value={soc.tt} onChange={v => ch('socials','tt',v)} />
              <Field label="▶️ YouTube URL (opcional)" value={soc.yt} onChange={v => ch('socials','yt',v)} />
              <Field label="WhatsApp número" value={soc.wa} onChange={v => ch('socials','wa',v)} hint="Sin + ni espacios. Ej: 522224302693" />
              <p style={{ fontSize:'.78rem', color:C.fgd, marginTop:'.5rem' }}>💡 Si dejas un campo vacío, ese ícono NO aparecerá en el footer.</p>
            </Card>
            <SaveBtn onClick={() => save('socials')} loading={loading} />
          </>}

          {/* WHATSAPP */}
          {tab==='waFlotante' && <>
            <Card title="Botón WhatsApp Flotante">
              <Toggle label="Visible en el sitio" value={wa.visible !== false} onChange={v => ch('waFlotante','visible',v)} />
              <Field label="Número (sin + ni espacios)" value={wa.numero} onChange={v => ch('waFlotante','numero',v)} hint="Ej: 522224302693" />
              <Field label="Mensaje al hacer clic" value={wa.mensaje} onChange={v => ch('waFlotante','mensaje',v)} textarea />
            </Card>
            <SaveBtn onClick={() => save('waFlotante')} loading={loading} />
          </>}

          {/* CONTACTO */}
          {tab==='contact' && <>
            <Card title="Información de Contacto">
              <Field label="Dirección" value={con.address} onChange={v => ch('contact','address',v)} textarea />
              <Field label="Teléfono" value={con.phone} onChange={v => ch('contact','phone',v)} />
              <Field label="Email" value={con.email} onChange={v => ch('contact','email',v)} />
              <Field label="Horario" value={con.hours} onChange={v => ch('contact','hours',v)} textarea />
              <Field label="WhatsApp número" value={con.wa} onChange={v => ch('contact','wa',v)} hint="Sin + ni espacios" />
            </Card>
            <SaveBtn onClick={() => save('contact')} loading={loading} />
          </>}

          {/* SEO */}
          {tab==='seo' && <>
            <Card title="SEO">
              <Field label="Título (pestaña navegador)" value={seo.title} onChange={v => ch('seo','title',v)} />
              <Field label="Descripción Google" value={seo.desc} onChange={v => ch('seo','desc',v)} textarea />
              <Field label="Palabras clave" value={seo.kw} onChange={v => ch('seo','kw',v)} />
            </Card>
            <SaveBtn onClick={() => save('seo')} loading={loading} />
          </>}

        </div></div>
      </div>
    </>
  )
}
