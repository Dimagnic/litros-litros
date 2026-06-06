import { useState, useRef } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'


function ImageModal({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x:0, y:0 })
  const [startPos, setStartPos] = useState({ x:0, y:0 })
  const [startScroll, setStartScroll] = useState({ x:0, y:0 })
  const containerRef = React.useRef(null)

  function handleMouseDown(e) {
    if (zoom <= 1) return
    e.preventDefault()
    setDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    setStartScroll({ x: containerRef.current.scrollLeft, y: containerRef.current.scrollTop })
  }

  function handleMouseMove(e) {
    if (!dragging) return
    const dx = e.clientX - startPos.x
    const dy = e.clientY - startPos.y
    containerRef.current.scrollLeft = startScroll.x - dx
    containerRef.current.scrollTop  = startScroll.y - dy
  }

  function handleMouseUp() { setDragging(false) }

  // Touch support
  function handleTouchStart(e) {
    if (zoom <= 1) return
    const t = e.touches[0]
    setDragging(true)
    setStartPos({ x: t.clientX, y: t.clientY })
    setStartScroll({ x: containerRef.current.scrollLeft, y: containerRef.current.scrollTop })
  }

  function handleTouchMove(e) {
    if (!dragging) return
    const t = e.touches[0]
    const dx = t.clientX - startPos.x
    const dy = t.clientY - startPos.y
    containerRef.current.scrollLeft = startScroll.x - dx
    containerRef.current.scrollTop  = startScroll.y - dy
  }

  function handleClose() { setZoom(1); setPos({ x:0, y:0 }); onClose() }

  return (
    <div onClick={handleClose} style={{
      position:'fixed', inset:0, zIndex:500,
      background:'rgba(0,0,0,.93)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:'900px', width:'100%', maxHeight:'90dvh' }}>

        {/* Controles zoom */}
        <div style={{ position:'absolute', top:'-2.75rem', left:0, display:'flex', gap:'.4rem', alignItems:'center' }}>
          <button onClick={() => setZoom(z => Math.min(z+1,10))} disabled={zoom>=10}
            style={{ background:'rgba(41,90,158,.25)', border:'1px solid rgba(41,90,158,.5)', color:'#fff', borderRadius:'.5rem', padding:'.4rem .75rem', fontSize:'1rem', cursor: zoom>=10?'not-allowed':'pointer', opacity: zoom>=10?.35:1, fontWeight:700, transition:'opacity .2s' }}>🔍+</button>
          <button onClick={() => setZoom(z => Math.max(z-1,1))} disabled={zoom<=1}
            style={{ background:'rgba(41,90,158,.25)', border:'1px solid rgba(41,90,158,.5)', color:'#fff', borderRadius:'.5rem', padding:'.4rem .75rem', fontSize:'1rem', cursor: zoom<=1?'not-allowed':'pointer', opacity: zoom<=1?.35:1, fontWeight:700, transition:'opacity .2s' }}>🔍-</button>
          <span style={{ background:'rgba(0,0,0,.6)', color:'rgba(255,255,255,.7)', borderRadius:'.5rem', padding:'.35rem .7rem', fontSize:'.78rem', fontWeight:600 }}>{zoom}x</span>
          {zoom > 1 && <span style={{ color:'rgba(255,255,255,.4)', fontSize:'.72rem' }}>— arrastra para moverte</span>}
        </div>

        {/* Botón cerrar */}
        <button onClick={handleClose} style={{
          position:'absolute', top:'-2.75rem', right:0,
          background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.4)',
          color:'#fff', borderRadius:'.5rem', padding:'.4rem .9rem',
          fontSize:'.85rem', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)',
        }}>✕ Cerrar</button>

        {/* Contenedor imagen con scroll y drag */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{
            overflow: zoom > 1 ? 'auto' : 'hidden',
            maxHeight:'90dvh',
            borderRadius:'var(--radius-lg)',
            cursor: dragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default',
            userSelect:'none',
            scrollbarWidth:'thin',
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              width: zoom === 1 ? '100%' : `${zoom * 100}%`,
              display:'block',
              transition: dragging ? 'none' : 'width .25s ease',
              userSelect:'none',
              pointerEvents:'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}

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
  const [showPromo, setShowPromo] = useState(false)
  const mp = cms.menuPromo || {}

  return (
    <div style={{ minHeight:'100dvh', background:'#0d1520' }}>
      {/* Hero con imagen de fondo */}
      <div style={{ position:'relative', height:'calc(100dvh - 80px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={mp.fotoUrl || `${BASE}/promociones.jpeg`} alt="Promos"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,18,40,.45) 0%, rgba(11,18,40,.92) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(41,90,158,.35) 0%, transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,10,25,.6) 100%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'clamp(2rem, 5vh, 4rem) 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🎉</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'.75rem' }}>
            MENÚ PROMO
          </h1>
          <p style={{ color:'rgba(234,234,234,.75)', fontSize:'1rem' }}>
            Las mejores promociones para tu noche
          </p>
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
            boxShadow:'0 4px 16px rgba(41,90,158,.4)', transition:'all .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity='.85'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >📋 Carta Promo</button>
        </div>

        {/* Tabs categorías */}
        <div style={{ display:'flex', flexWrap:'nowrap', overflowX:'auto', WebkitOverflowScrolling:'touch', gap:'.5rem', justifyContent:'flex-start', marginBottom:'2rem', paddingBottom:'.25rem' }}>
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
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1.25rem' }}>
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

      {/* Modal Carta Promo */}
      {showPromo && (
        <ImageModal
          src="https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images/menu_promo.jpeg"
          alt="Carta Promo Litros & Litros"
          onClose={() => setShowPromo(false)}
        />
      )}
    </div>
  )
}
