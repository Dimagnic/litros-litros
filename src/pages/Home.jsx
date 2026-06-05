import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero    || {}
  const ho = cms.horario || {}

  function go(path) { navigate(path); window.scrollTo(0,0) }

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

          {/* Logo grande */}
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.1rem', objectFit:'cover' }} />

          {/* Título */}
          <h1 style={{ fontSize:'clamp(2.5rem,7vw,4.5rem)', fontWeight:900, color:'#fff', letterSpacing:'-.02em', lineHeight:1.05 }}>
            Litros & Litros
          </h1>

          {/* Frase */}
          <p style={{ fontSize:'clamp(1rem,2.2vw,1.15rem)', color:'rgba(234,234,234,.9)', lineHeight:1.75, maxWidth:'34rem',
            borderLeft:'3px solid var(--primary)', paddingLeft:'1.1rem', textAlign:'left',
            background:'rgba(17,24,39,.5)', borderRadius:'0 .5rem .5rem 0', padding:'.9rem 1.1rem' }}>
            "{h.frase || 'EL LUGAR DONDE SE OYE LA MÚSICA, EL SERVICIO Y LAS AMISTADES PARA PASAR UN EXCELENTE MOMENTO'}"
          </p>

          {/* 3 botones apilados */}
          <div style={{ display:'flex', flexDirection:'column', gap:'.85rem', width:'100%', maxWidth:'22rem' }}>
            <button className="btn btn-primary" onClick={() => go('/menu-promo')}>VER MENÚ PROMO</button>
            <button className="btn btn-outline" onClick={() => go('/carta')}>VER CARTA</button>
            <button className="btn btn-outline" onClick={() => go('/reserva')}>RESERVAR</button>
          </div>

          {/* Accesos directos en línea */}
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

      {/* ── HORARIO ── */}
      <section style={{ padding:'3.5rem 0', background:'rgba(13,21,32,.8)' }}>
        <div className="container">
          <div style={{ maxWidth:'580px', margin:'0 auto', border:'1px solid rgba(41,90,158,.35)', borderRadius:'var(--radius-lg)', padding:'2.5rem', background:'rgba(26,37,55,.6)', textAlign:'center' }}>
            <h2 style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--primary-l)', letterSpacing:'.08em', marginBottom:'1.5rem', textTransform:'uppercase' }}>
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
          <h2 className="section-title" style={{ marginBottom:'.5rem' }}>¿POR QUÉ ELEGIRNOS?</h2>
          <div className="section-accent" style={{ margin:'0 auto .75rem' }} />
          <p style={{ color:'rgba(234,234,234,.65)', fontSize:'1rem', marginBottom:'2.5rem' }}>
            Somos un lugar seguro y amigable con experiencia.
          </p>

          {/* 3 bloques */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem', maxWidth:'640px', margin:'0 auto 2rem' }}>
            {[
              { icon:'🎵', label:'MÚSICA'  },
              { icon:'🎭', label:'SHOWS'   },
              { icon:'🏠', label:'CABINA'  },
            ].map((s, i) => (
              <div key={i} style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius-lg)', padding:'1.75rem 1rem',
                display:'flex', flexDirection:'column', alignItems:'center', gap:'.65rem',
                transition:'all .3s',
              }}
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
