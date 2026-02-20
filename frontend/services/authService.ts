import api, { setAuthToken } from '../lib/api'

const TOKEN_KEY = 'school_tokens'

export async function login(username: string, password: string) {
  try {
    const res = await api.post('/auth/token/', { username, password })
    const data = res.data
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
    setAuthToken(data.access)
    return data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  setAuthToken(null)
}

export function loadTokens() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    setAuthToken(parsed.access)
    return parsed
  } catch (e) {
    return null
  }
}
