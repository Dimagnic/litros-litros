import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function Reserva() {
  const navigate = useNavigate()
  const { cms } = useCMS()
  const r = cms.reservas || {}
  const waUrl = `https://wa.me/${r.wa || '522224302693'}?text=${encodeURIComponent(r.waMsg || 'Hola, quiero hacer una reservación en Litros & Litros')}`

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Foto */}
      <div style={{ position:'relative', height:'45vw', maxHeight:'360px', overflow:'hidden' }}>
        <img src={`${BASE}/2.jpeg`} alt="Cabinas" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.3) 0%, rgba(10,10,10,.88) 100%)' }} />
        <div style={{ position:'absolute', bottom:'1.5rem', left:0, right:0, textAlign:'center', padding:'0 1.5rem' }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, color:'#fff' }}>🏠 Cabinas Privadas</h1>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'680px' }}>
        <button onClick={() => { navigate('/'); window.scrollTo(0,0) }} style={{
          display:'inline-flex', alignItems:'center', gap:'.5rem',
          background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
          color:'var(--primary)', borderRadius:'.6rem', padding:'.5rem 1.1rem',
          fontSize:'.9rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:'2rem',
        }}>← Regresar</button>

        <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.75, marginBottom:'2rem' }}>
          Reserva tu espacio privado para grupos, cumpleaños o eventos especiales. Nuestras cabinas son perfectas para disfrutar una noche íntima con tus amigos o familia.
        </p>

        {/* Info cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'2.5rem' }}>
          {[
            { icon:'🏠', title:'Cabinas Privadas',    desc:'Espacios íntimos exclusivos para tu grupo' },
            { icon:'🎤', title:'Karaoke incluido',     desc:'Disfruta el karaoke desde tu cabina privada' },
            { icon:'🎉', title:'Paquetes Especiales',  desc:'Cumpleaños, despedidas y eventos empresariales' },
            { icon:'📋', title:'Reserva Anticipada',   desc:'Asegura tu lugar con anticipación' },
          ].map((item, i) => (
            <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:'1rem' }}>
              <span style={{ fontSize:'1.75rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'.95rem' }}>{item.title}</div>
                <div style={{ color:'var(--fg-muted)', fontSize:'.85rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ width:'100%', justifyContent:'center', textDecoration:'none', fontSize:'1.05rem', marginBottom:'1rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {r.btnTexto || 'Reservar por WhatsApp'}
        </a>
        <p style={{ textAlign:'center', fontSize:'.85rem', color:'var(--fg-muted)' }}>
          📞 <a href="tel:+522224302693" style={{ color:'var(--primary)' }}>{r.telefono || '+52 222 430 2693'}</a>
        </p>
      </div>
    </div>
  )
}
