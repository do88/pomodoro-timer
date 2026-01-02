import { motion } from 'framer-motion'
import { GithubIcon, LinkedInIcon, HeartIcon } from './Icons'
import { AnimatedButton, slideUp } from './common'

const LINKS = [
  { href: 'https://github.com/do88', Icon: GithubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/osipchuk/', Icon: LinkedInIcon, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <motion.footer className="w-full max-w-lg mx-auto" {...slideUp} transition={{ duration: 0.5, delay: 0.4 }}>
      <div className="glass rounded-2xl px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Made with <HeartIcon /> by Dmitry Osipchuk
          </p>
          
          <div className="flex items-center gap-3">
            {LINKS.map(({ href, Icon, label }) => (
              <AnimatedButton
                key={label}
                onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                whileHover={{ scale: 1.1, y: -2 }}
                ariaLabel={label}
              >
                <Icon />
              </AnimatedButton>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
