import { useNavigate } from 'react-router-dom'
import { useCMS } from '@/context/CMSContext'

export default function Footer() {
  const { cms } = useCMS()
  const navigate = useNavigate()
  const { footer, contact, socials } = cms

  function go(path) { navigate(path); window.scrollTo(0,0) }

  return (
    <footer style={{ background:'#080808', borderTop:'1px solid var(--border)', padding:'3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'2rem', marginBottom:'2.5rem' }}>

          {/* Marca */}
          <div>
            <div style={{ fontSize:'1.1rem', fontWeight:800, fontFamily:'var(--font-head)',
              background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:'.65rem' }}>
              {footer?.brand || 'Litros & Litros'}
            </div>
            <p style={{ fontSize:'.85rem', color:'var(--fg-muted)', lineHeight:1.65, marginBottom:'1rem' }}>
              {footer?.desc || 'Karaoke Bar en Puebla.'}
            </p>
          </div>

          {/* Contacto y ubicación */}
          <div>
            <h4 style={{ fontSize:'.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-muted)', marginBottom:'1rem' }}>Información</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
              <p style={{ fontSize:'.85rem', color:'var(--fg-muted)', lineHeight:1.6 }}>
                📍 {contact?.address || 'Blvd Héroes del 5 de Mayo 4610, Puebla'}
              </p>
              <a href={`tel:${contact?.phone || '+522224302693'}`} style={{ fontSize:'.85rem', color:'var(--fg-muted)', transition:'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}>
                📞 {contact?.phone || '+52 222 430 2693'}
              </a>
              <p style={{ fontSize:'.85rem', color:'var(--fg-muted)' }}>
                🕐 {contact?.hours || 'Mar–Dom 6PM–3AM'}
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize:'.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-muted)', marginBottom:'1rem' }}>Navegación</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              {[['/', 'Inicio'], ['/alimentos','Alimentos'], ['/carta','Bebidas'], ['/eventos','Eventos'], ['/reserva','Reservas']].map(([path, label]) => (
                <button key={path} onClick={() => go(path)} style={{
                  background:'none', border:'none', cursor:'pointer', color:'var(--fg-muted)',
                  fontSize:'.875rem', padding:'.15rem 0', fontFamily:'var(--font-body)', textAlign:'left', transition:'color .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}
                >{label}</button>
              ))}
              {/* Aviso Legal */}
              <button style={{
                background:'none', border:'none', cursor:'pointer', color:'var(--fg-muted)',
                fontSize:'.875rem', padding:'.15rem 0', fontFamily:'var(--font-body)', textAlign:'left', transition:'color .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}
              >⚖️ Aviso Legal</button>
            </div>
          </div>

          {/* Redes */}
          <div>
            <h4 style={{ fontSize:'.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-muted)', marginBottom:'1rem' }}>Síguenos en</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
              {socials?.fb && (
                <a href={socials.fb} target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color='#1877F2'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              )}
              {socials?.ig && (
                <a href={socials.ig} target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color='#E1306C'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              )}
              {socials?.tt && (
                <a href={socials.tt} target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/></svg>
                  TikTok
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1.25rem', textAlign:'center', fontSize:'.8rem', color:'rgba(160,160,160,.5)' }}>
          {footer?.copyright || '© Litros & Litros Karaoke Bar Todos los derechos reservados.'}
        </div>
      </div>
    </footer>
  )
}

const linkStyle = {
  display:'flex', alignItems:'center', gap:'.5rem',
  color:'var(--fg-muted)', fontSize:'.875rem', textDecoration:'none', transition:'color .2s',
}
