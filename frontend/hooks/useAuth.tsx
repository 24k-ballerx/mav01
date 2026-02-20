import { useEffect, useState, createContext, useContext } from 'react'
import { loadTokens, logout } from '../services/authService'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tokens = loadTokens()
    if (tokens) {
      // fetch current user
      api.get('/users/me/').then(res => setUser(res.data)).catch(() => logout())
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
