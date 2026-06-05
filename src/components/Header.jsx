import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'

const NAV = [
  { label:'Inicio',           path:'/'           },
  { label:'Menú Promo',       path:'/menu-promo' },
  { label:'Carta',            path:'/carta'      },
  { label:'Reserva',          path:'/reserva'    },
  { label:'Cabinas Privadas', path:'/reserva', special:true },
]

export default function Header() {
  const { cms, openAdmin, setAdminPanelOpen } = useCMS()
  const { isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function go(path) { setMobileOpen(false); navigate(path); window.scrollTo(0,0) }
  const active = (path) => location.pathname === path

  return (
    <header style={{
      position:'sticky', top:0, zIndex:50,
      background: scrolled ? 'rgba(10,10,10,.97)' : 'rgba(10,10,10,.8)',
      backdropFilter:'blur(16px)',
      borderBottom:`1px solid ${scrolled ? 'rgba(239,68,68,.2)' : 'transparent'}`,
      transition:'all .3s',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'4rem' }}>
        {/* Logo */}
        <button onClick={() => go('/')} style={{ display:'flex', alignItems:'center', gap:'.6rem', background:'none', border:'none', cursor:'pointer' }}>
          <img src={cms.hero?.logo} alt="Logo" style={{ height:'2.2rem', borderRadius:'.4rem', objectFit:'cover' }} />
          <span style={{ fontSize:'1rem', fontWeight:800, fontFamily:'var(--font-head)',
            background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Litros & Litros
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="desk-nav" style={{ display:'flex', alignItems:'center', gap:'.1rem' }}>
          {NAV.map(n => (
            <button key={n.label} onClick={() => go(n.path)} style={{
              padding:'.4rem .85rem', borderRadius:'.5rem',
              fontSize:'.82rem', fontWeight: active(n.path) ? 700 : 500,
              color: n.special ? 'var(--primary)' : active(n.path) ? 'var(--primary)' : 'rgba(242,242,242,.75)',
              background: active(n.path) && !n.special ? 'rgba(239,68,68,.1)' : 'transparent',
              border: n.special ? '1px solid rgba(239,68,68,.4)' : 'none',
              cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}>{n.label}</button>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
          <button className="menu-toggle" onClick={() => setMobileOpen(o=>!o)}
            style={{ display:'none', background:'none', border:'none', cursor:'pointer', color:'var(--fg)', padding:'.35rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
          <button onClick={() => isAdmin ? setAdminPanelOpen(true) : openAdmin()} style={{
            background: isAdmin ? 'rgba(239,68,68,.12)' : 'none',
            border:`1px solid ${isAdmin ? 'var(--primary)' : 'rgba(239,68,68,.3)'}`,
            color: isAdmin ? 'var(--primary)' : 'rgba(242,242,242,.4)',
            borderRadius:'.5rem', padding:'.32rem .65rem', fontSize:'.75rem', fontWeight:600,
            cursor:'pointer', display:'flex', alignItems:'center', gap:'.3rem', transition:'all .2s', fontFamily:'var(--font-body)',
          }}>🔒 {isAdmin ? 'Panel' : 'Admin'}</button>
          {isAdmin && <button onClick={signOut} style={{ background:'none', border:'1px solid rgba(255,255,255,.1)', color:'rgba(242,242,242,.4)', borderRadius:'.5rem', padding:'.32rem .6rem', fontSize:'.75rem', cursor:'pointer', fontFamily:'var(--font-body)' }}>Salir</button>}
        </div>
      </div>

      {mobileOpen && (
        <div style={{ padding:'1rem', borderTop:'1px solid var(--border)', background:'var(--card)', display:'flex', flexDirection:'column', gap:'.4rem' }}>
          {NAV.map(n => (
            <button key={n.label} onClick={() => go(n.path)} style={{
              padding:'.7rem 1rem', borderRadius:'.5rem', fontSize:'.95rem', fontWeight:500,
              color: n.special ? 'var(--primary)' : active(n.path) ? 'var(--primary)' : 'var(--fg-muted)',
              background: active(n.path) && !n.special ? 'rgba(239,68,68,.1)' : 'transparent',
              border:'none', cursor:'pointer', textAlign:'left', fontFamily:'var(--font-body)',
            }}>{n.label}</button>
          ))}
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none !important;}.menu-toggle{display:flex !important;align-items:center;justify-content:center;}}`}</style>
    </header>
  )
}
