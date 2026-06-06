import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const BUCKET = 'https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images'

const PROMOS = [
  { cat:'🍺 Cervezas', items:[
    { name:'3 Cervezas', precio:'$75', detalle:'Carta Blanca' },
    { name:'10 Cervezas', precio:'$260', detalle:'355 ml c/u' },
    { name:'MicheLitro', precio:'$98', detalle:'Especial de la casa' },
  ]},
  { cat:'🪣 Naturales', items:[
    { name:'Ron, Tequila, Vodka o Gin', precio:'$175', detalle:'3 Litros c/ Mezclado — Cubotas' },
  ]},
  { cat:'🥤 Escarchados', items:[
    { name:'Sandía · Mango · Tamarindo', precio:'$190', detalle:'3 Litros' },
    { name:'Limón · Piña · Frutos Rojos', precio:'$190', detalle:'3 Litros' },
  ]},
  { cat:'🍶 Caguamón', items:[
    { name:'Xxlager · Carta Blanca · Victoria', precio:'$190', detalle:'2 × 1.2 L' },
  ]},
  { cat:'🌮 Alimentos', items:[
    { name:'Nachos Árabe', precio:'$100', detalle:'Especial' },
    { name:'Nachos Pastor', precio:'$100', detalle:'Especial' },
    { name:'Hot Dog', precio:'$48', detalle:'Especial' },
    { name:'Alitas (7)', precio:'$78', detalle:'Con aderezo' },
  ]},
]

