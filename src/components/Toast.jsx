import { useCMS } from '@/context/CMSContext'
export default function Toast() {
  const { toast } = useCMS()
  if (!toast) return null
  return (
    <div style={{
      position:'fixed', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
      background:'#1a2537', border:'1px solid rgba(41,90,158,.5)',
      color:'#fff', padding:'.75rem 1.5rem', borderRadius:'.75rem',
      fontSize:'.9rem', fontWeight:600, zIndex:9999,
      boxShadow:'0 8px 30px rgba(0,0,0,.5)', pointerEvents:'none',
    }}>{toast}</div>
  )
}
