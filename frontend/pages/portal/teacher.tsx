import PortalLayout from '../../components/PortalLayout'

export default function TeacherArea(){
  return (
    <PortalLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-ocean">Teacher Area</h2>
        <p className="mt-3">View assigned classes, upload results, and post announcements.</p>
      </div>
    </PortalLayout>
  )
}
