import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Search, ShieldCheck, ExternalLink, Navigation } from 'lucide-react';
import { AGENCIES } from '../data/mockData';
import { Agency } from '../types';

interface AgenciesLocatorProps {
  initialSearchQuery?: string;
  onSelectAgencyForQuote?: (agencyName: string) => void;
}

export const AgenciesLocator: React.FC<AgenciesLocatorProps> = ({
  initialSearchQuery = '',
  onSelectAgencyForQuote,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedMapAgency, setSelectedMapAgency] = useState<Agency | null>(null);

  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const filteredAgencies = AGENCIES.filter((agency) => {
    const matchesRegion = selectedRegion === 'Todos' || agency.region === selectedRegion;
    const matchesSearch =
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const regions = ['Todos', 'Ayacucho', 'Huanta', 'VRAEM', 'Lima'];

  return (
    <section id="puntos-de-envio" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Red de Puntos de Atención</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight mb-4">
            Nuestras Agencias y Puntos de Envío
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Encuentra la sucursal más cercana para despachar o retirar tus encomiendas con atención rápida y personalizada.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#0B192C] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por distrito, calle o ciudad..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-orange-100 text-orange-800 text-[11px] font-bold uppercase rounded-md">
                    {agency.region}
                  </span>
                  {agency.isMainHub && (
                    <span className="px-2.5 py-1 bg-[#0B192C] text-white text-[10px] font-bold uppercase rounded-md tracking-wider">
                      HUB PRINCIPAL
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0B192C] mb-2 group-hover:text-orange-600 transition-colors">
                  {agency.name}
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">{agency.address}</div>
                      <div className="text-[11px] text-slate-500 italic">{agency.reference}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs">{agency.hours}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div className="text-xs font-medium text-slate-700">{agency.phone}</div>
                  </div>
                </div>

                {/* Available Services Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {agency.services.map((srv, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                <a
                  href={`https://wa.me/${agency.whatsapp.replace('+', '')}?text=Hola%20agencia%20${encodeURIComponent(agency.name)},%20deseo%20hacer%20una%20consulta`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedMapAgency(agency)}
                  className="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-orange-600" />
                  <span>Ver Mapa</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700 mb-1">No se encontraron agencias</h4>
            <p className="text-xs sm:text-sm text-slate-500">Prueba con otro término de búsqueda o selecciona "Todos"</p>
          </div>
        )}
      </div>

      {/* Map Modal */}
      {selectedMapAgency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">Ubicación GPS</span>
                <h3 className="text-xl font-bold text-[#0B192C]">{selectedMapAgency.name}</h3>
                <p className="text-xs text-slate-500">{selectedMapAgency.address}</p>
              </div>
              <button
                onClick={() => setSelectedMapAgency(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Mock interactive GPS Card */}
            <div className="w-full h-56 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center text-white mb-4">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4 z-10">
                <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">{selectedMapAgency.address}</div>
                <div className="text-xs text-slate-300 mt-0.5">Coords: {selectedMapAgency.coordinates.lat}, {selectedMapAgency.coordinates.lng}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapAgency.address + ' ' + selectedMapAgency.city)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir en Google Maps</span>
              </a>
              <button
                onClick={() => setSelectedMapAgency(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
