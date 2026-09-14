import React, { useState } from 'react';
import { Truck, Building2, Package, ArrowRight, CheckCircle2, Shield, Clock, X, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';

interface SpecializedServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const SpecializedServices: React.FC<SpecializedServicesProps> = ({
  onSelectServiceForQuote,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-7 h-7 text-[#0B192C]" />;
      case 'Building2':
        return <Building2 className="w-7 h-7 text-[#0B192C]" />;
      case 'Package':
      default:
        return <Package className="w-7 h-7 text-[#0B192C]" />;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight mb-3">
              Servicios Especializados
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Conectamos el centro sur del país con una red logística robusta, asegurando que
              su operación nunca se detenga.
            </p>
          </div>

          <button
            id="view-all-services-btn"
            onClick={() => setSelectedService(SERVICES[0])}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 hover:bg-orange-100/80 text-orange-600 hover:text-orange-700 font-bold text-xs sm:text-sm tracking-wider uppercase border border-orange-200/60 transition-all self-start md:self-auto cursor-pointer"
          >
            <span>VER TODOS LOS SERVICIOS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Services Cards matching Image 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {service.tags.slice(0, 1).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0B192C] mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              {/* Card Footer with Bottom Accent Bar matching Image 9 */}
              <div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs sm:text-sm font-bold text-slate-700 hover:text-orange-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Conocer detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="px-3 py-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Cotizar
                  </button>
                </div>

                {/* Orange bottom accent line (Visual signature in Image 9) */}
                <div className="w-12 h-1 bg-orange-400/80 rounded-full mt-4 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  {getServiceIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B192C]">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tiempo estimado: {selectedService.deliveryTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-slate-700 text-sm sm:text-base">
              <p className="leading-relaxed font-normal">
                {selectedService.fullDesc}
              </p>

              <div>
                <h4 className="font-bold text-[#0B192C] text-base mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Beneficios y Características Principales</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200/60 p-4 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block mb-1">
                  Recomendado para:
                </span>
                <p className="text-xs sm:text-sm text-orange-950 font-medium">
                  {selectedService.idealFor}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer"
                >
                  Cotizar este servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
