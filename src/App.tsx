import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { SpecializedServices } from './components/SpecializedServices';
import { AgenciesLocator } from './components/AgenciesLocator';
import { RoutesSection } from './components/RoutesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ShipmentTracker } from './components/ShipmentTracker';
import { ClaimBookModal } from './components/ClaimBookModal';
import { LegalModals } from './components/LegalModals';
import { ContactModal } from './components/ContactModal';
import { MessageSquare, Phone, Package, ArrowUp } from 'lucide-react';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialCode, setTrackingInitialCode] = useState<string>('');
  const [agencySearchQuery, setAgencySearchQuery] = useState<string>('');
  const [isClaimsOpen, setIsClaimsOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenQuote = (serviceTitle?: string) => {
    setQuoteInitialService(serviceTitle);
    setIsQuoteOpen(true);
  };

  const handleOpenAgencies = (searchQuery?: string) => {
    if (searchQuery) {
      setAgencySearchQuery(searchQuery);
    }
    const elem = document.getElementById('puntos-de-envio');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackCode = (code: string) => {
    setTrackingInitialCode(code);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-[#0B192C] text-slate-300 py-1.5 px-4 text-xs text-center border-b border-slate-800 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          <span className="font-semibold text-white">Rutas Activas Hoy:</span> Salidas normales Lima ↔ Ayacucho ↔ Huanta ↔ VRAEM
        </span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span className="hidden sm:inline text-slate-300">
          Central Telefónica: <strong className="text-orange-400 font-mono">(066) 314-580</strong>
        </span>
      </div>

      {/* Navigation Header */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={() => {
          setTrackingInitialCode('CEN-84920-AY');
          setIsTrackingOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section matching Image 9 + Interactive Carousel */}
        <HeroCarousel
          onOpenQuote={() => handleOpenQuote()}
          onOpenAgencies={handleOpenAgencies}
          onTrackCode={handleTrackCode}
        />

        {/* Servicios Especializados matching Image 9 */}
        <SpecializedServices
          onSelectServiceForQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
        />

        {/* Rutas y Horarios */}
        <RoutesSection onOpenQuote={() => handleOpenQuote()} />

        {/* Puntos de Envío y Agencias */}
        <AgenciesLocator
          initialSearchQuery={agencySearchQuery}
          onSelectAgencyForQuote={(agency) => handleOpenQuote(agency)}
        />

        {/* Nosotros y Flota */}
        <AboutSection />

        {/* FAQ y Ayuda */}
        <FaqSection />
      </main>

      {/* Footer matching Image 9 */}
      <Footer
        onOpenClaims={() => setIsClaimsOpen(true)}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals */}
      <QuoteCalculatorModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={quoteInitialService}
      />

      <ShipmentTracker
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialCode={trackingInitialCode}
      />

      <ClaimBookModal
        isOpen={isClaimsOpen}
        onClose={() => setIsClaimsOpen(false)}
      />

      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Action WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => {
            setTrackingInitialCode('CEN-84920-AY');
            setIsTrackingOpen(true);
          }}
          aria-label="Rastrear Paquete Rápido"
          className="p-3 bg-[#0B192C] hover:bg-slate-800 text-white rounded-full shadow-xl border border-white/20 transition-all hover:scale-105 flex items-center justify-center cursor-pointer group"
          title="Rastrear Envío"
        >
          <Package className="w-5 h-5 text-orange-400" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:px-2 text-xs font-bold transition-all duration-300">
            Rastrear
          </span>
        </button>

        <a
          href="https://wa.me/51966123456?text=Hola%20Central%20Logística,%20quisiera%20hacer%20una%20consulta%20sobre%20un%20envío"
          target="_blank"
          rel="noreferrer"
          className="relative p-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
          aria-label="WhatsApp Soporte"
          title="Chatear con un asesor"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white" />
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
