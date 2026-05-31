import { useCMS } from '@/context/CMSContext'

export default function WhatsAppButton() {
  const { cms } = useCMS()
  const waHref = `https://wa.me/${cms.contact.wa}?text=%C2%A1Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n`

  return (
    <>
      <div style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        zIndex: 50, display: 'flex', alignItems: 'flex-end', gap: '.75rem',
        animation: 'float 3s ease-in-out infinite',
      }}>
        <div className="wa-tooltip">
          🎤 ¡Bienvenido a Litros &amp; Litros! ¿En qué podemos ayudarte? 😊
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{
            width: '3.75rem', height: '3.75rem',
            background: '#25D366', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(37,211,102,.5)',
            animation: 'pulseScale 2s ease-in-out infinite',
            transition: 'all .2s', position: 'relative', flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#20bd5a'
            e.currentTarget.style.animation = 'none'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#25D366'
            e.currentTarget.style.animation = 'pulseScale 2s ease-in-out infinite'
            e.currentTarget.style.transform = ''
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: '1rem', height: '1rem',
            background: '#ef4444', borderRadius: '50%',
            border: '2px solid var(--bg)',
          }}/>
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: '1rem', height: '1rem',
            background: 'rgba(248,113,113,.7)', borderRadius: '50%',
            animation: 'ping 1.5s ease-in-out infinite',
          }}/>
        </a>
      </div>

      <style>{`
        .wa-tooltip {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 1rem; padding: .85rem 1rem;
          max-width: 14rem; font-size: .85rem; line-height: 1.4;
          position: relative; opacity: 0; transform: translateY(6px);
          transition: all .3s; pointer-events: none;
        }
        .wa-tooltip::after {
          content: ''; position: absolute;
          right: -.5rem; bottom: 1rem;
          width: 1rem; height: 1rem;
          background: var(--card);
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transform: rotate(-45deg);
        }
        div:has(.wa-tooltip):hover .wa-tooltip {
          opacity: 1; transform: translateY(0);
        }
        @media(max-width:768px) { .wa-tooltip { display: none; } }
      `}</style>
    </>
  )
}
