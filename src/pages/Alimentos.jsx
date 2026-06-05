import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Quiero reservar')}`

function Divider() {
  return <div style={{ borderTop:'1px solid rgba(239,68,68,.15)', margin:'3rem 0' }} />
}

function BtnPedir() {
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      marginTop:'1.25rem', padding:'.65rem 1.75rem', borderRadius:'var(--radius)',
      background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff',
      fontWeight:700, fontSize:'.9rem', textDecoration:'none', fontFamily:'var(--font-body)',
      transition:'opacity .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.opacity='.85'}
      onMouseLeave={e => e.currentTarget.style.opacity='1'}
    >PEDIR AHORA</a>
  )
}

function Bullet({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0, display:'inline-block' }}/>
      <span style={{ fontSize:'.95rem' }}>{children}</span>
    </div>
  )
}

function Check({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0' }}>
      <span style={{ color:'#22c55e', fontWeight:700 }}>✓</span>
      <span style={{ fontSize:'.95rem' }}>{children}</span>
    </div>
  )
}

export default function Alimentos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const p = cms.platillos || {}

  const alitas = { ingredientes:[], especiales:[], ...p.alitas }
  const nachos  = { ingredientes:[], especiales:[], ...p.nachos  }
  const hotdog  = { ingredientes:['Pan caliente','Salchicha italiana','Tocino','Queso amarillo','Frijoles','Chiles','Catsup','Mayonesa','Mostaza'], ...p.hotdog }
  const papas   = { ingredientes:['Papa ondulada','Sin exceso de aceite','Queso amarillo','Catsup'], ...p.papas   }

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>

      {/* Header sección */}
      <div style={{ padding:'3rem 0 1.5rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, marginBottom:'.75rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            🍴 MENÚ DE ALIMENTOS
          </h1>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.7, maxWidth:'540px', margin:'0 auto 1.5rem' }}>
            Disfruta nuestros platillos preparados al momento, perfectos para acompañar tu bebida favorita y una gran noche de karaoke.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/carta'); window.scrollTo(0,0) }}>
            VER CARTA COMPLETA
          </button>
        </div>
      </div>

      <div className="container" style={{ padding:'2rem 1.5rem 5rem', maxWidth:'720px' }}>

        {/* ALITAS */}
        <div>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem', maxHeight:'300px' }}>
            <img src={alitas.img || `${BASE}/alitas.jpeg`} alt="Alitas" style={{ width:'100%', height:'300px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.75rem', fontWeight:900, color:'var(--fg)', marginBottom:'.75rem' }}>🔥 ALITAS</h2>
          <Bullet>Marinadas con sabor a elegir</Bullet>
          <Bullet>Incluye aderezo</Bullet>
          <Bullet>Preparadas al momento</Bullet>
          <Bullet>Ideales para compartir</Bullet>
          <BtnPedir />
        </div>

        <Divider />

        {/* NACHOS */}
        <div>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem', maxHeight:'300px' }}>
            <img src={nachos.img || `${BASE}/nachos.jpeg`} alt="Nachos" style={{ width:'100%', height:'300px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.75rem', fontWeight:900, color:'var(--fg)', marginBottom:'.75rem' }}>🧀 NACHOS</h2>
          <p style={{ color:'var(--fg-muted)', marginBottom:'1rem', lineHeight:1.65 }}>
            {nachos.desc || 'Totopo crujiente con chile y queso amarillo.'}
          </p>
          <p style={{ fontWeight:700, fontSize:'.9rem', color:'#a855f7', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.5rem' }}>Opciones Especiales:</p>
          {(nachos.especiales?.length > 0 ? nachos.especiales : ['Carne al Pastor','Carne Asada','Salsa Verde']).map((e, i) => (
            <Check key={i}>{e}</Check>
          ))}
          <BtnPedir />
        </div>

        <Divider />

        {/* HOT DOG */}
        <div>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem', maxHeight:'300px' }}>
            <img src={hotdog.img || `${BASE}/hotdog.jpeg`} alt="Hot Dog" style={{ width:'100%', height:'300px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.75rem', fontWeight:900, color:'var(--fg)', marginBottom:'.75rem' }}>🌭 HOT DOG ESPECIAL</h2>
          <p style={{ color:'var(--fg-muted)', marginBottom:'1rem' }}>Incluye:</p>
          {hotdog.ingredientes.map((ing, i) => <Bullet key={i}>{ing}</Bullet>)}
          <BtnPedir />
        </div>

        <Divider />

        {/* PAPAS */}
        <div>
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem', maxHeight:'300px' }}>
            <img src={papas.img || `${BASE}/papas.jpeg`} alt="Papas" style={{ width:'100%', height:'300px', objectFit:'cover', objectPosition:'center' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.75rem', fontWeight:900, color:'var(--fg)', marginBottom:'.75rem' }}>🍟 PAPAS FRANCESAS</h2>
          {papas.ingredientes.map((ing, i) => <Bullet key={i}>{ing}</Bullet>)}
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginTop:'.75rem', fontStyle:'italic' }}>
            {papas.desc || 'Crujientes y perfectas para compartir.'}
          </p>
          <BtnPedir />
        </div>

        <Divider />

        {/* CTA Bebidas */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem', textAlign:'center' }}>
          <p style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'.5rem' }}>🥤 ¿BUSCAS ALGO PARA TOMAR?</p>
          <p style={{ color:'var(--fg-muted)', marginBottom:'1.5rem', lineHeight:1.65 }}>
            Descubre nuestra selección de bebidas, promociones y especialidades de la casa.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/carta'); window.scrollTo(0,0) }}>
            VER CARTA DE BEBIDAS
          </button>
        </div>

        {/* Contacto */}
        <div style={{ marginTop:'2rem', textAlign:'center', padding:'1.5rem', borderRadius:'var(--radius)', border:'1px solid var(--border)', background:'var(--card)' }}>
          <p style={{ fontWeight:700, marginBottom:'.4rem' }}>📍 CONTACTO Y UBICACIÓN</p>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1rem' }}>¿Tienes dudas o deseas reservar? Contáctanos por teléfono, WhatsApp o redes sociales.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration:'none', fontSize:'.9rem' }}>
            💬 Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
