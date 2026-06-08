import React, { useState } from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images'
const BUCKET = 'https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images'
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

function ImageModal({ src, alt, onClose }) {
  const [scale, setScale] = React.useState(1)
  const containerRef = React.useRef(null)

  function zoomIn()  { setScale(s => Math.min(parseFloat((s + 0.5).toFixed(1)), 5)) }
  function zoomOut() { setScale(s => Math.max(parseFloat((s - 0.5).toFixed(1)), 1)) }
  function close()   { setScale(1); onClose() }

  return (
    <div onClick={close} style={{
      position:'fixed', inset:0, zIndex:500,
      background:'rgba(0,0,0,.9)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'1rem',
    }}>
      {/* Barra controles */}
      <div onClick={e => e.stopPropagation()} style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        width:'min(500px,92vw)', marginBottom:'.75rem',
        background:'rgba(17,24,39,.97)', border:'1px solid rgba(41,90,158,.4)',
        borderRadius:'.75rem', padding:'.5rem 1rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
          <button onClick={zoomOut} disabled={scale<=1} style={{
            background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.5)',
            color:'#fff', borderRadius:'.4rem', width:'2.4rem', height:'2.4rem',
            fontSize:'1.4rem', fontWeight:700, cursor:scale<=1?'not-allowed':'pointer',
            opacity:scale<=1?.3:1, display:'flex', alignItems:'center', justifyContent:'center',
          }}>−</button>
          <span style={{ color:'#fff', fontSize:'.9rem', fontWeight:700, minWidth:'3.5rem', textAlign:'center' }}>
            {scale.toFixed(1)}x
          </span>
          <button onClick={zoomIn} disabled={scale>=5} style={{
            background:'rgba(41,90,158,.2)', border:'1px solid rgba(41,90,158,.5)',
            color:'#fff', borderRadius:'.4rem', width:'2.4rem', height:'2.4rem',
            fontSize:'1.4rem', fontWeight:700, cursor:scale>=5?'not-allowed':'pointer',
            opacity:scale>=5?.3:1, display:'flex', alignItems:'center', justifyContent:'center',
          }}>+</button>
          {scale > 1 && (
            <span style={{ color:'rgba(255,255,255,.4)', fontSize:'.72rem', marginLeft:'.5rem' }}>
              desplaza para ver más
            </span>
          )}
        </div>
        <button onClick={close} style={{
          background:'rgba(220,38,38,.15)', border:'1px solid rgba(220,38,38,.35)',
          color:'#f87171', borderRadius:'.4rem', padding:'.35rem .85rem',
          fontSize:'.85rem', fontWeight:600, cursor:'pointer',
        }}>✕ Cerrar</button>
      </div>

      {/* Contenedor de imagen con scroll */}
      <div onClick={e => e.stopPropagation()} ref={containerRef} style={{
        width:'min(500px,92vw)',
        maxHeight:'80vh',
        overflow:'auto',
        borderRadius:'.75rem',
        background:'#000',
        scrollbarWidth:'thin',
      }}>
        <div style={{
          transformOrigin:'top left',
          transform:`scale(${scale})`,
          width:`${100/scale}%`,
        }}>
          <img
            src={src} alt={alt}
            draggable={false}
            style={{ width:'100%', display:'block', userSelect:'none' }}
          />
        </div>
      </div>
    </div>
  )
}

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
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,4,15,.4) 0%, rgba(15,5,20,.88) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 35%, rgba(180,30,10,.25) 0%, transparent 65%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,2,10,.65) 100%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'clamp(2rem, 5vh, 4rem) 1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'.5rem' }}>🍹</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h1)', fontWeight:'var(--fw-black)', letterSpacing:'var(--ls-tight)', color:'#fff', marginBottom:'.5rem' }}>
            {beb.titulo || 'CARTA DE BEBIDAS'}
          </h1>
          <p style={{ color:'rgba(234,234,234,.7)', fontSize:'.95rem' }}>
            {beb.promo || '🎂 Bebida de bienvenida gratis en tu cumpleaños'}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem' }}>
        {/* Toggle */}
        <div style={{ display:'flex', justifyContent:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <button onClick={() => setView('digital')} style={{
            padding:'.55rem 1.4rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:600,
            background: view==='digital' ? 'var(--primary)' : 'var(--card)',
            color: view==='digital' ? '#fff' : 'rgba(234,234,234,.65)',
            border: view==='digital' ? 'none' : '1px solid var(--border)',
            cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
          }}>📱 Carta Digital</button>
          <button onClick={() => setShowMenu(true)} style={{
            padding:'.55rem 1.4rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:600,
            background: 'var(--card)', color:'rgba(234,234,234,.65)',
            border:'1px solid var(--border)',
            cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
          }}>📄 Menú Impreso</button>
        </div>

        {view === 'digital' && (
          <>
            <div style={{ display:'flex', flexWrap:'nowrap', overflowX:'auto', WebkitOverflowScrolling:'touch', gap:'.5rem', justifyContent:'flex-start', marginBottom:'1.5rem', paddingBottom:'.25rem' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding:'.45rem 1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
                  background: activeCat===c ? 'var(--primary)' : 'var(--card)',
                  color: activeCat===c ? '#fff' : 'rgba(234,234,234,.65)',
                  border: activeCat===c ? 'none' : '1px solid var(--border)',
                  cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s', whiteSpace:'nowrap',
                }}>{c}</button>
              ))}
            </div>

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
                        <div style={{ fontSize:'.6rem', color:'rgba(234,234,234,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.1rem' }}>{isPrecio ? 'Precio' : 'Botella'}</div>
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
              {beb.nota || '*Propina opcional no incluida*'}
            </p>
          </>
        )}
      </div>

      {/* Modal Menú Impreso */}
      {showMenu && (
        <ImageModal
          src={`${BUCKET}/menu_impreso.png`}
          alt="Menú Litros & Litros"
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}
