import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images'

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
    <section className="particles neon-section" style={{ padding:'4rem 0', overflow:'hidden', background:'#130a18', borderTop:'1px solid rgba(180,30,10,.12)', borderBottom:'1px solid rgba(180,30,10,.12)', position:'relative' }}>
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
          background:'rgba(8,3,12,.95)',
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
            onMouseEnter={e => e.currentTarget.style.background='rgba(180,30,10,.8)'}
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
            onMouseEnter={e => e.currentTarget.style.background='rgba(180,30,10,.8)'}
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
              border:`2px solid ${i === current ? 'var(--primary)' : 'rgba(180,30,10,.2)'}`,
              cursor:'pointer', padding:0, transition:'border-color .3s',
              background:'rgba(8,3,12,.9)',
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
      <section style={{ height:'calc(100dvh - 80px)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg || `${BASE}/1.jpeg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'saturate(1.4) contrast(1.1) brightness(0.75)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(160,50,0,.5) 0%, rgba(100,20,0,.4) 35%, rgba(8,4,25,.88) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 65%, rgba(15,50,160,.5) 0%, rgba(8,25,90,.25) 40%, transparent 65%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 25%, rgba(200,80,10,.35) 0%, transparent 50%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 15% 85%, rgba(180,50,0,.2) 0%, transparent 35%), radial-gradient(ellipse at 85% 85%, rgba(140,10,70,.15) 0%, transparent 35%)' }} />
        </div>

        <div className="animate-fade-up" style={{ position:'relative', zIndex:2, width:'100%', maxWidth:'480px', padding:'clamp(1.5rem, 4vh, 2.5rem) 1.5rem clamp(2rem, 5vh, 3.5rem)', display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(.75rem, 2vh, 1.25rem)' }}>

          {/* Logo grande y redondo con anillo neón */}
          <div style={{ position:'relative', marginTop:'clamp(1rem, 3vh, 2rem)' }}>
            {/* Anillo neón exterior */}
            <div style={{
              position:'absolute', inset:'-12px',
              borderRadius:'50%',
              border:'3px solid transparent',
              background:'linear-gradient(135deg, #ff4500, #ff8c00, #ff4500) border-box',
              WebkitMask:'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite:'destination-out',
              boxShadow:'0 0 25px rgba(255,80,0,.7), 0 0 50px rgba(255,60,0,.4), inset 0 0 25px rgba(255,80,0,.1)',
              animation:'ringPulse 2.5s ease-in-out infinite',
            }} />
            {/* Halo de brillo */}
            <div style={{ position:'absolute', inset:'-20px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,80,0,.15) 0%, transparent 70%)', animation:'ringPulse 2.5s ease-in-out infinite' }} />
            <img src={h.logo} alt="Litros & Litros"
              style={{ width:'clamp(7rem, 18vw, 9rem)', height:'clamp(7rem, 18vw, 9rem)', borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,80,0,.6)', boxShadow:'0 0 30px rgba(255,60,0,.5), 0 0 60px rgba(200,40,0,.3)', position:'relative', zIndex:1 }} />
          </div>

          {/* Título */}
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2.2rem, 7vw, 3.5rem)', fontWeight:900, letterSpacing:'-.02em', lineHeight:1.05, color:'#fff', textShadow:'0 0 20px rgba(255,80,0,.5), 0 2px 8px rgba(0,0,0,.8)', marginTop:'.25rem' }}>
            Litros & Litros
          </h1>

          {/* Párrafo centrado */}
          <p style={{
            fontSize:'clamp(.85rem, 2vw, 1rem)', color:'rgba(255,255,255,.88)',
            lineHeight:1.8, textAlign:'center', maxWidth:'36rem',
            background:'rgba(0,0,0,.45)', backdropFilter:'blur(8px)',
            borderRadius:'.75rem', padding:'.9rem 1.25rem',
            border:'1px solid rgba(255,80,0,.2)',
            textShadow:'0 1px 3px rgba(0,0,0,.8)',
          }}>
            "{h.frase || 'EL LUGAR DONDE SE OYE LA MÚSICA, EL SERVICIO Y LAS AMISTADES PARA PASAR UN EXCELENTE MOMENTO'}"
          </p>

          {/* Botones */}
          <div style={{ display:'flex', flexDirection:'column', gap:'.75rem', width:'100%', maxWidth:'min(24rem, 92vw)', marginTop:'.25rem' }}>
            <button className="btn btn-primary" onClick={() => go('/menu-promo')} style={{ borderRadius:'999px', fontSize:'clamp(.88rem,2vw,1rem)', fontWeight:800, letterSpacing:'.04em' }}>
              🎉 {h.btn1 || 'VER MENÚ PROMO'}
            </button>
            <button className="btn btn-outline" onClick={() => go('/carta')} style={{ borderRadius:'999px', fontSize:'clamp(.88rem,2vw,1rem)', fontWeight:700 }}>
              🍹 {h.btn2 || 'VER CARTA'}
            </button>
            <button className="btn btn-outline" onClick={scrollToGaleria} style={{ borderRadius:'999px', fontSize:'clamp(.88rem,2vw,1rem)', fontWeight:700 }}>
              📷 GALERÍA
            </button>
            <button className="btn btn-outline" onClick={() => go('/reserva')} style={{ borderRadius:'999px', fontSize:'clamp(.88rem,2vw,1rem)', fontWeight:700 }}>
              📅 {h.btn3 || 'RESERVAR'}
            </button>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <div id="galeria">
        <Galeria imgs={cms.galeria?.imagenes || []} titulo={cms.galeria?.titulo} subtitulo={cms.galeria?.subtitulo} />
      </div>

      {/* ── HORARIO ── */}
      <section className="halo-bg neon-section" style={{ padding:'3.5rem 0', background:'linear-gradient(135deg, #0a0612, #120616, #0a0612)', borderTop:'1px solid rgba(140,20,8,.3)', borderBottom:'1px solid rgba(140,20,8,.3)', position:'relative' }}>
        <div className="container">
          <div style={{ maxWidth:'580px', margin:'0 auto', border:'1px solid rgba(180,30,10,.35)', borderRadius:'var(--radius-lg)', padding:'2.5rem', background:'rgba(26,37,55,.6)', textAlign:'center' }}>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h3)', fontWeight:'var(--fw-black)', color:'#e84030', letterSpacing:'var(--ls-wider)', marginBottom:'1.5rem', textTransform:'uppercase', textShadow:'0 0 15px rgba(220,80,20,.5)' }}>
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
      <section className="particles halo-bg" style={{ padding:'4rem 0', background:'linear-gradient(180deg, #0d0810, #130a18)', borderTop:'1px solid rgba(180,30,10,.12)', position:'relative' }}>
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
              <div key={i} style={{ background:'linear-gradient(135deg, #160d1a, #1e1025)', border:'1px solid rgba(180,40,20,.2)', borderRadius:'var(--radius-lg)', padding:'1.75rem 1rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'.65rem', transition:'all .3s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(180,30,10,.6)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(180,30,10,.2)' }}
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
