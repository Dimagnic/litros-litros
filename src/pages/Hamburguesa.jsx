import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Hamburguesa() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const p = (cms.platillos || {}).hamburguesa || {}

  const ingredientes = p.ingredientes?.length > 0 ? p.ingredientes : ['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza','Mayonesa']
  const extras = p.extras?.length > 0 ? p.extras : ['Papas onduladas','Aderezo de la casa']

  return (
    <div style={{ minHeight:'100dvh', background:'#0d1520' }}>

      {/* Imagen grande */}
      <div style={{ position:'relative', background:'#0a0f19', overflow:'hidden', height:'calc(100dvh - 80px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={p.img || `${BASE}/hamburguesa.jpeg`} alt="Hamburguesa"
          style={{ width:'100%', height:'100%', position:'absolute', inset:0, objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,18,40,.45) 0%, rgba(11,18,40,.92) 100%)' }} />
        <div style={{ position:'absolute', bottom:'clamp(1.25rem, 3vh, 2.5rem)', left:0, right:0, textAlign:'center' }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', textTransform:'uppercase' }}>
            HAMBURGUESAS
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding:'3rem 1.5rem 5rem', maxWidth:'680px' }}>

        {/* Ingredientes */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border-s)', borderRadius:'var(--radius-lg)', padding:'2rem', marginBottom:'1.25rem' }}>
          <h3 style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-caption)', fontWeight:'var(--fw-bold)', textTransform:'uppercase', letterSpacing:'var(--ls-wider)', color:'var(--primary-l)', marginBottom:'1.25rem' }}>
            Ingredientes
          </h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'.15rem' }}>
            {ingredientes.map((ing, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.4rem 0', borderBottom: i < ingredientes.length-1 ? '1px solid rgba(41,90,158,.1)' : 'none' }}>
                <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0 }}/>
                <span style={{ fontSize:'.95rem', color:'rgba(234,234,234,.85)' }}>{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <hr className="separator" />

        {/* Incluye */}
        <div style={{ background:'var(--card)', border:'1px solid rgba(41,90,158,.35)', borderRadius:'var(--radius-lg)', padding:'2rem', marginBottom:'2rem' }}>
          <h3 style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-caption)', fontWeight:'var(--fw-bold)', textTransform:'uppercase', letterSpacing:'var(--ls-wider)', color:'var(--primary-l)', marginBottom:'1.25rem' }}>
            Incluye
          </h3>
          {extras.map((e, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.4rem 0' }}>
              <span style={{ color:'#22c55e', fontWeight:800, fontSize:'1.1rem' }}>✓</span>
              <span style={{ fontSize:'.95rem', color:'rgba(234,234,234,.85)' }}>{e}</span>
            </div>
          ))}
        </div>

        {/* Botón */}
        <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center' }}
          onClick={() => { navigate('/alimentos'); window.scrollTo(0,0) }}>
          VER CARTA DE ALIMENTOS
        </button>
      </div>
    </div>
  )
}
