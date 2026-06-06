import { useState, useRef } from 'react'
import React from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'




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



function ImageModal({ src, alt, onClose }) {
  const [scale, setScale] = React.useState(1)
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

const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

export default function CartaCompleta() {
  const { cms } = useCMS()
  const [activeCat, setActiveCat] = useState('Ron')
  const [view, setView] = useState('digital')
  const [showMenu, setShowMenu] = useState(false)

  const menu = (cms.menuBebidas || [])
  const beb  = cms.bebidas || {}
  const cats  = CAT_ORDER.filter(c => menu.some(b => b.cat === c))
  const items  = menu.filter(b => b.cat === activeCat)
  const isPrecio = ['Coctelería','Cerveza','Refrescos','Snacks'].includes(activeCat)

  return (
    <div style={{ minHeight:'100dvh', background:'#0d1520' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:'calc(100dvh - 80px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={beb.bgImg || `${BASE}/menu_litros.jpeg`} alt="Carta"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,18,40,.45) 0%, rgba(11,18,40,.92) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(41,90,158,.35) 0%, transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,10,25,.6) 100%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'clamp(2rem, 5vh, 4rem) 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🍹</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'.5rem' }}>
            CARTA DE BEBIDAS
          </h1>
          <p style={{ color:'rgba(234,234,234,.7)', fontSize:'.95rem' }}>
            🎂 Bebida de bienvenida gratis en tu cumpleaños
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem' }}>
        {/* Toggle digital / visual */}
        <div style={{ display:'flex', justifyContent:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <button onClick={() => setView('digital')} style={{
              padding:'.55rem 1.4rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:600,
              background: view === 'digital' ? 'var(--primary)' : 'var(--card)',
              color: view === 'digital' ? '#fff' : 'rgba(234,234,234,.65)',
              border: view === 'digital' ? 'none' : '1px solid var(--border)',
              cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
            }}>📱 Carta Digital</button>
            <button onClick={() => setShowMenu(true)} style={{
              padding:'.55rem 1.4rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:600,
              background: 'var(--card)', color:'rgba(234,234,234,.65)',
              border:'1px solid var(--border)',
              cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
            }}>📄 Menú Impreso</button>
        </div>

        {view === 'visual' && (
          <div style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'0 0 50px rgba(41,90,158,.2)' }}>
            <img src={`${BASE}/menu_litros.jpeg`} alt="Menú" style={{ width:'100%', height:'auto' }} />
          </div>
        )}

        {view === 'digital' && (
          <>
            {/* Tabs categorías */}
            <div style={{ display:'flex', flexWrap:'nowrap', gap:'.5rem', justifyContent:'flex-start', marginBottom:'1.5rem', overflowX:'auto', WebkitOverflowScrolling:'touch', paddingBottom:'.25rem' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding:'.45rem 1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
                  background: activeCat === c ? 'var(--primary)' : 'var(--card)',
                  color: activeCat === c ? '#fff' : 'rgba(234,234,234,.65)',
                  border: activeCat === c ? 'none' : '1px solid var(--border)',
                  cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
                }}>{c}</button>
              ))}
            </div>

            {/* Grid bebidas */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background:'var(--card)', border:'1px solid var(--border-s)',
                  borderRadius:'var(--radius-lg)', padding:'1.25rem', transition:'all .25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(41,90,158,.7)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(41,90,158,.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-s)'; e.currentTarget.style.boxShadow='' }}
                >
                  <div style={{ display:'flex', justifyContent:'space-between', gap:'.5rem', marginBottom:'.75rem' }}>
                    <span style={{ fontWeight:700, fontSize:'.92rem', color:'#fff', lineHeight:1.35, flex:1 }}>{item.name}</span>
                    <span style={{ fontSize:'.72rem', color:'rgba(234,234,234,.4)', whiteSpace:'nowrap' }}>{item.vol}</span>
                  </div>
                  <div style={{ display:'flex', gap:'1.5rem' }}>
                    {item.botella != null && (
                      <div>
                        <div style={{ fontSize:'.6rem', color:'rgba(234,234,234,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.1rem' }}>
                          {isPrecio ? 'Precio' : 'Botella'}
                        </div>
                        <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--primary-l)' }}>${item.botella}</div>
                      </div>
                    )}
                    {item.copa != null && (
                      <div>
                        <div style={{ fontSize:'.6rem', color:'rgba(234,234,234,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.1rem' }}>Copa</div>
                        <div style={{ fontSize:'1.1rem', fontWeight:800, color:'rgba(234,234,234,.85)' }}>${item.copa}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign:'center', marginTop:'2rem', fontSize:'.78rem', color:'rgba(234,234,234,.25)' }}>
              *Propina opcional no incluida*
            </p>
          </>
        )}
      </div>

      {/* Modal Menú Impreso */}
      {showMenu && (
        <div
          onClick={() => { setShowMenu(false); setZoom(1) }}
          style={{
            position:'fixed', inset:0, zIndex:500,
            background:'rgba(0,0,0,.92)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'1rem',
            cursor:'zoom-out',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:'900px', width:'100%', maxHeight:'90dvh' }}>
            {/* Botón cerrar */}
            <button onClick={() => { setShowMenu(false); setZoom(1) }} style={{
              position:'absolute', top:'-2.5rem', right:0,
              background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.4)',
              color:'#fff', borderRadius:'.5rem', padding:'.4rem .9rem',
              fontSize:'.85rem', fontWeight:600, cursor:'pointer', zIndex:10,
              fontFamily:'var(--font-body)',
            }}>✕ Cerrar</button>

            {/* Controles de zoom */}
            <div style={{ position:'absolute', top:'-2.5rem', left:0, display:'flex', gap:'.5rem' }}>
              <button
                onClick={() => setZoom(z => Math.min(z + 1, 3))}
                disabled={zoom >= 3}
                style={{ background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.4)', color:'#fff', borderRadius:'.5rem', padding:'.4rem .75rem', fontSize:'1rem', cursor: zoom >= 3 ? 'not-allowed' : 'pointer', opacity: zoom >= 3 ? .4 : 1, fontWeight:700 }}
                title="Acercar">🔍+</button>
              <button
                onClick={() => setZoom(z => Math.max(z - 1, 1))}
                disabled={zoom <= 1}
                style={{ background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.4)', color:'#fff', borderRadius:'.5rem', padding:'.4rem .75rem', fontSize:'1rem', cursor: zoom <= 1 ? 'not-allowed' : 'pointer', opacity: zoom <= 1 ? .4 : 1, fontWeight:700 }}
                title="Alejar">🔍-</button>
              <span style={{ background:'rgba(0,0,0,.5)', color:'rgba(255,255,255,.6)', borderRadius:'.5rem', padding:'.4rem .75rem', fontSize:'.8rem', display:'flex', alignItems:'center' }}>
                {zoom}x
              </span>
            </div>

            {/* Imagen del menú impreso con zoom */}
            <div style={{ overflow: zoom > 1 ? 'auto' : 'hidden', maxHeight:'90dvh', borderRadius:'var(--radius-lg)', cursor: zoom < 3 ? 'zoom-in' : zoom > 1 ? 'zoom-out' : 'default' }}
              onClick={() => {
                if (zoom < 3) setZoom(z => z + 1)
                else setZoom(1)
              }}
            >
              <img
                src="https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images/menu_impreso.png"
                alt="Menú Litros & Litros"
                style={{
                  width: zoom === 1 ? '100%' : `${zoom * 100}%`,
                  display:'block',
                  transform:'scale(1)',
                  transformOrigin:'top left',
                  transition:'width .3s ease',
                  userSelect:'none',
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
