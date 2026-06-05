import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

function BackBtn({ onClick }) {
  return null // solo en páginas de detalle
}

function SectionTitle({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.75rem', paddingBottom:'.75rem', borderBottom:'1px solid rgba(239,68,68,.2)' }}>
      <div style={{ width:'4px', height:'2rem', background:'linear-gradient(to bottom,#ef4444,#a855f7)', borderRadius:'2px', flexShrink:0 }}/>
      <h2 style={{ fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:800, fontFamily:'var(--font-head)' }}>{children}</h2>
    </div>
  )
}

function ItemCard({ icon, title, desc, onClick, img }) {
  return (
    <button onClick={onClick} style={{
      background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)',
      overflow:'hidden', cursor:'pointer', textAlign:'left', width:'100%',
      transition:'all .25s', display:'flex', flexDirection:'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(239,68,68,.4)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(239,68,68,.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='' }}
    >
      {img && (
        <div style={{ height:'160px', overflow:'hidden', flexShrink:0 }}>
          <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', transition:'transform .4s' }}
            onMouseEnter={e => e.target.style.transform='scale(1.05)'}
            onMouseLeave={e => e.target.style.transform=''}
          />
        </div>
      )}
      <div style={{ padding:'1.25rem', flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
            <span style={{ fontSize:'1.6rem' }}>{icon}</span>
            <span style={{ fontWeight:700, fontSize:'1rem', fontFamily:'var(--font-head)' }}>{title}</span>
          </div>
          <span style={{ color:'var(--primary)', fontSize:'1.2rem' }}>›</span>
        </div>
        {desc && <p style={{ color:'var(--fg-muted)', fontSize:'.85rem', marginTop:'.5rem', lineHeight:1.5 }}>{desc}</p>}
      </div>
    </button>
  )
}

export default function Home() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const h = cms.hero || {}

  function go(path) { navigate(path); window.scrollTo(0,0) }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100dvh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={h.bgImg || `${BASE}/1.jpeg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,.72)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.12) 0%, transparent 65%)' }} />
        </div>

        <div style={{ position:'relative', zIndex:2, maxWidth:'48rem', padding:'2rem 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
          <img src={h.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width:'8rem', height:'8rem', borderRadius:'1.25rem', objectFit:'cover' }} />

          <h1 className="gradient-text neon-text" style={{ fontSize:'clamp(2.5rem,7vw,4.5rem)', fontWeight:900, letterSpacing:'-.03em', lineHeight:1.05 }}>
            {h.title || 'Litros & Litros'}
          </h1>

          <div style={{ fontSize:'.9rem', fontWeight:600, color:'rgba(242,242,242,.6)', letterSpacing:'.05em', textTransform:'uppercase' }}>
            {h.subtitle || 'Karaoke Bar'}
          </div>

          <p style={{ fontSize:'clamp(.95rem,2vw,1.1rem)', color:'rgba(242,242,242,.88)', lineHeight:1.7, maxWidth:'36rem', fontStyle:'italic', borderLeft:'3px solid rgba(239,68,68,.5)', paddingLeft:'1rem', textAlign:'left' }}>
            "{h.frase || h.subtitle || 'El lugar donde se oye la música, el servicio y las alitas para pasar un excelente momento'}"
          </p>

          {/* 3 botones apilados centrados */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'stretch', gap:'.85rem', width:'100%', maxWidth:'22rem', marginTop:'.5rem' }}>
            <button className="btn btn-primary" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/menu-promo')}>
              📋 {h.btn1 || 'Ver Menú Promo'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem' }} onClick={() => go('/carta')}>
              🍹 {h.btn2 || 'Ver Carta'}
            </button>
            <button className="btn btn-outline" style={{ justifyContent:'center', fontSize:'1rem', borderColor:'rgba(168,85,247,.5)' }} onClick={() => go('/reserva')}>
              📅 {h.btn3 || 'Reservar'}
            </button>
          </div>

          <div style={{ padding:'.5rem 1.4rem', borderRadius:'999px', background:'rgba(0,0,0,.45)', border:'1px solid rgba(255,255,255,.15)', fontSize:'.85rem', color:'rgba(242,242,242,.8)', backdropFilter:'blur(8px)' }}>
            🕐 {h.horario || 'Mar – Dom  |  6:00 PM – 3:00 AM  |  Lunes Descansamos'}
          </div>
        </div>
      </section>

      {/* ── ALIMENTOS ── */}
      <section style={{ padding:'4rem 0', background:'rgba(255,255,255,.015)' }}>
        <div className="container">
          <SectionTitle>🍔 Alimentos</SectionTitle>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.25rem' }}>
            <ItemCard icon="🍗" title="Alitas"         desc="Marinadas con sabor a elegir · Aderezo incluido"       img={`${BASE}/3.jpeg`}  onClick={() => go('/alimento/alitas')} />
            <ItemCard icon="🧀" title="Nachos"         desc="Base crujiente + variantes especiales"                  img={`${BASE}/4.jpeg`}  onClick={() => go('/alimento/nachos')} />
            <ItemCard icon="🌭" title="Hot Dog"        desc="Pan caliente · Salchicha italiana · Receta completa"    img={`${BASE}/6.jpeg`}  onClick={() => go('/alimento/hotdog')} />
            <ItemCard icon="🍟" title="Papas Francesas" desc="Papa ondulada · Queso amarillo · Catsup"              img={`${BASE}/7.jpeg`}  onClick={() => go('/alimento/papas')} />
          </div>
        </div>
      </section>

      {/* ── HAMBURGUESA ── */}
      <section style={{ padding:'2rem 0 4rem' }}>
        <div className="container">
          <SectionTitle>🍔 Hamburguesa</SectionTitle>
          <div style={{ maxWidth:'480px' }}>
            <ItemCard icon="🍔" title="Hamburguesa" desc="Carne de res frita · Queso amarillo · Tocino · y más" img={`${BASE}/7.jpeg`} onClick={() => go('/alimento/hamburguesa')} />
          </div>
        </div>
      </section>

      {/* ── ESPECTÁCULOS ── */}
      <section style={{ padding:'2rem 0 4rem', background:'rgba(255,255,255,.015)' }}>
        <div className="container">
          <SectionTitle>🎭 Espectáculos</SectionTitle>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.25rem' }}>
            <ItemCard icon="🚪" title="Puerta Cerrada"       desc="Eventos privados con reservación anticipada"       img={`${BASE}/2.jpeg`}    onClick={() => go('/evento/puerta-cerrada')} />
            <ItemCard icon="🏆" title="Competencia de Voz"   desc="Participa y gana premios · Demuestra tu talento"   img={`${BASE}/open_mind.jpeg`} onClick={() => go('/evento/mejor-voz')} />
            <ItemCard icon="🎤" title="Karaoke con Animador" desc="Show completo · Dúos bienvenidos · Toda la noche"  img={`${BASE}/1.jpeg`}    onClick={() => go('/evento/karaoke')} />
            <ItemCard icon="⚔️" title="Compite con Mesero"   desc="¿Puedes ganarle? El ganador recibe bebida gratis"  img={`${BASE}/3.jpeg`}    onClick={() => go('/evento/vs-mesero')} />
          </div>
        </div>
      </section>

      {/* ── CUMPLEAÑOS ── */}
      <section style={{ padding:'2rem 0 5rem' }}>
        <div className="container">
          <SectionTitle>🎂 Especial Cumpleaños</SectionTitle>
          <div style={{ maxWidth:'480px' }}>
            <ItemCard icon="🎂" title="Especial Cumpleaños" desc="Mesa decorada · Bebida de bienvenida · Bebida gratis para el cumpleañero y acompañantes" img={`${BASE}/2.jpeg`} onClick={() => go('/evento/cumpleanos')} />
          </div>
        </div>
      </section>
    </>
  )
}
