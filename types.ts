
export interface TruckTrip {
  vehicle: string;
  driver: string;
  departureDate: string;
  arrivalDate: string;
  destination: string;
  fuelCost: number;
  maintenanceCost: number;
  driverDaily: number;
  totalExpenses: number;
  totalKm: number;
  kmDifference: number;
  totalDieselLiters: number;
  avgKmL: number;
}

export interface MaintenanceRecord {
  date: string;
  driver: string;
  vehicle: string;
  cost: number;
  responsible: string;
  observation: string;
  category: 'DIVERSAS' | 'MANUTENCAO';
}

export type ViewState = 'dashboard' | 'map' | 'maintenance';

export interface RoutePlan {
  origin: string;
  destination: string;
  date: string;
  vehicle: string;
  distance: number;
  estimatedFuelCost: number;
  estimatedLiters: number;
  estimatedTime: string;
  historicalEfficiency: number;
  weatherRisk: 'Baixo' | 'Médio' | 'Alto';
  carbonFootprint: number; // kg CO2
}

export interface DriverStats {
  name: string;
  totalKm: number;
  avgKmL: number;
  avgKmDiff: number;
  costPerKm: number;
  trips: number;
  score: number; // 0-10 based on efficiency
}
