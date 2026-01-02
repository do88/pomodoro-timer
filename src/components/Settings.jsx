import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTimer } from '../context/TimerContext'
import { DEFAULT_SETTINGS, TIMER_FIELDS, TOGGLE_FIELDS } from '../constants/timer'
import { CloseIcon } from './Icons'
import { AnimatedButton, fadeIn, scaleIn } from './common'

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-white/80 group-hover:text-white transition-colors">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`toggle-switch ${checked ? 'active' : ''}`} />
    </label>
  )
}

function NumberInput({ value, onChange, label, min = 1, max = 60 }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/80">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors text-white/60 hover:text-white flex items-center justify-center">−</button>
        <input type="number" value={value} onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= min && v <= max) onChange(v) }} min={min} max={max} className="w-16 h-8 bg-white/5 border border-white/10 rounded-lg text-center text-white font-mono focus:border-pomodoro-red/50 focus:outline-none transition-colors" />
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors text-white/60 hover:text-white flex items-center justify-center">+</button>
        <span className="text-white/40 text-sm ml-1">min</span>
      </div>
    </div>
  )
}

export default function Settings() {
  const { settings, updateSettings, toggleSettings } = useTimer()
  const [local, setLocal] = useState(settings)

  useEffect(() => setLocal(settings), [settings])

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" {...fadeIn}>
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleSettings} {...fadeIn} />

      <motion.div className="relative w-full max-w-md glass-heavy rounded-3xl p-6 md:p-8 overflow-hidden" {...scaleIn} transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pomodoro-red via-pomodoro-blue to-pomodoro-green" />

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <AnimatedButton onClick={toggleSettings} className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <CloseIcon />
          </AnimatedButton>
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-sm uppercase tracking-widest text-white/40 font-medium">Timer (minutes)</h3>
          <div className="space-y-4">
            {TIMER_FIELDS.map(({ key, label }) => <NumberInput key={key} label={label} value={local[key]} onChange={(v) => setLocal(p => ({ ...p, [key]: v }))} />)}
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-sm uppercase tracking-widest text-white/40 font-medium">Preferences</h3>
          <div className="space-y-4">
            {TOGGLE_FIELDS.map(({ key, label }) => <Toggle key={key} label={label} checked={local[key]} onChange={(v) => setLocal(p => ({ ...p, [key]: v }))} />)}
          </div>
        </div>

        <div className="flex gap-3">
          <AnimatedButton onClick={() => setLocal(DEFAULT_SETTINGS)} className="flex-1 py-3 px-4 rounded-xl glass hover:bg-white/10 transition-colors text-white/70 font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Reset Defaults
          </AnimatedButton>
          <AnimatedButton onClick={() => { updateSettings(local); toggleSettings() }} className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pomodoro-red to-pomodoro-red-dark text-white font-medium shadow-lg" style={{ boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Save Changes
          </AnimatedButton>
        </div>
      </motion.div>
    </motion.div>
  )
}
