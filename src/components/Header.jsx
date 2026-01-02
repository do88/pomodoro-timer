import { motion } from 'framer-motion'
import { useTimer } from '../context/TimerContext'
import { SettingsIcon } from './Icons'
import { AnimatedButton, slideUp } from './common'

const TomatoIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 md:w-10 md:h-10">
    <motion.path d="M32 58c14 0 24-10 24-24S46 10 32 10 8 20 8 34s10 24 24 24z" fill="currentColor" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: 'backOut' }} />
    <motion.path d="M32 10c-4-4-8-6-8-6s8-2 16 0c0 0-4 2-8 6z" fill="#4CAF50" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} />
    <motion.path d="M24 24c2 0 4 2 4 6" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }} />
  </svg>
)

export default function Header() {
  const { toggleSettings, completedPomodoros } = useTimer()

  return (
    <motion.header className="w-full max-w-lg mx-auto" {...slideUp} transition={{ duration: 0.5, delay: 0.1 }}>
      <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-pomodoro-red"><TomatoIcon /></span>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Pomodoro</h1>
            <p className="text-xs text-white/50">{completedPomodoros} session{completedPomodoros !== 1 ? 's' : ''} completed</p>
          </div>
        </div>
        
        <AnimatedButton onClick={toggleSettings} className="p-3 rounded-xl glass hover:bg-white/10 transition-colors text-white/70 hover:text-white" ariaLabel="Open settings">
          <SettingsIcon />
        </AnimatedButton>
      </div>
    </motion.header>
  )
}
