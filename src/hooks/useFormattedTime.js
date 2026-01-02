import { useMemo } from 'react'

export function useFormattedTime(seconds) {
  return useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }, [seconds])
}

export function useProgress(timeRemaining, totalTime) {
  return useMemo(() => totalTime ? ((totalTime - timeRemaining) / totalTime) * 100 : 0, [timeRemaining, totalTime])
}
