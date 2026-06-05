import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Hamburguesa() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const p = (cms.platillos || {}).hamburguesa || {}

  const ingredientes = p.ingredientes?.length > 0 ? p.ingredientes : ['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza','Mayonesa']
  const extras       = p.extras?.length > 0       ? p.extras       : ['Papas onduladas','Aderezo de la casa']
  const img          = p.img || `${BASE}/hamburguesa.jpeg`

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Foto gigante */}
      <div style={{ position:'relative', height:'50vw', maxHeight:'480px', overflow:'hidden' }}>
        <img src={img} alt="Hamburguesa" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.1) 0%, rgba(10,10,10,.7) 100%)' }} />
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'720px' }}>
        {/* Título */}
        <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,6vw,3.5rem)', fontWeight:900, marginBottom:'1.5rem',
          background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          HAMBURGUESAS
        </h1>

        {/* Ingredientes */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', marginBottom:'1.25rem' }}>
          <h3 style={{ fontSize:'.85rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--primary)', marginBottom:'1rem' }}>
            Ingredientes
          </h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
            {ingredientes.map((ing, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
                <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0, display:'inline-block' }}/>
                <span style={{ fontSize:'.95rem' }}>{ing}</span>
              </div>
            ))}
          </div>
          {(p.opcionales?.length > 0) && (
            <p style={{ color:'var(--fg-muted)', fontSize:'.85rem', marginTop:'.75rem', fontStyle:'italic' }}>
              Opcional: {p.opcionales.join(', ')}
            </p>
          )}
        </div>

        {/* Incluye */}
        {extras.length > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid rgba(34,197,94,.2)', borderRadius:'var(--radius)', padding:'1.75rem', marginBottom:'2rem' }}>
            <h3 style={{ fontSize:'.85rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'#22c55e', marginBottom:'1rem' }}>
              Incluye
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              {extras.map((e, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
                  <span style={{ color:'#22c55e', fontWeight:700 }}>✓</span>
                  <span style={{ fontSize:'.95rem' }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón ver carta de alimentos */}
        <button className="btn btn-outline" onClick={() => { navigate('/alimentos'); window.scrollTo(0,0) }}
          style={{ width:'100%', justifyContent:'center', fontSize:'1rem' }}>
          ← Ver Carta de Alimentos
        </button>
      </div>
    </div>
  )
}
