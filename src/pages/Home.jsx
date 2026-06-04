import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h = cms.hero || {}

  function goTo(path) { navigate(path); window.scrollTo(0,0) }
  function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        {/* Fondo foto real */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={`${BASE}/1.jpeg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.75)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.12) 0%, transparent 65%)' }} />
        </div>

        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.1rem' }}>
          {/* Logo */}
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.25rem', objectFit:'cover' }} />

          {/* Título */}
          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.8rem,8vw,5rem)', fontWeight:900, letterSpacing:'-.03em', lineHeight:1.05 }}>
            Litros & Litros
          </h1>

          {/* Eslogan */}
          <p style={{ fontSize:'clamp(1rem,2.2vw,1.15rem)', color:'rgba(242,242,242,.88)', lineHeight:1.65, maxWidth:'38rem' }}>
            "{h.subtitle}"
          </p>

          {/* 3 botones — como en el borrador: apilados centro */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.85rem', marginTop:'.5rem', width:'100%', maxWidth:'22rem' }}>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:'1rem' }}
              onClick={() => goTo('/alimentos')}>
              📋 Ver Menú Promo
            </button>
            <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center', fontSize:'1rem' }}
              onClick={() => goTo('/carta-bebidas')}>
              🍹 Ver Carta
            </button>
            <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center', fontSize:'1rem', borderColor:'rgba(168,85,247,.5)', color:'rgba(242,242,242,.9)' }}
              onClick={() => scrollTo('reservas')}>
              📅 Reservar
            </button>
          </div>

          {/* Horario pill */}
          <div style={{ marginTop:'.5rem', padding:'.5rem 1.4rem', borderRadius:'999px',
            background:'rgba(0,0,0,.45)', border:'1px solid rgba(255,255,255,.15)',
            fontSize:'.85rem', color:'rgba(242,242,242,.8)', backdropFilter:'blur(8px)' }}>
            🕐 Mar – Dom &nbsp;|&nbsp; 6:00 PM – 3:00 AM &nbsp;|&nbsp; Lunes Descansamos
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ ELEGIRNOS? ── */}
      <section style={{ padding:'4rem 0', background:'rgba(255,255,255,.02)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="section-title gradient-text" style={{ marginBottom:'1rem' }}>¿Por qué elegirnos?</h2>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', marginBottom:'2.5rem' }}>
            Somos un lugar seguro y amigable con experiencia
          </p>

          {/* Pills — como en el borrador */}
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem', marginBottom:'3rem' }}>
            {[
              { icon:'🎵', label:'Música' },
              { icon:'🍺', label:'Buena Vibra' },
              { icon:'🎤', label:'Karaoke' },
            ].map((p, i) => (
              <div key={i} style={{
                padding:'.6rem 1.5rem', borderRadius:'999px',
                background:'linear-gradient(135deg,rgba(239,68,68,.15),rgba(168,85,247,.15))',
                border:'1px solid rgba(239,68,68,.3)',
                fontSize:'1rem', fontWeight:700, display:'flex', alignItems:'center', gap:'.5rem',
              }}>{p.icon} {p.label}</div>
            ))}
          </div>

          {/* Música info */}
          <div style={{ maxWidth:'36rem', margin:'0 auto', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem' }}>
            <h3 style={{ fontSize:'1.3rem', fontWeight:800, marginBottom:'.75rem' }}>🎶 Música</h3>
            <p style={{ color:'var(--fg-muted)', lineHeight:1.7 }}>
              Todos los géneros disponibles.<br/>
              Puedes pedir <strong style={{ color:'var(--fg)' }}>3 canciones que más te gusten</strong> y las ponemos <strong style={{ color:'var(--primary)' }}>sin costo</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── HORARIO ── */}
      <section style={{ padding:'3.5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {/* Horario */}
            <div style={{ background:'var(--card)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'var(--radius)', padding:'2rem' }}>
              <h3 style={{ fontSize:'1.2rem', fontWeight:800, marginBottom:'1rem', color:'var(--primary)' }}>🕐 Horario</h3>
              <p style={{ color:'var(--fg)', fontWeight:600, fontSize:'1.05rem', marginBottom:'.4rem' }}>6:00 PM – 3:00 AM</p>
              <p style={{ color:'var(--fg-muted)', marginBottom:'.25rem' }}>Martes a Domingo — Karaoke todos los días</p>
              <p style={{ color:'rgba(239,68,68,.8)', fontWeight:600 }}>Lunes Descansamos</p>
            </div>
            {/* Foto barra */}
            <div style={{ borderRadius:'var(--radius)', overflow:'hidden', minHeight:'200px' }}>
              <img src={`${BASE}/5.jpeg`} alt="Barra" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:'200px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVAS (anchor) ── */}
      <section id="reservas" style={{ padding:'4rem 0', background:'radial-gradient(ellipse at center, rgba(168,85,247,.08) 0%, transparent 65%)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="section-title gradient-text" style={{ marginBottom:'1rem' }}>Cabinas Privadas</h2>
          <p style={{ color:'var(--fg-muted)', marginBottom:'2rem', maxWidth:'36rem', margin:'0 auto 2rem' }}>
            Reserva tu espacio privado para grupos, cumpleaños o eventos especiales
          </p>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', maxHeight:'350px', marginBottom:'2.5rem' }}>
            <img src={`${BASE}/2.jpeg`} alt="Cabinas" style={{ width:'100%', height:'350px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <a href={`https://wa.me/522224302693?text=${encodeURIComponent('Hola, quiero hacer una reservación en Litros & Litros')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ fontSize:'1.05rem', padding:'.9rem 2.5rem', textDecoration:'none' }}>
            📲 Reservar por WhatsApp
          </a>
          <p style={{ marginTop:'1rem', color:'var(--fg-muted)', fontSize:'.85rem' }}>
            📞 <a href="tel:+522224302693" style={{ color:'var(--primary)' }}>+52 222 430 2693</a>
          </p>
        </div>
      </section>
    </>
  )
}
