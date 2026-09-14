import React, { useState } from 'react';
import { X, BookOpen, Check, AlertCircle, Send } from 'lucide-react';

interface ClaimBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimBookModal: React.FC<ClaimBookModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [claimType, setClaimType] = useState<'Reclamo' | 'Queja'>('Reclamo');
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    address: '',
    trackingCode: '',
    amountClaimed: '',
    description: '',
    solutionProposed: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B192C]">
                Libro de Reclamaciones Virtual
              </h2>
              <p className="text-xs text-slate-500">
                Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B192C] mb-2">Reclamación Registrada con Éxito</h3>
            <p className="text-sm text-slate-600 max-w-md mb-6">
              Número de Hoja de Reclamación: <strong className="text-orange-600">LR-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>.
              Hemos enviado una copia a tu correo electrónico. Te responderemos en un plazo máximo de 15 días hábiles.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#0B192C] hover:bg-slate-800 text-white rounded-xl font-bold text-sm"
            >
              Aceptar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-xs border border-slate-200">
              <strong className="text-slate-900">Razón Social:</strong> CENTRAL TRANSPORTE LOGÍSTICA Y PAQUETERÍA S.A.C. • <strong>RUC:</strong> 20608912450
            </div>

            {/* Type selection */}
            <div className="flex items-center gap-4">
              <label className="font-bold text-slate-700">Tipo de solicitud:</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="claimType"
                    checked={claimType === 'Reclamo'}
                    onChange={() => setClaimType('Reclamo')}
                    className="accent-orange-600"
                  />
                  <span>Reclamo (Disconformidad con el servicio)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="claimType"
                    checked={claimType === 'Queja'}
                    onChange={() => setClaimType('Queja')}
                    className="accent-orange-600"
                  />
                  <span>Queja (Malestar con la atención)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nombres y Apellidos"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">DNI / CE / RUC *</label>
                <input
                  required
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  placeholder="Número de documento"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Correo Electrónico *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Teléfono / Celular *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="987654321"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">N° de Guía / Envío (Opcional)</label>
                <input
                  type="text"
                  value={formData.trackingCode}
                  onChange={(e) => setFormData({ ...formData, trackingCode: e.target.value })}
                  placeholder="CEN-..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Monto Reclamado S/. (Opcional)</label>
                <input
                  type="number"
                  value={formData.amountClaimed}
                  onChange={(e) => setFormData({ ...formData, amountClaimed: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Detalle del Reclamo o Queja *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe con claridad los hechos sucedidos..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Pedido o Solución Esperada</label>
              <textarea
                rows={2}
                value={formData.solutionProposed}
                onChange={(e) => setFormData({ ...formData, solutionProposed: e.target.value })}
                placeholder="¿Qué solución concreta solicitas?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-orange-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Registro</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
