import { createContext, useContext, useState, useEffect } from 'react'
import { initialCMSData } from '@/utils/cmsData'
import { getCMSSection } from '@/services/adminService'

const CMSContext = createContext(null)

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(initialCMSData)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Carga secciones CMS desde Supabase al iniciar
  useEffect(() => {
    const sections = ['hero', 'cta', 'contact', 'footer', 'about', 'seo']
    sections.forEach(section => {
      getCMSSection(section)
        .then(data => {
          if (data) setCms(prev => ({ ...prev, [section]: data }))
        })
        .catch(() => {}) // Usa initialCMSData como fallback silencioso
    })
  }, [])

  // Actualiza SEO en el <head> cuando cambia
  useEffect(() => {
    document.title = cms.seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', cms.seo.desc)
  }, [cms.seo])

  function updateCMS(section, data) {
    setCms(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
  }

  function updateMenuData(type, items) {
    setCms(prev => ({
      ...prev,
      menuData: { ...prev.menuData, [type]: items },
    }))
  }

  function updateList(key, items) {
    setCms(prev => ({ ...prev, [key]: items }))
  }

  function showToast(msg, duration = 3200) {
    setToast(msg)
    setTimeout(() => setToast(null), duration)
  }

  function openAdmin() {
    setLoginModalOpen(true)
  }

  return (
    <CMSContext.Provider value={{
      cms,
      adminPanelOpen,
      loginModalOpen,
      toast,
      updateCMS,
      updateMenuData,
      updateList,
      showToast,
      openAdmin,
      setLoginModalOpen,
      setAdminPanelOpen,
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
