import { useState, useEffect } from 'react'
import { getCMSSection } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

const VALUES = [
  { icon: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>, title: 'Pasión por la música', desc: 'Creemos que la música une a las personas y crea momentos inolvidables.', gradient: 'linear-gradient(135deg,#ef4444,#a855f7,#f97316)' },
  { icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>, title: 'Gastronomía de calidad', desc: 'Ingredientes frescos y recetas auténticas en cada platillo y bebida.', gradient: 'linear-gradient(135deg,#a855f7,#ef4444,#f97316)' },
  { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, title: 'Ambiente familiar', desc: 'Un espacio donde todos son bienvenidos para divertirse y crear recuerdos.', gradient: 'linear-gradient(135deg,#f97316,#a855f7,#ef4444)' },
]

export default function About() {
  const [about, setAbout] = useState(initialCMSData.about)

  useEffect(() => {
    getCMSSection('about').then(d => d && setAbout(d)).catch(() => {})
  }, [])

  return (
    <section>
      <div className="container">
        <div className="text-center animate-fade-up">
          <h1 className="section-title">{about.title}</h1>
          <p className="section-sub">{about.sub}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div className="animate-slide-l">
            <img src={about.img} alt="Interior" style={{ width: '100%', height: '28rem', objectFit: 'cover', borderRadius: '1.25rem', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }} />
          </div>
          <div className="animate-slide-r">
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>{about.h2}</h2>
            <p style={{ color: 'rgba(242,242,242,.8)', marginBottom: '1rem', lineHeight: 1.75 }}>{about.p1}</p>
            <p style={{ color: 'rgba(242,242,242,.8)', marginBottom: '1rem', lineHeight: 1.75 }}>{about.p2}</p>
            <p style={{ color: 'rgba(242,242,242,.8)', lineHeight: 1.75 }}>{about.p3}</p>
          </div>
        </div>

        <div className="text-center animate-fade-up">
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>Nuestros valores</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
          {VALUES.map((v, i) => (
            <div key={i} className={`animate-fade-up delay-${i + 1}`} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '2rem', transition: 'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(239,68,68,.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div className="icon-box neon-glow" style={{ background: v.gradient }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '1rem 0 .5rem' }}>{v.title}</h3>
              <p style={{ fontSize: '.9rem', color: 'var(--fg-muted)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="animate-fade-up" style={{
          background: 'linear-gradient(135deg,var(--card),rgba(20,20,20,.5))',
          border: '1px solid rgba(239,68,68,.3)', borderRadius: '1.25rem',
          padding: '3rem 2rem', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, marginBottom: '1rem' }}>Únete a nuestra familia</h2>
          <p style={{ color: 'var(--fg-muted)', maxWidth: '32rem', margin: '0 auto' }}>
            Cada noche es una oportunidad para crear nuevos recuerdos. Te esperamos con los brazos abiertos.
          </p>
        </div>
      </div>
      <style>{`@media(max-width:760px){.about-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}
