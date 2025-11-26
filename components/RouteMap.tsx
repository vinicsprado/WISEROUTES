
import React, { useState, useMemo } from 'react';
import { NeumorphicButton, NeumorphicCard, NeumorphicInput, NeumorphicSelect } from './Neumorphic.tsx';
import { RoutePlan } from '../types';
import { TRUCK_DATA } from "../constants";
import { Navigation, Clock, CloudSun, DollarSign, Truck, Calendar, Fuel, Gauge, Leaf, AlertTriangle } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [origin, setOrigin] = useState('Curitiba');
  const [destination, setDestination] = useState('São Paulo');
  const [date, setDate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [plan, setPlan] = useState<RoutePlan | null>(null);

  // Extract unique vehicles from data
  const vehicleList = useMemo(() => Array.from(new Set(TRUCK_DATA.map(t => t.vehicle))), []);

  const calculateRoute = () => {
    if (!selectedVehicle) {
      alert("Por favor, selecione um veículo.");
      return;
    }

    // Calculate historical efficiency for the selected vehicle
    const vehicleHistory = TRUCK_DATA.filter(t => t.vehicle === selectedVehicle);
    const totalKm = vehicleHistory.reduce((acc, t) => acc + t.totalKm, 0);
    const totalDiesel = vehicleHistory.reduce((acc, t) => acc + t.totalDieselLiters, 0);
    const avgKmL = totalDiesel > 0 ? totalKm / totalDiesel : 3.5; // Default fallback

    // Simulation logic
    const dist = Math.floor(Math.random() * 500) + 300; // Mock distance
    const dieselPrice = 6.29; // Avg Diesel Price
    const litersNeeded = dist / avgKmL;
    const cost = litersNeeded * dieselPrice;
    
    setPlan({
      origin,
      destination,
      date,
      vehicle: selectedVehicle,
      distance: dist,
      estimatedFuelCost: cost,
      estimatedLiters: litersNeeded,
      estimatedTime: `${Math.floor(dist/70)}h ${Math.floor((dist%70)*0.6)}m`,
      historicalEfficiency: avgKmL,
      weatherRisk: Math.random() > 0.7 ? 'Alto' : 'Baixo',
      carbonFootprint: litersNeeded * 2.68 // Approx 2.68kg CO2 per liter of diesel
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 h-full flex flex-col animate-fade-in">
       <header>
        <h2 className="text-3xl font-bold mb-2">Planejador de Rotas Inteligente</h2>
        <p className="text-gray-600">Simulação de custos e viabilidade operacional baseada em dados históricos da frota.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Left Column: Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <NeumorphicCard className="space-y-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Navigation size={20} /> Parâmetros da Viagem
            </h3>
            
            <NeumorphicInput 
              label="Data da Viagem" 
              type="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />

            <NeumorphicSelect 
              label="Veículo Responsável"
              options={vehicleList}
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            />
            
            <NeumorphicInput 
              label="Origem" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)} 
              placeholder="ex: Curitiba"
            />
            
            <NeumorphicInput 
              label="Destino" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
              placeholder="ex: São Paulo"
            />

            <NeumorphicButton className="w-full mt-4 bg-gray-200" onClick={calculateRoute}>
              Simular Rota e Custos
            </NeumorphicButton>
          </NeumorphicCard>

          {/* Tips Card */}
          <NeumorphicCard>
             <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Truck size={16}/> Sugestão da Torre</h4>
             <p className="text-xs text-gray-600">
               Veículos do modelo <strong>ATEGO 1719</strong> têm apresentado 15% mais eficiência em rotas interestaduais neste mês. Considere essa opção para distâncias acima de 400km.
             </p>
          </NeumorphicCard>
        </div>

        {/* Right Column: Metrics Dashboard (Replaces Map) */}
        <div className="lg:col-span-8 space-y-6">
           {!plan ? (
             <div className="h-full flex flex-col items-center justify-center opacity-40 p-12 text-center">
                <Navigation size={64} className="mb-4"/>
                <h3 className="text-xl font-bold">Aguardando Simulação</h3>
                <p>Preencha os dados à esquerda e clique em "Simular Rota" para visualizar as métricas preditivas.</p>
             </div>
           ) : (
             <div className="animate-fade-in space-y-6">
                
                {/* Main KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <NeumorphicCard className="flex items-center gap-4">
                      <div className="p-4 rounded-full bg-green-200 text-green-800 shadow-inner">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-bold uppercase">Custo Estimado (Diesel)</p>
                        <p className="text-3xl font-bold">R$ {plan.estimatedFuelCost.toFixed(2)}</p>
                      </div>
                   </NeumorphicCard>

                   <NeumorphicCard className="flex items-center gap-4">
                      <div className="p-4 rounded-full bg-blue-200 text-blue-800 shadow-inner">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-bold uppercase">Tempo de Viagem</p>
                        <p className="text-3xl font-bold">{plan.estimatedTime}</p>
                      </div>
                   </NeumorphicCard>
                </div>

                {/* Secondary Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <NeumorphicCard className="flex flex-col items-center text-center p-4">
                      <Gauge className="mb-2 text-gray-700" size={20} />
                      <span className="text-xs text-gray-500 font-bold uppercase">Distância</span>
                      <span className="text-lg font-bold">{plan.distance} km</span>
                   </NeumorphicCard>

                   <NeumorphicCard className="flex flex-col items-center text-center p-4">
                      <Fuel className="mb-2 text-orange-600" size={20} />
                      <span className="text-xs text-gray-500 font-bold uppercase">Consumo</span>
                      <span className="text-lg font-bold">{plan.estimatedLiters.toFixed(1)} L</span>
                   </NeumorphicCard>

                   <NeumorphicCard className="flex flex-col items-center text-center p-4">
                      <Leaf className="mb-2 text-green-600" size={20} />
                      <span className="text-xs text-gray-500 font-bold uppercase">Pegada CO2</span>
                      <span className="text-lg font-bold">{plan.carbonFootprint.toFixed(1)} kg</span>
                   </NeumorphicCard>

                   <NeumorphicCard className="flex flex-col items-center text-center p-4">
                      <CloudSun className="mb-2 text-blue-500" size={20} />
                      <span className="text-xs text-gray-500 font-bold uppercase">Risco Climático</span>
                      <span className={`text-lg font-bold ${plan.weatherRisk === 'Alto' ? 'text-red-500' : 'text-green-600'}`}>
                        {plan.weatherRisk}
                      </span>
                   </NeumorphicCard>
                </div>

                {/* Detailed Analysis Card */}
                <NeumorphicCard className="p-6">
                  <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2">Análise de Eficiência do Veículo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <p className="text-sm text-gray-600 mb-1">Veículo Selecionado</p>
                       <p className="text-xl font-bold mb-4">{plan.vehicle}</p>
                       
                       <p className="text-sm text-gray-600 mb-1">Data da Viagem</p>
                       <p className="text-xl font-bold">{plan.date ? new Date(plan.date).toLocaleDateString('pt-BR') : 'Não informada'}</p>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Eficiência Histórica</span>
                          <span className="font-bold">{plan.historicalEfficiency.toFixed(2)} km/L</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(plan.historicalEfficiency / 6) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">Baseado na média de todas as viagens deste veículo</p>

                        {plan.historicalEfficiency < 3.2 && (
                          <div className="flex items-center gap-2 p-3 bg-red-100/50 rounded-lg text-red-700 text-xs border border-red-200">
                             <AlertTriangle size={16} />
                             <span>Atenção: Este veículo tem histórico de consumo acima da média. Considere manutenção preventiva.</span>
                          </div>
                        )}
                     </div>
                  </div>
                </NeumorphicCard>

             </div>
           )}
        </div>
      </div>
    </div>
  );
};
