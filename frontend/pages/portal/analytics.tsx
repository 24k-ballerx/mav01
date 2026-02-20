import PortalLayout from '../../components/PortalLayout'
import useSWR from 'swr'
import api from '../../lib/api'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const fetcher = (url) => api.get(url).then(r=>r.data)

export default function Analytics(){
  const { data, error } = useSWR('/analytics/', fetcher)

  if (error) return <PortalLayout><div>Error loading analytics</div></PortalLayout>
  if (!data) return <PortalLayout><div>Loading...</div></PortalLayout>

  const chartData = [
    { name: 'Students', value: data.students || 0 },
    { name: 'Avg Score', value: data.avg_score || 0 },
  ]

  return (
    <PortalLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-ocean">Analytics Overview</h2>
        <div style={{ width: '100%', height: 300 }} className="mt-6">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0A3D62" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PortalLayout>
  )
}
