import { useState, useEffect } from 'react'
import { getMenuItems } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

function MenuCard({ item }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'all .3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(239,68,68,.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <div style={{ height: '11rem', overflow: 'hidden', position: 'relative' }}>
        <img src={item.image_url || item.image} alt={item.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        />
        {item.featured && (
          <span className="badge badge-primary" style={{ position: 'absolute', top: '.75rem', right: '.75rem' }}>
            Promoción
          </span>
        )}
      </div>
      <div style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.5rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700 }}>{item.name}</span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>{item.price}</span>
        </div>
        <p style={{ fontSize: '.85rem', color: 'var(--fg-muted)', marginBottom: '.75rem' }}>{item.description}</p>
        <span className="badge badge-secondary">{item.category}</span>
      </div>
    </div>
  )
}

export default function Menu() {
  const [food, setFood] = useState(initialCMSData.menuData.food)
  const [drinks, setDrinks] = useState(initialCMSData.menuData.drinks)

  useEffect(() => {
    getMenuItems().then(data => {
      if (!data) return
      setFood(data.filter(i => i.type === 'food'))
      setDrinks(data.filter(i => i.type === 'drink'))
    }).catch(() => {})
  }, [])

  return (
    <section>
      <div className="container">
        <div className="text-center animate-fade-up">
          <h1 className="section-title">Nuestro menú</h1>
          <p className="section-sub">Sabores auténticos y bebidas refrescantes para acompañar tu noche</p>
        </div>

        <div className="section-divider animate-fade-up">
          <div className="icon-box neon-glow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2h18v3H3zM6 5v16M18 5v16M3 21h18"/>
            </svg>
          </div>
          <h2>Comida</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
          {food.map(item => <MenuCard key={item.id} item={item} />)}
        </div>

        <div className="section-divider animate-fade-up" style={{ marginTop: '4rem' }}>
          <div className="icon-box neon-glow" style={{ background: 'linear-gradient(135deg,#f97316,#ef4444,#a855f7)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8M12 11V22M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
            </svg>
          </div>
          <h2>Bebidas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
          {drinks.map(item => <MenuCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}
