import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA_BASE = 'https://wa.me/'

function ArrowItem({ title, desc }) {
  return (
    <div style={{ paddingBottom:'1.25rem', marginBottom:'1.25rem', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:'.75rem', marginBottom:'.35rem' }}>
        <span style={{ color:'var(--primary)', fontWeight:800, fontSize:'1.1rem', flexShrink:0, marginTop:'.05rem' }}>►</span>
        <h3 style={{ fontWeight:800, fontSize:'1.05rem', fontFamily:'var(--font-head)' }}>{title}</h3>
      </div>
      {desc && <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', lineHeight:1.65, paddingLeft:'1.6rem' }}>{desc}</p>}
    </div>
  )
}

function CheckItem({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'.65rem', padding:'.4rem 0' }}>
      <span style={{ color:'#22c55e', fontWeight:800, flexShrink:0 }}>✓</span>
      <span style={{ fontSize:'.95rem', lineHeight:1.55 }}>{children}</span>
    </div>
  )
}

export default function Eventos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const ev = cms.espectaculos || {}
  const r  = cms.reservas     || {}

  const waUrl = `${WA_BASE}${r.wa || '522224302693'}?text=${encodeURIComponent(r.waMsg || 'Hola, quiero hacer una reservación en Litros & Litros')}`

  const pc  = ev['puerta-cerrada'] || {}
  const mv  = ev['mejor-voz']      || {}
  const k   = ev['karaoke']        || {}
  const vs  = ev['vs-mesero']      || {}
  const cu  = ev['cumpleanos']     || {}

  const fotoUrl = pc.img || `${BASE}/3.jpeg`

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Foto grande */}
      <div style={{ position:'relative', height:'45vw', maxHeight:'380px', overflow:'hidden' }}>
        <img src={fotoUrl} alt="Eventos" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.2) 0%, rgba(10,10,10,.85) 100%)' }} />
        <div style={{ position:'absolute', bottom:'2rem', left:0, right:0, textAlign:'center', padding:'0 1.5rem' }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,5vw,3rem)', fontWeight:900, color:'#fff',
            textShadow:'0 2px 20px rgba(0,0,0,.8)' }}>
            EVENTOS ESPECIALES
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'720px' }}>

        {/* Eventos con ► */}
        <div style={{ marginBottom:'2.5rem' }}>
          <ArrowItem
            title={pc.title || 'Puerta Cerrada'}
            desc={(pc.items || ['Eventos privados con reservación anticipada']).join(' · ')}
          />
          <ArrowItem
            title={mv.title || 'Competencia por la Mejor Voz'}
            desc={(mv.items || ['Participa y gana premios']).join(' · ')}
          />
          <ArrowItem
            title={k.title || 'Karaoke con Animador'}
            desc={(k.items || ['Ambiente dinámico']).join(' · ')}
          />
          <div style={{ paddingBottom:'1.25rem' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'.75rem', marginBottom:'.35rem' }}>
              <span style={{ color:'var(--primary)', fontWeight:800, fontSize:'1.1rem', flexShrink:0 }}>►</span>
              <h3 style={{ fontWeight:800, fontSize:'1.05rem', fontFamily:'var(--font-head)' }}>
                {vs.title || 'Compite con el Mesero'}
              </h3>
            </div>
            <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', lineHeight:1.65, paddingLeft:'1.6rem' }}>
              {vs.premio || '🎁 Si ganas recibes bebida gratis'}
            </p>
          </div>
        </div>

        {/* Separador */}
        <div style={{ borderTop:'1px solid rgba(239,68,68,.2)', margin:'2rem 0' }} />

        {/* Cumpleaños */}
        <div style={{ marginBottom:'2.5rem' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:900, marginBottom:'1.25rem',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            {cu.titulo || 'CUMPLEAÑOS'}
          </h2>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {(cu.checks || [
              'Reserva con anticipación',
              'Mesa decorada',
              'Bebida de bienvenida',
              'Bebida gratis para el cumpleañero',
              'Bebida gratis para cada mesa',
            ]).map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
          </div>
          {cu.nota && (
            <div style={{ marginTop:'1.25rem', padding:'.9rem 1.1rem', borderRadius:'.5rem',
              background:'rgba(168,85,247,.08)', border:'1px solid rgba(168,85,247,.2)',
              fontSize:'.88rem', color:'var(--fg-muted)', lineHeight:1.6 }}>
              {cu.nota}
            </div>
          )}
        </div>

        {/* Botón Reservar Ahora */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ width:'100%', justifyContent:'center', textDecoration:'none', fontSize:'1rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {ev['cumpleanos']?.cta || 'RESERVAR AHORA'}
        </a>
      </div>
    </div>
  )
}
