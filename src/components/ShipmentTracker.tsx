import React, { useState } from 'react';
import { Package, Search, CheckCircle2, Clock, Truck, MapPin, User, ShieldCheck, AlertCircle, Copy, Check, Share2, X } from 'lucide-react';
import { TRACKING_SHIPMENTS } from '../data/mockData';
import { TrackingShipment } from '../types';

interface ShipmentTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({
  isOpen,
  onClose,
  initialCode = '',
}) => {
  const [searchCode, setSearchCode] = useState(initialCode || 'CEN-84920-AY');
  const [currentShipment, setCurrentShipment] = useState<TrackingShipment | null>(
    TRACKING_SHIPMENTS[initialCode] || TRACKING_SHIPMENTS['CEN-84920-AY']
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      const found = TRACKING_SHIPMENTS[initialCode.toUpperCase().trim()];
      if (found) {
        setCurrentShipment(found);
        setErrorMsg(null);
      }
    }
  }, [initialCode]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = searchCode.trim().toUpperCase();
    if (!cleanCode) return;

    const found = TRACKING_SHIPMENTS[cleanCode];
    if (found) {
      setCurrentShipment(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No se encontró ningún envío registrado con el código "${cleanCode}". Por favor verifica el número de guía.`);
    }
  };

  const handleCopyCode = () => {
    if (currentShipment) {
      navigator.clipboard.writeText(currentShipment.trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: TrackingShipment['currentStatus']) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'En Reparto':
        return 'bg-orange-100 text-orange-800 border-orange-300 animate-pulse';
      case 'En Tránsito':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B192C]">
                Rastreo de Envíos en Tiempo Real
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Seguimiento satelital de tu carga y paquetería paso a paso
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tracking Search Input */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => {
                setSearchCode(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Ingresa código de seguimiento (ej. CEN-84920-AY)..."
              className="w-full pl-12 pr-32 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent uppercase font-bold"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Consultar
            </button>
          </div>

          {/* Preset sample buttons for quick testing */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Envíos de prueba:</span>
            {Object.keys(TRACKING_SHIPMENTS).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchCode(code);
                  setCurrentShipment(TRACKING_SHIPMENTS[code]);
                  setErrorMsg(null);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 rounded-lg font-mono text-xs text-slate-700 font-medium transition-colors cursor-pointer"
              >
                {code}
              </button>
            ))}
          </div>
        </form>

        {errorMsg && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {currentShipment && !errorMsg && (
          <div className="space-y-6">
            {/* Shipment Overview Banner */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-orange-400 tracking-wider">
                      {currentShipment.trackingCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copiar código"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {currentShipment.sender.city} → {currentShipment.recipient.city}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Servicio: <strong className="text-white">{currentShipment.serviceType}</strong> • {currentShipment.weightKg} kg ({currentShipment.packagesCount} bulto{currentShipment.packagesCount > 1 ? 's' : ''})
                  </p>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(currentShipment.currentStatus)}`}>
                    ● {currentShipment.currentStatus.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-300 mt-1.5">
                    Fecha estimada: <strong className="text-white">{currentShipment.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Sender & Recipient Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-600" />
                  <span>Remitente</span>
                </div>
                <div className="font-bold text-sm text-[#0B192C]">{currentShipment.sender.name}</div>
                <div className="text-xs text-slate-500">{currentShipment.sender.city}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>Destinatario</span>
                </div>
                <div className="font-bold text-sm text-[#0B192C]">{currentShipment.recipient.name}</div>
                <div className="text-xs text-slate-500">
                  {currentShipment.recipient.address ? `${currentShipment.recipient.address}, ` : ''}{currentShipment.recipient.city}
                </div>
              </div>
            </div>

            {/* Driver Details if in delivery */}
            {currentShipment.driver && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-orange-950">Conductor Asignado: {currentShipment.driver.name}</div>
                    <div className="text-[11px] text-orange-800">Placa: <strong>{currentShipment.driver.vehiclePlate}</strong> • Tel: {currentShipment.driver.phone}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                  GPS Activo
                </span>
              </div>
            )}

            {/* Steps Timeline */}
            <div>
              <h4 className="font-bold text-[#0B192C] text-base mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Historial y Puntos de Control</span>
              </h4>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentShipment.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? step.current
                            ? 'bg-orange-500 border-white ring-4 ring-orange-100'
                            : 'bg-[#0B192C] border-white'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {step.completed && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>

                    <div className={`p-4 rounded-2xl border transition-all ${
                      step.current
                        ? 'bg-orange-50/70 border-orange-200'
                        : 'bg-white border-slate-100'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-sm text-[#0B192C]">
                          {step.status}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {step.date} - {step.time}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{step.location}</span>
                      </div>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
