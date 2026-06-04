import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero            || {}
  const pe = cms.porqueElegirnos || {}
  const ho = cms.horario         || {}
  const r  = cms.reservas        || {}

  function goTo(path) { navigate(path); window.scrollTo(0,0) }
  function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

  const waUrl = `https://wa.me/${r.wa}?text=${encodeURIComponent(r.waMsg || '')}`

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.75)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.12) 0%, transparent 65%)' }} />
        </div>
        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.1rem' }}>
          <img src={h.logo} alt={h.title} className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.25rem', objectFit:'cover' }} />
          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.8rem,8vw,5rem)', fontWeight:900, letterSpacing:'-.03em', lineHeight:1.05 }}>
            {h.title}
          </h1>
          <p style={{ fontSize:'clamp(1rem,2.2vw,1.15rem)', color:'rgba(242,242,242,.88)', lineHeight:1.65, maxWidth:'38rem' }}>
            "{h.subtitle}"
          </p>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.85rem', marginTop:'.5rem', width:'100%', maxWidth:'22rem' }}>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={() => goTo('/alimentos')}>
              📋 {h.btn1}
            </button>
            <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center' }} onClick={() => goTo('/carta-bebidas')}>
              🍹 {h.btn2}
            </button>
            <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center', borderColor:'rgba(168,85,247,.5)' }} onClick={() => scrollTo('reservas')}>
              📅 {h.btn3}
            </button>
          </div>
          <div style={{ marginTop:'.5rem', padding:'.5rem 1.4rem', borderRadius:'999px',
            background:'rgba(0,0,0,.45)', border:'1px solid rgba(255,255,255,.15)',
            fontSize:'.85rem', color:'rgba(242,242,242,.8)', backdropFilter:'blur(8px)' }}>
            🕐 {h.horario}
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ ELEGIRNOS? ── */}
      <section style={{ padding:'4rem 0', background:'rgba(255,255,255,.02)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="section-title gradient-text" style={{ marginBottom:'1rem' }}>{pe.titulo}</h2>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', marginBottom:'2.5rem' }}>{pe.subtitulo}</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem', marginBottom:'3rem' }}>
            {(pe.pills || []).map((p, i) => (
              <div key={i} style={{
                padding:'.6rem 1.5rem', borderRadius:'999px',
                background:'linear-gradient(135deg,rgba(239,68,68,.15),rgba(168,85,247,.15))',
                border:'1px solid rgba(239,68,68,.3)',
                fontSize:'1rem', fontWeight:700, display:'flex', alignItems:'center', gap:'.5rem',
              }}>{p.icon} {p.label}</div>
            ))}
          </div>
          {pe.musica && (
            <div style={{ maxWidth:'36rem', margin:'0 auto', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem' }}>
              <h3 style={{ fontSize:'1.3rem', fontWeight:800, marginBottom:'.75rem' }}>{pe.musica.titulo}</h3>
              <p style={{ color:'var(--fg-muted)', lineHeight:1.7 }}>
                {pe.musica.texto.split(pe.musica.destacado).map((part, i, arr) => (
                  i < arr.length - 1
                    ? <span key={i}>{part}<strong style={{ color:'var(--fg)' }}>{pe.musica.destacado}</strong></span>
                    : <span key={i}>{part.split(pe.musica.gratis).map((p2, j, arr2) =>
                        j < arr2.length - 1
                          ? <span key={j}>{p2}<strong style={{ color:'var(--primary)' }}>{pe.musica.gratis}</strong></span>
                          : <span key={j}>{p2}</span>
                      )}</span>
                ))}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── HORARIO ── */}
      <section style={{ padding:'3.5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            <div style={{ background:'var(--card)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'var(--radius)', padding:'2rem' }}>
              <h3 style={{ fontSize:'1.2rem', fontWeight:800, marginBottom:'1rem', color:'var(--primary)' }}>{ho.titulo}</h3>
              <p style={{ color:'var(--fg)', fontWeight:600, fontSize:'1.05rem', marginBottom:'.4rem' }}>{ho.horas}</p>
              <p style={{ color:'var(--fg-muted)', marginBottom:'.25rem' }}>{ho.dias}</p>
              <p style={{ color:'rgba(239,68,68,.8)', fontWeight:600 }}>{ho.descanso}</p>
            </div>
            <div style={{ borderRadius:'var(--radius)', overflow:'hidden', minHeight:'200px' }}>
              <img src={ho.fotoUrl} alt="Barra" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:'200px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVAS ── */}
      <section id="reservas" style={{ padding:'4rem 0', background:'radial-gradient(ellipse at center, rgba(168,85,247,.08) 0%, transparent 65%)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="section-title gradient-text" style={{ marginBottom:'1rem' }}>{r.titulo}</h2>
          <p style={{ color:'var(--fg-muted)', marginBottom:'2rem', maxWidth:'36rem', margin:'0 auto 2rem' }}>{r.subtitulo}</p>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', maxHeight:'350px', marginBottom:'2.5rem' }}>
            <img src={r.fotoUrl} alt="Cabinas" style={{ width:'100%', height:'350px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ fontSize:'1.05rem', padding:'.9rem 2.5rem', textDecoration:'none' }}>
            📲 {r.btnTexto}
          </a>
          <p style={{ marginTop:'1rem', color:'var(--fg-muted)', fontSize:'.85rem' }}>
            📞 <a href={`tel:${r.telefono}`} style={{ color:'var(--primary)' }}>{r.telefono}</a>
          </p>
        </div>
      </section>
    </>
  )
}
