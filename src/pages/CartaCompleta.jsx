import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

const CAT_COLORS = {
  Ron:'#ef4444', Vodka:'#3b82f6', Tequila:'#f97316', Brandy:'#a855f7',
  Whisky:'#eab308', Mezcal:'#22c55e', Digestivos:'#ec4899',
  Coctelería:'#06b6d4', Cerveza:'#f59e0b', Refrescos:'#10b981', Snacks:'#ef4444',
}
const CAT_ORDER = ['Ron','Vodka','Tequila','Brandy','Whisky','Mezcal','Digestivos','Coctelería','Cerveza','Refrescos','Snacks']

export default function CartaCompleta() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const menuBebidas = cms.menuBebidas || []
  const cats = CAT_ORDER.filter(c => menuBebidas.some(b => b.cat === c))
  const [activeCat, setActiveCat] = useState(cats[0])
  const [tab, setTab] = useState('bebidas') // 'bebidas' | 'menu'
  const color = CAT_COLORS[activeCat] || '#ef4444'
  const items = menuBebidas.filter(b => b.cat === activeCat)
  const isPrecio = ['Coctelería','Cerveza','Refrescos','Snacks'].includes(activeCat)

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)' }}>
      <div className="container" style={{ padding:'2.5rem 1.5rem 5rem' }}>
        <button onClick={() => { navigate('/'); window.scrollTo(0,0) }} style={{
          display:'inline-flex', alignItems:'center', gap:'.5rem',
          background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)',
          color:'var(--primary)', borderRadius:'.6rem', padding:'.5rem 1.1rem',
          fontSize:'.9rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:'2rem',
        }}>← Regresar</button>

        <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, marginBottom:'1.5rem',
          background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          📋 Carta Completa
        </h1>

        {/* Tabs: Bebidas | Menú visual */}
        <div style={{ display:'flex', gap:'.5rem', marginBottom:'2rem' }}>
          {[['bebidas','🍹 Bebidas'],['menu','📄 Menú Visual']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding:'.5rem 1.25rem', borderRadius:'999px', fontSize:'.9rem', fontWeight:700,
              background: tab === key ? 'linear-gradient(135deg,#ef4444,#a855f7)' : 'var(--card2)',
              color: tab === key ? '#fff' : 'var(--fg-muted)',
              border: tab === key ? 'none' : '1px solid var(--border)',
              cursor:'pointer', fontFamily:'var(--font-body)',
            }}>{label}</button>
          ))}
        </div>

        {tab === 'menu' && (
          <div style={{ borderRadius:'var(--radius)', overflow:'hidden', boxShadow:'0 0 40px rgba(239,68,68,.15)' }}>
            <img src={`${BASE}/menu_litros.jpeg`} alt="Carta Litros & Litros" style={{ width:'100%', height:'auto', display:'block' }} />
          </div>
        )}

        {tab === 'bebidas' && (
          <>
            {/* Promo */}
            <div style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.2)', borderRadius:'var(--radius)', padding:'.85rem 1.25rem', marginBottom:'2rem', textAlign:'center', fontWeight:600 }}>
              🎂 Bebida de bienvenida gratis en tu cumpleaños
            </div>

            {/* Tabs categorías */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'2rem' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding:'.4rem 1rem', borderRadius:'999px', fontSize:'.8rem', fontWeight:600,
                  background: activeCat === c ? CAT_COLORS[c] : 'var(--card2)',
                  color: activeCat === c ? '#fff' : 'var(--fg-muted)',
                  border: activeCat === c ? 'none' : '1px solid var(--border)',
                  cursor:'pointer', fontFamily:'var(--font-body)',
                }}>{c}</button>
              ))}
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ background:'var(--card)', border:`1px solid ${color}25`, borderRadius:'var(--radius)', padding:'1.1rem', transition:'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=color+'60'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}20` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=color+'25'; e.currentTarget.style.boxShadow='' }}
                >
                  <div style={{ display:'flex', justifyContent:'space-between', gap:'.5rem', marginBottom:'.6rem' }}>
                    <span style={{ fontWeight:700, fontSize:'.9rem', flex:1, lineHeight:1.35 }}>{item.name}</span>
                    <span style={{ fontSize:'.72rem', color:'var(--fg-muted)', whiteSpace:'nowrap' }}>{item.vol}</span>
                  </div>
                  <div style={{ display:'flex', gap:'1.25rem' }}>
                    {item.botella != null && (
                      <div>
                        <div style={{ fontSize:'.6rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.1rem' }}>{isPrecio ? 'Precio' : 'Botella'}</div>
                        <div style={{ fontSize:'1.05rem', fontWeight:800, color }}>${item.botella}</div>
                      </div>
                    )}
                    {item.copa != null && (
                      <div>
                        <div style={{ fontSize:'.6rem', color:'var(--fg-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.1rem' }}>Copa</div>
                        <div style={{ fontSize:'1.05rem', fontWeight:800, color:'var(--primary)' }}>${item.copa}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign:'center', marginTop:'2rem', fontSize:'.78rem', color:'rgba(160,160,160,.4)' }}>*Propina opcional no incluida*</p>
          </>
        )}
      </div>
    </div>
  )
}
