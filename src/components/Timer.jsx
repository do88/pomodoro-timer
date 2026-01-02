import { motion } from 'framer-motion'
import { useTimer } from '../context/TimerContext'
import { useFormattedTime, useProgress } from '../hooks/useFormattedTime'
import { MODE_COLORS, MODE_LABELS } from '../constants/timer'
import { PlayIcon, PauseIcon, ResetIcon } from './Icons'
import { AnimatedButton, scaleIn } from './common'

const SIZE = 320, STROKE = 8

function CircularProgress({ progress, colors }) {
  const r = (SIZE - STROKE) / 2
  const circ = r * 2 * Math.PI

  return (
    <svg width={SIZE} height={SIZE} className="progress-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <circle cx={SIZE / 2} cy={SIZE / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={STROKE} />
      <motion.circle
        cx={SIZE / 2} cy={SIZE / 2} r={r}
        fill="none" stroke={colors.primary} strokeWidth={STROKE} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - (progress / 100) * circ}
        style={{ filter: `drop-shadow(0 0 10px ${colors.glow})` }}
        animate={{ strokeDashoffset: circ - (progress / 100) * circ }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function Timer() {
  const { timeRemaining, totalTime, isRunning, mode, toggleTimer, resetTimer, requestNotificationPermission } = useTimer()
  const colors = MODE_COLORS[mode]

  return (
    <motion.div className="relative flex flex-col items-center" {...scaleIn} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="relative w-72 h-72 md:w-80 md:h-80">
        <CircularProgress progress={useProgress(timeRemaining, totalTime)} colors={colors} />
        
        <motion.div 
          className="absolute inset-4 rounded-full glass-heavy flex flex-col items-center justify-center"
          animate={{ boxShadow: isRunning ? `0 0 60px ${colors.glow}, inset 0 0 60px ${colors.glow}` : `0 0 30px ${colors.glow}, inset 0 0 30px rgba(255,255,255,0.05)` }}
          transition={{ duration: 0.5 }}
        >
          <motion.span className="text-sm md:text-base uppercase tracking-widest mb-2 font-medium" style={{ color: colors.primary }} key={mode} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            {MODE_LABELS[mode]}
          </motion.span>
          
          <motion.div className="timer-display text-6xl md:text-7xl font-bold tracking-tight" style={{ color: colors.primary }} key={useFormattedTime(timeRemaining)} initial={{ scale: 0.98 }} animate={{ scale: 1 }}>
            {useFormattedTime(timeRemaining)}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <AnimatedButton onClick={resetTimer} className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-white/60 hover:text-white" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} ariaLabel="Reset timer">
          <ResetIcon />
        </AnimatedButton>

        <AnimatedButton
          onClick={() => { requestNotificationPermission(); toggleTimer() }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: `0 10px 40px ${colors.glow}` }}
          whileHover={{ scale: 1.05, boxShadow: `0 15px 50px ${colors.glow}` }}
          ariaLabel={isRunning ? 'Pause timer' : 'Start timer'}
        >
          <motion.div key={isRunning} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.2 }}>
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </motion.div>
        </AnimatedButton>

        <div className="w-[52px]" />
      </div>
    </motion.div>
  )
}
