import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function PortalLayout({ children }) {
  const { user } = useAuth() || {}
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 bg-white/70 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="font-bold text-ocean">Sample School Portal</div>
          <nav className="space-x-4">
            <Link href="/">Website</Link>
            <Link href="/portal/dashboard">Dashboard</Link>
            {user && <span className="ml-4 text-sm">{user.username} • {user.role}</span>}
          </nav>
        </div>
      </header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto p-6">
        {children}
      </motion.div>
    </div>
  )
}
