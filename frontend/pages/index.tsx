import Head from 'next/head'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sample School</title>
      </Head>

      <header className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur z-50">
        <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-ocean">Sample School</div>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/academics">Academics</Link>
            <Link href="/admissions">Admissions</Link>
          </div>
        </nav>
      </header>

      <main className="mt-20">
        <section className="hero-bg h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <h1 className="text-white text-5xl md:text-7xl font-extrabold">Inspiring Excellence — UK & Nigeria</h1>
              <p className="text-white/90 mt-4 max-w-2xl">A modern secondary school combining UK academic rigour with Nigerian vibrancy.</p>
              <div className="mt-6 space-x-4">
                <Link href="/admissions" className="bg-white text-ocean px-6 py-3 rounded-lg font-semibold inline-block">Apply Now</Link>
                <Link href="/portal" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg inline-block">Portal Login</Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl shadow-lg glass">
              <h3 className="text-ocean font-bold text-xl">Academics</h3>
              <p className="mt-2">WAEC, NECO and UK curriculum offerings.</p>
            </div>
            <div className="p-6 rounded-xl shadow-lg glass">
              <h3 className="text-ocean font-bold text-xl">Admissions</h3>
              <p className="mt-2">Apply online and track your application.</p>
            </div>
            <div className="p-6 rounded-xl shadow-lg glass">
              <h3 className="text-ocean font-bold text-xl">Portal</h3>
              <p className="mt-2">Secure role-based access for staff, students and parents.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
