import { motion } from 'framer-motion'

export default function InputPage({ input, setInput, onRemix }) {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center relative"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <main
        className="relative w-full max-w-[800px] px-6 flex flex-col"
        style={{ height: 'min(614px, calc(100vh - 160px))' }}
      >
        <textarea
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Dump your thoughts here..."
          spellCheck={false}
          className="w-full flex-1 bg-transparent border-none text-[24px] leading-[1.6] text-text-main placeholder:text-text-muted resize-none focus:outline-none focus:ring-0 p-0 m-0"
        />

        {/* Floating glass toolbar */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border border-border-glass rounded-lg p-2 shadow-subtle flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: 'var(--toolbar-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <motion.button
            onClick={onRemix}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            disabled={!input.trim()}
            className="bg-primary text-white text-[14px] font-medium tracking-wide h-8 px-6 rounded-[8px] flex items-center justify-center cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Invoke
          </motion.button>
        </div>
      </main>
    </motion.div>
  )
}
