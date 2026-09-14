import React, { useState } from 'react';
import { Globe, Share2, Mail, Phone, MessageSquare, ShieldCheck, FileText, BookOpen } from 'lucide-react';
import { CentralLogo } from './CentralLogo';

interface FooterProps {
  onOpenClaims: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenClaims,
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CENTRAL - Transporte Logística y Paquetería',
        text: 'Envíos rápidos y seguros a Ayacucho, Huanta, VRAEM y Lima.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <footer className="bg-[#070F2B] text-slate-400 pt-16 pb-12 border-t border-slate-800 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Mission Column (6 cols) */}
          <div className="md:col-span-6 space-y-6">
            {/* White Logo Container as shown in Image 9 */}
            <div className="inline-block bg-white p-3.5 rounded-2xl shadow-lg">
              <CentralLogo variant="dark" size="sm" />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md font-normal">
              Elevando los estándares de la logística en el Perú. Entregas precisas,
              rutas seguras y compromiso inquebrantable con su negocio.
            </p>

            {/* Social / Action Circle Buttons matching Image 9 */}
            <div className="flex items-center gap-3">
              <a
                href="#hero"
                aria-label="Página Principal"
                className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-orange-600 text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Globe className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Compartir"
                className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-orange-600 text-white flex items-center justify-center transition-colors border border-white/10 relative cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                {copiedShare && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                    ¡Enlace copiado!
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                aria-label="Correo de Contacto"
                className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-orange-600 text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/51966123456"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Central"
                className="w-10 h-10 rounded-xl bg-green-700/80 hover:bg-green-600 text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Empresa Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              EMPRESA
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#rutas" className="hover:text-white transition-colors">
                  Rutas
                </a>
              </li>
              <li>
                <a href="#puntos-de-envio" className="hover:text-white transition-colors">
                  Agencias y Puntos de Envío
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenClaims}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-orange-400 font-semibold"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Libro de Reclamaciones</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching Image 9 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Central Transporte Logística y Paquetería. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span>RUC: 20608912450</span>
            <span>Ayacucho • Lima • Huanta • VRAEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
