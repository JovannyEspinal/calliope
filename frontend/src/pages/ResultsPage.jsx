import { useState } from 'react'
import { motion } from 'framer-motion'

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ArticleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="transition-colors p-1 rounded cursor-pointer"
      style={{ color: copied ? '#2b6cee' : 'var(--text-muted)' }}
      title="Copy to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

function CardHeader({ icon, label, accentColor, content }) {
  return (
    <div className="flex items-center justify-between p-6 pb-4 shrink-0">
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
        >
          {icon}
        </div>
        <span className="text-sm font-medium text-text-main">{label}</span>
      </div>
      <CopyButton text={content} />
    </div>
  )
}

export default function ResultsPage({ rawInput, results, onNewRemix }) {
  const xCharCount = results.x.length
  const xMax = 280
  const xPct = Math.min((xCharCount / xMax) * 100, 100)

  return (
    <motion.div
      className="flex-1 flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Collapsed input header */}
      <header className="w-full flex justify-center pt-10 pb-8 shrink-0">
        <div className="w-full max-w-[800px] px-8 relative">
          <button
            onClick={onNewRemix}
            className="flex items-center gap-2 mb-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-text-main"
          >
            <BackArrow />
            <span className="text-sm font-medium tracking-wide uppercase">New Invoke</span>
          </button>

          <div className="h-[100px] overflow-hidden mask-fade-bottom">
            <p className="text-[15px] leading-relaxed text-text-muted whitespace-pre-wrap">{rawInput}</p>
          </div>

          {/* Gradient rule */}
          <div
            className="absolute bottom-0 left-8 right-8 h-px"
            style={{ background: 'linear-gradient(to right, transparent, var(--border-glass), transparent)' }}
          />
        </div>
      </header>

      {/* Results grid */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 pb-12 overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[400px]">

          {/* LinkedIn */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="border border-border-glass rounded-md flex flex-col h-full transition-colors duration-300 cursor-default relative overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px -2px rgba(0,0,0,0.15)',
            }}
          >
            <CardHeader icon={<LinkedInIcon />} label="LinkedIn" accentColor="#6B8EAD" content={results.linkedin} />
            <div className="p-6 pt-0 flex-1 overflow-y-auto glass-scrollbar text-[15px] leading-relaxed text-text-main">
              {results.linkedin.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 last:mb-0">{para}</p>
              ))}
            </div>
          </motion.article>

          {/* X */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="border border-border-glass rounded-md flex flex-col h-full transition-colors duration-300 cursor-default relative overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px -2px rgba(0,0,0,0.15)',
            }}
          >
            <CardHeader icon={<XIcon />} label="X Post" accentColor="#9CA3AF" content={results.x} />
            <div className="p-6 pt-0 flex-1 overflow-y-auto glass-scrollbar text-[15px] leading-relaxed text-text-main">
              {results.x.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 last:mb-0">{para}</p>
              ))}
            </div>
            {/* Character count */}
            <div
              className="p-4 px-6 border-t shrink-0 flex justify-between items-center text-xs text-text-muted"
              style={{ borderColor: 'var(--border-glass)' }}
            >
              <span>{xCharCount} / {xMax}</span>
              <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--skeleton)' }}>
                <div className="h-full rounded-full" style={{ width: `${xPct}%`, backgroundColor: '#9CA3AF' }} />
              </div>
            </div>
          </motion.article>

          {/* Blog */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="border border-border-glass rounded-md flex flex-col h-full transition-colors duration-300 cursor-default relative overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px -2px rgba(0,0,0,0.15)',
            }}
          >
            <CardHeader icon={<ArticleIcon />} label="Blog" accentColor="#B5A58D" content={`${results.blog.title}\n\n${results.blog.content}`} />
            <div className="p-6 pt-0 flex-1 overflow-y-auto glass-scrollbar text-[16px] leading-relaxed text-text-main" style={{ fontFamily: 'Newsreader, serif' }}>
              <h3 className="text-xl font-medium mb-4">{results.blog.title}</h3>
              {results.blog.content.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 last:mb-0">{para}</p>
              ))}
            </div>
          </motion.article>

        </div>
      </main>
    </motion.div>
  )
}
