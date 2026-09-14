export interface Agency {
  id: string;
  name: string;
  city: string;
  region: 'Lima' | 'Ayacucho' | 'Huanta' | 'VRAEM';
  address: string;
  reference: string;
  phone: string;
  whatsapp: string;
  hours: string;
  services: string[];
  coordinates: { lat: number; lng: number };
  isMainHub?: boolean;
}

export interface RouteInfo {
  id: string;
  origin: string;
  destination: string;
  duration: string;
  frequency: string;
  departures: string[];
  vehicleType: string;
  status: 'Operativo' | 'Tránsito Normal' | 'Precaución por Lluvias';
  distanceKm: number;
}

export interface TrackingStep {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingShipment {
  trackingCode: string;
  sender: { name: string; city: string };
  recipient: { name: string; city: string; address?: string };
  serviceType: 'Paquetería Express' | 'Carga General' | 'Logística Empresarial' | 'Documento';
  packagesCount: number;
  weightKg: number;
  estimatedDelivery: string;
  currentStatus: 'Recibido' | 'En Tránsito' | 'En Centro de Distribución' | 'En Reparto' | 'Entregado';
  driver?: { name: string; phone: string; vehiclePlate: string };
  steps: TrackingStep[];
  signatureProofUrl?: string;
  deliveryType: 'Agencia' | 'Puerta a Puerta';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  tags: string[];
  idealFor: string;
  deliveryTime: string;
}

export interface FaqItem {
  id: string;
  category: 'Envíos' | 'Tarifas' | 'Restricciones' | 'Pagos' | 'Reclamos';
  question: string;
  answer: string;
}

export interface QuoteCalculation {
  origin: string;
  destination: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  volumetricWeight: number;
  chargeableWeight: number;
  serviceType: 'express' | 'standard' | 'business';
  deliveryMode: 'agency' | 'home';
  declaredValue: number;
  basePrice: number;
  homeDeliveryFee: number;
  insuranceFee: number;
  subtotal: number;
  igv: number;
  total: number;
  estimatedDays: string;
}
