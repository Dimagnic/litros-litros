import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

function Divider() {
  return <div style={{ borderTop:'1px solid rgba(239,68,68,.15)', margin:'3rem 0' }} />
}

function Bullet({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0, display:'inline-block' }}/>
      <span style={{ fontSize:'.95rem', color:'var(--fg)' }}>{children}</span>
    </div>
  )
}

function PlatilloSection({ platillo }) {
  const p = platillo
  return (
    <div>
      {/* Foto grande */}
      <div style={{ borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.75rem', maxHeight:'320px' }}>
        <img src={p.img} alt={p.title} style={{ width:'100%', height:'320px', objectFit:'cover', objectPosition:'center', display:'block' }} />
      </div>

      {/* Nombre */}
      <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:900, marginBottom:'.75rem',
        background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
        {p.title}
      </h2>

      {/* Descripción */}
      {p.desc && <p style={{ color:'var(--fg-muted)', fontSize:'.95rem', lineHeight:1.7, marginBottom:'1rem' }}>{p.desc}</p>}

      {/* Ingredientes */}
      {p.ingredientes?.length > 0 && (
        <div style={{ marginBottom:'1rem' }}>
          {p.ingredientes.map((ing, i) => <Bullet key={i}>{ing}</Bullet>)}
        </div>
      )}

      {/* Especiales */}
      {p.especiales?.length > 0 && (
        <div style={{ marginTop:'.75rem' }}>
          <p style={{ fontSize:'.85rem', fontWeight:700, color:'#a855f7', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.5rem' }}>Especiales</p>
          {p.especiales.map((e, i) => <Bullet key={i}>{e}</Bullet>)}
        </div>
      )}

      {/* Opcionales */}
      {p.opcionales?.length > 0 && (
        <p style={{ color:'var(--fg-muted)', fontSize:'.88rem', marginTop:'.75rem', fontStyle:'italic' }}>
          Opcional: {p.opcionales.join(', ')}
        </p>
      )}

      {/* Aderezos */}
      {p.aderezos?.length > 0 && (
        <p style={{ color:'var(--fg-muted)', fontSize:'.88rem', marginTop:'.5rem' }}>
          Aderezo: {p.aderezos.join(', ')}
        </p>
      )}
    </div>
  )
}

export default function Alimentos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const p = cms.platillos || {}

  const platillos = [
    { id:'alitas',  title:'ALITAS',          img:`${BASE}/alitas.jpeg`,  desc:'Marinadas con sabor a elegir y aderezo incluido', ingredientes:[], especiales:[], opcionales:[], aderezos:[], ...p.alitas },
    { id:'nachos',  title:'NACHOS',          img:`${BASE}/nachos.jpeg`,  ...p.nachos },
    { id:'hotdog',  title:'HOT DOG',         img:`${BASE}/hotdog.jpeg`,  ...p.hotdog },
    { id:'papas',   title:'PAPAS FRANCESAS', img:`${BASE}/papas.jpeg`,   ...p.papas  },
  ]

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Header sección */}
      <div style={{ padding:'3rem 0 2rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, marginBottom:'.5rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            ALIMENTOS
          </h1>
        </div>
      </div>

      {/* Platillos en scroll */}
      <div className="container" style={{ padding:'1rem 1.5rem 5rem', maxWidth:'720px' }}>
        {platillos.map((platillo, i) => (
          <div key={platillo.id}>
            <PlatilloSection platillo={platillo} />
            {i < platillos.length - 1 && <Divider />}
          </div>
        ))}

        {/* Botón ver hamburguesa */}
        <div style={{ marginTop:'3rem', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
          <button className="btn btn-outline" onClick={() => { navigate('/hamburguesa'); window.scrollTo(0,0) }}>
            🍔 Ver Hamburguesa
          </button>
          <button className="btn btn-outline" onClick={() => { navigate('/carta'); window.scrollTo(0,0) }}>
            🍹 Ver Carta de Bebidas
          </button>
        </div>
      </div>
    </div>
  )
}
