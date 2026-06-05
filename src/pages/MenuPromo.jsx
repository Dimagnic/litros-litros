import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

export default function MenuPromo() {
  const navigate = useNavigate()
  const { cms } = useCMS()
  const mp = cms.menuPromo || {}

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'800px' }}>
        <button onClick={() => { navigate('/'); window.scrollTo(0,0) }} style={{
          display:'inline-flex', alignItems:'center', gap:'.5rem',
          background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
          color:'var(--primary)', borderRadius:'.6rem', padding:'.5rem 1.1rem',
          fontSize:'.9rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:'2rem',
        }}>← Regresar</button>

        <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, marginBottom:'.5rem',
          background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          🎉 {mp.titulo || 'Promociones'}
        </h1>
        <p style={{ color:'var(--fg-muted)', marginBottom:'2rem' }}>{mp.subtitulo}</p>

        {mp.fotoUrl && (
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 40px rgba(239,68,68,.2)', marginBottom:'2rem' }}>
            <img src={mp.fotoUrl} alt="Promociones" style={{ width:'100%', height:'auto', display:'block' }} />
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
          {(mp.cards || []).map((p, i) => (
            <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.1rem', display:'flex', alignItems:'flex-start', gap:'.75rem' }}>
              <span style={{ fontSize:'1.75rem', flexShrink:0 }}>{p.emoji}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:'.2rem' }}>{p.title}</div>
                <div style={{ color:'var(--primary)', fontSize:'.85rem', fontWeight:600 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {mp.nota && <p style={{ textAlign:'center', marginTop:'2rem', fontSize:'.78rem', color:'rgba(160,160,160,.4)' }}>{mp.nota}</p>}
      </div>
    </div>
  )
}
