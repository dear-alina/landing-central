import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Package, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import sierraImg from '../assets/images/hero_sierra_delivery_1786763648891.jpg';
import cityImg from '../assets/images/hero_city_delivery_1786763659432.jpg';
import vraemImg from '../assets/images/hero_vraem_delivery_1786763670269.jpg';

interface HeroCarouselProps {
  onOpenQuote: () => void;
  onOpenAgencies: (searchQuery?: string) => void;
  onTrackCode: (code: string) => void;
}

const SLIDES = [
  {
    image: sierraImg,
    tag: 'LOGÍSTICA DE ALTA PRECISIÓN',
    location: 'Ruta Sierra - Ayacucho & Huanta',
    highlight: 'Llegamos a cada rincón andino con puntualidad y cuidado.',
  },
  {
    image: cityImg,
    tag: 'CONEXIÓN METROPOLITANA',
    location: 'Ruta Costa - Lima & Centro del País',
    highlight: 'Despachos diarios y enlaces corporativos B2B en tiempo récord.',
  },
  {
    image: vraemImg,
    tag: 'COBERTURA INTEGRAL VRAEM',
    location: 'Ruta Selva - San Francisco, Kimbiri & Pichari',
    highlight: 'Flota 4x4 especializada para terrenos difíciles y valles productivos.',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenQuote,
  onOpenAgencies,
  onTrackCode,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [activeHeroTab, setActiveHeroTab] = useState<'agency' | 'track'>('agency');

  // Auto carousel effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenAgencies(searchQuery.trim());
    } else {
      onOpenAgencies();
    }
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onTrackCode(trackingInput.trim());
    }
  };

  return (
    <section
      className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-start overflow-hidden bg-slate-900 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="hero"
    >
      {/* Background Images Carousel */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          {/* High contrast dark gradient overlay to match image 9 design */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-2xl">
          {/* Top Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-orange-500/30 text-orange-400 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>{SLIDES[currentSlide].tag}</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
            Tu Carga en{' '}
            <span className="text-orange-500 inline-block drop-shadow-sm">
              Buenas Manos.
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8 max-w-xl drop-shadow">
            Soluciones integrales de transporte y paquetería diseñadas para conectar
            negocios con velocidad, seguridad y un servicio impecable.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-7">
            <button
              id="hero-quote-btn"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#D94E07] text-white font-bold text-base shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>Cotizar ahora</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="hero-agencies-btn"
              onClick={() => onOpenAgencies()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-800/85 hover:bg-slate-700/90 text-white font-semibold text-base backdrop-blur-md border border-white/20 hover:border-white/40 shadow-md transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Puntos de envío</span>
            </button>
          </div>

          {/* Search Card / Interactive Quick Form matching Image 9 */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-2xl max-w-xl">
            {/* Tabs for Quick Search or Quick Tracking */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => setActiveHeroTab('agency')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeHeroTab === 'agency'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Buscar Agencia</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveHeroTab('track')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeHeroTab === 'track'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Rastrear Envío</span>
              </button>
            </div>

            {activeHeroTab === 'agency' ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca tu punto de envío más cercano (ej. Ayacucho, Huanta, VRAEM, Lima)..."
                  className="w-full pl-11 pr-28 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  BUSCAR
                </button>
              </form>
            ) : (
              <form onSubmit={handleTrackingSubmit} className="relative flex items-center">
                <Package className="w-5 h-5 text-orange-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="hero-track-input"
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Ingresa tu código de guía (ej. CEN-84920-AY)..."
                  className="w-full pl-11 pr-28 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent uppercase font-mono tracking-wider transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RASTREAR
                </button>
              </form>
            )}

            {/* Quick Demo Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Rutas frecuentes:</span>
              <button
                type="button"
                onClick={() => onOpenAgencies('Ayacucho')}
                className="hover:text-orange-400 underline decoration-dotted transition-colors"
              >
                Ayacucho Centro
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenAgencies('Huanta')}
                className="hover:text-orange-400 underline decoration-dotted transition-colors"
              >
                Huanta
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenAgencies('VRAEM')}
                className="hover:text-orange-400 underline decoration-dotted transition-colors"
              >
                VRAEM (San Francisco/Kimbiri)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenAgencies('Lima')}
                className="hover:text-orange-400 underline decoration-dotted transition-colors"
              >
                Lima (28 de Julio)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Indicators (3 Dots as shown in Image 9) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide
                ? 'w-7 h-2.5 bg-orange-500'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
