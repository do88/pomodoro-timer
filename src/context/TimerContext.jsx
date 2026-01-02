import { createContext, useContext, useReducer, useMemo, useEffect, useRef, useState } from 'react'
import { TIMER_MODES, TOTAL_ROUNDS, DEFAULT_SETTINGS, COMPLETION_MESSAGES, NOTIFICATION_SOUND } from '../constants/timer'

const ACTIONS = {
  TICK: 'TICK',
  TOGGLE: 'TOGGLE',
  SET_MODE: 'SET_MODE',
  NEXT: 'NEXT',
  RESET: 'RESET',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  TOGGLE_SETTINGS: 'TOGGLE_SETTINGS',
}

const getTime = (mode, settings) => settings[mode] * 60

const getInitialState = () => ({
  timeRemaining: DEFAULT_SETTINGS.pomodoro * 60,
  totalTime: DEFAULT_SETTINGS.pomodoro * 60,
  isRunning: false,
  mode: TIMER_MODES.POMODORO,
  round: 0,
  completedPomodoros: 0,
  settings: DEFAULT_SETTINGS,
  showSettings: false,
})

function timerReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.TICK:
      return state.timeRemaining > 0 ? { ...state, timeRemaining: state.timeRemaining - 1 } : state

    case ACTIONS.TOGGLE:
      return {
        ...state,
        isRunning: !state.isRunning,
        round: state.round === 0 && !state.isRunning ? 1 : state.round,
      }

    case ACTIONS.SET_MODE: {
      const time = getTime(payload, state.settings)
      return { ...state, mode: payload, timeRemaining: time, totalTime: time, isRunning: false }
    }

    case ACTIONS.NEXT: {
      const { mode, round, settings, completedPomodoros } = state
      const isPom = mode === TIMER_MODES.POMODORO
      
      const newMode = isPom ? (round >= TOTAL_ROUNDS ? TIMER_MODES.LONG_BREAK : TIMER_MODES.SHORT_BREAK) : TIMER_MODES.POMODORO
      const newRound = mode === TIMER_MODES.SHORT_BREAK ? round + 1 : mode === TIMER_MODES.LONG_BREAK ? 1 : round
      const time = getTime(newMode, settings)
      
      // Only auto-start if tab is visible
      const isTabVisible = typeof document !== 'undefined' && document.visibilityState === 'visible'
      const autoStart = isTabVisible && (newMode === TIMER_MODES.POMODORO ? settings.autoStartPomodoros : settings.autoStartBreaks)

      return {
        ...state,
        mode: newMode,
        round: newRound,
        timeRemaining: time,
        totalTime: time,
        completedPomodoros: isPom ? completedPomodoros + 1 : completedPomodoros,
        isRunning: autoStart,
      }
    }

    case ACTIONS.RESET: {
      const time = getTime(state.mode, state.settings)
      return { ...state, timeRemaining: time, totalTime: time, isRunning: false }
    }

    case ACTIONS.UPDATE_SETTINGS: {
      const newSettings = { ...state.settings, ...payload }
      const time = getTime(state.mode, newSettings)
      return {
        ...state,
        settings: newSettings,
        timeRemaining: state.isRunning ? state.timeRemaining : time,
        totalTime: time,
      }
    }

    case ACTIONS.TOGGLE_SETTINGS:
      return { ...state, showSettings: !state.showSettings, isRunning: false }

    default:
      return state
  }
}

const TimerContext = createContext(null)

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, null, getInitialState)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Track tab visibility
  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Update document title with time when running
  useEffect(() => {
    if (state.isRunning) {
      const mins = Math.floor(state.timeRemaining / 60)
      const secs = state.timeRemaining % 60
      document.title = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} - Pomodoro`
    } else {
      document.title = 'Pomodoro Timer'
    }
  }, [state.timeRemaining, state.isRunning])

  useEffect(() => { audioRef.current = new Audio(NOTIFICATION_SOUND) }, [])

  useEffect(() => {
    if (state.isRunning && state.timeRemaining > 0) {
      intervalRef.current = setInterval(() => dispatch({ type: ACTIONS.TICK }), 1000)
      return () => clearInterval(intervalRef.current)
    }
  }, [state.isRunning, state.timeRemaining])

  useEffect(() => {
    if (state.timeRemaining === 0 && state.isRunning) {
      if (state.settings.soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
      
      if (state.settings.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        const { title, body } = COMPLETION_MESSAGES[state.mode]
        new Notification(title, { body, icon: '/tomato.svg' })
      }
      
      dispatch({ type: ACTIONS.NEXT })
    }
  }, [state.timeRemaining, state.isRunning, state.mode, state.settings.soundEnabled, state.settings.notificationsEnabled])

  const value = useMemo(() => ({
    ...state,
    isTabVisible,
    toggleTimer: () => dispatch({ type: ACTIONS.TOGGLE }),
    setMode: (mode) => dispatch({ type: ACTIONS.SET_MODE, payload: mode }),
    resetTimer: () => dispatch({ type: ACTIONS.RESET }),
    updateSettings: (settings) => dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings }),
    toggleSettings: () => dispatch({ type: ACTIONS.TOGGLE_SETTINGS }),
    requestNotificationPermission: async () => {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission()
      }
    },
  }), [state, isTabVisible])

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (!context) throw new Error('useTimer must be used within TimerProvider')
  return context
}
