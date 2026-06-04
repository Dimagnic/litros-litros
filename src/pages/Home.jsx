import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCMSSection } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

const FEATURES = [
  {
    icon: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    title: 'Karaoke en vivo',
    desc: 'Miles de canciones en español e inglés. Reserva tu turno y brilla en el escenario.',
    gradient: 'linear-gradient(135deg,#ef4444,#a855f7,#f97316)',
  },
  {
    icon: <path d="M3 2h18v3H3zM6 5v16M18 5v16M3 21h18"/>,
    title: 'Alimentos Snack',
    desc: 'Disfruta de una variedad de snacks y botanas perfectas para acompañar tu noche: desde alitas y nachos hasta hamburguesas, todo preparado al momento para que no pares de cantar.',
    gradient: 'linear-gradient(135deg,#a855f7,#f97316,#ef4444)',
  },
  {
    icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    title: 'Eventos especiales',
    desc: 'Conciertos, fiestas temáticas y competencias de karaoke cada semana.',
    gradient: 'linear-gradient(135deg,#f97316,#ef4444,#a855f7)',
  },
]

export default function Home() {
  const [hero, setHero] = useState(initialCMSData.hero)
  const [cta, setCta] = useState(initialCMSData.cta)
  const navigate = useNavigate()

  useEffect(() => {
    getCMSSection('hero').then(d => d && setHero(d)).catch(() => {})
    getCMSSection('cta').then(d => d && setCta(d)).catch(() => {})
  }, [])

  return (
    <>
      {/* HERO */}
      <div style={{
        minHeight: 'calc(100dvh - 4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.08) 0%, transparent 60%)',
      }}>
        <div className="animate-fade-up" style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <img src={hero.logo} alt="Litros & Litros" className="neon-glow"
            style={{ width: '11rem', height: '11rem', margin: '0 auto 2rem', borderRadius: '1.25rem', objectFit: 'cover' }} />
          <h1 className="gradient-text neon-text" style={{
            fontSize: 'clamp(2.8rem,8vw,5.5rem)', fontWeight: 900,
            letterSpacing: '-.03em', lineHeight: 1.05, marginBottom: '1.25rem',
          }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.35rem)', color: 'rgba(242,242,242,.75)', marginBottom: '2rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {hero.subtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
              {hero.btn1}
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/karaoke')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              {hero.btn2}
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ background: 'rgba(255,255,255,.02)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title animate-fade-up">¿Por qué elegirnos?</h2>
            <p className="section-sub animate-fade-up delay-1">El lugar perfecto para cantar, convivir y disfrutar momentos inolvidables con amigos y/o pareja, en un espacio cómodo, agradable y con un servicio de calidad.</p>
          </div>
          <div className="grid-3">
            {FEATURES.map((f, i) => (
              <div key={i} className={`animate-fade-up delay-${i + 1}`} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(239,68,68,.18)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div className="icon-box neon-glow" style={{ background: f.gradient }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{f.title}</h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: '.95rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,.07) 0%, transparent 65%)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="animate-fade-up" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '1rem' }}>
            {cta.title}
          </h2>
          <p className="animate-fade-up delay-1" style={{ fontSize: '1.1rem', color: 'var(--fg-muted)', marginBottom: '2rem' }}>
            {cta.sub}
          </p>
          <button className="btn btn-primary animate-fade-up delay-2" onClick={() => navigate('/contacto')}>
            {cta.btn}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>
    </>
  )
}
