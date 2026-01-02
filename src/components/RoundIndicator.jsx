import { motion } from 'framer-motion'
import { useTimer } from '../context/TimerContext'
import { TOTAL_ROUNDS, MODE_COLORS, TIMER_MODES } from '../constants/timer'
import { slideUp } from './common'

const TomatoIcon = ({ filled }) => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 md:w-8 md:h-8">
    <motion.path d="M16 28c7 0 12-5 12-12S23 4 16 4 4 9 4 16s5 12 12 12z" fill={filled ? '#FF6B6B' : 'rgba(255,255,255,0.15)'} initial={{ scale: filled ? 0.8 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }} />
    <path d="M16 4c-2-2-4-3-4-3s4-1 8 0c0 0-2 1-4 3z" fill={filled ? '#4CAF50' : 'rgba(255,255,255,0.1)'} />
    {filled && <motion.path d="M12 12c1 0 2 1 2 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />}
  </svg>
)

export default function RoundIndicator() {
  const { round, mode } = useTimer()
  const colors = MODE_COLORS[mode]

  return (
    <motion.div className="flex flex-col items-center gap-3" {...slideUp} transition={{ duration: 0.4, delay: 0.3 }}>
      <span className="text-white/50 text-sm uppercase tracking-widest font-medium">
        Round {Math.min(round, TOTAL_ROUNDS)} of {TOTAL_ROUNDS}
      </span>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
          const isCurrent = i === round - 1 && mode === TIMER_MODES.POMODORO
          
          return (
            <motion.div key={i} className="relative" animate={isCurrent ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: isCurrent ? Infinity : 0, ease: 'easeInOut' }}>
              <TomatoIcon filled={i < round} />
              {isCurrent && <motion.div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)` }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
