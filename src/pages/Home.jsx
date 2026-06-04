import { useCMS } from '@/context/CMSContext'

// ── helpers ──────────────────────────────────────────────────
const CAT_COLORS = {
  Ron:'#ef4444', Vodka:'#3b82f6', Tequila:'#f97316', Brandy:'#a855f7',
  Whisky:'#eab308', Mezcal:'#22c55e', Digestivos:'#ec4899',
  Coctelería:'#06b6d4', Cerveza:'#f59e0b', Refrescos:'#10b981', Snacks:'#ef4444',
}
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

function fmt(n) { return n != null ? `$${n}` : '—' }

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
}

// ── sub-components ───────────────────────────────────────────
function SectionHeader({ title, sub, light }) {
  return (
    <div className="text-center" style={{ marginBottom:'3rem' }}>
      <h2 className={`section-title${light ? ' gradient-text' : ''}`}>{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}

// ── HERO ─────────────────────────────────────────────────────
function Hero({ cms }) {
  const h = cms.hero
  return (
    <div id="inicio" style={{
      minHeight:'calc(100dvh - 4rem)', display:'flex', alignItems:'center', justifyContent:'center',
      textAlign:'center', position:'relative', overflow:'hidden',
      background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.09) 0%, transparent 65%)',
    }}>
      {/* bg image overlay */}
      {h.img && (
        <div style={{
          position:'absolute', inset:0, zIndex:0,
          backgroundImage:`url(${h.img})`, backgroundSize:'cover', backgroundPosition:'center',
          opacity:.07,
        }}/>
      )}
      <div className="animate-fade-up" style={{ position:'relative', zIndex:2, maxWidth:'52rem', margin:'0 auto', padding:'3rem 1.5rem' }}>
        <img src={h.logo} alt="Litros & Litros" className="neon-glow"
          style={{ width:'9rem', height:'9rem', margin:'0 auto 1.5rem', borderRadius:'1.25rem', objectFit:'cover' }} />

        {h.badge && (
          <div style={{ display:'inline-block', marginBottom:'1rem', padding:'.3rem 1rem', borderRadius:'999px',
            background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
            fontSize:'.8rem', fontWeight:700, letterSpacing:'.08em', color:'var(--primary)', textTransform:'uppercase' }}>
            {h.badge}
          </div>
        )}

        <h1 className="gradient-text neon-text" style={{
          fontSize:'clamp(2.8rem,8vw,5.5rem)', fontWeight:900,
          letterSpacing:'-.03em', lineHeight:1.05, marginBottom:'1.25rem',
        }}>{h.title}</h1>

        <p style={{ fontSize:'clamp(1rem,2.5vw,1.2rem)', color:'rgba(242,242,242,.8)', marginBottom:'.9rem', maxWidth:'36rem', margin:'0 auto 1rem' }}>
          {h.subtitle}
        </p>

        {h.horario && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', marginBottom:'2rem',
            padding:'.45rem 1.1rem', borderRadius:'999px',
            background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
            fontSize:'.85rem', color:'rgba(242,242,242,.7)' }}>
            🕐 {h.horario}
          </div>
        )}

        <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center', marginTop:'1.5rem' }}>
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
function Musica({ cms }) {
  const m = cms.musica
  return (
    <section id="musica" style={{ background:'rgba(255,255,255,.02)' }}>
      <div className="container">
        <SectionHeader title={m.title} sub={m.sub} light />
        <div className="grid-2" style={{ gap:'1.5rem' }}>
          {m.features.map((f, i) => (
            <div key={i} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'1.75rem',
              display:'flex', alignItems:'flex-start', gap:'1.25rem', transition:'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(239,68,68,.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ fontSize:'2rem', flexShrink:0, lineHeight:1 }}>{f.icon}</div>
              <div>
                <h3 style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'.4rem' }}>{f.title}</h3>
                <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── BEBIDAS ──────────────────────────────────────────────────
function Bebidas({ cms }) {
  const { bebidas, menuBebidas } = cms
  const cats = CAT_ORDER.filter(c => menuBebidas.some(b => b.cat === c))
  const [activeCat, setActiveCat] = useState_local(cats[0])

  const items = menuBebidas.filter(b => b.cat === activeCat)
  const color = CAT_COLORS[activeCat] || '#ef4444'

  return (
    <section id="bebidas">
      <div className="container">
        <SectionHeader title={bebidas.title} sub={bebidas.sub} light />

        {/* Promo banner */}
        <div style={{
          background:'linear-gradient(135deg,rgba(239,68,68,.12),rgba(168,85,247,.12))',
          border:'1px solid rgba(239,68,68,.25)', borderRadius:'var(--radius)',
          padding:'1rem 1.5rem', marginBottom:'2.5rem', textAlign:'center',
          fontSize:'1rem', fontWeight:600, color:'var(--fg)',
        }}>{bebidas.promo}</div>

        {/* Categorías tabs */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'2rem', justifyContent:'center' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat_local(c)} style={{
              padding:'.4rem 1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
              background: activeCat === c ? CAT_COLORS[c] || '#ef4444' : 'var(--card2)',
              color: activeCat === c ? '#fff' : 'var(--fg-muted)',
              border: activeCat === c ? 'none' : '1px solid var(--border)',
              cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}>{c}</button>
          ))}
        </div>

        {/* Items grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem' }}>
          {items.map(item => (
            <div key={item.id} style={{
              background:'var(--card)', border:`1px solid ${color}22`,
              borderRadius:'var(--radius)', padding:'1.25rem', transition:'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=color+'55'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}22` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=color+'22'; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.5rem' }}>
                <span style={{ fontWeight:700, fontSize:'.95rem', flex:1 }}>{item.name}</span>
                <span style={{ fontSize:'.75rem', color:'var(--fg-muted)', marginLeft:'.5rem', whiteSpace:'nowrap' }}>{item.vol}</span>
              </div>
              <div style={{ display:'flex', gap:'1.5rem', marginTop:'.5rem' }}>
                {item.botella != null && (
                  <div>
                    <div style={{ fontSize:'.65rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.05em' }}>Botella</div>
                    <div style={{ fontSize:'1.1rem', fontWeight:800, color }}>{fmt(item.botella)}</div>
                  </div>
                )}
                {item.copa != null && (
                  <div>
                    <div style={{ fontSize:'.65rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.05em' }}>Copa</div>
                    <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--primary)' }}>{fmt(item.copa)}</div>
                  </div>
                )}
                {item.botella != null && item.copa == null && item.cat !== 'Ron' && (
                  <div>
                    <div style={{ fontSize:'.65rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.05em' }}>Precio</div>
                    <div style={{ fontSize:'1.1rem', fontWeight:800, color }}>{fmt(item.botella)}</div>
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
function Alimentos({ cms }) {
  const a = cms.alimentos
  return (
    <section id="alimentos" style={{ background:'rgba(255,255,255,.02)' }}>
      <div className="container">
        <SectionHeader title={a.title} sub={a.sub} light />
        <div className="grid-3" style={{ gap:'1.5rem' }}>
          {a.items.map(item => (
            <div key={item.id} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'1.75rem', transition:'all .3s',
              display:'flex', flexDirection:'column', gap:'1rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 10px 35px rgba(239,68,68,.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{
                  width:'3rem', height:'3rem', borderRadius:'.75rem',
                  background:item.color, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.5rem', flexShrink:0, boxShadow:'0 0 20px rgba(239,68,68,.3)',
                }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:700 }}>{item.name}</h3>
                  <span style={{ fontSize:'.8rem', color:'var(--primary)', fontWeight:700 }}>{item.price}</span>
                </div>
              </div>
              <p style={{ color:'var(--fg-muted)', fontSize:'.875rem', lineHeight:1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── EVENTOS ──────────────────────────────────────────────────
function Eventos({ cms }) {
  const e = cms.eventos
  return (
    <section id="eventos">
      <div className="container">
        <SectionHeader title={e.title} sub={e.sub} light />
        <div className="grid-3" style={{ gap:'1.5rem' }}>
          {e.items.map(item => (
            <div key={item.id} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'2rem', transition:'all .3s',
              display:'flex', flexDirection:'column', gap:'1rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 10px 35px rgba(239,68,68,.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{
                width:'3.5rem', height:'3.5rem', borderRadius:'1rem',
                background:item.color, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'1.75rem',
                boxShadow:'0 0 20px rgba(239,68,68,.3)',
              }}>{item.icon}</div>
              <h3 style={{ fontSize:'1.15rem', fontWeight:800 }}>{item.title}</h3>
              <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', lineHeight:1.65, flex:1 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── RESERVAS ─────────────────────────────────────────────────
function Reservas({ cms }) {
  const r = cms.reservas
  const waUrl = `https://wa.me/${r.wa}?text=${encodeURIComponent(r.waMsg)}`
  return (
    <section id="reservas" style={{ background:'radial-gradient(ellipse at center, rgba(168,85,247,.08) 0%, transparent 65%)' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <SectionHeader title={r.title} sub={r.sub} light />
        <div className="grid-3" style={{ gap:'1.5rem', marginBottom:'3rem' }}>
          {r.items.map((item, i) => (
            <div key={i} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'1.75rem',
              display:'flex', flexDirection:'column', alignItems:'center', gap:'.75rem',
            }}>
              <div style={{ fontSize:'2.5rem' }}>{item.icon}</div>
              <h3 style={{ fontSize:'1rem', fontWeight:700 }}>{item.label}</h3>
              <p style={{ color:'var(--fg-muted)', fontSize:'.875rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display:'inline-flex', textDecoration:'none', fontSize:'1.1rem', padding:'1rem 2.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Reservar por WhatsApp
        </a>
        <p style={{ marginTop:'1rem', fontSize:'.85rem', color:'var(--fg-muted)' }}>
          También puedes llamarnos al <a href="tel:+522224302693" style={{ color:'var(--primary)' }}>+52 222 430 2693</a>
        </p>
      </div>
    </section>
  )
}

// ── useState local hack (no podemos importar en template literal) ─
let _state = {}
function useState_local(init) {
  if (_state.val === undefined) _state.val = init
  return _state.val
}
function setActiveCat_local(v) { _state.val = v }

// ── HOME (single page) ───────────────────────────────────────
import { useState } from 'react'

export default function Home() {
  const { cms } = useCMS()
  const cats = CAT_ORDER.filter(c => cms.menuBebidas?.some(b => b.cat === c))
  const [activeCat, setActiveCat] = useState(cats[0])

  const BebidasReal = () => {
    const { bebidas, menuBebidas } = cms
    const items = (menuBebidas || []).filter(b => b.cat === activeCat)
    const color = CAT_COLORS[activeCat] || '#ef4444'

    return (
      <section id="bebidas">
        <div className="container">
          <SectionHeader title={bebidas.title} sub={bebidas.sub} light />
          <div style={{
            background:'linear-gradient(135deg,rgba(239,68,68,.12),rgba(168,85,247,.12))',
            border:'1px solid rgba(239,68,68,.25)', borderRadius:'var(--radius)',
            padding:'1rem 1.5rem', marginBottom:'2.5rem', textAlign:'center',
            fontSize:'1rem', fontWeight:600,
          }}>{bebidas.promo}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'2rem', justifyContent:'center' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} style={{
                padding:'.4rem 1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
                background: activeCat === c ? CAT_COLORS[c] || '#ef4444' : 'var(--card2)',
                color: activeCat === c ? '#fff' : 'var(--fg-muted)',
                border: activeCat === c ? 'none' : '1px solid var(--border)',
                cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:'1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{
                background:'var(--card)', border:`1px solid ${color}22`,
                borderRadius:'var(--radius)', padding:'1.25rem', transition:'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=color+'55'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}22` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=color+'22'; e.currentTarget.style.boxShadow='' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.5rem' }}>
                  <span style={{ fontWeight:700, fontSize:'.95rem', flex:1 }}>{item.name}</span>
                  <span style={{ fontSize:'.75rem', color:'var(--fg-muted)', marginLeft:'.5rem', whiteSpace:'nowrap' }}>{item.vol}</span>
                </div>
                <div style={{ display:'flex', gap:'1.5rem', marginTop:'.5rem' }}>
                  {item.botella != null && (
                    <div>
                      <div style={{ fontSize:'.65rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.05em' }}>
                        {['Coctelería','Cerveza','Refrescos','Snacks'].includes(item.cat) ? 'Precio' : 'Botella'}
                      </div>
                      <div style={{ fontSize:'1.1rem', fontWeight:800, color }}>{fmt(item.botella)}</div>
                    </div>
                  )}
                  {item.copa != null && (
                    <div>
                      <div style={{ fontSize:'.65rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.05em' }}>Copa</div>
                      <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--primary)' }}>{fmt(item.copa)}</div>
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

  return (
    <>
      <Hero cms={cms} />
      <Musica cms={cms} />
      <BebidasReal />
      <Alimentos cms={cms} />
      <Eventos cms={cms} />
      <Reservas cms={cms} />
    </>
  )
}
