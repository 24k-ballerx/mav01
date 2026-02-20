import PortalLayout from '../../components/PortalLayout'

export default function AdminArea(){
  return (
    <PortalLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-ocean">Admin Area</h2>
        <p className="mt-3">Manage students, teachers, classes and results.</p>
      </div>
    </PortalLayout>
  )
}
