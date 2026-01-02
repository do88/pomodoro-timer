import { motion } from 'framer-motion'

// Reusable animated button component
export function AnimatedButton({ onClick, className, children, ariaLabel, whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Common animation variants
export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
export const scaleIn = { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } }
export const slideUp = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }

