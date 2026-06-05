import { useParams, useNavigate } from 'react-router-dom'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA = `https://wa.me/522224302693?text=${encodeURIComponent('Hola, quiero hacer una reservación en Litros & Litros')}`

const EVENTOS = {
  'puerta-cerrada': {
    icon:'🚪', title:'Shows de Puerta Cerrada',
    img:`${BASE}/2.jpeg`,
    desc:'Una experiencia exclusiva e íntima para tu grupo. El show de puerta cerrada es el evento privado más especial de Litros & Litros.',
    items:['Evento privado con reservación anticipada','Ambiente exclusivo solo para tu grupo','Experiencia única e irrepetible','Disponible para grupos y empresas'],
    cta:'Reservar mi evento privado',
  },
  'mejor-voz': {
    icon:'🏆', title:'Competencia por la Mejor Voz',
    img:`${BASE}/open_mind.jpeg`,
    desc:'Demuestra que tienes el talento. Compite contra otros cantantes y gana el título de la mejor voz de la noche.',
    items:['Compite contra otros participantes','El jurado es el público presente','Premios para el ganador cada noche','Abierto a todos los géneros musicales'],
    cta:'Quiero participar',
  },
  'karaoke': {
    icon:'🎤', title:'Karaoke con Animador',
    img:`${BASE}/1.jpeg`,
    desc:'Nuestro animador hace que cada canción sea una experiencia única. El escenario es tuyo y los dúos son bienvenidos.',
    items:['Animador profesional toda la noche','Dúos y grupos bienvenidos','Todos los géneros disponibles','Canciones a petición sin costo'],
    cta:'Reservar mi noche de karaoke',
  },
  'vs-mesero': {
    icon:'⚔️', title:'Compite con Nuestro Mesero',
    img:`${BASE}/3.jpeg`,
    desc:'¿Crees que puedes superar a nuestro mesero en el karaoke? Acepta el reto y si ganas, ¡la bebida corre por cuenta de la casa!',
    items:['Reta a nuestro mesero estrella','El público decide quién gana','El ganador recibe una bebida gratis','Se vale animar, gritar y apostar'],
    cta:'Acepto el reto',
    premio:'🎁 El que gana recibe una bebida gratis de la casa',
  },
  'cumpleanos': {
    icon:'🎂', title:'Especial Cumpleaños',
    img:`${BASE}/2.jpeg`,
    desc:'Celebra tu día especial con nosotros y recibe un trato único que no olvidarás. Reserva con anticipación para asegurar tu lugar.',
    checks:[
      'Reserva con anticipación',
      'Adornamos tu mesa especialmente para ti',
      '1 Bebida de bienvenida incluida',
      'La casa le da al cumpleañero una bebida igual de cada mesa que esté en el lugar',
    ],
    nota:'💡 Entre más mesas vengan a celebrar contigo, ¡más bebidas recibe el cumpleañero!',
    cta:'Reservar mi cumpleaños',
  },
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:'.5rem',
      background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
      color:'var(--primary)', borderRadius:'.6rem', padding:'.5rem 1.1rem',
      fontSize:'.9rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)',
      marginBottom:'2rem', transition:'all .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,.2)'}
      onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,.1)'}
    >← Regresar</button>
  )
}

export default function EventoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ev = EVENTOS[id]

  if (!ev) return (
    <div className="container" style={{ padding:'4rem 1.5rem', textAlign:'center' }}>
      <h2>Evento no encontrado</h2>
      <button className="btn btn-primary" onClick={() => { navigate('/'); window.scrollTo(0,0) }} style={{ marginTop:'1.5rem' }}>← Inicio</button>
    </div>
  )

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Foto header */}
      <div style={{ position:'relative', height:'55vw', maxHeight:'420px', overflow:'hidden' }}>
        <img src={ev.img} alt={ev.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.2) 0%, rgba(10,10,10,.88) 100%)' }} />
        <div style={{ position:'absolute', bottom:'2rem', left:0, right:0, padding:'0 1.5rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'.5rem' }}>{ev.icon}</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.75rem,5vw,3rem)', fontWeight:900, color:'#fff', textShadow:'0 2px 20px rgba(0,0,0,.8)', lineHeight:1.1 }}>{ev.title}</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'720px' }}>
        <BackBtn onClick={() => { navigate(-1); window.scrollTo(0,0) }} />

        <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.75, marginBottom:'2rem' }}>{ev.desc}</p>

        {/* Items tipo wave */}
        {ev.items && (
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.5rem' }}>
            {ev.items.map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'.75rem', padding:'.6rem 0', borderBottom: i < ev.items.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                <span style={{ color:'var(--primary)', fontWeight:800, flexShrink:0, marginTop:'.1rem' }}>〜</span>
                <span style={{ fontSize:'.95rem', lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Checks cumpleaños */}
        {ev.checks && (
          <div style={{ background:'var(--card)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.5rem' }}>
            {ev.checks.map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'.75rem', padding:'.6rem 0', borderBottom: i < ev.checks.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                <span style={{ color:'#22c55e', fontWeight:800, flexShrink:0 }}>✓</span>
                <span style={{ fontSize:'.95rem', lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Premio destacado */}
        {ev.premio && (
          <div style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', borderRadius:'var(--radius)', padding:'1rem 1.25rem', marginBottom:'1.5rem', textAlign:'center', fontSize:'1rem', fontWeight:700, color:'var(--primary)' }}>
            {ev.premio}
          </div>
        )}

        {/* Nota */}
        {ev.nota && (
          <div style={{ background:'rgba(168,85,247,.08)', border:'1px solid rgba(168,85,247,.2)', borderRadius:'var(--radius)', padding:'1rem 1.25rem', marginBottom:'2rem', fontSize:'.9rem', color:'var(--fg-muted)', lineHeight:1.65 }}>
            {ev.nota}
          </div>
        )}

        {/* CTA WhatsApp */}
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ width:'100%', justifyContent:'center', textDecoration:'none', fontSize:'1rem', marginBottom:'1rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {ev.cta}
        </a>

        <button className="btn btn-outline" onClick={() => { navigate(-1); window.scrollTo(0,0) }} style={{ width:'100%', justifyContent:'center' }}>
          ← Regresar
        </button>
      </div>
    </div>
  )
}
