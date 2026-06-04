import { useNavigate } from 'react-router-dom'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const WA = 'https://wa.me/522224302693?text=' + encodeURIComponent('Hola, quiero hacer una reservación en Litros & Litros')

function EventoCard({ icon, titulo, children, color = 'rgba(239,68,68,.15)', borderColor = 'rgba(239,68,68,.25)' }) {
  return (
    <div style={{
      background:'var(--card)', border:`1px solid ${borderColor}`,
      borderRadius:'var(--radius)', overflow:'hidden', transition:'all .3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 30px ${borderColor}` }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
    >
      <div style={{ background:color, padding:'1.25rem 1.5rem', display:'flex', alignItems:'center', gap:'.75rem', borderBottom:`1px solid ${borderColor}` }}>
        <span style={{ fontSize:'1.75rem' }}>{icon}</span>
        <h3 style={{ fontSize:'1.1rem', fontWeight:800 }}>{titulo}</h3>
      </div>
      <div style={{ padding:'1.5rem' }}>{children}</div>
    </div>
  )
}

function CheckItem({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'.6rem', marginBottom:'.5rem' }}>
      <span style={{ color:'#22c55e', fontWeight:700, flexShrink:0, marginTop:'.1rem' }}>✓</span>
      <span style={{ color:'var(--fg)', fontSize:'.92rem', lineHeight:1.55 }}>{children}</span>
    </div>
  )
}

function WaveItem({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'.6rem', marginBottom:'.6rem' }}>
      <span style={{ color:'var(--primary)', flexShrink:0, marginTop:'.1rem' }}>〜</span>
      <span style={{ color:'var(--fg)', fontSize:'.92rem', lineHeight:1.55 }}>{children}</span>
    </div>
  )
}

export default function Eventos() {
  return (
    <>
      {/* Header con foto */}
      <div style={{ position:'relative', height:'280px', overflow:'hidden' }}>
        <img src={`${BASE}/3.jpeg`} alt="Eventos" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.7)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'1.5rem' }}>
          <h1 className="section-title gradient-text neon-text" style={{ marginBottom:'.5rem' }}>Eventos Especiales</h1>
          <p style={{ color:'rgba(242,242,242,.8)', fontSize:'1rem' }}>Vive experiencias únicas en Litros & Litros</p>
        </div>
      </div>

      <section style={{ padding:'3rem 0 5rem' }}>
        <div className="container" style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

          {/* Puerta Cerrada */}
          <EventoCard icon="🎭" titulo="Shows de Puerta Cerrada" color="rgba(239,68,68,.1)" borderColor="rgba(239,68,68,.25)">
            <WaveItem>Eventos privados con reservación anticipada</WaveItem>
          </EventoCard>

          {/* Mejor Voz */}
          <EventoCard icon="🏆" titulo="Compite por la Mejor Voz" color="rgba(234,179,8,.08)" borderColor="rgba(234,179,8,.25)">
            <WaveItem>Participa y gana premios</WaveItem>
          </EventoCard>

          {/* Karaoke con Animador */}
          <EventoCard icon="🎤" titulo="Karaoke c/ Animador" color="rgba(168,85,247,.1)" borderColor="rgba(168,85,247,.25)">
            <WaveItem>Karaoke con animador — dúos bienvenidos</WaveItem>
            <WaveItem>Compite con nuestro <strong>Mesero Estrella</strong></WaveItem>
            <div style={{ marginTop:'.75rem', padding:'.65rem 1rem', borderRadius:'.5rem',
              background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.2)' }}>
              <span style={{ fontSize:'.85rem', color:'var(--primary)', fontWeight:700 }}>
                🎁 El que gana recibe una bebida gratis
              </span>
            </div>
          </EventoCard>

          {/* Cumpleaños — especial destacado */}
          <div style={{
            background:'linear-gradient(135deg, rgba(239,68,68,.08), rgba(168,85,247,.08))',
            border:'1px solid rgba(239,68,68,.3)', borderRadius:'var(--radius)', overflow:'hidden',
          }}>
            <div style={{ background:'linear-gradient(135deg,rgba(239,68,68,.15),rgba(168,85,247,.15))',
              padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(239,68,68,.2)',
              display:'flex', alignItems:'center', gap:'.75rem' }}>
              <span style={{ fontSize:'1.75rem' }}>🎂</span>
              <div>
                <h3 style={{ fontSize:'1.1rem', fontWeight:800 }}>Cumpleaños</h3>
                <span style={{ fontSize:'.75rem', fontWeight:700, padding:'.15rem .6rem', borderRadius:'999px',
                  background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff' }}>⭐ Especial</span>
              </div>
            </div>
            <div style={{ padding:'1.75rem' }}>
              <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1.25rem' }}>
                Celebra tu día con nosotros y recibe un trato único. Reserva con anticipación para asegurar tu lugar.
              </p>
              <CheckItem>Reserva con anticipación</CheckItem>
              <CheckItem>Adornamos tu mesa</CheckItem>
              <CheckItem>1 Bebida de bienvenida</CheckItem>
              <CheckItem>La casa le da al cumpleañero <strong>una bebida igual de cada mesa que esté con nosotros en el lugar</strong></CheckItem>

              <div style={{ marginTop:'1.5rem', padding:'1rem', borderRadius:'.5rem',
                background:'rgba(239,68,68,.06)', border:'1px solid rgba(239,68,68,.15)',
                fontSize:'.85rem', color:'var(--fg-muted)', lineHeight:1.6 }}>
                💡 Entre más mesas vengan a celebrar contigo, ¡más bebidas recibe el cumpleañero!
              </div>
            </div>
          </div>

          {/* CTA Reservar */}
          <div style={{ textAlign:'center', padding:'2rem 0 1rem' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ fontSize:'1.05rem', padding:'.9rem 2.5rem', textDecoration:'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar Ahora
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