function ImageModal({ src, alt, onClose }) {
  const [scale, setScale] = useState(1)
  const ref = React.useRef(null)
  const dragging = React.useRef(false)
  const last = React.useRef({ x:0, y:0 })

  function zoomIn()  { setScale(s => Math.min(parseFloat((s+0.5).toFixed(1)), 5)) }
  function zoomOut() {
    setScale(s => {
      const n = parseFloat((s-0.5).toFixed(1))
      if (n <= 1 && ref.current) { ref.current.scrollLeft=0; ref.current.scrollTop=0 }
      return Math.max(n, 1)
    })
  }
  function close() { setScale(1); onClose() }
  function onMD(e) { if(scale<=1) return; e.preventDefault(); dragging.current=true; last.current={x:e.clientX,y:e.clientY} }
  function onMM(e) { if(!dragging.current||!ref.current) return; ref.current.scrollLeft-=(e.clientX-last.current.x); ref.current.scrollTop-=(e.clientY-last.current.y); last.current={x:e.clientX,y:e.clientY} }
  function onMU()  { dragging.current=false }
  function onTS(e) { if(scale<=1) return; const t=e.touches[0]; dragging.current=true; last.current={x:t.clientX,y:t.clientY} }
  function onTM(e) { if(!dragging.current||!ref.current) return; const t=e.touches[0]; ref.current.scrollLeft-=(t.clientX-last.current.x); ref.current.scrollTop-=(t.clientY-last.current.y); last.current={x:t.clientX,y:t.clientY} }

  return (
    <div onClick={close} style={{ position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,.88)',display:'flex',alignItems:'center',justifyContent:'center',padding:'3.5rem 1rem 1rem' }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:'relative',width:'min(500px,92vw)',display:'flex',flexDirection:'column',gap:'.75rem' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(17,24,39,.95)',border:'1px solid rgba(41,90,158,.4)',borderRadius:'.75rem',padding:'.5rem 1rem' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'.5rem' }}>
            <button onClick={zoomOut} disabled={scale<=1} style={{ background:'rgba(41,90,158,.2)',border:'1px solid rgba(41,90,158,.4)',color:'#fff',borderRadius:'.4rem',width:'2.2rem',height:'2.2rem',fontSize:'1.2rem',cursor:scale<=1?'not-allowed':'pointer',opacity:scale<=1?.3:1,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
            <span style={{ color:'#fff',fontSize:'.85rem',fontWeight:600,minWidth:'3rem',textAlign:'center' }}>{scale.toFixed(1)}x</span>
            <button onClick={zoomIn} disabled={scale>=5} style={{ background:'rgba(41,90,158,.2)',border:'1px solid rgba(41,90,158,.4)',color:'#fff',borderRadius:'.4rem',width:'2.2rem',height:'2.2rem',fontSize:'1.2rem',cursor:scale>=5?'not-allowed':'pointer',opacity:scale>=5?.3:1,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
            {scale>1 && <span style={{ color:'rgba(255,255,255,.4)',fontSize:'.7rem',marginLeft:'.25rem' }}>arrastra</span>}
          </div>
          <button onClick={close} style={{ background:'rgba(220,38,38,.15)',border:'1px solid rgba(220,38,38,.3)',color:'#f87171',borderRadius:'.4rem',padding:'.3rem .75rem',fontSize:'.82rem',fontWeight:600,cursor:'pointer' }}>✕</button>
        </div>
        <div ref={ref}
          onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
          onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onMU}
          style={{ overflow:'auto',borderRadius:'.75rem',maxHeight:'78vh',cursor:scale>1?'grab':'default',background:'#000',scrollbarWidth:'thin' }}>
          <img src={src} alt={alt} draggable={false}
            style={{ display:'block',width:`${scale*100}%`,minWidth:'100%',transition:'width .2s ease',userSelect:'none',pointerEvents:'none' }} />
        </div>
      </div>
    </div>
  )
}

export default function MenuPromo() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [showPromo, setShowPromo] = useState(false)
  const mp = cms.menuPromo || {}

  return (
    <div style={{ minHeight:'100dvh', background:'#0d1520' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:'calc(100dvh - 80px)', overflow:'hidden', background:'#0a0f19', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={mp.fotoUrl || `${BASE}/promociones.jpeg`} alt="Promos"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,18,40,.45) 0%, rgba(11,18,40,.92) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(41,90,158,.35) 0%, transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,10,25,.6) 100%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'clamp(2rem, 5vh, 4rem) 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🎉</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'.75rem' }}>
            {mp.titulo || 'MENÚ PROMO'}
          </h1>
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem' }}>{mp.subtitulo || 'Las mejores promociones para tu noche'}</p>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem' }}>
        {/* Botón Carta Promo */}
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'1rem' }}>
          <button onClick={() => setShowPromo(true)} style={{
            display:'inline-flex', alignItems:'center', gap:'.5rem',
            padding:'.55rem 1.25rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:700,
            background:'linear-gradient(135deg,#295A9E,#1B3F6B)', color:'#fff',
            border:'none', cursor:'pointer', fontFamily:'var(--font-body)',
            boxShadow:'0 4px 16px rgba(41,90,158,.4)',
          }}>📋 Carta Promo</button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', flexWrap:'nowrap', overflowX:'auto', WebkitOverflowScrolling:'touch', gap:'.5rem', justifyContent:'flex-start', marginBottom:'2rem', paddingBottom:'.25rem' }}>
          {PROMOS.map((p, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding:'.5rem 1.1rem', borderRadius:'999px', fontSize:'.85rem', fontWeight:600,
              background: activeTab === i ? 'var(--primary)' : 'var(--card)',
              color: activeTab === i ? '#fff' : 'rgba(234,234,234,.65)',
              border: activeTab === i ? 'none' : '1px solid var(--border)',
              cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)', whiteSpace:'nowrap',
            }}>{p.cat}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1.25rem' }}>
          {PROMOS[activeTab].items.map((item, i) => (
            <div key={i} style={{
              background:'var(--card)', border:'1px solid var(--border-s)',
              borderRadius:'var(--radius-lg)', padding:'1.75rem',
              display:'flex', flexDirection:'column', gap:'.75rem',
              transition:'all .3s',
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

        <p style={{ textAlign:'center', marginTop:'3rem', fontSize:'.8rem', color:'rgba(234,234,234,.35)' }}>
          {mp.nota || 'BLVD 5 DE MAYO #4610 · +222 430 26 93 · *Precios sujetos a cambio*'}
        </p>
      </div>

      {/* Modal Carta Promo */}
      {showPromo && (
        <ImageModal
          src={`${BUCKET}/menu_promo.jpeg`}
          alt="Carta Promo Litros & Litros"
          onClose={() => setShowPromo(false)}
        />
      )}
    </div>
  )
}
