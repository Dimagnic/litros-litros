import { useParams, useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:'.5rem',
      background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
      color:'var(--primary)', borderRadius:'.6rem', padding:'.5rem 1.1rem',
      fontSize:'.9rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:'2rem',
    }}
      onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,.2)'}
      onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,.1)'}
    >← Regresar</button>
  )
}

function Bullet({ children, color='var(--primary)' }) {
  return (
    <li style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.45rem 0', borderBottom:'1px solid rgba(255,255,255,.05)', listStyle:'none' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:color, flexShrink:0, display:'inline-block' }}/>
      <span style={{ fontSize:'.95rem' }}>{children}</span>
    </li>
  )
}

export default function AlimentoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cms } = useCMS()
  const a = (cms.platillos || {})[id]

  if (!a) return (
    <div className="container" style={{ padding:'4rem 1.5rem', textAlign:'center' }}>
      <h2>Platillo no encontrado</h2>
      <button className="btn btn-primary" onClick={() => { navigate('/'); window.scrollTo(0,0) }} style={{ marginTop:'1.5rem' }}>← Inicio</button>
    </div>
  )

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      <div style={{ position:'relative', height:'55vw', maxHeight:'420px', overflow:'hidden' }}>
        <img src={a.img} alt={a.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,.3) 0%, rgba(10,10,10,.85) 100%)' }} />
        <div style={{ position:'absolute', bottom:'2rem', left:0, right:0, padding:'0 1.5rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'.5rem' }}>{a.icon}</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,6vw,3.5rem)', fontWeight:900, color:'#fff' }}>{a.title}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem', maxWidth:'720px' }}>
        <BackBtn onClick={() => { navigate(-1); window.scrollTo(0,0) }} />
        <p style={{ color:'var(--fg-muted)', fontSize:'1rem', lineHeight:1.7, marginBottom:'2rem', fontStyle:'italic' }}>{a.desc}</p>
        {a.ingredientes?.length > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--primary)', marginBottom:'.75rem' }}>Ingredientes</h3>
            <ul style={{ padding:0 }}>{a.ingredientes.map((i,idx) => <Bullet key={idx}>{i}</Bullet>)}</ul>
          </div>
        )}
        {a.especiales?.length > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid rgba(168,85,247,.2)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#a855f7', marginBottom:'.75rem' }}>⭐ Especiales con</h3>
            <ul style={{ padding:0 }}>{a.especiales.map((i,idx) => <Bullet key={idx} color="#a855f7">{i}</Bullet>)}</ul>
          </div>
        )}
        {a.opcionales?.length > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid rgba(234,179,8,.2)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#eab308', marginBottom:'.75rem' }}>Opcional</h3>
            <ul style={{ padding:0 }}>{a.opcionales.map((i,idx) => <Bullet key={idx} color="#eab308">{i}</Bullet>)}</ul>
          </div>
        )}
        {a.extras?.length > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid rgba(34,197,94,.2)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#22c55e', marginBottom:'.75rem' }}>✓ Incluye</h3>
            <ul style={{ padding:0 }}>{a.extras.map((i,idx) => <Bullet key={idx} color="#22c55e">{i}</Bullet>)}</ul>
          </div>
        )}
        {a.aderezos?.length > 0 && (
          <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginTop:'.5rem' }}>🥣 Aderezo: {a.aderezos.join(', ')}</p>
        )}
        <button className="btn btn-outline" onClick={() => { navigate(-1); window.scrollTo(0,0) }} style={{ marginTop:'2.5rem', display:'flex' }}>← Regresar al menú</button>
      </div>
    </div>
  )
}
