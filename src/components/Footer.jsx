import { useCMS } from '@/context/CMSContext'

// Íconos SVG
const IcoFB = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const IcoIG = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)
const IcoTT = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
  </svg>
)
const IcoYT = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
)

const REDES = [
  { key:'fb', label:'Facebook',  Ico:IcoFB, color:'#1877F2' },
  { key:'ig', label:'Instagram', Ico:IcoIG, color:'#E1306C' },
  { key:'tt', label:'TikTok',    Ico:IcoTT, color:'#ffffff' },
  { key:'yt', label:'YouTube',   Ico:IcoYT, color:'#FF0000' },
]

// Fallback con los enlaces reales en caso de que Supabase devuelva vacío
const SOCIALS_DEFAULT = {
  fb: 'https://www.facebook.com/profile.php?id=61589505942247',
  ig: 'https://www.instagram.com/litr.oslitros/',
  wa: '522224302693',
  tt: '',
  yt: '',
}

export default function Footer() {
  const { cms } = useCMS()
  const c = cms.contact || {}
  const f = cms.footer  || {}

  // Mezclar defaults con lo que venga de Supabase
  const raw = cms.socials || {}
  const s = {
    fb: raw.fb ?? SOCIALS_DEFAULT.fb,
    ig: raw.ig ?? SOCIALS_DEFAULT.ig,
    wa: raw.wa ?? SOCIALS_DEFAULT.wa,
    tt: raw.tt ?? SOCIALS_DEFAULT.tt,
    yt: raw.yt ?? SOCIALS_DEFAULT.yt,
  }

  // Solo mostrar redes con URL no vacía
  const redesActivas = REDES.filter(r => s[r.key] && s[r.key].trim() !== '')

  return (
    <footer className="sec-c" style={{ background:'#0d1520', borderTop:'1px solid rgba(41,90,158,.2)', padding:'2.5rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1.5rem', marginBottom:'2rem' }}>

          {/* Marca */}
          <div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:'var(--text-h3)', fontWeight:'var(--fw-black)', color:'#fff', marginBottom:'.5rem' }}>
              {f.brand || 'Litros & Litros'}
            </div>
            <p style={{ fontSize:'.85rem', color:'rgba(234,234,234,.5)', lineHeight:1.65, marginBottom:'1rem' }}>
              {f.desc || 'Karaoke Bar en Puebla'}
            </p>
          </div>

          {/* Contacto y Ubicación */}
          <div>
            <h4 style={labelStyle}>Contacto & Ubicación</h4>
            <p style={linkStyle}>📍 {c.address || 'Blvd Héroes del 5 de Mayo 4610, Puebla'}</p>
            <a href={`tel:${c.phone || '+522224302693'}`} style={{ ...linkStyle, display:'block', transition:'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#3a7bd5'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(234,234,234,.55)'}
            >📞 {c.phone || '+52 222 430 2693'}</a>
            <p style={linkStyle}>🕐 {c.hours || 'Mar–Dom 6PM–3AM'}</p>
          </div>

          {/* Legal */}
          <div>
            <h4 style={labelStyle}>Legal</h4>
            <span style={{ ...linkStyle, display:'block' }}>⚖️ Aviso Legal</span>
          </div>

          {/* Síguenos — texto con links */}
          <div>
            <h4 style={labelStyle}>Síguenos</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              {redesActivas.map(({ key, label, Ico, color }) => (
                <a key={key} href={s[key]} target="_blank" rel="noopener noreferrer"
                  style={{ ...linkStyle, display:'flex', alignItems:'center', gap:'.5rem', transition:'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color=color}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(234,234,234,.55)'}
                >
                  <Ico /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(41,90,158,.15)', paddingTop:'1.25rem', textAlign:'center', fontSize:'.78rem', color:'rgba(234,234,234,.25)' }}>
          {f.copyright || '© Litros & Litros Karaoke Bar — Todos los derechos reservados.'}
        </div>
      </div>
    </footer>
  )
}

const labelStyle = { fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'rgba(41,90,158,.9)', marginBottom:'.75rem' }
const linkStyle  = { fontSize:'.85rem', color:'rgba(234,234,234,.55)', lineHeight:1.7 }
