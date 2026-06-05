import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h  = cms.hero             || {}
  const pe = cms.porqueElegirnos  || {}
  const ho = cms.horario          || {}

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

        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
          {/* Logo grande */}
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'9rem', height:'9rem', borderRadius:'1.25rem', objectFit:'cover' }} />

          {/* Título */}
          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.5rem,7vw,4.5rem)', fontWeight:900, letterSpacing:'-.03em', lineHeight:1.05 }}>
            {h.title || 'Litros & Litros'}
          </h1>

          {/* Frase destacada en bloque */}
          <p style={{
            fontSize:'clamp(.95rem,2vw,1.1rem)', color:'rgba(242,242,242,.9)',
            lineHeight:1.7, maxWidth:'36rem', fontStyle:'italic',
            borderLeft:'3px solid rgba(239,68,68,.6)', paddingLeft:'1.1rem',
            textAlign:'left', background:'rgba(0,0,0,.3)', borderRadius:'0 .5rem .5rem 0',
            padding:'.85rem 1.1rem',
          }}>
            "{h.frase || 'El lugar donde se oye la música, el servicio y las alitas para pasar un excelente momento'}"
          </p>

          {/* 3 botones apilados */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'stretch', gap:'.75rem', width:'100%', maxWidth:'20rem', marginTop:'.5rem' }}>
            <button className="btn btn-primary" style={{ justifyContent:'center' }} onClick={() => go('/menu-promo')}>
              {h.btn1 || 'Ver Menú Promo'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center' }} onClick={() => go('/carta')}>
              {h.btn2 || 'Ver Carta'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', borderColor:'rgba(168,85,247,.5)' }} onClick={() => go('/reserva')}>
              {h.btn3 || 'Reservar'}
            </button>
          </div>

          {/* Accesos directos ◄ Carta de Alimentos — Carta de Bebidas ► */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginTop:'.25rem', flexWrap:'wrap', justifyContent:'center' }}>
            <button onClick={() => go('/alimentos')} style={{
              background:'none', border:'none', cursor:'pointer', color:'rgba(242,242,242,.7)',
              fontSize:'.9rem', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:'.4rem',
              transition:'color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(242,242,242,.7)'}
            >◄ Carta de Alimentos</button>
            <span style={{ color:'rgba(255,255,255,.2)' }}>|</span>
            <button onClick={() => go('/carta')} style={{
              background:'none', border:'none', cursor:'pointer', color:'rgba(242,242,242,.7)',
              fontSize:'.9rem', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:'.4rem',
              transition:'color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(242,242,242,.7)'}
            >Carta de Bebidas ►</button>
          </div>
        </div>
      </section>

      {/* ── HORARIO ── */}
      <section style={{ padding:'3rem 0', background:'rgba(255,255,255,.02)' }}>
        <div className="container">
          <div style={{
            border:'1px solid rgba(239,68,68,.25)', borderRadius:'var(--radius)',
            padding:'2.5rem', maxWidth:'640px', margin:'0 auto',
            background:'rgba(239,68,68,.04)',
          }}>
            <h2 style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--primary)', marginBottom:'1.5rem', fontFamily:'var(--font-head)' }}>
              {ho.titulo || '🕐 Horario'}
            </h2>
            <p style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--fg)', marginBottom:'.6rem' }}>
              {ho.horas || 'De 6:00 PM a 3:00 AM'}
            </p>
            <p style={{ color:'rgba(239,68,68,.8)', fontWeight:600, marginBottom:'.4rem' }}>
              {ho.descanso || 'Lunes Descansamos'}
            </p>
            <p style={{ color:'var(--fg-muted)' }}>
              {ho.dias || 'Karaoke todos los demás días'}
            </p>
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ ELEGIRNOS? ── */}
      <section style={{ padding:'3rem 0 5rem' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="gradient-text" style={{ fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:900, fontFamily:'var(--font-head)', marginBottom:'.75rem' }}>
            {pe.titulo || '¿Por qué elegirnos?'}
          </h2>
          <p style={{ color:'var(--fg-muted)', marginBottom:'2.5rem', fontSize:'1rem' }}>
            {pe.subtitulo || 'Somos un lugar seguro y amigable con experiencia'}
          </p>

          {/* 3 cards: Música, Shows, Cabina */}
          <div className="grid-3" style={{ gap:'1.25rem', marginBottom:'2.5rem' }}>
            {(pe.pills || [
              { icon:'🎵', label:'Música'  },
              { icon:'🎭', label:'Shows'   },
              { icon:'🏠', label:'Cabina'  },
            ]).map((p, i) => (
              <div key={i} style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'1.75rem',
                display:'flex', flexDirection:'column', alignItems:'center', gap:'.75rem',
                transition:'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(239,68,68,.4)'; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='' }}
              >
                <span style={{ fontSize:'2.5rem' }}>{p.icon}</span>
                <span style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:'var(--font-head)' }}>{p.label}</span>
              </div>
            ))}
          </div>

          {/* Texto música */}
          <div style={{ maxWidth:'36rem', margin:'0 auto', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem' }}>
            <p style={{ color:'var(--fg-muted)', lineHeight:1.75, fontSize:'1rem' }}>
              {pe.musica?.texto
                ? pe.musica.texto
                : <>Todos los géneros.<br/>Puedes pedir hasta <strong style={{ color:'var(--fg)' }}>3 canciones</strong> que más te gusten y las ponemos <strong style={{ color:'var(--primary)' }}>sin costo adicional</strong>.</>
              }
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
