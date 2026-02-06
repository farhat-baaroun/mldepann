import { useEffect, useState, useCallback, memo } from 'react'
import { Menu, X } from 'lucide-react'
import CTAButtons from './CTAButtons'

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        isScrolled 
          ? 'header-glass py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Text Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="logo-text"
            aria-label="mldepann - Accueil"
            type="button"
          >
            <span className={isScrolled ? 'text-brand-blue' : 'logo-text-white'}>
              mldepann
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Accueil', id: 'hero' },
              { label: 'Services', id: 'services' },
              { label: 'À Propos', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium text-sm transition-colors hover:text-brand-orange ${
                  isScrolled ? 'text-brand-gray' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center">
            <CTAButtons variant="header" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-brand-gray' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-gray' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4">
            <nav className="flex flex-col gap-4">
              {[
                { label: 'Accueil', id: 'hero' },
                { label: 'Services', id: 'services' },
                { label: 'À Propos', id: 'about' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-brand-gray font-medium py-2 text-left hover:text-brand-blue transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Address Link */}
              <a
                href="https://maps.google.com/?q=123+Avenue+de+Paris,+75001+Paris,+France"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-gray font-medium py-2 text-left hover:text-brand-blue transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Avenue de Paris, 75001 Paris</span>
              </a>

              {/* Actions rapides */}
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-brand-gray/70 mb-3 px-1 font-semibold">
                  Actions rapides :
                </div>
                <div className="space-y-2">
                  <CTAButtons variant="cta" isMobileMenu={true} />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
})

export default Header

