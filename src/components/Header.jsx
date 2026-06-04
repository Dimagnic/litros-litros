import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'

const NAV = [
  { id: 'inicio',     label: 'Inicio'    },
  { id: 'musica',     label: 'Música'    },
  { id: 'bebidas',    label: 'Bebidas'   },
  { id: 'alimentos',  label: 'Alimentos' },
  { id: 'eventos',    label: 'Eventos'   },
  { id: 'reservas',   label: 'Reservas'  },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
  const { cms, openAdmin, setAdminPanelOpen } = useCMS()
  const { isAdmin, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
      const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean)
      const current = sections.findLast(s => s.getBoundingClientRect().top <= 100)
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleAdminClick() {
    isAdmin ? setAdminPanelOpen(true) : openAdmin()
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,.95)' : 'rgba(10,10,10,.75)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(239,68,68,.2)' : 'transparent'}`,
      transition: 'all .3s',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'4rem' }}>
        {/* Logo */}
        <button onClick={() => scrollTo('inicio')} style={{ display:'flex', alignItems:'center', gap:'.6rem', background:'none', border:'none', cursor:'pointer' }}>
          <img src={cms.hero.logo} alt="Logo" style={{ height:'2.2rem', borderRadius:'.4rem' }} />
          <span style={{
            fontSize:'1rem', fontWeight:800, fontFamily:'var(--font-head)',
            background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>Litros & Litros</span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display:'flex', alignItems:'center', gap:'.1rem' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              padding:'.4rem .85rem', borderRadius:'.5rem',
              fontSize:'.82rem', fontWeight: active === n.id ? 700 : 500,
              color: active === n.id ? 'var(--primary)' : 'rgba(242,242,242,.75)',
              background: active === n.id ? 'rgba(239,68,68,.1)' : 'transparent',
              border:'none', cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}>{n.label}</button>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
          <button onClick={() => { setMobileOpen(o => !o) }} className="menu-toggle"
            style={{ display:'none', background:'none', border:'none', cursor:'pointer', color:'var(--fg)', padding:'.35rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
          <button onClick={handleAdminClick} style={{
            background: isAdmin ? 'rgba(239,68,68,.12)' : 'none',
            border:`1px solid ${isAdmin ? 'var(--primary)' : 'rgba(239,68,68,.3)'}`,
            color: isAdmin ? 'var(--primary)' : 'rgba(242,242,242,.4)',
            borderRadius:'.5rem', padding:'.32rem .65rem',
            fontSize:'.75rem', fontWeight:600, cursor:'pointer',
            display:'flex', alignItems:'center', gap:'.3rem', transition:'all .2s', fontFamily:'var(--font-body)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {isAdmin ? 'Panel' : 'Admin'}
          </button>
          {isAdmin && (
            <button onClick={signOut} style={{
              background:'none', border:'1px solid rgba(255,255,255,.1)',
              color:'rgba(242,242,242,.4)', borderRadius:'.5rem',
              padding:'.32rem .6rem', fontSize:'.75rem', cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-body)',
            }}
              onMouseEnter={e => { e.currentTarget.style.color='#ef4444'; e.currentTarget.style.borderColor='rgba(239,68,68,.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(242,242,242,.4)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)' }}
            >Salir</button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ padding:'1rem', borderTop:'1px solid var(--border)', background:'var(--card)', display:'flex', flexDirection:'column', gap:'.4rem' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { scrollTo(n.id); setMobileOpen(false) }} style={{
              padding:'.7rem 1rem', borderRadius:'.5rem', fontSize:'.95rem', fontWeight:500,
              color: active === n.id ? 'var(--primary)' : 'var(--fg-muted)',
              background: active === n.id ? 'rgba(239,68,68,.1)' : 'transparent',
              border:'none', cursor:'pointer', textAlign:'left', fontFamily:'var(--font-body)',
            }}>{n.label}</button>
          ))}
        </div>
      )}

      <style>{`@media(max-width:768px){nav{display:none !important;}.menu-toggle{display:flex !important;align-items:center;justify-content:center;}}`}</style>
    </header>
  )
}
