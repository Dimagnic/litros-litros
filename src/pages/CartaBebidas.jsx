import { useState } from 'react'
import { useCMS } from '@/context/CMSContext'

const CAT_COLORS = {
  Ron:'#ef4444', Vodka:'#3b82f6', Tequila:'#f97316', Brandy:'#a855f7',
  Whisky:'#eab308', Mezcal:'#22c55e', Digestivos:'#ec4899',
  Coctelería:'#06b6d4', Cerveza:'#f59e0b', Refrescos:'#10b981', Snacks:'#ef4444',
}
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

export default function CartaBebidas() {
  const { cms } = useCMS()
  const menuBebidas = cms.menuBebidas || []
  const cats = CAT_ORDER.filter(c => menuBebidas.some(b => b.cat === c))
  const [activeCat, setActiveCat] = useState(cats[0])
  const color = CAT_COLORS[activeCat] || '#ef4444'
  const items = menuBebidas.filter(b => b.cat === activeCat)
  const isPrecio = ['Coctelería','Cerveza','Refrescos','Snacks'].includes(activeCat)

  return (
    <>
      {/* Header */}
      <div style={{ padding:'3rem 0 2rem', textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,.08) 0%, transparent 60%)' }}>
        <div className="container">
          <h1 className="section-title gradient-text" style={{ marginBottom:'.75rem' }}>Carta de Bebidas</h1>
          <p style={{ color:'var(--fg-muted)', fontSize:'1rem' }}>
            La mejor selección de destilados, cocteles y bebidas
          </p>
          {/* Promo cumple */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', marginTop:'1rem',
            padding:'.5rem 1.25rem', borderRadius:'999px',
            background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
            fontSize:'.9rem', fontWeight:600, color:'var(--fg)' }}>
            🎂 Bebida de bienvenida gratis en tu cumpleaños
          </div>
        </div>
      </div>

      <section style={{ padding:'2rem 0 5rem' }}>
        <div className="container">
          {/* Tabs categorías */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'2.5rem', justifyContent:'center' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} style={{
                padding:'.45rem 1.1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:600,
                background: activeCat === c ? CAT_COLORS[c] : 'var(--card2)',
                color: activeCat === c ? '#fff' : 'var(--fg-muted)',
                border: activeCat === c ? 'none' : '1px solid var(--border)',
                cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
              }}>{c}</button>
            ))}
          </div>

          {/* Grid items */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{
                background:'var(--card)', border:`1px solid ${color}25`,
                borderRadius:'var(--radius)', padding:'1.25rem', transition:'all .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=color+'60'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=color+'25'; e.currentTarget.style.boxShadow='' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'.5rem', marginBottom:'.65rem' }}>
                  <span style={{ fontWeight:700, fontSize:'.92rem', flex:1, lineHeight:1.35 }}>{item.name}</span>
                  <span style={{ fontSize:'.72rem', color:'var(--fg-muted)', whiteSpace:'nowrap', flexShrink:0 }}>{item.vol}</span>
                </div>
                <div style={{ display:'flex', gap:'1.5rem' }}>
                  {item.botella != null && (
                    <div>
                      <div style={{ fontSize:'.62rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.15rem' }}>
                        {isPrecio ? 'Precio' : 'Botella'}
                      </div>
                      <div style={{ fontSize:'1.1rem', fontWeight:800, color }}>${item.botella}</div>
                    </div>
                  )}
                  {item.copa != null && (
                    <div>
                      <div style={{ fontSize:'.62rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.15rem' }}>Copa</div>
                      <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--primary)' }}>${item.copa}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign:'center', marginTop:'2.5rem', fontSize:'.8rem', color:'rgba(160,160,160,.5)' }}>
            *Propina opcional no incluida*
          </p>
        </div>
      </section>
    </>
  )
}
