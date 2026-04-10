import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InputPage from './pages/InputPage'
import GeneratingPage from './pages/GeneratingPage'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const [view, setView] = useState('input') // 'input' | 'generating'
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div
      className="h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
    >
      {/* Ambient glow — only on input page */}
      {view === 'input' && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '80vw',
            height: '80vh',
            background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Theme toggle */}
      <motion.button
        onClick={() => setIsDark((d) => !d)}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="fixed top-5 right-5 z-50 w-9 h-9 flex items-center justify-center rounded-full border cursor-pointer"
        style={{
          backgroundColor: 'var(--toggle-bg)',
          borderColor: 'var(--toggle-border)',
          color: 'var(--text-muted)',
        }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Page views */}
      <AnimatePresence mode="wait">
        {view === 'input' ? (
          <InputPage
            key="input"
            input={input}
            setInput={setInput}
            onRemix={() => setView('generating')}
          />
        ) : (
          <GeneratingPage
            key="generating"
            rawInput={input}
            onCancel={() => setView('input')}
            onNewInvoke={() => { setInput(''); setView('input') }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
