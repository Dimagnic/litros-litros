import { createContext, useContext, useState, useEffect } from 'react'
import { initialCMSData } from '@/utils/cmsData'
import { getCMSSection } from '@/services/adminService'

const CMSContext = createContext(null)

// Todas las secciones que existen en la BBDD
const SECTIONS = [
  'header', 'hero', 'horario', 'reservas', 'bebidas',
  'platillos', 'espectaculos', 'menuPromo',
  'footer', 'socials', 'waFlotante', 'contact', 'seo',
  'menuBebidas',
]

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(initialCMSData)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    // Cargar todas las secciones en paralelo
    Promise.allSettled(
      SECTIONS.map(section =>
        getCMSSection(section)
          .then(data => ({ section, data }))
          .catch(() => ({ section, data: null }))
      )
    ).then(results => {
      const updates = {}
      results.forEach(r => {
        if (r.status === 'fulfilled' && r.value.data) {
          updates[r.value.section] = r.value.data
        }
      })
      if (Object.keys(updates).length > 0) {
        setCms(prev => ({ ...prev, ...updates }))
      }
    })
  }, [])

  useEffect(() => {
    document.title = cms.seo?.title || 'Litros & Litros'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', cms.seo?.desc || '')
  }, [cms.seo])

  function updateCMS(section, data) {
    setCms(prev => ({ ...prev, [section]: data }))
  }

  function showToast(msg, duration = 3200) {
    setToast(msg)
    setTimeout(() => setToast(null), duration)
  }

  function openAdmin() { setLoginModalOpen(true) }

  return (
    <CMSContext.Provider value={{
      cms, adminPanelOpen, loginModalOpen, toast,
      updateCMS, showToast, openAdmin,
      setLoginModalOpen, setAdminPanelOpen,
      updateMenuData: () => {}, updateList: () => {},
    }}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const ctx = useContext(CMSContext)
  if (!ctx) throw new Error('useCMS must be used within CMSProvider')
  return ctx
}
