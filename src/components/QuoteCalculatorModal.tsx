import React, { useState, useMemo } from 'react';
import { X, Calculator, ArrowRight, ShieldCheck, MapPin, Package, HelpCircle, MessageSquare, Check, Sparkles } from 'lucide-react';
import { QuoteCalculation } from '../types';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const CITIES = [
  'Lima (Terminal La Victoria)',
  'Lima Norte (Los Olivos)',
  'Ayacucho (Huamanga Centro)',
  'Huanta',
  'San Francisco (Ayna - VRAEM)',
  'Kimbiri (VRAEM)',
  'Pichari (VRAEM)',
  'Sivia (VRAEM)',
];

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [origin, setOrigin] = useState('Lima (Terminal La Victoria)');
  const [destination, setDestination] = useState('Ayacucho (Huamanga Centro)');
  const [serviceType, setServiceType] = useState<'express' | 'standard' | 'business'>('standard');
  const [deliveryMode, setDeliveryMode] = useState<'agency' | 'home'>('agency');
  const [weightKg, setWeightKg] = useState<number>(3);
  const [lengthCm, setLengthCm] = useState<number>(30);
  const [widthCm, setWidthCm] = useState<number>(20);
  const [heightCm, setHeightCm] = useState<number>(15);
  const [declaredValue, setDeclaredValue] = useState<number>(100);
  const [withInsurance, setWithInsurance] = useState<boolean>(true);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Set initial service if passed
  React.useEffect(() => {
    if (initialService) {
      if (initialService.toLowerCase().includes('express')) {
        setServiceType('express');
      } else if (initialService.toLowerCase().includes('empresarial')) {
        setServiceType('business');
      } else {
        setServiceType('standard');
      }
    }
  }, [initialService]);

  // Real-time calculation logic
  const calculation: QuoteCalculation = useMemo(() => {
    // Volumetric weight = (L * W * H) / 5000
    const volWeight = Number(((lengthCm * widthCm * heightCm) / 5000).toFixed(2));
    const chargeableWeight = Math.max(weightKg, volWeight);

    // Pricing rates (S/. in Peru)
    let baseRate = 15; // base price for first 2kg
    let perKgRate = 3.5;

    if (serviceType === 'express') {
      baseRate = 22;
      perKgRate = 5.0;
    } else if (serviceType === 'business') {
      baseRate = 35;
      perKgRate = 2.8;
    }

    // Destination factor (VRAEM slightly higher due to mountain terrain)
    const isVraem = destination.includes('VRAEM') || origin.includes('VRAEM');
    if (isVraem) {
      baseRate += 5;
      perKgRate += 1.2;
    }

    const additionalWeight = Math.max(0, chargeableWeight - 2);
    const weightCost = baseRate + additionalWeight * perKgRate;

    // Delivery mode fee
    const homeDeliveryFee = deliveryMode === 'home' ? 12 : 0;

    // Optional insurance (1.5% of declared value if > S/. 100)
    const insuranceFee = withInsurance && declaredValue > 100 ? Number((declaredValue * 0.015).toFixed(2)) : 0;

    const subtotal = weightCost + homeDeliveryFee + insuranceFee;
    const igv = Number((subtotal * 0.18).toFixed(2));
    const total = Number((subtotal + igv).toFixed(2));

    let estimatedDays = '24 a 48 horas';
    if (serviceType === 'express' && (origin.includes('Lima') || origin.includes('Huamanga'))) {
      estimatedDays = 'Mismo día o 24 horas (Prioritario)';
    } else if (isVraem) {
      estimatedDays = '24 a 36 horas';
    }

    return {
      origin,
      destination,
      weightKg,
      lengthCm,
      widthCm,
      heightCm,
      volumetricWeight: volWeight,
      chargeableWeight,
      serviceType,
      deliveryMode,
      declaredValue,
      basePrice: Number(weightCost.toFixed(2)),
      homeDeliveryFee,
      insuranceFee,
      subtotal: Number(subtotal.toFixed(2)),
      igv,
      total,
      estimatedDays,
    };
  }, [
    origin,
    destination,
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    serviceType,
    deliveryMode,
    declaredValue,
    withInsurance,
  ]);

  if (!isOpen) return null;

  const handleWhatsAppQuote = () => {
    const text = `Hola Central Logística, deseo cotizar un envío:%0A- Origen: ${origin}%0A- Destino: ${destination}%0A- Servicio: ${serviceType.toUpperCase()}%0A- Modalidad: ${deliveryMode === 'home' ? 'Entrega a Domicilio' : 'Recojo en Agencia'}%0A- Peso: ${weightKg} kg (Vol: ${calculation.volumetricWeight} kg)%0A- Medidas: ${lengthCm}x${widthCm}x${heightCm} cm%0A- Total Estimado: S/ ${calculation.total.toFixed(2)}`;
    window.open(`https://wa.me/51966123456?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B192C]">
                Cotizador de Envíos en Tiempo Real
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Calcula tu tarifa instantánea y genera tu orden con tarifas transparentes
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

        {showOrderSuccess ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 animate-bounce">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B192C] mb-2">
              ¡Pre-orden de Envío Registrada!
            </h3>
            <p className="text-slate-600 max-w-md mb-6 text-sm sm:text-base">
              Tu código de pre-reserva es <strong className="text-orange-600">PRE-{Math.floor(100000 + Math.random() * 900000)}</strong>.
              Puedes acercarte a la agencia elegida o esperar la llamada de confirmación de nuestro asesor.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsAppQuote}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-600/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setShowOrderSuccess(false);
                  onClose();
                }}
                className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* Form + Calculation Breakdown Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Ciudad de Origen</span>
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Ciudad de Destino</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {CITIES.filter((c) => c !== origin).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Tipo de Servicio
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setServiceType('standard')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      serviceType === 'standard'
                        ? 'border-orange-500 bg-orange-50/70 text-orange-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <div className="text-xs uppercase text-orange-600 font-bold mb-0.5">Regional</div>
                    <div className="text-xs sm:text-sm font-bold">Estándar</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('express')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      serviceType === 'express'
                        ? 'border-orange-500 bg-orange-50/70 text-orange-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <div className="text-xs uppercase text-orange-600 font-bold mb-0.5">Prioridad</div>
                    <div className="text-xs sm:text-sm font-bold">Express 24h</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('business')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      serviceType === 'business'
                        ? 'border-orange-500 bg-orange-50/70 text-orange-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <div className="text-xs uppercase text-orange-600 font-bold mb-0.5">Empresas</div>
                    <div className="text-xs sm:text-sm font-bold">Carga B2B</div>
                  </button>
                </div>
              </div>

              {/* Weight & Dimensions */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-orange-600" />
                    <span>Peso Real (kg)</span>
                  </label>
                  <span className="text-sm font-extrabold text-[#0B192C]">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Dimensiones del Paquete (cm)
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium">Largo</span>
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium">Ancho</span>
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium">Alto</span>
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Peso Volumétrico: <strong>{calculation.volumetricWeight} kg</strong></span>
                    <span className="text-orange-700 font-semibold">
                      Peso facturable aplicado: {calculation.chargeableWeight} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Mode & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Modalidad de Entrega
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('agency')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        deliveryMode === 'agency'
                          ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      En Agencia
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('home')}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        deliveryMode === 'home'
                          ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      A Domicilio (+S/12)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Valor Declarado (S/.)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Para seguro</span>
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="50000"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0B192C] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                      Resumen de Cotización
                    </span>
                    <h4 className="text-xl font-bold text-white">Tarifa Estimada</h4>
                  </div>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-semibold">
                    {calculation.estimatedDays}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Flete Base ({calculation.chargeableWeight} kg):</span>
                    <span className="font-semibold text-white">S/ {calculation.basePrice.toFixed(2)}</span>
                  </div>

                  {calculation.homeDeliveryFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Reparto Puerta a Puerta:</span>
                      <span className="font-semibold text-white">S/ {calculation.homeDeliveryFee.toFixed(2)}</span>
                    </div>
                  )}

                  {calculation.insuranceFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Seguro de Carga:</span>
                      <span className="font-semibold text-white">S/ {calculation.insuranceFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="font-semibold text-white">S/ {calculation.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">IGV (18%):</span>
                    <span className="font-semibold text-white">S/ {calculation.igv.toFixed(2)}</span>
                  </div>
                </div>

                {/* Big Total */}
                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total a Pagar</span>
                    <span className="text-3xl font-black text-orange-400">
                      S/ {calculation.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <div>Inc. Boleta/Factura</div>
                    <div className="text-green-400 font-semibold">Trazabilidad GPS</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6">
                <button
                  id="confirm-quote-order-btn"
                  onClick={() => setShowOrderSuccess(true)}
                  className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                >
                  <span>Reservar Envío Ahora</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <span>Enviar Cotización a WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
