import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { AnimatePresence, motion } from 'framer-motion'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </AuthProvider>
  )
}
