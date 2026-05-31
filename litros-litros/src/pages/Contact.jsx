import { useState, useEffect } from 'react'
import { getCMSSection, getSocials } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

const SOCIAL_ICONS = {
  fb: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
  ig: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
  tt: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>,
  yt: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
}

export default function Contact() {
  const [contact, setContact] = useState(initialCMSData.contact)
  const [socials, setSocials] = useState(initialCMSData.socials)
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    getCMSSection('contact').then(d => d && setContact(d)).catch(() => {})
    getSocials().then(rows => {
      if (!rows) return
      const obj = {}
      rows.forEach(r => { obj[r.platform] = r.url })
      setSocials(prev => ({ ...prev, ...obj }))
    }).catch(() => {})
  }, [])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  function handleSubmit() {
    if (!form.name || !form.email || !form.msg) { showToast('⚠️ Completa todos los campos'); return }
    showToast('✅ ¡Mensaje enviado! Nos pondremos en contacto pronto.')
    setForm({ name: '', email: '', msg: '' })
  }

  const activeSocials = Object.entries(socials).filter(([, url]) => url)

  const inputStyle = {
    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '.5rem', padding: '.65rem .9rem', color: 'var(--fg)',
    fontFamily: 'var(--font-body)', fontSize: '.95rem', transition: 'border-color .2s', outline: 'none',
  }

  const INFO = [
    { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, label: 'Dirección', value: contact.address },
    { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>, label: 'Teléfono', value: contact.phone },
    { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, label: 'Email', value: contact.email },
    { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label: 'Horario', value: contact.hours },
  ]

  return (
    <>
      {toast && <div className="toast" style={{ animation: 'fadeUp .3s ease' }}>{toast}</div>}
      <section>
        <div className="container">
          <div className="text-center animate-fade-up">
            <h1 className="section-title">Contáctanos</h1>
            <p className="section-sub">Estamos aquí para hacer tu experiencia inolvidable</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
            <div className="animate-slide-l">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Información de contacto</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {INFO.map((item, i) => (
                  <div key={i} style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: '1.1rem',
                    display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'all .2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(239,68,68,.12)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                  >
                    <div className="icon-box neon-glow" style={{ width: '3rem', height: '3rem', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: '.2rem' }}>{item.label}</h3>
                      <p style={{ fontSize: '.9rem', color: 'rgba(242,242,242,.75)' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {activeSocials.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.75rem' }}>Síguenos en redes sociales</h3>
                  <div style={{ display: 'flex', gap: '.75rem' }}>
                    {activeSocials.map(([key, url]) => (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{
                        width: '2.75rem', height: '2.75rem', borderRadius: '.65rem',
                        background: 'var(--card2)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.15)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'scale(1.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--card2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = '' }}
                      >
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {SOCIAL_ICONS[key]}
                        </svg>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="animate-slide-r">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Envíanos un mensaje</h2>
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem' }}>
                {[['Nombre completo','name','text','Ej. Carlos Mendoza'],['Correo electrónico','email','email','Ej. carlos@email.com']].map(([label,key,type,ph]) => (
                  <div key={key} style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, marginBottom: '.4rem' }}>{label}</label>
                    <input type={type} placeholder={ph} value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, marginBottom: '.4rem' }}>Mensaje</label>
                  <textarea placeholder="¿En qué podemos ayudarte?" value={form.msg}
                    onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                    style={{ ...inputStyle, minHeight: '7.5rem', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>
                  ✉️ Enviar mensaje
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)', height: '25rem', marginTop: '2rem' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d-98.2!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzI0LjAiTiA5OMKwMTInMDAuMCJX!5e0!3m2!1ses!2smx!4v1"
              style={{ width: '100%', height: '100%', border: 0 }}
              allowFullScreen="" loading="lazy" title="Ubicación Litros & Litros"
            />
          </div>
        </div>
        <style>{`@media(max-width:800px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </>
  )
}
