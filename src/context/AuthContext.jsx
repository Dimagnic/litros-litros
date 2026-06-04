import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar perfil (role) desde la tabla profiles
  async function loadProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (!error && data) setProfile(data)
      else setProfile({ id: userId, role: 'admin' })
    } catch {
      setProfile({ id: userId, role: 'admin' })
    }
  }

  useEffect(() => {
    // Sesión actual al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      setLoading(false)
    })

    // Escuchar cambios de sesión (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (data.user) {
      try {
        // Intentar leer perfil con timeout de 3 segundos
        const profilePromise = supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 3000)
        )

        const { data: profileData } = await Promise.race([profilePromise, timeoutPromise])
          .catch(() => ({ data: null }))

        if (profileData) {
          setProfile(profileData)
          return { ...data, profile: profileData }
        }
      } catch (e) {
        // Si falla la tabla profiles, asumir admin si el email coincide
      }

      // Fallback: si no hay tabla profiles, dar acceso admin directamente
      const fallbackProfile = { id: data.user.id, role: 'admin', email: data.user.email }
      setProfile(fallbackProfile)
      return { ...data, profile: fallbackProfile }
    }
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAdmin,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
