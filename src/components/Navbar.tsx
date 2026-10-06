import { useState, useEffect } from 'react'
import type { FC, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import styles from './Navbar.module.css'

const QADRO_LOGO_URL =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/A1awRB78EbUDM68a/logo-grupo-qadro-CTJZYKXn5EUkOKWM.png'

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

interface NavItem {
  readonly label: string
  readonly href: string
  readonly id: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Clientes', href: '#trabajo', id: 'trabajo' },
  { label: 'Servicios', href: '#servicios', id: 'servicios' },
  { label: 'Proceso', href: '#proceso', id: 'proceso' },
  { label: 'Testimonios', href: '#testimonios', id: 'testimonios' },
] as const

export const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* Real Brand Logo Image */}
        <a
          href="#inicio"
          className={styles.logoLink}
          onClick={(e) => handleNavClick(e, 'inicio')}
        >
          <img
            src={QADRO_LOGO_URL}
            alt="Grupo Qadro Logo"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop Links */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={styles.rightActions}>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Agendar cita</span>
            <ArrowUpRight size={16} />
          </motion.a>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <nav className={styles.mobileNav}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
