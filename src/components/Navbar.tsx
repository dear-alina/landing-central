import React, { useState, useEffect } from 'react';
import { Menu, X, Package, ArrowRight, Phone, MapPin, Search } from 'lucide-react';
import { CentralLogo } from './CentralLogo';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenTracking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Rutas', href: '#rutas' },
    { name: 'Puntos de envío', href: '#puntos-de-envio' },
    { name: 'Preguntas', href: '#preguntas' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-2">
            <CentralLogo variant="color" size="sm" />
          </a>

          {/* Desktop Navigation Links matching Image 9 */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-orange-600 transition-colors relative py-1 hover:font-semibold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="nav-track-btn"
              onClick={onOpenTracking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4 text-orange-500" />
              <span>Rastrear Envío</span>
            </button>

            <button
              id="nav-quote-btn"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#D94E07] text-white font-bold text-sm shadow-md shadow-orange-600/25 hover:shadow-orange-600/40 transition-all cursor-pointer"
            >
              <span>Cotizar ahora</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-bold text-xs shadow-sm"
            >
              Cotizar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-orange-500" />
              <span>Rastrear Envío</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <span>Cotizar ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
