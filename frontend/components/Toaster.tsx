import { useEffect, useState } from 'react'
import { useNotifications } from '../hooks/useNotifications'

export default function Toaster(){
  const { messages } = useNotifications()
  const [toasts, setToasts] = useState([])

  useEffect(()=>{
    if(messages.length>0){
      setToasts(prev => [messages[0], ...prev].slice(0,5))
      setTimeout(()=>{
        setToasts(prev => prev.slice(0,4))
      }, 8000)
    }
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {toasts.map((t, i) => (
        <div key={i} className="bg-ocean text-white px-4 py-2 rounded shadow">
          <div className="font-semibold">{t.type}</div>
          <div className="text-sm">{t.message}</div>
        </div>
      ))}
    </div>
  )
}
