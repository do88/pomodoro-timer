import { motion } from 'framer-motion'
import { useTimer } from '../context/TimerContext'
import { TIMER_MODES, MODE_COLORS, TOTAL_ROUNDS } from '../constants/timer'

const MODES = [
  { id: TIMER_MODES.POMODORO, label: 'Pomodoro', short: 'Focus' },
  { id: TIMER_MODES.SHORT_BREAK, label: 'Short Break', short: 'Short' },
  { id: TIMER_MODES.LONG_BREAK, label: 'Long Break', short: 'Long' },
]

const isDisabled = (id, round) => 
  (id === TIMER_MODES.SHORT_BREAK && (round === 0 || round > TOTAL_ROUNDS)) || 
  (id === TIMER_MODES.LONG_BREAK && round === 0)

export default function ModeSelector() {
  const { mode, setMode, round, isRunning } = useTimer()

  const handleChange = (newMode) => {
    if (newMode !== mode && (!isRunning || window.confirm('Timer is running. Switch mode and reset?'))) {
      setMode(newMode)
    }
  }

  return (
    <motion.div className="glass rounded-2xl p-1.5 flex gap-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
      {MODES.map(({ id, label, short }) => {
        const active = mode === id
        const disabled = isDisabled(id, round)
        const colors = MODE_COLORS[id]

        return (
          <motion.button
            key={id}
            onClick={() => handleChange(id)}
            disabled={disabled}
            className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 ${active ? 'text-white' : 'text-white/50 hover:text-white/80'} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            {active && <motion.div className="absolute inset-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: `0 4px 20px ${colors.glow}` }} layoutId="activeMode" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
            <span className="relative z-10 hidden md:inline">{label}</span>
            <span className="relative z-10 md:hidden">{short}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
