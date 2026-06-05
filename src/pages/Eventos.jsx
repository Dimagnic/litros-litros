import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA_RESERVAR  = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Quiero reservar')}`
const WA_INFO      = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Quiero más información sobre eventos')}`
const WA_PARTICIPAR= `https://wa.me/522294302693?text=${encodeURIComponent('¡Hola! Quiero participar en la competencia de voz')}`
const WA_RETO      = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Acepto el reto vs el mesero')}`
const WA_CUMPLE    = `https://wa.me/522224302693?text=${encodeURIComponent('¡Hola! Quiero reservar para mi cumpleaños')}`

function Bullet({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0, display:'inline-block' }}/>
      <span style={{ fontSize:'.9rem', color:'var(--fg-muted)' }}>{children}</span>
    </div>
  )
}

function Check({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.35rem 0' }}>
      <span style={{ color:'#22c55e', fontWeight:700, flexShrink:0 }}>✓</span>
      <span style={{ fontSize:'.95rem' }}>{children}</span>
    </div>
  )
}

function EventoCard({ icon, title, desc, bullets, children, cta, ctaUrl, color='rgba(239,68,68,.1)', borderColor='rgba(239,68,68,.25)' }) {
  return (
    <div style={{ background:'var(--card)', border:`1px solid ${borderColor}`, borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem' }}>
      <div style={{ background:color, padding:'1.25rem 1.5rem', borderBottom:`1px solid ${borderColor}` }}>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.15rem', fontWeight:900 }}>{icon} {title}</h2>
      </div>
      <div style={{ padding:'1.5rem' }}>
        {desc && <p style={{ color:'var(--fg-muted)', marginBottom:'1rem', lineHeight:1.65 }}>{desc}</p>}
        {bullets && bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
        {children}
        {cta && (
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            marginTop:'1.25rem', padding:'.6rem 1.5rem', borderRadius:'var(--radius)',
            background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff',
            fontWeight:700, fontSize:'.9rem', textDecoration:'none', fontFamily:'var(--font-body)',
          }}>{cta}</a>
        )}
      </div>
    </div>
  )
}

export default function Eventos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const ev = cms.espectaculos || {}
  const cu = ev['cumpleanos'] || {}

  const fotoUrl = ev['puerta-cerrada']?.img || `${BASE}/3.jpeg`
  const checks = cu.checks?.length > 0 ? cu.checks : ['Reserva con anticipación','Mesa decorada','Bebida de bienvenida','Bebida gratis para el cumpleañero','Bebida gratis para cada mesa']

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>

      {/* Foto header */}
      <div style={{ position:'relative', height:'45vw', maxHeight:'360px', overflow:'hidden' }}>
        <img src={fotoUrl} alt="Eventos" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.2) 0%, rgba(10,10,10,.88) 100%)' }} />
        <div style={{ position:'absolute', bottom:'2rem', left:0, right:0, textAlign:'center', padding:'0 1.5rem' }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,5vw,3rem)', fontWeight:900, color:'#fff' }}>
            🎉 EVENTOS ESPECIALES
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding:'2rem 1.5rem 5rem', maxWidth:'720px' }}>

        {/* Subtítulo + CTA shows */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.7, marginBottom:'1.25rem' }}>
            Diversión, música y experiencias únicas para disfrutar con amigos, familia o compañeros de trabajo.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/reserva'); window.scrollTo(0,0) }}>
            VER PRÓXIMOS SHOWS
          </button>
        </div>

        {/* Puerta Cerrada */}
        <EventoCard
          icon="🎭" title="PUERTA CERRADA"
          desc="Eventos privados con reservación anticipada."
          bullets={['Celebraciones exclusivas','Reuniones empresariales','Eventos familiares','Ambiente personalizado']}
          cta="MÁS INFORMACIÓN" ctaUrl={WA_INFO}
          color="rgba(239,68,68,.08)" borderColor="rgba(239,68,68,.25)"
        />

        {/* Competencia Mejor Voz */}
        <EventoCard
          icon="🎤" title="COMPETENCIA POR LA MEJOR VOZ"
          desc="Demuestra tu talento y participa para ganar premios cada semana."
          bullets={['Participación abierta','Premios especiales','Ambiente competitivo y divertido']}
          cta="QUIERO PARTICIPAR" ctaUrl={WA_PARTICIPAR}
          color="rgba(234,179,8,.08)" borderColor="rgba(234,179,8,.25)"
        />

        {/* Karaoke con Animador */}
        <EventoCard
          icon="🎙️" title="KARAOKE CON ANIMADOR"
          desc="Disfruta de una experiencia dinámica con animación en vivo."
          bullets={['Interacción con los asistentes','Retos musicales','Ambiente divertido para todos']}
          color="rgba(168,85,247,.08)" borderColor="rgba(168,85,247,.25)"
        />

        {/* Compite con el Mesero */}
        <EventoCard
          icon="🍻" title="COMPITE CON EL MESERO"
          color="rgba(6,182,212,.08)" borderColor="rgba(6,182,212,.25)"
          cta="ACEPTAR EL RETO" ctaUrl={WA_RETO}
        >
          <p style={{ color:'var(--fg-muted)', marginBottom:'.75rem', lineHeight:1.65 }}>
            ¿Crees que cantas mejor? Reta a nuestro staff y demuestra tu talento.
          </p>
          <div style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'.5rem', padding:'.75rem 1rem', display:'inline-flex', alignItems:'center', gap:'.5rem' }}>
            <span style={{ fontSize:'1.1rem' }}>🏆</span>
            <span style={{ fontWeight:700, color:'var(--primary)', fontSize:'.9rem' }}>Si ganas, obtienes una bebida gratis.</span>
          </div>
        </EventoCard>

        {/* Cumpleaños — id para anchor */}
        <div id="cumpleanos" style={{ background:'linear-gradient(135deg,rgba(239,68,68,.08),rgba(168,85,247,.08))', border:'1px solid rgba(239,68,68,.3)', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1.5rem' }}>
          <div style={{ background:'linear-gradient(135deg,rgba(239,68,68,.15),rgba(168,85,247,.15))', padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(239,68,68,.2)' }}>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.15rem', fontWeight:900 }}>🎂 CELEBRA TU CUMPLEAÑOS</h2>
          </div>
          <div style={{ padding:'1.5rem' }}>
            <p style={{ color:'var(--fg-muted)', marginBottom:'1.25rem', lineHeight:1.65 }}>
              Haz de tu día una experiencia inolvidable.
            </p>
            <p style={{ fontWeight:700, fontSize:'.9rem', marginBottom:'.75rem' }}>Incluye:</p>
            {checks.map((item, i) => <Check key={i}>{item}</Check>)}
            {cu.nota && (
              <div style={{ marginTop:'1.1rem', padding:'.85rem 1rem', borderRadius:'.5rem', background:'rgba(168,85,247,.08)', border:'1px solid rgba(168,85,247,.2)', fontSize:'.88rem', color:'var(--fg-muted)', lineHeight:1.6 }}>
                {cu.nota}
              </div>
            )}
            <a href={WA_CUMPLE} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              marginTop:'1.25rem', padding:'.6rem 1.5rem', borderRadius:'var(--radius)',
              background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff',
              fontWeight:700, fontSize:'.9rem', textDecoration:'none', fontFamily:'var(--font-body)',
            }}>RESERVAR CUMPLEAÑOS</a>
          </div>
        </div>

        {/* Carta de bebidas */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', textAlign:'center', marginBottom:'1.25rem' }}>
          <p style={{ fontWeight:700, fontSize:'1rem', marginBottom:'.5rem' }}>🥂 ACOMPAÑA TU EVENTO</p>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1.25rem' }}>
            Conoce nuestras promociones y bebidas disponibles.
          </p>
          <button className="btn btn-outline" onClick={() => { navigate('/carta'); window.scrollTo(0,0) }}>
            VER CARTA DE BEBIDAS
          </button>
        </div>

        {/* Contacto */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', textAlign:'center' }}>
          <p style={{ fontWeight:700, marginBottom:'.4rem' }}>📍 CONTACTO Y UBICACIÓN</p>
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1rem' }}>
            Reserva tu evento o solicita información personalizada.
          </p>
          <a href={WA_RESERVAR} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration:'none', fontSize:'.9rem' }}>
            💬 Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
