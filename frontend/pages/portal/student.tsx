import PortalLayout from '../../components/PortalLayout'

export default function StudentArea(){
  return (
    <PortalLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-ocean">Student Area</h2>
        <p className="mt-3">View results, timetable, and attendance.</p>
      </div>
    </PortalLayout>
  )
}
