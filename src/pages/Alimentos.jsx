import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

function Platillo({ p }) {
  return (
    <div style={{
      background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)',
      overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr', transition:'box-shadow .3s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow='0 8px 30px rgba(239,68,68,.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow=''}
    >
      <div style={{ position:'relative', minHeight:'220px' }}>
        <img src={p.fotoUrl} alt={p.nombre} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 60%, rgba(20,20,20,.6))' }} />
      </div>
      <div style={{ padding:'1.75rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'1rem' }}>
          <h3 style={{ fontSize:'1.3rem', fontWeight:800 }}>{p.nombre}</h3>
          {p.badge && (
            <span style={{ fontSize:'.72rem', fontWeight:700, padding:'.2rem .6rem', borderRadius:'999px',
              background:'linear-gradient(135deg,#ef4444,#a855f7)', color:'#fff' }}>{p.badge}</span>
          )}
        </div>
        {p.desc && <p style={{ color:'var(--fg-muted)', fontSize:'.9rem', marginBottom:'1rem', lineHeight:1.6 }}>{p.desc}</p>}
        {p.ingredientes?.length > 0 && (
          <div style={{ marginBottom:'.75rem' }}>
            <p style={{ fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--fg-muted)', marginBottom:'.4rem' }}>Ingredientes</p>
            <ul style={{ listStyle:'none' }}>
              {p.ingredientes.map((ing, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.88rem', marginBottom:'.2rem' }}>
                  <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--primary)', flexShrink:0, display:'inline-block' }}/>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}
        {p.opcionales?.length > 0 && (
          <p style={{ fontSize:'.82rem', color:'var(--fg-muted)', marginBottom:'.5rem' }}>
            <em>Opcional: {p.opcionales.join(', ')}</em>
          </p>
        )}
        {p.extras?.length > 0 && (
          <div style={{ marginTop:'.5rem' }}>
            <p style={{ fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--fg-muted)', marginBottom:'.35rem' }}>Incluye</p>
            {p.extras.map((e, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.88rem', color:'var(--primary)' }}>
                <span>✓</span> {e}
              </div>
            ))}
          </div>
        )}
        {p.especiales?.length > 0 && (
          <div style={{ marginTop:'.5rem' }}>
            <p style={{ fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--fg-muted)', marginBottom:'.35rem' }}>Especiales con:</p>
            {p.especiales.map((e, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.88rem' }}>
                <span style={{ color:'var(--primary)' }}>→</span> {e}
              </div>
            ))}
          </div>
        )}
        {p.aderezos?.length > 0 && (
          <p style={{ fontSize:'.82rem', color:'var(--fg-muted)', marginTop:'.5rem' }}>
            Aderezo: {p.aderezos.join(', ')}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Alimentos() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const a = cms.alimentos || { titulo:'Alimentos', subtitulo:'', platillos:[] }

  return (
    <>
      <div style={{ padding:'3rem 0 2rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>{a.titulo}</h1>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem' }}>{a.subtitulo}</p>
        </div>
      </div>
      <section style={{ padding:'2rem 0 5rem' }}>
        <div className="container" style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {(a.platillos || []).map(p => <Platillo key={p.id} p={p} />)}
        </div>
        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <button className="btn btn-outline" onClick={() => { navigate('/carta-bebidas'); window.scrollTo(0,0) }}>
            🍹 Ver Carta de Bebidas
          </button>
        </div>
      </section>
      <style>{`@media(max-width:640px){.platillo-card{grid-template-columns:1fr !important;}}`}</style>
    </>
  )
}
