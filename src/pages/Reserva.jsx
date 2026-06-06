import { useState } from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Reserva() {
  const { cms } = useCMS()
  const [nombre, setNombre] = useState('')
  const [personas, setPersonas] = useState('2')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [ocasion, setOcasion] = useState('')
  const r = cms.reservas || {}

  function handleReservar() {
    const msg = `¡Hola! Quiero reservar en Litros & Litros Karaoke Bar.\n\n📋 *Datos de mi reservación:*\n👤 Nombre: ${nombre || 'Sin especificar'}\n👥 Personas: ${personas}\n📅 Fecha: ${fecha || 'A confirmar'}\n🕐 Hora estimada: ${hora || 'A confirmar'}${ocasion ? `\n🎉 Ocasión: ${ocasion}` : ''}\n\n¡Gracias!`
    const wa = r.wa || '522224302693'
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inputStyle = {
    width:'100%', background:'var(--card2)', border:'1px solid var(--border)',
    borderRadius:'.6rem', padding:'.7rem 1rem', color:'#fff',
    fontSize:'.95rem', outline:'none', fontFamily:'var(--font-body)',
    transition:'border-color .2s',
  }

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:'clamp(200px, 40vh, 360px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={`${BASE}/2.jpeg`} alt="Reserva"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,.78)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🏠</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'.75rem' }}>
            RESERVA TU MESA
          </h1>
          <p style={{ color:'rgba(234,234,234,.8)', fontSize:'1rem', maxWidth:'32rem', margin:'0 auto', lineHeight:1.65 }}>
            Bienvenido a Litros & Litros Karaoke Bar. Completa los datos y te contactamos por WhatsApp para confirmar tu reservación.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'3rem 1.5rem 5rem', maxWidth:'600px' }}>

        {/* Info rápida */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'1rem', marginBottom:'2.5rem' }}>
          {[
            { icon:'🕐', label:'Horario', val:'6:00 PM – 3:00 AM' },
            { icon:'📅', label:'Días',    val:'Mar a Dom' },
            { icon:'📞', label:'Tel',     val:'+52 222 430 2693' },
          ].map((i, idx) => (
            <div key={idx} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1rem', textAlign:'center' }}>
              <div style={{ fontSize:'1.4rem', marginBottom:'.3rem' }}>{i.icon}</div>
              <div style={{ fontSize:'.7rem', color:'rgba(234,234,234,.45)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.2rem' }}>{i.label}</div>
              <div style={{ fontSize:'.85rem', fontWeight:600, color:'#fff' }}>{i.val}</div>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border-s)', borderRadius:'var(--radius-lg)', padding:'2rem' }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h3)', fontWeight:'var(--fw-bold)', color:'#fff', marginBottom:'1.5rem', textAlign:'center' }}>
            📋 Datos de tu Reservación
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div>
              <label style={labelSt}>Tu nombre</label>
              <input style={inputStyle} placeholder="¿Cómo te llamas?" value={nombre} onChange={e => setNombre(e.target.value)}
                onFocus={e => e.target.style.borderColor='var(--primary)'}
                onBlur={e => e.target.style.borderColor='var(--border)'} />
            </div>
            <div>
              <label style={labelSt}>Número de personas</label>
              <select style={{ ...inputStyle, cursor:'pointer' }} value={personas} onChange={e => setPersonas(e.target.value)}
                onFocus={e => e.target.style.borderColor='var(--primary)'}
                onBlur={e => e.target.style.borderColor='var(--border)'}>
                {['1','2','3','4','5','6','7','8','9','10+'].map(n => <option key={n} value={n}>{n} {n==='1' ? 'persona' : 'personas'}</option>)}
              </select>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'1rem' }}>
              <div>
                <label style={labelSt}>Fecha</label>
                <input type="date" style={inputStyle} value={fecha} onChange={e => setFecha(e.target.value)}
                  onFocus={e => e.target.style.borderColor='var(--primary)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={labelSt}>Hora estimada</label>
                <input type="time" style={inputStyle} value={hora} onChange={e => setHora(e.target.value)}
                  min="18:00" max="03:00"
                  onFocus={e => e.target.style.borderColor='var(--primary)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'} />
              </div>
            </div>
            <div>
              <label style={labelSt}>Ocasión especial (opcional)</label>
              <select style={{ ...inputStyle, cursor:'pointer' }} value={ocasion} onChange={e => setOcasion(e.target.value)}>
                <option value="">Sin ocasión especial</option>
                <option>🎂 Cumpleaños</option>
                <option>💑 Aniversario</option>
                <option>🎉 Reunión de amigos</option>
                <option>🏢 Evento empresarial</option>
                <option>🎊 Otro</option>
              </select>
            </div>
          </div>

          <button onClick={handleReservar} style={{
            width:'100%', marginTop:'1.75rem', padding:'.9rem',
            background:'var(--primary)', color:'#fff', border:'none',
            borderRadius:'var(--radius)', fontSize:'1rem', fontWeight:700,
            cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .25s',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'.6rem',
            boxShadow:'0 4px 20px rgba(41,90,158,.4)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--primary-l)'; e.currentTarget.style.boxShadow='0 6px 28px rgba(41,90,158,.55)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(41,90,158,.4)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ENVIAR POR WHATSAPP
          </button>
          <p style={{ textAlign:'center', marginTop:'.75rem', fontSize:'.8rem', color:'rgba(234,234,234,.35)' }}>
            Te responderemos a la brevedad para confirmar tu lugar
          </p>
        </div>
      </div>
    </div>
  )
}
const labelSt = { display:'block', fontSize:'.72rem', fontWeight:700, color:'rgba(234,234,234,.5)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.35rem' }
