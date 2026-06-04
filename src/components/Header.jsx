import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { to: '/',         label: 'Inicio' },
  { to: '/menu',     label: 'Menú & Bebidas' },
  { to: '/karaoke',  label: 'Karaoke' },
  { to: '/eventos',  label: 'Eventos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const { cms, openAdmin, setAdminPanelOpen } = useCMS()
  const { isAdmin, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  function handleAdminClick() {
    if (isAdmin) {
      setAdminPanelOpen(true)
    } else {
      openAdmin()
    }
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,10,.85)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '4rem',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <img src={cms.hero.logo} alt="Logo"
            style={{ height: '2.4rem', borderRadius: '.5rem' }} />
          <span style={{
            fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-head)',
            background: 'linear-gradient(135deg, #ef4444, #a855f7, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {cms.footer.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '.45rem 1rem', borderRadius: '.5rem',
              fontSize: '.875rem', fontWeight: 500,
              color: location.pathname === link.to ? 'var(--primary)' : 'rgba(242,242,242,.8)',
              background: location.pathname === link.to ? 'rgba(239,68,68,.12)' : 'transparent',
              transition: 'all .2s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: hamburger + admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <button onClick={() => setMobileOpen(o => !o)} aria-label="Menú" className="menu-toggle"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)', padding: '.35rem' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Admin button — siempre visible, cambia según sesión */}
          <button onClick={handleAdminClick} title={isAdmin ? 'Abrir panel' : 'Iniciar sesión como admin'}
            style={{
              background: isAdmin ? 'rgba(239,68,68,.12)' : 'none',
              border: `1px solid ${isAdmin ? 'var(--primary)' : 'rgba(239,68,68,.3)'}`,
              color: isAdmin ? 'var(--primary)' : 'rgba(242,242,242,.5)',
              borderRadius: '.5rem', padding: '.35rem .7rem',
              fontSize: '.75rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '.35rem', transition: 'all .2s',
            }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {isAdmin ? 'Panel' : 'Admin'}
          </button>

          {/* Logout rápido si es admin */}
          {isAdmin && (
            <button onClick={signOut} title="Cerrar sesión"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,.1)',
                color: 'rgba(242,242,242,.4)', borderRadius: '.5rem',
                padding: '.35rem .6rem', fontSize: '.75rem', cursor: 'pointer',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,242,242,.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)' }}
            >
              Salir
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '.5rem',
          padding: '1rem', borderTop: '1px solid var(--border)', background: 'var(--card)',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{
              padding: '.75rem 1rem', borderRadius: '.5rem', fontSize: '1rem', fontWeight: 500,
              color: location.pathname === link.to ? 'var(--primary)' : 'var(--fg-muted)',
              background: location.pathname === link.to ? 'rgba(239,68,68,.1)' : 'transparent',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px) {
          nav { display: none !important; }
          .menu-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </header>
  )
}
