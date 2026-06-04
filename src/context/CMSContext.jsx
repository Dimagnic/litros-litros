import { createContext, useContext, useState, useEffect } from 'react'
import { initialCMSData } from '@/utils/cmsData'
import { getCMSSection } from '@/services/adminService'

const CMSContext = createContext(null)

const SECTIONS = [
  'header','hero','porqueElegirnos','horario','reservas',
  'alimentos','bebidas','eventos','contact','footer',
  'socials','waFlotante','seo'
]

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(initialCMSData)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    SECTIONS.forEach(section => {
      getCMSSection(section)
        .then(data => { if (data) setCms(prev => ({ ...prev, [section]: data })) })
        .catch(() => {})
    })
  }, [])

  useEffect(() => {
    document.title = cms.seo?.title || 'Litros & Litros'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', cms.seo?.desc || '')
  }, [cms.seo])

  function updateCMS(section, data) {
    setCms(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
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
