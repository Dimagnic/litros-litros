import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

const NAV = [
  { label:'Inicio',            path:'/'            },
  { label:'Alimentos',         path:'/alimentos'   },
  { label:'Hamburguesas',      path:'/hamburguesa' },
  { label:'Eventos Especiales',path:'/eventos'     },
]

export default function Header() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function go(path) { setMobileOpen(false); navigate(path); window.scrollTo(0,0) }
  const active = (path) => location.pathname === path

  return (
    <header style={{
      position:'sticky', top:0, zIndex:100,
      height:'80px',
      background: scrolled ? 'rgba(17,24,39,.98)' : 'rgba(17,24,39,.92)',
      backdropFilter:'blur(20px)',
      borderBottom:`1px solid ${scrolled ? 'rgba(41,90,158,.4)' : 'rgba(41,90,158,.15)'}`,
      transition:'all .3s',
    }}>
      <div className="container" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        <button onClick={() => go('/')} style={{ display:'flex', alignItems:'center', gap:'.75rem', background:'none', border:'none', cursor:'pointer' }}>
          <img src={cms.hero?.logo} alt="Logo" style={{ height:'2.6rem', borderRadius:'.5rem', objectFit:'cover' }} />
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:'1rem', fontWeight:800, fontFamily:'var(--font-head)', color:'#fff', lineHeight:1.1 }}>Litros & Litros</div>
            <div style={{ fontSize:'.65rem', color:'rgba(234,234,234,.55)', letterSpacing:'.06em', textTransform:'uppercase' }}>Karaoke Bar</div>
          </div>
        </button>

        <nav className="desk-nav" style={{ display:'flex', alignItems:'center', gap:'.25rem' }}>
          {NAV.map(n => (
            <button key={n.path} onClick={() => go(n.path)} style={{
              padding:'.5rem 1rem', borderRadius:'.5rem',
              fontSize:'.88rem', fontWeight: active(n.path) ? 700 : 500,
              color: active(n.path) ? '#fff' : 'rgba(234,234,234,.7)',
              background: active(n.path) ? 'var(--primary)' : 'transparent',
              border:'none', cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}
              onMouseEnter={e => { if(!active(n.path)) { e.currentTarget.style.background='rgba(41,90,158,.15)'; e.currentTarget.style.color='#fff' }}}
              onMouseLeave={e => { if(!active(n.path)) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(234,234,234,.7)' }}}
            >{n.label}</button>
          ))}
        </nav>

        <button className="menu-toggle" onClick={() => setMobileOpen(o=>!o)}
          style={{ display:'none', background:'none', border:'none', cursor:'pointer', color:'#fff', padding:'.35rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{ padding:'1rem', borderTop:'1px solid rgba(41,90,158,.2)', background:'#111827', display:'flex', flexDirection:'column', gap:'.35rem' }}>
          {NAV.map(n => (
            <button key={n.path} onClick={() => go(n.path)} style={{
              padding:'.75rem 1rem', borderRadius:'.5rem', fontSize:'.95rem', fontWeight: active(n.path) ? 700 : 500,
              color: active(n.path) ? '#fff' : 'rgba(234,234,234,.75)',
              background: active(n.path) ? 'var(--primary)' : 'transparent',
              border:'none', cursor:'pointer', textAlign:'left',
            }}>{n.label}</button>
          ))}
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none !important;}.menu-toggle{display:flex !important;align-items:center;}}`}</style>
    </header>
  )
}
