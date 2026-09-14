import React from 'react';
import { Route, Clock, Calendar, Shield, ArrowRight, CheckCircle, Navigation, Sparkles } from 'lucide-react';
import { ROUTES } from '../data/mockData';

interface RoutesSectionProps {
  onOpenQuote: () => void;
}

export const RoutesSection: React.FC<RoutesSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="rutas" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative subtle background mesh */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 border border-orange-500/30">
              <Route className="w-3.5 h-3.5" />
              <span>Conexión Interregional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Rutas Estratégicas y Frecuencias Diarias
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Red troncal especializada que enlaza la Costa Central, la Sierra de Ayacucho y los valles del VRAEM con salidas nocturnas y diurnas.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all cursor-pointer self-start md:self-auto"
          >
            <span>Cotizar en esta ruta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Route Header */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{route.status}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Distancia: ~{route.distanceKm} km
                  </span>
                </div>

                {/* Cities Connection */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-lg sm:text-xl font-extrabold text-white">
                    {route.origin}
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                    <div className="absolute w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-orange-400">
                    {route.destination}
                  </div>
                </div>

                {/* Route details */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/60 p-4 rounded-xl border border-white/5 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      <span>Tiempo estimado</span>
                    </span>
                    <span className="font-bold text-white text-sm">{route.duration}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      <span>Frecuencia</span>
                    </span>
                    <span className="font-bold text-white text-sm">Diaria</span>
                  </div>
                </div>

                {/* Departures Times */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Horarios de Salida de Terminal:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {route.departures.map((time, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/10 text-white text-xs font-mono font-semibold rounded-lg border border-white/10"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{route.vehicleType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Route Technology Banner */}
        <div className="mt-12 bg-gradient-to-r from-orange-600/20 via-slate-800 to-slate-800 p-6 sm:p-8 rounded-3xl border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/40">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Seguridad Satelital y Control de Flota 24 Horas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Todas nuestras unidades cuentan con doble tripulación calificada, sensor de apertura de puertas y botón de pánico enlazado a la PNP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-400" />
              <span>GPS Satelital</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-400" />
              <span>Seguro Rímac</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
