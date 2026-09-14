import React from 'react';
import { Award, Users, CheckCircle2, Truck, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import sierraImg from '../assets/images/hero_sierra_delivery_1786763648891.jpg';
import vraemImg from '../assets/images/hero_vraem_delivery_1786763670269.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Images Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={sierraImg}
                alt="Entrega en Sierra Central"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase font-bold tracking-wider bg-orange-600 px-2.5 py-1 rounded-md inline-block mb-1">
                  Compromiso Social y Regional
                </span>
                <p className="text-sm font-semibold">
                  Conectando comunidades andinas y valles amazónicos con el resto del país.
                </p>
              </div>
            </div>

            {/* Inset Secondary Image Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
              <img
                src={vraemImg}
                alt="Entrega en VRAEM"
                className="w-full h-40 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -top-4 -left-4 bg-[#0B192C] text-white p-4 rounded-2xl shadow-xl z-20 border border-white/10 flex items-center gap-3">
              <div className="text-3xl font-black text-orange-500">+15</div>
              <div className="text-xs font-bold leading-tight uppercase tracking-wider text-slate-300">
                Años de<br />Liderazgo Logístico
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Sobre Nosotros</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight mb-5 leading-tight">
              Elevando los Estándares del Transporte y la Paquetería
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              En <strong className="text-[#0B192C]">CENTRAL Transporte Logística y Paquetería</strong> nos dedicamos a resolver los desafíos geográficos del Perú, articulando una red rápida, segura y transparente que une Lima Metropolitana con Ayacucho, Huanta y el corazón del VRAEM.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B192C] text-sm sm:text-base">Flota Moderna y Diversificada</h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Furgones cerrados con suspensión neumática para autopistas y camionetas utilitarias 4x4 acondicionadas para trochas y pasos de montaña.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B192C] text-sm sm:text-base">Personal Altamente Calificado</h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Conductores con récord impecable y personal de atención al cliente enfocado en el trato cálido y la resolución inmediata.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B192C] text-sm sm:text-base">Trazabilidad Total</h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Lectores de código de barra en cada punto de transbordo y confirmación digital con firma en la entrega.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B192C]">99.4%</div>
                <div className="text-xs text-slate-500 font-medium">Entregas a Tiempo</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B192C]">+50</div>
                <div className="text-xs text-slate-500 font-medium">Unidades en Ruta</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B192C]">+120k</div>
                <div className="text-xs text-slate-500 font-medium">Envíos Exitosos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
