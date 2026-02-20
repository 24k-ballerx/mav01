import { useEffect, useState } from 'react'
import PortalLayout from '../../components/PortalLayout'
import api from '../../lib/api'

export default function AdminResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await api.get('/portal/results/')
    setResults(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function approve(id) {
    await api.post(`/portal/results/${id}/approve/`)
    load()
  }

  async function downloadPdf(id) {
    const res = await api.get(`/portal/results/${id}/pdf/`, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `result_${id}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function downloadCsv() {
    const res = await api.get('/portal/results/export_csv/')
    const blob = new Blob([res.data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `results_export.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <PortalLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-ocean">Pending Results</h2>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={downloadCsv} className="px-4 py-2 bg-ocean text-white rounded">Download CSV</button>
            </div>
            <table className="w-full mt-4 table-auto">
              <thead><tr><th>Student</th><th>Subject</th><th>Score</th><th>Approved</th><th></th></tr></thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.id} className="border-t"><td>{r.student.user.username}</td><td>{r.subject.name}</td><td>{r.score}</td><td>{String(r.approved)}</td><td className="space-x-2">{!r.approved && <button onClick={() => approve(r.id)} className="px-3 py-1 bg-ocean text-white rounded">Approve</button>} <button onClick={() => downloadPdf(r.id)} className="px-3 py-1 bg-white border rounded">PDF</button></td></tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </PortalLayout>
  )
}
