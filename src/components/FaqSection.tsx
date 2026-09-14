import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="preguntas" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Centro de Ayuda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight mb-3">
            Preguntas Frecuentes
          </h2>
          <p className="text-base text-slate-600">
            Todo lo que necesitas saber sobre envíos, recepción de paquetes, requisitos y modalidades de pago.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[#0B192C]">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Banner */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B192C] text-sm sm:text-base">¿Tienes una consulta específica?</h4>
              <p className="text-xs text-slate-500">Nuestros asesores de atención al cliente están listos para ayudarte vía WhatsApp.</p>
            </div>
          </div>

          <a
            href="https://wa.me/51966123456?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20servicios%20de%20Central"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Contactar Asesor</span>
          </a>
        </div>
      </div>
    </section>
  );
};
