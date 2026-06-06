import { useState } from 'react'
import { useCMS } from '@/context/CMSContext'
import { useAuth } from '@/context/AuthContext'

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, setAdminPanelOpen } = useCMS()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!loginModalOpen) return null

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await signIn(email, password)
      setLoginModalOpen(false)
      setAdminPanelOpen(true)
    } catch (err) {
      setError('Credenciales incorrectas')
    } finally { setLoading(false) }
  }

  const inp = { width:'100%', background:'#1a2537', border:'1px solid rgba(41,90,158,.3)', borderRadius:'.6rem', padding:'.7rem 1rem', color:'#fff', fontSize:'1rem', outline:'none', fontFamily:'var(--font-body)' }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={e => e.target === e.currentTarget && setLoginModalOpen(false)}>
      <div style={{ background:'#111827', border:'1px solid rgba(41,90,158,.3)', borderRadius:'1rem', padding:'2.5rem', width:'100%', maxWidth:'400px', textAlign:'center' }}>
        <img src="https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/karaoke.jpeg"
          alt="Logo" style={{ width:'4rem', height:'4rem', borderRadius:'.75rem', objectFit:'cover', margin:'0 auto .75rem' }} />
        <h2 style={{ color:'#295A9E', fontWeight:800, fontSize:'1.3rem', marginBottom:'.25rem' }}>Panel Admin</h2>
        <p style={{ color:'rgba(234,234,234,.5)', fontSize:'.85rem', marginBottom:'2rem' }}>Litros & Litros CMS</p>
        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div style={{ textAlign:'left' }}>
            <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'rgba(234,234,234,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>Correo electrónico</label>
            <input type="email" style={inp} value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </div>
          <div style={{ textAlign:'left' }}>
            <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'rgba(234,234,234,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.3rem' }}>Contraseña</label>
            <input type="password" style={inp} value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color:'#f87171', fontSize:'.85rem' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background:'#295A9E', color:'#fff', border:'none', borderRadius:'.6rem', padding:'.8rem', fontSize:'1rem', fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, fontFamily:'var(--font-body)' }}>
            {loading ? 'Iniciando sesión...' : 'Ingresar al panel'}
          </button>
        </form>
        <button onClick={() => setLoginModalOpen(false)} style={{ marginTop:'1rem', background:'none', border:'none', color:'rgba(234,234,234,.3)', cursor:'pointer', fontSize:'.85rem' }}>✕ Cancelar</button>
      </div>
    </div>
  )
}
