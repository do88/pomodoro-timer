import { motion, AnimatePresence } from 'framer-motion'
import { useTimer } from './context/TimerContext'
import Header from './components/Header'
import Timer from './components/Timer'
import ModeSelector from './components/ModeSelector'
import RoundIndicator from './components/RoundIndicator'
import Settings from './components/Settings'
import Footer from './components/Footer'
import { MODE_COLORS } from './constants/timer'

function App() {
  const { mode, showSettings } = useTimer()
  const colors = MODE_COLORS[mode]

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 relative" style={{ '--mode-color': colors.primary, '--mode-glow': colors.glow }}>
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: colors.primary }}
        animate={{ x: ['-25%', '25%', '-25%'], y: ['-25%', '25%', '-25%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <Header />

      <motion.main 
        className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto gap-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <ModeSelector />
        <Timer />
        <RoundIndicator />
      </motion.main>

      <Footer />

      <AnimatePresence>
        {showSettings && <Settings />}
      </AnimatePresence>
    </div>
  )
}

export default App
