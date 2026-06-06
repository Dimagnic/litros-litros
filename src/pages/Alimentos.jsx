import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

function HeroImg({ src, titulo }) {
  return (
    <div style={{ position:'relative', background:'#0a0f19', overflow:'hidden', minHeight:'clamp(220px, 45vh, 420px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <img src={src} alt={titulo}
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(17,24,39,.2) 0%, rgba(17,24,39,.88) 100%)' }} />
      <div style={{ position:'absolute', bottom:'2rem', left:0, right:0, textAlign:'center', padding:'0 1.5rem' }}>
        <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, color:'#fff', letterSpacing:'.06em', textTransform:'uppercase' }}>
          {titulo}
        </h1>
      </div>
    </div>
  )
}

function Platillo({ img, titulo, children }) {
  return (
    <div style={{ marginBottom:'4rem' }}>
      <div style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', marginBottom:'1.75rem', height:'clamp(180px, 35vh, 320px)', position:'relative' }}>
        <img src={img} alt={titulo} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 50%, rgba(17,24,39,.9) 100%)' }} />
        <h2 style={{ position:'absolute', bottom:'1.25rem', left:'1.5rem',
          fontSize:'clamp(1.75rem,4vw,2.25rem)', fontWeight:900, color:'#fff', letterSpacing:'.04em' }}>
          {titulo}
        </h2>
      </div>
      <div style={{ paddingLeft:'.5rem' }}>{children}</div>
    </div>
  )
}

function Bullet({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0', borderBottom:'1px solid rgba(41,90,158,.1)' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', flexShrink:0 }}/>
      <span style={{ fontSize:'.95rem', color:'rgba(234,234,234,.85)' }}>{children}</span>
    </div>
  )
}

function Especial({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.65rem', padding:'.3rem 0' }}>
      <span style={{ color:'var(--primary-l)', fontWeight:700, fontSize:'1rem' }}>•</span>
      <span style={{ fontSize:'.95rem', color:'rgba(234,234,234,.85)' }}>{children}</span>
    </div>
  )
}

export default function Alimentos() {
  const { cms } = useCMS()
  const p  = cms.platillos  || {}
  const al = cms.alimentos  || {}

  // Imagen y título principal desde CMS, con fallbacks
  const heroImg    = al.imgPrincipal || `${BASE}/alitas.jpeg`
  const heroTitulo = al.tituloPrincipal || 'ALIMENTOS'

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>

      {/* ── IMAGEN PRINCIPAL (editable desde CMS) ── */}
      <HeroImg src={heroImg} titulo={heroTitulo} />

      <div className="container" style={{ padding:'3rem 1.5rem 5rem', maxWidth:'760px' }}>

        {/* ALITAS */}
        <Platillo img={p.alitas?.img || `${BASE}/alitas.jpeg`} titulo="ALITAS">
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem', lineHeight:1.75 }}>
            {p.alitas?.desc || 'Marinadas con sabor a elegir y aderezo incluido'}
          </p>
        </Platillo>

        {/* NACHOS */}
        <Platillo img={p.nachos?.img || `${BASE}/nachos.jpeg`} titulo="NACHOS">
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem', marginBottom:'1rem', lineHeight:1.75 }}>
            {p.nachos?.desc || 'Totopo crujiente con chile y queso amarillo'}
          </p>
          <p style={{ fontSize:'.85rem', fontWeight:700, color:'var(--primary-l)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.65rem' }}>Especiales:</p>
          {(p.nachos?.especiales?.length > 0 ? p.nachos.especiales : ['Carne Pastor','Carne Asada','Salsa Verde']).map((e, i) => (
            <Especial key={i}>{e}</Especial>
          ))}
        </Platillo>

        {/* HOT DOG */}
        <Platillo img={p.hotdog?.img || `${BASE}/hotdog.jpeg`} titulo="HOT DOG">
          <div style={{ display:'flex', flexDirection:'column' }}>
            {(p.hotdog?.ingredientes?.length > 0 ? p.hotdog.ingredientes : ['Pan caliente','Salchicha italiana','Tocino','Queso amarillo','Frijoles','Chiles','Catsup','Mayonesa','Mostaza']).map((ing, i) => (
              <Bullet key={i}>{ing}</Bullet>
            ))}
          </div>
        </Platillo>

        {/* PAPAS FRANCESAS */}
        <Platillo img={p.papas?.img || `${BASE}/papas.jpeg`} titulo="PAPAS FRANCESAS">
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem', lineHeight:1.9 }}>
            {p.papas?.desc || 'Papa ondulada · Sin exceso de aceite · Con queso amarillo · Aderezo y catsup'}
          </p>
        </Platillo>
      </div>
    </div>
  )
}
