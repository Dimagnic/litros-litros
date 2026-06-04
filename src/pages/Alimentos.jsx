import { useNavigate } from 'react-router-dom'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

const PLATILLOS = [
  {
    id: 1,
    nombre: 'Hamburguesa',
    foto: `${BASE}/7.jpeg`,
    ingredientes: [
      'Carne de res frita',
      'Queso amarillo',
      'Frijoles',
      'Mantequilla',
      'Tocino',
      'Catsup',
      'Mostaza',
    ],
    opcionales: ['Mayonesa'],
    extras: ['Papas onduladas', 'Aderezo de la casa'],
    esEspecial: true,
  },
  {
    id: 2,
    nombre: 'Alitas',
    foto: `${BASE}/3.jpeg`,
    desc: 'Marinadas con sabor a elegir y aderezo incluido.',
    ingredientes: [],
    badge: '🔥 Elige tu sabor',
  },
  {
    id: 3,
    nombre: 'Nachos',
    foto: `${BASE}/4.jpeg`,
    desc: 'Totopos crujientes con chiles y queso amarillo.',
    especiales: ['Carne Pastor', 'Carne Asada', 'Salseado (Salsa Verde)'],
    badge: '⭐ Especiales',
  },
  {
    id: 4,
    nombre: 'Hot Dog',
    foto: `${BASE}/6.jpeg`,
    ingredientes: [
      'Pan caliente',
      'Salchicha italiana',
      'Tocino',
      'Queso amarillo',
      'Frijoles',
      'Chiles',
      'Catsup',
      'Mayonesa',
      'Mostaza',
    ],
  },
  {
    id: 5,
    nombre: 'Papas Francesas',
    foto: `${BASE}/1.jpeg`,
    desc: 'Papa ondulada, sin aceite en exceso.',
    ingredientes: ['Queso amarillo'],
    aderezos: ['Catsup'],
  },
]

function Platillo({ p, navigate }) {
  const isHamburguesa = p.id === 1

  return (
    <div style={{
      background:'var(--card)', border:'1px solid var(--border)',
      borderRadius:'var(--radius)', overflow:'hidden',
      display:'grid', gridTemplateColumns: isHamburguesa ? '1.2fr 1fr' : '1fr 1fr',
      gap:0, transition:'box-shadow .3s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow='0 8px 30px rgba(239,68,68,.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow=''}
    >
      {/* Foto */}
      <div style={{ position:'relative', minHeight:'220px' }}>
        <img src={p.foto} alt={p.nombre} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 60%, rgba(20,20,20,.6))' }} />
      </div>

      {/* Info */}
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
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'.25rem' }}>
              {p.ingredientes.map((ing, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.88rem', color:'var(--fg)' }}>
                  <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--primary)', flexShrink:0 }}/>
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
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.88rem', color:'var(--fg)' }}>
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
  const navigate = useNavigate()

  return (
    <>
      {/* Header de sección */}
      <div style={{ padding:'3rem 0 2rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>Alimentos</h1>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem' }}>Snacks y platillos preparados con ingredientes frescos</p>
        </div>
      </div>

      {/* Platillos */}
      <section style={{ padding:'2rem 0 5rem' }}>
        <div className="container" style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {PLATILLOS.map(p => <Platillo key={p.id} p={p} navigate={navigate} />)}
        </div>

        {/* Botón ver carta bebidas */}
        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <button className="btn btn-outline" onClick={() => { navigate('/carta-bebidas'); window.scrollTo(0,0) }}
            style={{ fontSize:'1rem' }}>
            🍹 Ver Carta de Bebidas
          </button>
        </div>
      </section>

      <style>{`
        @media(max-width:640px){
          .platillo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
