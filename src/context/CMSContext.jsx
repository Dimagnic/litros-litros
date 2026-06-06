import { createContext, useContext, useState, useEffect } from 'react'
import { initialCMSData } from '@/utils/cmsData'
import { getCMSSection } from '@/services/adminService'

const CMSContext = createContext(null)

const SECTIONS = [
  'hero','header','horario','menuPromo','bebidas',
  'reservas','platillos','espectaculos','footer',
  'socials','waFlotante','contact','seo','menuBebidas','galeria'
]

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(initialCMSData)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    // Cargar todas las secciones en paralelo con fallback silencioso
    SECTIONS.forEach(section => {
      getCMSSection(section).then(data => {
        if (data && Object.keys(data).length > 0) {
          setCms(prev => ({ ...prev, [section]: data }))
        }
      }).catch(() => {})
    })
  }, [])

  useEffect(() => {
    document.title = cms.seo?.title || 'Litros & Litros Karaoke Bar'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', cms.seo?.desc || '')
  }, [cms.seo])

  function updateCMS(section, data) {
    setCms(prev => ({ ...prev, [section]: data }))
  }
  function showToast(msg, duration = 3200) {
    setToast(msg); setTimeout(() => setToast(null), duration)
  }
  function openAdmin() { setLoginModalOpen(true) }

  return (
    <CMSContext.Provider value={{
      cms, adminPanelOpen, loginModalOpen, toast,
      updateCMS, showToast, openAdmin,
      setLoginModalOpen, setAdminPanelOpen,
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
