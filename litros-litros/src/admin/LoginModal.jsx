import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCMS } from '@/context/CMSContext'

export default function LoginModal() {
  const { signIn } = useAuth()
  const { cms, loginModalOpen, setLoginModalOpen, setAdminPanelOpen } = useCMS()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !pass) { setError('Completa todos los campos'); return }
    setLoading(true)
    setError('')
    try {
      const result = await signIn(email, pass)
      const role = result?.profile?.role
      if (role === 'admin') {
        setLoginModalOpen(false)
        setAdminPanelOpen(true)
      } else {
        setError('No tienes permisos de administrador')
      }
      setEmail('')
      setPass('')
    } catch (err) {
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  if (!loginModalOpen) return null

  const inputStyle = {
    width: '100%', background: '#1a1a1a',
    border: '1px solid var(--border)', borderRadius: '.6rem',
    padding: '.7rem 1rem', color: 'var(--fg)',
    fontSize: '.95rem', outline: 'none',
    transition: 'border-color .2s',
    fontFamily: 'var(--font-body)',
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && setLoginModalOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        background: '#0f0f0f',
        border: '1px solid rgba(239,68,68,.3)',
        borderRadius: '1.25rem', padding: '2.5rem',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 0 60px rgba(239,68,68,.15), 0 40px 80px rgba(0,0,0,.6)',
        position: 'relative', animation: 'fadeUp .3s ease',
      }}>
        {/* Close */}
        <button onClick={() => setLoginModalOpen(false)} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', color: 'var(--fg-muted)',
          cursor: 'pointer', padding: '.35rem', borderRadius: '.4rem',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <img src={cms.hero.logo} alt="Logo" style={{
            width: '4rem', height: '4rem', borderRadius: '.75rem',
            margin: '0 auto .75rem', boxShadow: '0 0 20px rgba(239,68,68,.4)',
          }}/>
          <h2 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            Panel Admin
          </h2>
          <p style={{ fontSize: '.85rem', color: 'var(--fg-muted)', marginTop: '.25rem' }}>
            Litros &amp; Litros CMS
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
            borderRadius: '.5rem', padding: '.6rem .9rem',
            fontSize: '.85rem', color: '#f87171', marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '.5rem' }}>
            Correo electrónico
          </label>
          <input
            type="email" placeholder="tu@correo.com" autoComplete="email"
            value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '.5rem' }}>
            Contraseña
          </label>
          <input
            type="password" placeholder="••••••••" autoComplete="current-password"
            value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '.8rem', borderRadius: '.65rem',
            background: 'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
            color: '#fff', fontSize: '1rem', fontWeight: 700,
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-body)', transition: 'opacity .2s',
            marginTop: '.5rem', opacity: loading ? .7 : 1,
          }}
        >
          {loading ? 'Iniciando sesión...' : 'Ingresar al panel'}
        </button>
      </div>
    </div>
  )
}
