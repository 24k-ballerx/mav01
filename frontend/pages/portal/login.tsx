import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../../services/authService'
import { setAuthToken } from '../../lib/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login(username, password)
      setAuthToken(data.access)
      router.push('/portal/dashboard')
    } catch (err) {
      alert('Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center hero-bg">
      <form onSubmit={handleSubmit} className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-ocean mb-4">Portal Login</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full p-3 mb-3 rounded border" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-3 rounded border" />
        <button className="w-full bg-ocean text-white p-3 rounded" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  )
}
