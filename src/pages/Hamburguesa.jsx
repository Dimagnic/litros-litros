import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Quiero reservar')}`

export default function Hamburguesa() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const p = (cms.platillos || {}).hamburguesa || {}

  const ingredientes = p.ingredientes?.length > 0 ? p.ingredientes : ['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza o Mayonesa']
  const extras       = p.extras?.length > 0       ? p.extras       : ['Papas onduladas','Aderezo de la casa']
  const img          = p.img || `${BASE}/hamburguesa.jpeg`

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>

      {/* Header sección */}
      <div style={{ padding:'3rem 0 1.5rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, marginBottom:'.75rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            🍔 HAMBURGUESAS
          </h1>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', marginBottom:'1.5rem' }}>
            Sabor, calidad y el complemento perfecto para una noche de karaoke.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/carta'); window.scrollTo(0,0) }}>
            VER CARTA COMPLETA
          </button>
        </div>
      </div>

      <div className="container" style={{ padding:'2rem 1.5rem 5rem', maxWidth:'720px' }}>

        {/* Imagen destacada */}
        <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'2rem', maxHeight:'420px' }}>
          <img src={img} alt="Hamburguesa" style={{ width:'100%', height:'420px', objectFit:'cover', objectPosition:'center' }} />
        </div>

        {/* Nuestra hamburguesa especial */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', marginBottom:'1.25rem' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.3rem', fontWeight:900, marginBottom:'.25rem' }}>
            🍔 NUESTRA HAMBURGUESA ESPECIAL
          </h2>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1.1rem' }}>
            Preparada al momento con ingredientes seleccionados:
          </p>
          {ingredientes.map((ing, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.35rem 0', borderBottom: i < ingredientes.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
              <span style={{ color:'#22c55e', fontWeight:700, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:'.95rem' }}>{ing}</span>
            </div>
          ))}
        </div>

        {/* Incluye */}
        <div style={{ background:'var(--card)', border:'1px solid rgba(34,197,94,.2)', borderRadius:'var(--radius)', padding:'1.75rem', marginBottom:'1.5rem' }}>
          <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.1rem', fontWeight:800, color:'#22c55e', marginBottom:'1rem' }}>
            🍟 INCLUYE
          </h3>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'.75rem' }}>Servida con:</p>
          {extras.map((e, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.35rem 0' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', flexShrink:0, display:'inline-block' }}/>
              <span style={{ fontSize:'.95rem' }}>{e}</span>
            </div>
          ))}
        </div>

        {/* Una experiencia completa */}
        <div style={{ background:'rgba(239,68,68,.05)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'var(--radius)', padding:'1.75rem', marginBottom:'1.5rem', textAlign:'center' }}>
          <p style={{ fontWeight:700, fontSize:'1.05rem', marginBottom:'.5rem' }}>⭐ UNA EXPERIENCIA COMPLETA</p>
          <p style={{ color:'var(--fg-muted)', lineHeight:1.7, marginBottom:'1.25rem' }}>
            Disfruta una hamburguesa jugosa acompañada de buena música, bebidas y el mejor ambiente de karaoke.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration:'none' }}>
            ORDENAR AHORA
          </a>
        </div>

        {/* Explorar más */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', textAlign:'center', marginBottom:'1.25rem' }}>
          <p style={{ fontWeight:700, fontSize:'1rem', marginBottom:'.5rem' }}>🍴 EXPLORA MÁS OPCIONES</p>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1.25rem' }}>
            Conoce el resto de nuestros alimentos y especialidades.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/alimentos'); window.scrollTo(0,0) }}>
            VER CARTA DE ALIMENTOS
          </button>
        </div>

        {/* Contacto */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', textAlign:'center' }}>
          <p style={{ fontWeight:700, marginBottom:'.4rem' }}>📍 CONTACTO Y UBICACIÓN</p>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1rem' }}>
            Reserva tu mesa o solicita información.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration:'none', fontSize:'.9rem' }}>
            💬 Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
