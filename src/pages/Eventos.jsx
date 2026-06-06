import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA = (msg) => `https://wa.me/522224302693?text=${encodeURIComponent(msg)}`

export default function Eventos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const ev = cms.espectaculos || {}
  const cu = ev['cumpleanos'] || {}

  const ITEMS = [
    { key:'puerta-cerrada', titulo:'Puerta Cerrada',             desc:'Eventos privados con reservación anticipada' },
    { key:'mejor-voz',      titulo:'Competencia por la Mejor Voz', desc:'Participa y gana premios' },
    { key:'karaoke',        titulo:'Karaoke con Animador',        desc:'Ambiente dinámico' },
    { key:'vs-mesero',      titulo:'Compite con el Mesero',       desc:'Si ganas recibes bebida gratis' },
  ]

  const checks = cu.checks?.length > 0 ? cu.checks : [
    'Reserva con anticipación',
    'Mesa decorada',
    'Bebida de bienvenida',
    'Bebida gratis para el cumpleañero',
    'Bebida gratis para cada mesa',
  ]

  return (
    <div style={{ minHeight:'100dvh', background:'#0d1520' }}>

      {/* Imagen principal */}
      <div style={{ position:'relative', background:'#0a0f19', overflow:'hidden', height:'calc(100dvh - 80px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={ev['puerta-cerrada']?.img || `${BASE}/open_mind.jpeg`} alt="Eventos"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(17,24,39,.3) 0%, rgba(17,24,39,.9) 100%)' }} />
        <div style={{ position:'absolute', bottom:'clamp(1.25rem, 3vh, 2.5rem)', left:0, right:0, textAlign:'center', padding:'0 1.5rem' }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', textTransform:'uppercase' }}>
            EVENTOS ESPECIALES
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding:'3rem 1.5rem 5rem', maxWidth:'720px' }}>

        {/* Eventos con ► */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border-s)', borderRadius:'var(--radius-lg)', padding:'1.75rem', marginBottom:'1.5rem' }}>
          {ITEMS.map((item, i) => {
            const data = ev[item.key] || {}
            return (
              <div key={item.key} style={{ display:'flex', gap:'1rem', padding:'1rem 0', borderBottom: i < ITEMS.length-1 ? '1px solid rgba(41,90,158,.12)' : 'none' }}>
                <span style={{ color:'var(--primary-l)', fontWeight:900, fontSize:'1.2rem', flexShrink:0, marginTop:'.05rem' }}>►</span>
                <div>
                  <h3 style={{ fontFamily:'var(--font-head)', fontWeight:'var(--fw-bold)', fontSize:'var(--text-h3)', color:'#fff', marginBottom:'.25rem' }}>
                    {data.title || item.titulo}
                  </h3>
                  <p style={{ color:'rgba(234,234,234,.6)', fontSize:'.9rem', lineHeight:1.6 }}>
                    {(data.items?.length > 0 ? data.items[0] : null) || item.desc}
                  </p>
                  {item.key === 'vs-mesero' && data.premio && (
                    <div style={{ marginTop:'.5rem', fontSize:'.85rem', color:'var(--primary-l)', fontWeight:700 }}>
                      🏆 {data.premio}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Separador */}
        <hr className="separator" />

        {/* CUMPLEAÑOS */}
        <div style={{ background:'var(--card)', border:'1px solid rgba(41,90,158,.4)', borderRadius:'var(--radius-lg)', padding:'2rem', marginBottom:'2rem' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h2)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'1.5rem', textAlign:'center' }}>
            CUMPLEAÑOS
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'.15rem' }}>
            {checks.map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.5rem 0', borderBottom: i < checks.length-1 ? '1px solid rgba(41,90,158,.1)' : 'none' }}>
                <span style={{ color:'#22c55e', fontWeight:800, fontSize:'1.1rem', flexShrink:0 }}>✓</span>
                <span style={{ fontSize:'.95rem', color:'rgba(234,234,234,.85)' }}>{item}</span>
              </div>
            ))}
          </div>
          {cu.nota && (
            <div style={{ marginTop:'1.25rem', padding:'.85rem 1rem', borderRadius:'.5rem', background:'rgba(41,90,158,.1)', border:'1px solid rgba(41,90,158,.2)', fontSize:'.88rem', color:'rgba(234,234,234,.6)', lineHeight:1.65 }}>
              {cu.nota}
            </div>
          )}
        </div>

        {/* Botón RESERVAR AHORA */}
        <a href={WA('¡Hola! Quiero reservar en Litros & Litros Karaoke Bar.')}
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ width:'100%', justifyContent:'center', textDecoration:'none', fontSize:'1rem', display:'flex' }}>
          RESERVAR AHORA
        </a>
      </div>
    </div>
  )
}
