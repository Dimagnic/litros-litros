import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

const SERVICIOS = [
  { icon:'🍹', label:'CALIDAD DE\nBEBIDAS'         },
  { icon:'🎙️', label:'CABINA\nPRIVADA'            },
  { icon:'🎵', label:'MÚSICA'                      },
  { icon:'🎤', label:'SHOWS\nPRIVADOS'             },
  { icon:'🎂', label:'FIESTAS Y\nCUMPLEAÑOS'       },
]

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero            || {}
  const ho = cms.horario         || {}

  function go(path) { navigate(path); window.scrollTo(0,0) }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg || `${BASE}/1.jpeg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.72)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.12) 0%, transparent 65%)' }} />
        </div>

        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.1rem' }}>
          {/* Logo */}
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'9rem', height:'9rem', borderRadius:'1.25rem', objectFit:'cover' }} />

          {/* Título */}
          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.2rem,6vw,4rem)', fontWeight:900, letterSpacing:'-.02em', lineHeight:1.08 }}>
            {h.title || 'Litros & Litros'}
          </h1>

          {/* Frase destacada */}
          <div style={{
            background:'rgba(0,0,0,.45)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(239,68,68,.3)', borderRadius:'var(--radius)',
            padding:'1.1rem 1.4rem', maxWidth:'38rem',
          }}>
            <p style={{ fontSize:'clamp(.95rem,2vw,1.1rem)', color:'rgba(242,242,242,.95)', lineHeight:1.7, fontStyle:'italic', margin:0 }}>
              🎤 {h.frase || 'EL LUGAR DONDE SE OYE LA MÚSICA, EL SERVICIO Y LAS AMISTADES PARA PASAR UN EXCELENTE MOMENTO'}
            </p>
          </div>

          {/* 3 botones apilados */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'stretch', gap:'.75rem', width:'100%', maxWidth:'22rem' }}>
            <button className="btn btn-primary" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/menu-promo')}>
              {h.btn1 || 'VER MENÚ PROMO'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/carta')}>
              {h.btn2 || 'VER CARTA'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem', borderColor:'rgba(168,85,247,.5)' }} onClick={() => go('/reserva')}>
              {h.btn3 || 'RESERVAR'}
            </button>
          </div>
        </div>
      </section>

      {/* ── HORARIO ── */}
      <section style={{ padding:'3.5rem 0', background:'rgba(255,255,255,.02)' }}>
        <div className="container">
          <div style={{
            border:'1px solid rgba(239,68,68,.3)', borderRadius:'var(--radius)',
            padding:'2.5rem 3rem', maxWidth:'580px', margin:'0 auto',
            background:'rgba(239,68,68,.04)', textAlign:'center',
          }}>
            <h2 style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--primary)', marginBottom:'1.5rem', fontFamily:'var(--font-head)', textTransform:'uppercase', letterSpacing:'.06em' }}>
              🕒 {ho.titulo || 'Horario'}
            </h2>
            <p style={{ fontSize:'1.25rem', fontWeight:700, color:'var(--fg)', marginBottom:'.75rem' }}>
              {ho.horas || 'De 6:00 PM a 3:00 AM'}
            </p>
            <p style={{ color:'rgba(239,68,68,.9)', fontWeight:700, fontSize:'1rem', marginBottom:'.5rem' }}>
              {ho.descanso || 'Lunes Descansamos'}
            </p>
            <p style={{ color:'var(--fg-muted)', fontSize:'1rem' }}>
              🎶 {ho.dias || 'Karaoke todos los demás días'}
            </p>
          </div>
        </div>
      </section>

      {/* ── NUESTROS SERVICIOS ── */}
      <section style={{ padding:'3.5rem 0' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:900, marginBottom:'.5rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            NUESTROS SERVICIOS
          </h2>
          <div style={{ width:'3rem', height:'3px', background:'linear-gradient(135deg,#ef4444,#a855f7)', margin:'0 auto 2.5rem', borderRadius:'2px' }} />

          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1.25rem' }}>
            {SERVICIOS.map((s, i) => (
              <div key={i} style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'1.75rem 2rem',
                display:'flex', flexDirection:'column', alignItems:'center', gap:'.75rem',
                minWidth:'140px', transition:'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(239,68,68,.4)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 25px rgba(239,68,68,.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                <span style={{ fontSize:'2.2rem' }}>{s.icon}</span>
                <span style={{ fontWeight:800, fontSize:'.85rem', fontFamily:'var(--font-head)', textAlign:'center', whiteSpace:'pre-line', lineHeight:1.35 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿LISTO PARA CANTAR? ── */}
      <section style={{ padding:'3.5rem 0', background:'radial-gradient(ellipse at center, rgba(168,85,247,.08) 0%, transparent 65%)' }}>
        <div className="container" style={{ textAlign:'center', maxWidth:'600px' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:900, marginBottom:'1rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            ¿LISTO PARA CANTAR?
          </h2>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.7, marginBottom:'2rem' }}>
            Reserva tu mesa y disfruta de una noche inolvidable con amigos, pareja o familia.
          </p>
          <button className="btn btn-primary" style={{ fontSize:'1.05rem', padding:'.9rem 2.5rem' }} onClick={() => go('/reserva')}>
            RESERVAR AHORA
          </button>
        </div>
      </section>
    </>
  )
}
