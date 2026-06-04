import { useCMS } from '@/context/CMSContext'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
}

export default function Footer() {
  const { cms } = useCMS()
  const { footer, contact, socials } = cms

  return (
    <footer style={{ background:'#080808', borderTop:'1px solid var(--border)', padding:'3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2rem', marginBottom:'2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize:'1.2rem', fontWeight:800, fontFamily:'var(--font-head)',
              background:'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              marginBottom:'.75rem',
            }}>{footer.brand}</div>
            <p style={{ fontSize:'.85rem', color:'var(--fg-muted)', lineHeight:1.65 }}>{footer.desc}</p>
            {/* Socials */}
            <div style={{ display:'flex', gap:'.6rem', marginTop:'1rem' }}>
              {socials.fb && (
                <a href={socials.fb} target="_blank" rel="noopener noreferrer" style={socialStyle}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {socials.ig && (
                <a href={socials.ig} target="_blank" rel="noopener noreferrer" style={socialStyle}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 style={{ fontSize:'.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-muted)', marginBottom:'1rem' }}>Navegación</h4>
            {['inicio','musica','bebidas','alimentos','eventos','reservas'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                display:'block', background:'none', border:'none', cursor:'pointer',
                color:'var(--fg-muted)', fontSize:'.875rem', padding:'.25rem 0',
                fontFamily:'var(--font-body)', textAlign:'left', transition:'color .2s',
                textTransform:'capitalize',
              }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}
              >{id}</button>
            ))}
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontSize:'.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-muted)', marginBottom:'1rem' }}>Contacto</h4>
            <p style={{ fontSize:'.875rem', color:'var(--fg-muted)', marginBottom:'.5rem', lineHeight:1.6 }}>📍 {contact.address}</p>
            <p style={{ fontSize:'.875rem', marginBottom:'.4rem' }}>
              <a href={`tel:${contact.phone}`} style={{ color:'var(--fg-muted)', transition:'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--fg-muted)'}
              >📞 {contact.phone}</a>
            </p>
            <p style={{ fontSize:'.875rem', color:'var(--fg-muted)' }}>🕐 {contact.hours}</p>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1.25rem', textAlign:'center', fontSize:'.8rem', color:'rgba(160,160,160,.6)' }}>
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}

const socialStyle = {
  display:'flex', alignItems:'center', justifyContent:'center',
  width:'2rem', height:'2rem', borderRadius:'.5rem',
  background:'var(--card2)', color:'var(--fg-muted)',
  transition:'all .2s',
}
