import { createContext, useContext, useState, useEffect } from 'react'
import { initialCMSData } from '@/utils/cmsData'

const CMSContext = createContext(null)

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(() => {
    try {
      const saved = localStorage.getItem('ll_cms')
      return saved ? JSON.parse(saved) : initialCMSData
    } catch {
      return initialCMSData
    }
  })

  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('ll_cms', JSON.stringify(cms)) } catch {}
  }, [cms])

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

  // openAdmin ahora delega en AuthContext — Header lo llama directamente
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
