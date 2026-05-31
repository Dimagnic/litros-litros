import { useCMS } from '@/context/CMSContext'

export default function Toast() {
  const { toast } = useCMS()
  if (!toast) return null

  return (
    <div className="toast" style={{ animation: 'fadeUp .3s ease' }}>
      {toast}
    </div>
  )
}
