import { createContext, useContext, useState } from 'react'
import { initialCMSData } from '@/utils/cmsData'

const CMSContext = createContext(null)

export function CMSProvider({ children }) {
  const [cms] = useState(initialCMSData)
  return (
    <CMSContext.Provider value={{ cms }}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const ctx = useContext(CMSContext)
  if (!ctx) throw new Error('useCMS must be used within CMSProvider')
  return ctx
}
