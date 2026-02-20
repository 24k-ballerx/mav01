import { useEffect, useState } from 'react'

export function useNotifications() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const wsUrl = (typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws') + '://' + (process.env.NEXT_PUBLIC_WS_HOST || window.location.host) + '/ws/notifications/'
    const ws = new WebSocket(wsUrl)
    ws.onmessage = (e) => {
      try{
        const data = JSON.parse(e.data)
        // normalize message shape
        const msg = { type: data.type || data.event || 'notification', message: data.message || data.detail || JSON.stringify(data) }
        setMessages(prev => [msg, ...prev])
      }catch(err){}
    }
    return ()=> ws.close()
  }, [])

  return { messages }
}
