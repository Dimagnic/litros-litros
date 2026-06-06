import { useState } from 'react'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

export default function CartaCompleta() {
  const { cms } = useCMS()
  const [activeCat, setActiveCat] = useState('Ron')
  const [view, setView] = useState('digital') // 'digital' | 'visual'

  const menu = (cms.menuBebidas || [])
  const cats  = CAT_ORDER.filter(c => menu.some(b => b.cat === c))
  const items  = menu.filter(b => b.cat === activeCat)
  const isPrecio = ['Coctelería','Cerveza','Refrescos','Snacks'].includes(activeCat)

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:'calc(100dvh - 80px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={`${BASE}/menu_litros.jpeg`} alt="Carta"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,.80)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(41,90,158,.2) 0%, transparent 65%)' }} />
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem 1.5rem' }}>
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
          {[['digital','📱 Carta Digital'],['visual','📄 Menú Impreso']].map(([k, label]) => (
            <button key={k} onClick={() => setView(k)} style={{
              padding:'.55rem 1.4rem', borderRadius:'999px', fontSize:'.88rem', fontWeight:600,
              background: view === k ? 'var(--primary)' : 'var(--card)',
              color: view === k ? '#fff' : 'rgba(234,234,234,.65)',
              border: view === k ? 'none' : '1px solid var(--border)',
              cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s',
            }}>{label}</button>
          ))}
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
    </div>
  )
}
