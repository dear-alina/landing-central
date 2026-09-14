import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              {isTerms ? <FileText className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B192C]">
                {isTerms ? 'Términos y Condiciones del Servicio' : 'Política de Privacidad y Protección de Datos'}
              </h2>
              <p className="text-xs text-slate-500">
                CENTRAL TRANSPORTE LOGÍSTICA Y PAQUETERÍA S.A.C.
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

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isTerms ? (
            <>
              <p>
                <strong>1. Ámbito de Aplicación:</strong> Los presentes términos regulan la contratación de servicios de transporte terrestre interprovincial de carga, encomiendas y paquetería express prestados por CENTRAL en sus rutas autorizadas por el MTC.
              </p>
              <p>
                <strong>2. Emisión de Guías y Comprobantes:</strong> Todo despacho de paquete está respaldado por la respectiva Guía de Remisión Transportista y comprobante de pago electrónico (Boleta o Factura). El cliente es responsable de la veracidad del contenido declarado.
              </p>
              <p>
                <strong>3. Mercancías Prohibidas:</strong> Queda estrictamente prohibido el envío de dinero en efectivo, alhajas no declaradas, sustancias inflamables, armas de fuego, explosivos, drogas, fauna silvestre o cualquier bien de procedencia ilícita.
              </p>
              <p>
                <strong>4. Cobertura de Seguro:</strong> Envíos con valor declarado cuentan con cobertura de seguro contra accidentes de tránsito, siniestros mayores y robo con violencia en ruta, sujeto a los términos de la póliza vigente.
              </p>
              <p>
                <strong>5. Plazos de Retiro:</strong> Las encomiendas con entrega en agencia tienen un plazo de permanencia gratuito de hasta 15 días calendario en almacén.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Cumplimiento Legal:</strong> En cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú), CENTRAL garantiza el tratamiento seguro y confidencial de los datos personales proporcionados por sus clientes y usuarios.
              </p>
              <p>
                <strong>2. Finalidad del Tratamiento:</strong> Los datos personales (Nombres, DNI, Teléfono, Correo y Dirección de Entrega) son recolectados exclusivamente con el fin de ejecutar el servicio de transporte, emitir comprobantes de pago y enviar notificaciones de estado de envío vía SMS o WhatsApp.
              </p>
              <p>
                <strong>3. No Comercialización:</strong> CENTRAL no vende, alquila ni cede bases de datos personales a terceros con fines publicitarios no autorizados.
              </p>
              <p>
                <strong>4. Derechos ARCO:</strong> El titular de los datos puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición remitiendo una solicitud a <em>privacidad@central-transporte.pe</em>.
              </p>
            </>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0B192C] hover:bg-slate-800 text-white rounded-xl font-bold text-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
