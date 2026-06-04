import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCMSSection, getSocials } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

const SOCIAL_ICONS = {
  fb: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
  ig: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
  tt: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>,
  yt: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
}

export default function Footer() {
  const [footer,  setFooter]  = useState(initialCMSData.footer)
  const [contact, setContact] = useState(initialCMSData.contact)
  const [hero,    setHero]    = useState(initialCMSData.hero)
  const [socials, setSocials] = useState(initialCMSData.socials)

  useEffect(() => {
    getCMSSection('footer').then(d => d && setFooter(d)).catch(() => {})
    getCMSSection('contact').then(d => d && setContact(d)).catch(() => {})
    getCMSSection('hero').then(d => d && setHero(d)).catch(() => {})
    getSocials().then(rows => {
      if (!rows) return
      const obj = {}
      rows.forEach(r => { obj[r.platform] = r.url })
      setSocials(prev => ({ ...prev, ...obj }))
    }).catch(() => {})
  }, [])

  const activeSocials = Object.entries(socials).filter(([, url]) => url)

  return (
    <footer style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', padding: '3.5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', marginBottom: '.75rem' }}>
              <img src={hero.logo} alt="Logo" style={{ height: '2rem', borderRadius: '.4rem' }} />
              <span style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-head)', background: 'linear-gradient(135deg,#ef4444,#a855f7,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {footer.brand}
              </span>
            </Link>
            <p style={{ fontSize: '.875rem', color: 'rgba(242,242,242,.7)', lineHeight: 1.6 }}>{footer.desc}</p>
          </div>

          {/* Links */}
          <div>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: '1rem', display: 'block' }}>Explorar</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {[['/menu','Menú & Bebidas'],['/karaoke','Karaoke'],['/eventos','Eventos'],['/nosotros','Nosotros'],['/contacto','Contacto']].map(([to,label]) => (
                <Link key={to} to={to} style={{ fontSize: '.875rem', color: 'rgba(242,242,242,.7)', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,242,242,.7)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: '1rem', display: 'block' }}>Contacto</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              {[
                { icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>, text: contact.address },
                { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>, text: contact.phone },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, text: contact.email },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.875rem', color: 'rgba(242,242,242,.7)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    {item.icon}
                  </svg>
                  <span>{item.text}</span>
                </div>
              ))}
              {activeSocials.length > 0 && (
                <div style={{ display: 'flex', gap: '.6rem', marginTop: '.4rem' }}>
                  {activeSocials.map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{
                      width: '2.2rem', height: '2.2rem', borderRadius: '.5rem',
                      background: 'var(--card2)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.15)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--card2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {SOCIAL_ICONS[key]}
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ fontSize: '.825rem', color: 'rgba(242,242,242,.45)' }}>{footer.copyright}</p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Política de privacidad','Términos de servicio'].map(label => (
              <a key={label} href="#" style={{ fontSize: '.825rem', color: 'rgba(242,242,242,.45)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,242,242,.45)'}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){footer .container > div:first-child{grid-template-columns:1fr !important;gap:2rem !important;}}`}</style>
    </footer>
  )
}
