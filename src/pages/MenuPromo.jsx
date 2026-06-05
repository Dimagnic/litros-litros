import { useNavigate } from 'react-router-dom'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

export default function MenuPromo() {
  const navigate = useNavigate()
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
          🎉 Promociones
        </h1>
        <p style={{ color:'var(--fg-muted)', marginBottom:'2rem' }}>Las mejores promos para que disfrutes al máximo tu noche</p>

        {/* Imagen real del flyer de promos */}
        <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 40px rgba(239,68,68,.2)' }}>
          <img src={`${BASE}/promociones.jpeg`} alt="Promociones Litros & Litros" style={{ width:'100%', height:'auto', display:'block' }} />
        </div>

        {/* Cards resumen de promos */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem', marginTop:'2rem' }}>
          {[
            { emoji:'🍺', title:'Cervezas',     desc:'3 x $75  ·  10 x $260  ·  MicheLitro $98' },
            { emoji:'🪣', title:'Naturales',     desc:'Ron, Tequila, Vodka o Gin · 3 Litros x $175' },
            { emoji:'🥤', title:'Escarchados',   desc:'Sandía, Mango, Tamarindo y más · 3L x $190' },
            { emoji:'🍶', title:'Caguamón',      desc:'Xxlager, Carta Blanca, Victoria · 2 x $190' },
            { emoji:'🌮', title:'Nachos',        desc:'Árabe $100 · Pastor $100' },
            { emoji:'🍗', title:'Alitas (7)',    desc:'$78' },
            { emoji:'🌭', title:'Hot Dog',       desc:'$48' },
          ].map((p, i) => (
            <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.1rem', display:'flex', alignItems:'flex-start', gap:'.75rem' }}>
              <span style={{ fontSize:'1.75rem', flexShrink:0 }}>{p.emoji}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:'.2rem' }}>{p.title}</div>
                <div style={{ color:'var(--primary)', fontSize:'.85rem', fontWeight:600 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:'2rem', fontSize:'.78rem', color:'rgba(160,160,160,.4)' }}>
          BLVD 5 DE MAYO #4610 · +222 430 26 93
        </p>
      </div>
    </div>
  )
}
