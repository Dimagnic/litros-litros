import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

// Las imágenes de la galería vienen del CMS (se pasan como prop)

function Galeria({ imgs, titulo, subtitulo }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef(null)
  const total = imgs.length

  const goTo = useCallback((idx) => {
    if (transitioning) return
    setTransitioning(true)
    setCurrent((idx + total) % total)
    setTimeout(() => setTransitioning(false), 500)
  }, [total, transitioning])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [paused, total])

  return (
    <section style={{ padding:'4rem 0', overflow:'hidden' }}>
      <div className="container" style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h2 className="section-title">{titulo || 'GALERÍA'}</h2>
        <div className="section-accent" style={{ margin:'0 auto .75rem' }} />
        <p style={{ color:'var(--fg-dim)', fontSize:'1rem', maxWidth:'36rem', margin:'0 auto' }}>
          {subtitulo || 'Vive la experiencia — noches únicas, música en vivo y momentos que no olvidarás'}
        </p>
      </div>

      {/* Carrusel */}
      <div
        style={{ position:'relative', maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Imagen principal — contain para mostrar completa sin recortar */}
        <div style={{
          position:'relative', borderRadius:'var(--radius-lg)', overflow:'hidden',
          background:'rgba(10,15,25,.95)',
          height:'clamp(220px, 42vh, 520px)',
        }}>
          {imgs.map((src, i) => (
            <img key={i} src={src} alt={`Galería ${i+1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position:'absolute', inset:0, width:'100%', height:'100%',
                objectFit:'cover',
                objectPosition:'center',
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'scale(1)' : 'scale(1.02)',
                transition:'opacity .5s ease, transform .5s ease',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            />
          ))}

          {/* Flecha izquierda */}
          <button onClick={prev} style={{
            position:'absolute', left:'.75rem', top:'50%', transform:'translateY(-50%)',
            zIndex:10, background:'rgba(0,0,0,.55)', border:'1px solid rgba(255,255,255,.2)',
            color:'#fff', borderRadius:'50%', width:'2.75rem', height:'2.75rem',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:'1.3rem', transition:'all .2s', backdropFilter:'blur(6px)',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(41,90,158,.8)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,.55)'}
          >‹</button>

          {/* Flecha derecha */}
          <button onClick={next} style={{
            position:'absolute', right:'.75rem', top:'50%', transform:'translateY(-50%)',
            zIndex:10, background:'rgba(0,0,0,.55)', border:'1px solid rgba(255,255,255,.2)',
            color:'#fff', borderRadius:'50%', width:'2.75rem', height:'2.75rem',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:'1.3rem', transition:'all .2s', backdropFilter:'blur(6px)',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(41,90,158,.8)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,.55)'}
          >›</button>

          {/* Contador */}
          <div style={{
            position:'absolute', bottom:'.75rem', right:'.85rem', zIndex:10,
            background:'rgba(0,0,0,.55)', borderRadius:'999px', padding:'.2rem .75rem',
            fontSize:'.72rem', color:'rgba(255,255,255,.8)', backdropFilter:'blur(4px)',
          }}>{current + 1} / {imgs.length}</div>

          {/* Overlay pausa */}
          {paused && (
            <div style={{
              position:'absolute', top:'.75rem', right:'.85rem', zIndex:10,
              background:'rgba(0,0,0,.55)', borderRadius:'999px', padding:'.2rem .7rem',
              fontSize:'.72rem', color:'rgba(255,255,255,.7)', backdropFilter:'blur(4px)',
            }}>⏸ Pausado</div>
          )}
        </div>

        {/* Dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:'.5rem', marginTop:'1.25rem' }}>
          {imgs.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? '1.75rem' : '.55rem',
              height:'.55rem', borderRadius:'999px', border:'none', cursor:'pointer',
              background: i === current ? 'var(--primary)' : 'var(--border)',
              transition:'all .35s ease', padding:0,
            }} />
          ))}
        </div>

        {/* Miniaturas */}
        <div style={{ display:'flex', gap:'.5rem', marginTop:'1rem', overflowX:'auto', scrollbarWidth:'none', padding:'.25rem 0', justifyContent:'center', flexWrap:'wrap' }}>
          {imgs.map((src, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              flexShrink:0, width:'5.5rem', height:'3.75rem', borderRadius:'.5rem',
              overflow:'hidden',
              border:`2px solid ${i === current ? 'var(--primary)' : 'rgba(41,90,158,.2)'}`,
              cursor:'pointer', padding:0, transition:'border-color .3s',
              background:'rgba(10,15,25,.9)',
            }}>
              <img src={src} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero    || {}
  const ho = cms.horario || {}

  function go(path) { navigate(path); window.scrollTo(0,0) }
  function scrollToGaleria() {
    document.getElementById('galeria')?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden', padding:'2rem 0' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg || `${BASE}/1.jpeg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,.78)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 30%, rgba(41,90,158,.18) 0%, transparent 65%)' }} />
        </div>

        <div className="animate-fade-up" style={{ position:'relative', zIndex:2, maxWidth:'44rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.1rem', objectFit:'cover' }} />
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-hero)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', lineHeight:'var(--lh-tight)', color:'#fff' }}>
            Litros & Litros
          </h1>
          <p style={{ fontSize:'clamp(1rem,2.2vw,1.15rem)', color:'rgba(234,234,234,.9)', lineHeight:1.75, maxWidth:'34rem',
            borderLeft:'3px solid var(--primary)', paddingLeft:'1.1rem', textAlign:'left',
            background:'rgba(17,24,39,.5)', borderRadius:'0 .5rem .5rem 0', padding:'.9rem 1.1rem' }}>
            "{h.frase || 'EL LUGAR DONDE SE OYE LA MÚSICA, EL SERVICIO Y LAS AMISTADES PARA PASAR UN EXCELENTE MOMENTO'}"
          </p>

          {/* 4 botones — Galería entre Ver Carta y Reservar */}
          <div style={{ display:'flex', flexDirection:'column', gap:'.85rem', width:'100%', maxWidth:'min(22rem, 90vw)' }}>
            <button className="btn btn-primary" onClick={() => go('/menu-promo')}>
              🎉 {h.btn1 || 'VER MENÚ PROMO'}
            </button>
            <button className="btn btn-outline" onClick={() => go('/carta')}>
              🍹 {h.btn2 || 'VER CARTA'}
            </button>
            <button className="btn btn-outline" onClick={scrollToGaleria}>
              📷 GALERÍA
            </button>
            <button className="btn btn-outline" onClick={() => go('/reserva')}>
              📅 {h.btn3 || 'RESERVAR'}
            </button>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap', justifyContent:'center' }}>
            <button onClick={() => go('/alimentos')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(234,234,234,.6)', fontSize:'.9rem', fontFamily:'var(--font-body)', transition:'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--primary-l)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(234,234,234,.6)'}
            >◄ Carta de Alimentos</button>
            <span style={{ color:'rgba(255,255,255,.2)', fontSize:'.8rem' }}>|</span>
            <button onClick={() => go('/carta')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(234,234,234,.6)', fontSize:'.9rem', fontFamily:'var(--font-body)', transition:'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--primary-l)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(234,234,234,.6)'}
            >Carta de Bebidas ►</button>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <div id="galeria">
        <Galeria imgs={cms.galeria?.imagenes || []} titulo={cms.galeria?.titulo} subtitulo={cms.galeria?.subtitulo} />
      </div>

      {/* ── HORARIO ── */}
      <section style={{ padding:'3.5rem 0', background:'rgba(13,21,32,.8)' }}>
        <div className="container">
          <div style={{ maxWidth:'580px', margin:'0 auto', border:'1px solid rgba(41,90,158,.35)', borderRadius:'var(--radius-lg)', padding:'2.5rem', background:'rgba(26,37,55,.6)', textAlign:'center' }}>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h3)', fontWeight:'var(--fw-black)', color:'var(--primary-l)', letterSpacing:'var(--ls-wider)', marginBottom:'1.5rem', textTransform:'uppercase' }}>
              HORARIO
            </h2>
            <p style={{ fontSize:'1.3rem', fontWeight:700, color:'#fff', marginBottom:'.65rem' }}>
              {ho.horas || 'De 6:00 PM a 3:00 AM'}
            </p>
            <p style={{ fontSize:'1rem', color:'rgba(41,158,100,.85)', fontWeight:600, marginBottom:'.5rem' }}>
              {ho.descanso || 'Lunes Descansamos'}
            </p>
            <p style={{ fontSize:'.95rem', color:'rgba(234,234,234,.6)' }}>
              🎶 {ho.dias || 'Karaoke todos los demás días'}
            </p>
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ ELEGIRNOS? ── */}
      <section style={{ padding:'4rem 0' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="t-section-title" style={{ marginBottom:'.5rem' }}>¿POR QUÉ ELEGIRNOS?</h2>
          <div className="section-accent" style={{ margin:'0 auto .75rem' }} />
          <p style={{ color:'var(--fg-dim)', fontSize:'var(--text-body)', marginBottom:'2.5rem' }}>
            Somos un lugar seguro y amigable con experiencia.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'1rem', maxWidth:'640px', margin:'0 auto 2rem' }}>
            {[
              { icon:'🎵', label:'MÚSICA' },
              { icon:'🎭', label:'SHOWS'  },
              { icon:'🏠', label:'CABINA' },
            ].map((s, i) => (
              <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'1.75rem 1rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'.65rem', transition:'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(41,90,158,.6)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(41,90,158,.2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                <span style={{ fontSize:'2rem' }}>{s.icon}</span>
                <span style={{ fontWeight:800, fontSize:'.9rem', color:'#fff', letterSpacing:'.04em' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ maxWidth:'36rem', margin:'0 auto', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'1.5rem' }}>
            <p style={{ color:'rgba(234,234,234,.75)', lineHeight:1.75 }}>
              Todos los géneros.<br/>
              Puedes pedir hasta <strong style={{ color:'#fff' }}>3 canciones</strong> sin costo adicional.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
