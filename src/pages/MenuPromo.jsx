import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

const PROMOS = [
  { cat:'🍺 Cervezas',    color:'#295A9E', items:[
    { name:'3 Cervezas',        precio:'$75',  detalle:'Carta Blanca' },
    { name:'10 Cervezas',       precio:'$260', detalle:'355 ml c/u' },
    { name:'MicheLitro',        precio:'$98',  detalle:'Especial de la casa' },
  ]},
  { cat:'🪣 Naturales',   color:'#1B3F6B', items:[
    { name:'Ron, Tequila, Vodka o Gin', precio:'$175', detalle:'3 Litros c/ Mezclado — Cubotas' },
  ]},
  { cat:'🥤 Escarchados', color:'#164e8c', items:[
    { name:'Sandía · Mango · Tamarindo', precio:'$190', detalle:'3 Litros' },
    { name:'Limón · Piña · Frutos Rojos', precio:'$190', detalle:'3 Litros' },
  ]},
  { cat:'🍶 Caguamón',    color:'#1a3a6b', items:[
    { name:'Xxlager · Carta Blanca · Victoria', precio:'$190', detalle:'2 × 1.2 L' },
  ]},
  { cat:'🌮 Alimentos',   color:'#0f3060', items:[
    { name:'Nachos Árabe',   precio:'$100', detalle:'Especial' },
    { name:'Nachos Pastor',  precio:'$100', detalle:'Especial' },
    { name:'Hot Dog',        precio:'$48',  detalle:'Especial' },
    { name:'Alitas (7)',     precio:'$78',  detalle:'Con aderezo' },
  ]},
]

export default function MenuPromo() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const mp = cms.menuPromo || {}

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Hero con imagen de fondo */}
      <div style={{ position:'relative', minHeight:'40vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={mp.fotoUrl || `${BASE}/promociones.jpeg`} alt="Promos"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,.82)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(41,90,158,.25) 0%, transparent 65%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'3rem 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🎉</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, color:'#fff', marginBottom:'.75rem', letterSpacing:'-.02em' }}>
            MENÚ PROMO
          </h1>
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem' }}>
            Las mejores promociones para tu noche
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem' }}>
        {/* Tabs categorías */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', justifyContent:'center', marginBottom:'2.5rem' }}>
          {PROMOS.map((p, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding:'.5rem 1.1rem', borderRadius:'999px', fontSize:'.85rem', fontWeight:600,
              background: activeTab === i ? 'var(--primary)' : 'var(--card)',
              color: activeTab === i ? '#fff' : 'rgba(234,234,234,.65)',
              border: activeTab === i ? 'none' : '1px solid var(--border)',
              cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}>{p.cat}</button>
          ))}
        </div>

        {/* Cards de la categoría activa */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.25rem' }}>
          {PROMOS[activeTab].items.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{
              background:'var(--card)', border:'1px solid var(--border-s)',
              borderRadius:'var(--radius-lg)', padding:'1.75rem',
              display:'flex', flexDirection:'column', gap:'.75rem',
              transition:'all .3s', animationDelay:`${i * .08}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 10px 35px rgba(41,90,158,.25)'; e.currentTarget.style.borderColor='rgba(41,90,158,.7)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='var(--border-s)' }}
            >
              <div style={{ fontWeight:700, fontSize:'1.05rem', color:'#fff' }}>{item.name}</div>
              <div style={{ fontSize:'.85rem', color:'rgba(234,234,234,.55)' }}>{item.detalle}</div>
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--primary-l)', lineHeight:1 }}>{item.precio}</div>
            </div>
          ))}
        </div>

        {/* Nota y CTA */}
        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <p style={{ color:'rgba(234,234,234,.35)', fontSize:'.8rem', marginBottom:'1.5rem' }}>
            BLVD 5 DE MAYO #4610 · +222 430 26 93 · *Precios sujetos a cambio sin previo aviso*
          </p>
          <button className="btn btn-primary" onClick={() => { navigate('/reserva'); window.scrollTo(0,0) }}>
            RESERVAR AHORA
          </button>
        </div>
      </div>
    </div>
  )
}
