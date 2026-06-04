import { useState, useEffect } from 'react'
import { getSongs, getKaraokeDates } from '@/services/adminService'
import { initialCMSData } from '@/utils/cmsData'

const AVATAR_COLORS = [
  'linear-gradient(135deg,#ef4444,#f97316)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#3b82f6,#06b6d4)',
  'linear-gradient(135deg,#22c55e,#10b981)',
  'linear-gradient(135deg,#eab308,#f97316)',
]

const INITIAL_SINGERS = [
  { id: 1, name: 'Carlos Mendoza', votes: 47, avatar: 'CM' },
  { id: 2, name: 'Ana Reyes',       votes: 38, avatar: 'AR' },
  { id: 3, name: 'Luis Torres',     votes: 29, avatar: 'LT' },
  { id: 4, name: 'María González',  votes: 22, avatar: 'MG' },
  { id: 5, name: 'Diego Ramírez',   votes: 18, avatar: 'DR' },
]

export default function Karaoke() {
  const [songs, setSongs]   = useState(initialCMSData.songs)
  const [dates, setDates]   = useState(initialCMSData.karaokeDates)
  const [singers, setSingers] = useState(INITIAL_SINGERS)
  const [toast, setToast]   = useState(null)

  useEffect(() => {
    getSongs().then(d => d?.length && setSongs(d)).catch(() => {})
    getKaraokeDates().then(d => d?.length && setDates(d)).catch(() => {})
  }, [])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function castVote(id, name) {
    setSingers(p => p.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s))
    showToast(`✅ Voto registrado para ${name}`)
  }

  function reserveSong(title) {
    showToast(`✅ Turno reservado para "${title}"`)
  }

  const sorted = [...singers].sort((a, b) => b.votes - a.votes)

  return (
    <>
      {toast && (
        <div className="toast" style={{ animation: 'fadeUp .3s ease' }}>{toast}</div>
      )}
      <section>
        <div className="container">
          <div className="text-center animate-fade-up">
            <h1 className="section-title gradient-text neon-text">Karaoke</h1>
            <p className="section-sub">Brilla en el escenario con miles de canciones disponibles</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem', alignItems: 'start' }}>
            <div>
              {/* Fechas */}
              <div className="section-divider">
                <div className="icon-box neon-glow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h2>Calendario de noches temáticas</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {dates.map(d => {
                  const date = new Date((d.date || '') + 'T12:00:00')
                  const formatted = isNaN(date) ? d.date : date.toLocaleDateString('es-MX', { weekday: 'long', day: '2-digit', month: 'long' })
                  return (
                    <div key={d.id} style={{
                      background: 'linear-gradient(135deg,var(--card),rgba(20,20,20,.5))',
                      border: '1px solid rgba(239,68,68,.25)', borderRadius: 'var(--radius)',
                      padding: '1.25rem', transition: 'all .3s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,.55)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(239,68,68,.12)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,.25)'; e.currentTarget.style.boxShadow = '' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
                        <div className="icon-box neon-glow" style={{ width: '2.75rem', height: '2.75rem' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '.95rem', fontWeight: 700, textTransform: 'capitalize' }}>{formatted}</h3>
                          <div style={{ fontSize: '.78rem', color: 'var(--fg-muted)' }}>🕐 {d.time}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--primary)' }}>{d.theme}</p>
                    </div>
                  )
                })}
              </div>

              {/* Canciones */}
              <div className="section-divider">
                <div className="icon-box neon-glow" style={{ background: 'linear-gradient(135deg,#a855f7,#f97316,#ef4444)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  </svg>
                </div>
                <h2>Canciones disponibles</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1rem' }}>
                {songs.map(s => (
                  <div key={s.id} style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: '1.1rem', transition: 'all .3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(239,68,68,.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                  >
                    <div style={{ fontSize: '.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.25rem' }}>
                      🎵 {s.title}
                    </div>
                    <p style={{ fontSize: '.82rem', color: 'var(--fg-muted)', marginBottom: '.65rem' }}>{s.artist}</p>
                    <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
                      <span className="badge badge-secondary">{s.genre}</span>
                      <span className="badge badge-outline">{s.language}</span>
                    </div>
                    <button onClick={() => reserveSong(s.title)} style={{
                      width: '100%', background: 'var(--card2)', color: 'var(--fg)',
                      border: '1px solid var(--border)', borderRadius: '.5rem',
                      padding: '.5rem', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', transition: 'all .2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.12)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--card2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      🎤 Reservar turno
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking */}
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '1.5rem',
              position: 'sticky', top: '5rem',
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.25rem' }}>
                🏆 Ranking de cantantes
              </div>
              {sorted.map((s, i) => (
                <div key={s.id} style={{
                  background: i === 0 ? 'linear-gradient(135deg,var(--card),rgba(239,68,68,.08))' : 'var(--card2)',
                  border: `1px solid ${i === 0 ? 'rgba(239,68,68,.4)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)', padding: '1rem', marginBottom: '.75rem',
                  display: 'flex', alignItems: 'center', gap: '.75rem', transition: 'all .3s',
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: i === 0 ? 'var(--primary)' : 'var(--fg-muted)', width: '2rem' }}>
                    #{i + 1}
                  </span>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '.8rem', color: '#fff', flexShrink: 0,
                  }}>
                    {s.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.88rem', fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--fg-muted)' }}>{s.votes} votos</div>
                  </div>
                  <button onClick={() => castVote(s.id, s.name)} style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    color: 'var(--fg)', borderRadius: '.5rem', padding: '.35rem .7rem',
                    fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.15)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    👍 Votar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.karaoke-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  )
}
