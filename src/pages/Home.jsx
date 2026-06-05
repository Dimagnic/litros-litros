import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

function SectionTitle({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.75rem', paddingBottom:'.75rem', borderBottom:'1px solid rgba(239,68,68,.2)' }}>
      <div style={{ width:'4px', height:'2rem', background:'linear-gradient(to bottom,#ef4444,#a855f7)', borderRadius:'2px', flexShrink:0 }}/>
      <h2 style={{ fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:800, fontFamily:'var(--font-head)' }}>{children}</h2>
    </div>
  )
}

function ItemCard({ icon, title, desc, onClick, img }) {
  return (
    <button onClick={onClick} style={{
      background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)',
      overflow:'hidden', cursor:'pointer', textAlign:'left', width:'100%',
      transition:'all .25s', display:'flex', flexDirection:'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(239,68,68,.4)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(239,68,68,.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='' }}
    >
      {img && (
        <div style={{ height:'160px', overflow:'hidden', flexShrink:0 }}>
          <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        </div>
      )}
      <div style={{ padding:'1.25rem', flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
            <span style={{ fontSize:'1.5rem' }}>{icon}</span>
            <span style={{ fontWeight:700, fontSize:'1rem', fontFamily:'var(--font-head)' }}>{title}</span>
          </div>
          <span style={{ color:'var(--primary)', fontSize:'1.2rem' }}>›</span>
        </div>
        {desc && <p style={{ color:'var(--fg-muted)', fontSize:'.85rem', marginTop:'.5rem', lineHeight:1.5 }}>{desc}</p>}
      </div>
    </button>
  )
}

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero      || {}
  const hc = cms.homeCards || {}

  function go(path) { navigate(path); window.scrollTo(0,0) }

  const alimentos   = hc.alimentos   || []
  const hamburguesa = hc.hamburguesa || {}
  const espect      = hc.espectaculos || []
  const cumple      = hc.cumpleanos  || {}

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.72)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.12) 0%, transparent 65%)' }} />
        </div>
        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
          <img src={h.logo} alt={h.title} className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.25rem', objectFit:'cover' }} />
          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.5rem,7vw,4.5rem)', fontWeight:900, letterSpacing:'-.03em', lineHeight:1.05 }}>
            {h.title}
          </h1>
          <div style={{ fontSize:'.9rem', fontWeight:600, color:'rgba(242,242,242,.6)', letterSpacing:'.05em', textTransform:'uppercase' }}>
            {h.subtitle}
          </div>
          <p style={{ fontSize:'clamp(.95rem,2vw,1.1rem)', color:'rgba(242,242,242,.88)', lineHeight:1.7, maxWidth:'36rem', fontStyle:'italic', borderLeft:'3px solid rgba(239,68,68,.5)', paddingLeft:'1rem', textAlign:'left' }}>
            "{h.frase || h.subtitle}"
          </p>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'stretch', gap:'.85rem', width:'100%', maxWidth:'22rem', marginTop:'.5rem' }}>
            <button className="btn btn-primary" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/menu-promo')}>
              📋 {h.btn1}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/carta')}>
              🍹 {h.btn2}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem', borderColor:'rgba(168,85,247,.5)' }} onClick={() => go('/reserva')}>
              📅 {h.btn3}
            </button>
          </div>
          <div style={{ padding:'.5rem 1.4rem', borderRadius:'999px', background:'rgba(0,0,0,.45)', border:'1px solid rgba(255,255,255,.15)', fontSize:'.85rem', color:'rgba(242,242,242,.8)', backdropFilter:'blur(8px)' }}>
            🕐 {h.horario}
          </div>
        </div>
      </section>

      {/* ── ALIMENTOS ── */}
      <section style={{ padding:'4rem 0', background:'rgba(255,255,255,.015)' }}>
        <div className="container">
          <SectionTitle>🍔 Alimentos</SectionTitle>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.25rem' }}>
            {alimentos.map(p => (
              <ItemCard key={p.id} icon={p.icon} title={p.title} desc={p.desc} img={p.img} onClick={() => go(`/alimento/${p.id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HAMBURGUESA ── */}
      <section style={{ padding:'2rem 0 4rem' }}>
        <div className="container">
          <SectionTitle>🍔 Hamburguesa</SectionTitle>
          <div style={{ maxWidth:'480px' }}>
            {hamburguesa.id && (
              <ItemCard icon={hamburguesa.icon} title={hamburguesa.title} desc={hamburguesa.desc} img={hamburguesa.img} onClick={() => go(`/alimento/${hamburguesa.id}`)} />
            )}
          </div>
        </div>
      </section>

      {/* ── ESPECTÁCULOS ── */}
      <section style={{ padding:'2rem 0 4rem', background:'rgba(255,255,255,.015)' }}>
        <div className="container">
          <SectionTitle>🎭 Espectáculos</SectionTitle>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.25rem' }}>
            {espect.map(e => (
              <ItemCard key={e.id} icon={e.icon} title={e.title} desc={e.desc} img={e.img} onClick={() => go(`/evento/${e.id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CUMPLEAÑOS ── */}
      <section style={{ padding:'2rem 0 5rem' }}>
        <div className="container">
          <SectionTitle>🎂 Especial Cumpleaños</SectionTitle>
          <div style={{ maxWidth:'480px' }}>
            {cumple.id && (
              <ItemCard icon={cumple.icon} title={cumple.title} desc={cumple.desc} img={cumple.img} onClick={() => go(`/evento/${cumple.id}`)} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
