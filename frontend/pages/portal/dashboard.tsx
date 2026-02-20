import dynamic from 'next/dynamic'
import PortalLayout from '../../components/PortalLayout'
import { useAuth } from '../../hooks/useAuth'
import Link from 'next/link'

export default function Dashboard() {
  const { user, loading } = useAuth() || {}

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <PortalLayout>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-bold text-ocean">Overview</h3>
          <p className="mt-2">Welcome {user?.first_name || user?.username}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-bold text-ocean">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {user?.role === 'teacher' && <li><Link href="/portal/teacher">Teacher Area</Link></li>}
            {user?.role === 'student' && <li><Link href="/portal/student">Student Area</Link></li>}
            {user?.role === 'admin' && <li><Link href="/portal/admin">Admin Area</Link></li>}
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-bold text-ocean">Notifications</h3>
          <p className="mt-2">No new notifications</p>
        </div>
      </div>
    </PortalLayout>
  )
}
