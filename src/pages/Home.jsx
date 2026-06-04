import { useState } from 'react'
import { useCMS } from '@/context/CMSContext'

const CAT_COLORS = {
  Ron:'#ef4444', Vodka:'#3b82f6', Tequila:'#f97316', Brandy:'#a855f7',
  Whisky:'#eab308', Mezcal:'#22c55e', Digestivos:'#ec4899',
  Coctelería:'#06b6d4', Cerveza:'#f59e0b', Refrescos:'#10b981', Snacks:'#ef4444',
}
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

function fmt(n) { return n != null ? `$${n}` : null }

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
}

// Imagen con ratio fijo y object-fit cover — misma altura siempre
function Img({ src, alt, ratio = '56.25%', radius = 'var(--radius)', overlay = false }) {
  return (
    <div style={{ position:'relative', width:'100%', paddingTop:ratio, borderRadius:radius, overflow:'hidden', flexShrink:0 }}>
      <img src={src} alt={alt} loading="lazy" style={{
        position:'absolute', inset:0, width:'100%', height:'100%',
        objectFit:'cover', objectPosition:'center',
      }}/>
      {overlay && <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,.85))' }}/>}
    </div>
  )
}

// ── HERO ─────────────────────────────────────────────────────
function Hero({ h }) {
  return (
    <div id="inicio" style={{
      minHeight:'calc(100dvh - 4rem)', display:'flex', alignItems:'center',
      justifyContent:'center', textAlign:'center', position:'relative', overflow:'hidden',
    }}>
      {/* Foto real como fondo */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <img src={h.img} alt="Litros & Litros" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.72)' }}/>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.15) 0%, transparent 65%)' }}/>
      </div>

      <div className="animate-fade-up" style={{ position:'relative', zIndex:2, maxWidth:'52rem', margin:'0 auto', padding:'3rem 1.5rem' }}>
        <img src={h.logo} alt="Logo" className="neon-glow"
          style={{ width:'9rem', height:'9rem', margin:'0 auto 1.5rem', borderRadius:'1.25rem', objectFit:'cover' }}/>

        <div style={{ display:'inline-block', marginBottom:'1rem', padding:'.3rem 1rem', borderRadius:'999px',
          background:'rgba(239,68,68,.15)', border:'1px solid rgba(239,68,68,.4)',
          fontSize:'.78rem', fontWeight:700, letterSpacing:'.08em', color:'var(--primary)', textTransform:'uppercase' }}>
          {h.badge}
        </div>

        <h1 className="gradient-text neon-text" style={{
          fontSize:'clamp(2.8rem,8vw,5.5rem)', fontWeight:900,
          letterSpacing:'-.03em', lineHeight:1.05, marginBottom:'1.25rem',
        }}>{h.title}</h1>

        <p style={{ fontSize:'clamp(1rem,2.2vw,1.2rem)', color:'rgba(242,242,242,.85)',
          marginBottom:'1rem', maxWidth:'36rem', margin:'0 auto 1rem', lineHeight:1.6 }}>
          {h.subtitle}
        </p>

        <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', margin:'1rem 0 2rem',
          padding:'.45rem 1.25rem', borderRadius:'999px',
          background:'rgba(0,0,0,.4)', border:'1px solid rgba(255,255,255,.15)',
          fontSize:'.85rem', color:'rgba(242,242,242,.8)', backdropFilter:'blur(8px)' }}>
          🕐 {h.horario}
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center' }}>
          <button className="btn btn-primary" onClick={() => scrollTo('bebidas')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2h18v3H3zM6 5v16M18 5v16M3 21h18"/>
            </svg>
            {h.btn1}
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('reservas')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {h.btn2}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MÚSICA ───────────────────────────────────────────────────
function Musica({ m }) {
  return (
    <section id="musica" style={{ background:'rgba(255,255,255,.015)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
          {/* Foto — ratio 4:3 */}
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 40px rgba(239,68,68,.2)' }}>
            <Img src={m.img} alt="Ambiente Litros & Litros" ratio="75%" />
          </div>
          {/* Texto */}
          <div>
            <h2 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>{m.title}</h2>
            <p style={{ color:'var(--fg-muted)', marginBottom:'2rem', fontSize:'1rem', lineHeight:1.6 }}>{m.sub}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {m.features.map((f, i) => (
                <div key={i} style={{
                  background:'var(--card)', border:'1px solid var(--border)',
                  borderRadius:'var(--radius)', padding:'1.1rem 1.25rem',
                  display:'flex', alignItems:'flex-start', gap:'1rem', transition:'all .3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(239,68,68,.35)'; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='' }}
                >
                  <span style={{ fontSize:'1.5rem', lineHeight:1, flexShrink:0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:'.25rem' }}>{f.title}</div>
                    <div style={{ color:'var(--fg-muted)', fontSize:'.85rem', lineHeight:1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#musica .container>div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ── BEBIDAS ──────────────────────────────────────────────────
function Bebidas({ b, menuBebidas }) {
  const cats = CAT_ORDER.filter(c => menuBebidas.some(i => i.cat === c))
  const [activeCat, setActiveCat] = useState(cats[0])
  const color  = CAT_COLORS[activeCat] || '#ef4444'
  const items  = menuBebidas.filter(i => i.cat === activeCat)
  const isPrecio = ['Coctelería','Cerveza','Refrescos','Snacks'].includes(activeCat)

  return (
    <section id="bebidas">
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 className="section-title gradient-text">{b.title}</h2>
          <p className="section-sub">{b.sub}</p>
        </div>

        {/* Banner foto barra + promo — ratio 21:9 */}
        <div style={{ position:'relative', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'2.5rem' }}>
          <Img src={b.img} alt="Barra Litros & Litros" ratio="30%" overlay />
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
            <div style={{
              background:'rgba(0,0,0,.5)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(239,68,68,.3)', borderRadius:'var(--radius)',
              padding:'1rem 2rem', fontSize:'1.05rem', fontWeight:700, textAlign:'center',
            }}>{b.promo}</div>
          </div>
        </div>

        {/* Tabs categorías */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'2rem', justifyContent:'center' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding:'.4rem 1.1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
              background: activeCat === c ? CAT_COLORS[c] : 'var(--card2)',
              color: activeCat === c ? '#fff' : 'var(--fg-muted)',
              border: activeCat === c ? 'none' : '1px solid var(--border)',
              cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}>{c}</button>
          ))}
        </div>

        {/* Grid items — 4 cols desktop */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
          {items.map(item => (
            <div key={item.id} style={{
              background:'var(--card)', border:`1px solid ${color}25`,
              borderRadius:'var(--radius)', padding:'1.1rem', transition:'all .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=color+'60'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=color+'25'; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'.5rem', marginBottom:'.6rem' }}>
                <span style={{ fontWeight:700, fontSize:'.9rem', flex:1, lineHeight:1.35 }}>{item.name}</span>
                <span style={{ fontSize:'.72rem', color:'var(--fg-muted)', whiteSpace:'nowrap', flexShrink:0 }}>{item.vol}</span>
              </div>
              <div style={{ display:'flex', gap:'1.25rem' }}>
                {item.botella != null && (
                  <div>
                    <div style={{ fontSize:'.6rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.15rem' }}>
                      {isPrecio ? 'Precio' : 'Botella'}
                    </div>
                    <div style={{ fontSize:'1.05rem', fontWeight:800, color }}>${item.botella}</div>
                  </div>
                )}
                {item.copa != null && (
                  <div>
                    <div style={{ fontSize:'.6rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.15rem' }}>Copa</div>
                    <div style={{ fontSize:'1.05rem', fontWeight:800, color:'var(--primary)' }}>${item.copa}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ALIMENTOS ────────────────────────────────────────────────
function Alimentos({ a }) {
  return (
    <section id="alimentos" style={{ background:'rgba(255,255,255,.015)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
          {/* Texto primero en mobile */}
          <div>
            <h2 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>{a.title}</h2>
            <p style={{ color:'var(--fg-muted)', marginBottom:'2rem', lineHeight:1.6 }}>{a.sub}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'.85rem' }}>
              {a.items.map(item => (
                <div key={item.id} style={{
                  background:'var(--card)', border:'1px solid var(--border)',
                  borderRadius:'var(--radius)', padding:'1rem 1.25rem',
                  display:'flex', alignItems:'flex-start', gap:'1rem', transition:'all .3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(239,68,68,.3)'; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='' }}
                >
                  <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'.6rem', background:item.color,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.2rem' }}>
                      <span style={{ fontWeight:700, fontSize:'.95rem' }}>{item.name}</span>
                      <span style={{ fontSize:'.8rem', color:'var(--primary)', fontWeight:700 }}>{item.price}</span>
                    </div>
                    <p style={{ color:'var(--fg-muted)', fontSize:'.82rem', lineHeight:1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Foto — ratio 4:3 */}
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 40px rgba(168,85,247,.2)' }}>
            <Img src={a.img} alt="Alimentos Litros & Litros" ratio="75%" />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#alimentos .container>div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ── EVENTOS ──────────────────────────────────────────────────
function Eventos({ e: ev }) {
  return (
    <section id="eventos">
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 className="section-title gradient-text">{ev.title}</h2>
          <p className="section-sub">{ev.sub}</p>
        </div>
        {/* Foto banner 21:9 + cards debajo */}
        <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'2.5rem',
          boxShadow:'0 0 50px rgba(239,68,68,.15)' }}>
          <Img src={ev.img} alt="Eventos Litros & Litros" ratio="35%" overlay />
        </div>
        <div className="grid-3" style={{ gap:'1.5rem' }}>
          {ev.items.map(item => (
            <div key={item.id} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'2rem', transition:'all .3s',
              display:'flex', flexDirection:'column', gap:'1rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 10px 35px rgba(239,68,68,.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ width:'3.5rem', height:'3.5rem', borderRadius:'1rem', background:item.color,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.75rem',
                boxShadow:'0 0 20px rgba(239,68,68,.3)' }}>{item.icon}</div>
              <h3 style={{ fontSize:'1.1rem', fontWeight:800 }}>{item.title}</h3>
              <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', lineHeight:1.65, flex:1 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── RESERVAS ─────────────────────────────────────────────────
function Reservas({ r }) {
  const waUrl = `https://wa.me/${r.wa}?text=${encodeURIComponent(r.waMsg)}`
  return (
    <section id="reservas" style={{ background:'radial-gradient(ellipse at center, rgba(168,85,247,.08) 0%, transparent 65%)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
          {/* Foto cabinas — ratio 4:3 */}
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 50px rgba(168,85,247,.25)' }}>
            <Img src={r.img} alt="Cabinas Litros & Litros" ratio="75%" />
          </div>
          {/* Contenido */}
          <div style={{ textAlign:'left' }}>
            <h2 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>{r.title}</h2>
            <p style={{ color:'var(--fg-muted)', marginBottom:'2rem', lineHeight:1.6 }}>{r.sub}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'2rem' }}>
              {r.items.map((item, i) => (
                <div key={i} style={{
                  background:'var(--card)', border:'1px solid var(--border)',
                  borderRadius:'var(--radius)', padding:'1rem 1.25rem',
                  display:'flex', alignItems:'center', gap:'1rem',
                }}>
                  <span style={{ fontSize:'1.75rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'.95rem' }}>{item.label}</div>
                    <div style={{ color:'var(--fg-muted)', fontSize:'.83rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              style={{ display:'inline-flex', textDecoration:'none', fontSize:'1rem', padding:'.85rem 2rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar por WhatsApp
            </a>
            <p style={{ marginTop:'.85rem', fontSize:'.83rem', color:'var(--fg-muted)' }}>
              📞 <a href="tel:+522224302693" style={{ color:'var(--primary)' }}>+52 222 430 2693</a>
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#reservas .container>div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ── HOME ─────────────────────────────────────────────────────
export default function Home() {
  const { cms } = useCMS()
  return (
    <>
      <Hero      h={cms.hero} />
      <Musica    m={cms.musica} />
      <Bebidas   b={cms.bebidas} menuBebidas={cms.menuBebidas || []} />
      <Alimentos a={cms.alimentos} />
      <Eventos   e={cms.eventos} />
      <Reservas  r={cms.reservas} />
    </>
  )
}
