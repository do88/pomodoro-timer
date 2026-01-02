// Timer modes
export const TIMER_MODES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
}

// Mode labels for display
export const MODE_LABELS = {
  [TIMER_MODES.POMODORO]: 'Focus Time',
  [TIMER_MODES.SHORT_BREAK]: 'Short Break',
  [TIMER_MODES.LONG_BREAK]: 'Long Break',
}

// Theme colors for each mode
export const MODE_COLORS = {
  [TIMER_MODES.POMODORO]: {
    primary: '#FF6B6B',
    secondary: '#E85555',
    glow: 'rgba(255, 107, 107, 0.4)',
  },
  [TIMER_MODES.SHORT_BREAK]: {
    primary: '#4ECDC4',
    secondary: '#3DB9B1',
    glow: 'rgba(78, 205, 196, 0.4)',
  },
  [TIMER_MODES.LONG_BREAK]: {
    primary: '#95E86B',
    secondary: '#7ED155',
    glow: 'rgba(149, 232, 107, 0.4)',
  },
}

// Total rounds before long break
export const TOTAL_ROUNDS = 4

// Default settings
export const DEFAULT_SETTINGS = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  soundEnabled: true,
  notificationsEnabled: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
}

// Notification messages
export const COMPLETION_MESSAGES = {
  [TIMER_MODES.POMODORO]: { title: 'Pomodoro Complete! 🍅', body: 'Time for a break!' },
  [TIMER_MODES.SHORT_BREAK]: { title: 'Break Over! ⚡', body: 'Ready to focus again?' },
  [TIMER_MODES.LONG_BREAK]: { title: 'Long Break Over! 🎉', body: 'Great session! Ready for more?' },
}

// Audio notification sound (base64 encoded WAV)
export const NOTIFICATION_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQkoaJbc7NRXBgBkqO7+0GACCK3Y+vHVSwkHp+j/9cM9Dh6o8f/mticYMK34+8UgGTu0/v+7CRBAL/r/nQEdSjv4/38DK0029v9rDDdJKu//WRBFQx3p/00aRz8T4/9IH0c8Cdz/QyVFNgDS/z0rRDAA0v83MEMsANX/MS9AKgDZ/ywyPigA3v8nMTwmAOT/ITM6JADr/xs0OCIA8v8VMzkhAPr/DzM4IAD//wkzNx8AAQADMzcfAAIAADM3HwACAAAzNx8AAgAAMzcfAAIAADM3HwACAAAzNx8AAgAAMzcfAAIAADM3HwACAAAzNx8AAgAAMzcfAAIAADM3HwABAAAzNx8A//8BMzcfAP7/AzM3HwD8/wUzOR8A+f8INDkgAPb/CzQ6IQDy/w80OyIA7v8TNDwjAOn/FzQ9JQDk/xw0PicA3v8hNEApANj/JjRCKwDS/ys0RC0AzP8wNEYvAMb/NTVIMgDA/zk2SjUA'

// Settings field configurations
export const TIMER_FIELDS = [
  { key: 'pomodoro', label: 'Pomodoro' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
]

export const TOGGLE_FIELDS = [
  { key: 'soundEnabled', label: 'Sound notifications' },
  { key: 'notificationsEnabled', label: 'Browser notifications' },
  { key: 'autoStartBreaks', label: 'Auto-start breaks' },
  { key: 'autoStartPomodoros', label: 'Auto-start pomodoros' },
]
