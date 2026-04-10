import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CalliopteLogo() {
  return (
    <svg fill="none" viewBox="0 0 48 48" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" />
      <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function LinkedInIcon({ size = 22 }) {
  return (
    <svg fill="currentColor" height={size} width={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
    </svg>
  )
}

function XIcon({ size = 22 }) {
  return (
    <svg fill="currentColor" height={size} width={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Z" />
    </svg>
  )
}

function BlogIcon({ size = 22 }) {
  return (
    <svg fill="currentColor" height={size} width={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function parseBlogContent(raw) {
  const lines = raw.split('\n')
  const titleLine = lines.find((l) => l.startsWith('## ') || l.startsWith('# '))
  const title = titleLine ? titleLine.replace(/^#+\s*/, '') : 'Untitled'
  const content = lines.filter((l) => l !== titleLine).join('\n').trim()
  return { title, content }
}

const platformMeta = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
    smallIcon: <LinkedInIcon size={14} />,
    iconColor: '#6B8EAD',
    delay: 0,
    skeletonRows: [
      'w-3/4 h-3', 'w-full h-3', 'w-5/6 h-3', 'w-full h-3',
      'w-2/3 h-3 mt-4', 'w-full h-3', 'w-4/5 h-3',
    ],
  },
  {
    key: 'x',
    label: 'X',
    icon: <XIcon />,
    smallIcon: <XIcon size={14} />,
    iconColor: '#9CA3AF',
    delay: 0.2,
    skeletonRows: [
      'w-full h-3', 'w-11/12 h-3', 'w-4/5 h-3',
      'w-1/2 h-3 mt-4',
    ],
  },
  {
    key: 'blog',
    label: 'Blog',
    icon: <BlogIcon />,
    smallIcon: <BlogIcon size={14} />,
    iconColor: '#B5A58D',
    delay: 0.4,
    skeletonRows: [
      'w-2/3 h-5 mb-4', 'w-full h-3', 'w-full h-3', 'w-5/6 h-3',
      'w-full h-3 mt-4', 'w-11/12 h-3', 'w-full h-3', 'w-3/4 h-3',
      'w-full h-3 mt-4', 'w-4/5 h-3',
    ],
  },
]

const cardStyle = {
  backgroundColor: 'var(--surface)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 4px 24px -2px rgba(0,0,0,0.15)',
}

function SkeletonCard({ platform }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, delay: platform.delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg h-[500px] relative overflow-hidden flex flex-col p-6 border border-border-glass"
      style={cardStyle}
    >
      <div className="flex items-center gap-3 mb-8 opacity-50">
        <div style={{ color: platform.iconColor }}>{platform.icon}</div>
        <h3 className="text-base font-semibold text-text-muted">{platform.label}</h3>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {platform.skeletonRows.map((cls, i) => (
          <div key={i} className={`${cls} rounded skeleton`} />
        ))}
      </div>
    </motion.div>
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

function StatusBadge({ status }) {
  if (status === 'done') {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#4ade80' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Done
      </div>
    )
  }
  const config = {
    writing:    { label: 'Writing',    color: '#60a5fa' },
    evaluating: { label: 'Evaluating', color: '#fbbf24' },
  }
  const { label, color } = config[status] ?? config.writing
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color }}>
      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}

function ContentCard({ platform, content, status }) {
  const isX = platform.key === 'x'
  const isBlog = platform.key === 'blog'
  const copyText = isBlog ? `${content.title}\n\n${content.content}` : content
  const xPct = isX ? Math.min((content.length / 280) * 100, 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg h-[500px] flex flex-col border border-border-glass overflow-hidden"
      style={cardStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: `${platform.iconColor}1a`, color: platform.iconColor }}
          >
            {platform.smallIcon}
          </div>
          <span className="text-sm font-medium text-text-main">{platform.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          <CopyButton text={copyText} />
        </div>
      </div>

      {/* Content */}
      {isBlog ? (
        <div
          className="px-6 pb-6 flex-1 overflow-y-auto glass-scrollbar"
          style={{ fontFamily: 'Newsreader, serif' }}
        >
          <h3 className="text-xl font-medium mb-4 text-text-main">{content.title}</h3>
          {content.content.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0 text-[16px] leading-relaxed text-text-main">{para}</p>
          ))}
        </div>
      ) : (
        <>
          <div className="px-6 pb-4 flex-1 overflow-y-auto glass-scrollbar text-[15px] leading-relaxed text-text-main">
            {content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 last:mb-0">{para}</p>
            ))}
          </div>
          {isX && (
            <div
              className="px-6 py-3 border-t shrink-0 flex justify-between items-center text-xs text-text-muted"
              style={{ borderColor: 'var(--border-glass)' }}
            >
              <span>{content.length} / 280</span>
              <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--skeleton)' }}>
                <div className="h-full rounded-full" style={{ width: `${xPct}%`, backgroundColor: '#9CA3AF' }} />
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

const NODE_STATUS = {
  extraction_agent_node: 'Researching...',
  research_agent_node: 'Writing...',
  x_writer_node: 'Evaluating...',
  linkedin_writer_node: 'Evaluating...',
  substack_writer_node: 'Evaluating...',
  x_evaluator_node: 'Refining...',
  linkedin_evaluator_node: 'Refining...',
  substack_evaluator_node: 'Refining...',
}

const NODE_TO_PLATFORM = {
  linkedin_writer_node: 'linkedin',
  x_writer_node: 'x',
  substack_writer_node: 'blog',
  linkedin_evaluator_node: 'linkedin',
  x_evaluator_node: 'x',
  substack_evaluator_node: 'blog',
}

const PLATFORM_CONTENT_KEY = {
  linkedin: 'linkedin_content',
  x: 'x_content',
  blog: 'substack_content',
}

export default function GeneratingPage({ rawInput, onCancel, onNewInvoke }) {
  const [platforms, setPlatforms] = useState({ linkedin: null, x: null, blog: null })
  const [platformStatus, setPlatformStatus] = useState({ linkedin: 'pending', x: 'pending', blog: 'pending' })
  const [isDone, setIsDone] = useState(false)
  const [status, setStatus] = useState('Extracting...')

  useEffect(() => {
    const controller = new AbortController()
    const accumulated = {}

    async function stream() {
      try {
        const response = await fetch('http://127.0.0.1:8000/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw_input: rawInput }),
          signal: controller.signal,
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let currentEvent = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop()

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              currentEvent = line.slice(7).trim()
            } else if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                Object.assign(accumulated, data)
                setPlatforms({
                  linkedin: accumulated.linkedin_content?.content || null,
                  x: accumulated.x_content?.content || null,
                  blog: accumulated.substack_content?.content
                    ? parseBlogContent(accumulated.substack_content.content)
                    : null,
                })
                if (NODE_STATUS[currentEvent]) {
                  setStatus(NODE_STATUS[currentEvent])
                }
                const platform = NODE_TO_PLATFORM[currentEvent]
                if (platform) {
                  if (currentEvent.endsWith('_writer_node')) {
                    setPlatformStatus(prev => ({ ...prev, [platform]: 'evaluating' }))
                  } else if (currentEvent.endsWith('_evaluator_node')) {
                    const contentKey = PLATFORM_CONTENT_KEY[platform]
                    const score = accumulated[contentKey]?.score ?? 0
                    const iteration = accumulated[contentKey]?.iteration ?? 0
                    const passed = score >= 8 || iteration >= 5
                    setPlatformStatus(prev => ({ ...prev, [platform]: passed ? 'done' : 'writing' }))
                  }
                }
              } catch {
                // skip malformed lines
              }
            }
          }
        }

        setIsDone(true)
        setPlatformStatus({ linkedin: 'done', x: 'done', blog: 'done' })
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Stream error:', err)
      }
    }

    stream()
    return () => controller.abort()
  }, [rawInput])

  return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header
        className="flex items-center px-10 py-6 border-b transition-colors duration-300"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <button
          onClick={isDone ? onNewInvoke : onCancel}
          className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors focus:outline-none rounded-md px-2 py-1 cursor-pointer"
        >
          <BackArrow />
          <span className="text-sm font-medium">{isDone ? 'New Invoke' : 'Cancel'}</span>
        </button>

        <div className="mx-auto flex items-center gap-3 text-text-muted">
          <CalliopteLogo />
          <AnimatePresence mode="wait">
            <motion.span
              key={isDone ? 'done' : status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-semibold tracking-wide uppercase"
            >
              {isDone ? 'Done' : status}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="w-20" />
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-6 pt-12 pb-24 overflow-y-auto">

        {/* Input preview */}
        <motion.div
          className="w-full max-w-3xl relative mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative h-[120px] overflow-hidden rounded-lg border border-border-glass p-6"
            style={{
              backgroundColor: 'var(--surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p className="text-[15px] leading-relaxed text-text-muted">{rawInput}</p>
            <div
              className="absolute bottom-0 left-0 w-full h-16 pointer-events-none rounded-b-lg"
              style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
            />
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformMeta.map((meta) => {
            const content = platforms[meta.key]
            return (
              <AnimatePresence key={meta.key} mode="wait">
                {content === null ? (
                  <SkeletonCard key="skeleton" platform={meta} />
                ) : (
                  <ContentCard key="content" platform={meta} content={content} status={platformStatus[meta.key]} />
                )}
              </AnimatePresence>
            )
          })}
        </div>
      </main>
    </motion.div>
  )
}
