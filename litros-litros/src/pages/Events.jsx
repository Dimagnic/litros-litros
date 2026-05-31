import { useState, useEffect } from 'react'
import { getEvents, getCMSSection } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

export default function Events() {
  const [events, setEvents] = useState(initialCMSData.events)
  const [contact, setContact] = useState(initialCMSData.contact)
  const { showToast } = { showToast: () => {} }

  useEffect(() => {
    getEvents().then(d => d && setEvents(d)).catch(() => {})
    getCMSSection('contact').then(d => d && setContact(d)).catch(() => {})
  }, [])

  const waLink = `https://wa.me/${contact.wa}?text=%C2%A1Hola!%20Quiero%20organizar%20un%20evento%20privado`

  return (
    <section>
      <div className="container">
        <div className="text-center animate-fade-up">
          <h1 className="section-title">Próximos eventos</h1>
          <p className="section-sub">No te pierdas nuestras fiestas, conciertos y noches especiales</p>
        </div>

        <div className="section-divider animate-fade-up">
          <div className="icon-box neon-glow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Agenda de eventos</h2>
        </div>

        <div className="grid-2">
          {events.map(e => {
            const dateStr = e.date || ''
            const date = new Date(dateStr + 'T12:00:00')
            const formatted = isNaN(date) ? dateStr : date.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
            const img = e.image_url || e.image || ''
            return (
              <div key={e.id} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'all .3s',
              }}
                onMouseEnter={el => el.currentTarget.style.boxShadow = '0 12px 40px rgba(239,68,68,.2)'}
                onMouseLeave={el => el.currentTarget.style.boxShadow = ''}
              >
                <div style={{ height: '14rem', position: 'relative', overflow: 'hidden' }}>
                  <img src={img} alt={e.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                    onMouseEnter={el => el.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={el => el.currentTarget.style.transform = ''}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 50%, transparent 100%)' }}/>
                  {e.featured && <span className="badge badge-primary" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>Destacado</span>}
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                    {e.title}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '.75rem', fontSize: '.85rem', color: 'var(--fg-muted)' }}>
                    <span>📅 {formatted}</span>
                    <span>🕐 {e.time}</span>
                  </div>
                  <p style={{ fontSize: '.9rem', color: 'rgba(242,242,242,.75)', marginBottom: '1rem' }}>{e.description}</p>
                </div>
                <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--primary)' }}>{e.price}</span>
                  <button className="btn btn-primary" style={{ padding: '.55rem 1.1rem', fontSize: '.875rem' }}
                    onClick={() => alert('🎟️ Redirigiendo a compra de boletos...')}>
                    🎟️ Comprar boletos
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="animate-fade-up" style={{
          background: 'linear-gradient(135deg,rgba(20,20,20,.8),rgba(14,14,14,.5))',
          border: '1px solid rgba(239,68,68,.3)', borderRadius: '1.25rem',
          padding: '3rem 2rem', textAlign: 'center', marginTop: '4rem',
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 800, marginBottom: '1rem' }}>
            ¿Quieres organizar un evento privado?
          </h2>
          <p style={{ color: 'var(--fg-muted)', marginBottom: '1.75rem', maxWidth: '32rem', margin: '0 auto 1.75rem' }}>
            Contamos con espacio para fiestas privadas, cumpleaños, eventos corporativos y más
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Contáctanos para más información
          </a>
        </div>
      </div>
    </section>
  )
}
