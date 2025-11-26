import React, { useMemo } from 'react';
import { NeumorphicCard } from './Neumorphic.tsx';
import { TRUCK_DATA } from "../constants";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { TrendingUp, Droplet, Wallet, AlertTriangle, Truck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  
  // Optimized: Single pass aggregation
  const { globalStats, uniqueVehiclesData } = useMemo(() => {
    let totalSpent = 0;
    let totalKm = 0;
    let totalDiesel = 0;
    
    const vehicleMap: Record<string, { name: string, km: number, cost: number, liters: number, trips: number }> = {};
    
    TRUCK_DATA.forEach(trip => {
      // Global Accumulators
      totalSpent += trip.totalExpenses;
      totalKm += trip.totalKm;
      totalDiesel += trip.totalDieselLiters;

      // Vehicle Specific Accumulators
      const name = trip.vehicle;
      if (!vehicleMap[name]) {
        vehicleMap[name] = { name, km: 0, cost: 0, liters: 0, trips: 0 };
      }
      vehicleMap[name].km += trip.totalKm;
      vehicleMap[name].cost += trip.totalExpenses;
      vehicleMap[name].liters += trip.totalDieselLiters;
      vehicleMap[name].trips += 1;
    });

    const avgKmL = totalDiesel > 0 ? totalKm / totalDiesel : 0;
    const avgCostPerKm = totalKm > 0 ? totalSpent / totalKm : 0;

    const vehiclesArray = Object.values(vehicleMap).map(v => ({
      ...v,
      efficiency: v.liters > 0 ? parseFloat((v.km / v.liters).toFixed(2)) : 0
    }));

    return {
      globalStats: {
        totalSpent,
        totalKm,
        avgKmL,
        avgCostPerKm,
      },
      uniqueVehiclesData: vehiclesArray
    };
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Torre de Controle (Supply Chain)</h2>
        <p className="text-gray-600">Monitoramento estratégico de desempenho logístico e operacional.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeumorphicCard className="flex flex-col items-center justify-center p-8">
          <div className="p-4 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] mb-4">
            <Wallet size={32} className="text-green-700" />
          </div>
          <h3 className="text-gray-600 font-medium">Despesa Total</h3>
          <p className="text-2xl font-bold mt-2">R$ {globalStats.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </NeumorphicCard>

        <NeumorphicCard className="flex flex-col items-center justify-center p-8">
           <div className="p-4 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] mb-4">
            <TrendingUp size={32} className="text-blue-700" />
          </div>
          <h3 className="text-gray-600 font-medium">Total KM Rodados</h3>
          <p className="text-2xl font-bold mt-2">{globalStats.totalKm.toLocaleString('pt-BR')} km</p>
        </NeumorphicCard>

        <NeumorphicCard className="flex flex-col items-center justify-center p-8">
           <div className="p-4 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] mb-4">
            <Droplet size={32} className="text-orange-700" />
          </div>
          <h3 className="text-gray-600 font-medium">Média Consumo</h3>
          <p className="text-2xl font-bold mt-2">{globalStats.avgKmL.toFixed(2)} km/L</p>
          <span className="text-xs text-gray-500 mt-1">Meta Global: {'>'} 3.5 km/L</span>
        </NeumorphicCard>

        <NeumorphicCard className="flex flex-col items-center justify-center p-8">
           <div className="p-4 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] mb-4">
            <AlertTriangle size={32} className="text-red-700" />
          </div>
          <h3 className="text-gray-600 font-medium">Custo por KM</h3>
          <p className="text-2xl font-bold mt-2">R$ {globalStats.avgCostPerKm.toFixed(2)}</p>
        </NeumorphicCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NeumorphicCard className="min-h-[450px]">
          <h3 className="text-xl font-bold mb-6">Custo Operacional vs. KM por Veículo</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={uniqueVehiclesData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fill: 'black', fontSize: 10, fontWeight: 'bold'}} interval={0} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ backgroundColor: '#e0e0e0', borderRadius: '12px', border: 'none', boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff', color: 'black' }}
                  formatter={(value: number, name: string) => [
                    name === 'cost' ? `R$ ${value.toLocaleString('pt-BR')}` : `${value.toLocaleString('pt-BR')} km`,
                    name === 'cost' ? 'Custo Total' : 'KM Total'
                  ]}
                />
                <Bar dataKey="cost" fill="#4a4a4a" name="cost" barSize={12} radius={[0, 4, 4, 0]} />
                <Bar dataKey="km" fill="#9ca3af" name="km" barSize={12} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeumorphicCard>

        <NeumorphicCard className="min-h-[450px]">
          <h3 className="text-xl font-bold mb-6">Eficiência de Combustível por Veículo (KM/L)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={uniqueVehiclesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                <XAxis dataKey="name" tick={{fill: 'black', fontSize: 10}} interval={0} angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 6]} stroke="black" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#e0e0e0', borderRadius: '12px', border: 'none', boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff', color: 'black' }}
                />
                <Bar dataKey="efficiency" name="KM/L" radius={[4, 4, 0, 0]}>
                  {uniqueVehiclesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.efficiency >= 3.5 ? '#15803d' : '#b91c1c'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs font-bold">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-700 rounded-sm"></div> Bom ({'>'} 3.5)</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-700 rounded-sm"></div> Crítico (&lt; 3.5)</span>
          </div>
        </NeumorphicCard>
      </div>

      {/* Strategic Insights */}
      <NeumorphicCard>
        <h3 className="text-xl font-bold mb-4">Insights e Alertas da Frota</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-300/20 bg-[#e6e6e6]">
             <div className="p-2 rounded-full bg-green-200 text-green-800 shadow-sm"><Truck size={20} /></div>
             <div>
                <h4 className="font-bold">Viabilidade Veículos Elétricos</h4>
                <p className="text-sm text-gray-600">A análise do "ACCELO 1017" (Urbano) indica que a conversão para elétrico pode reduzir custos operacionais em 40% devido à alta frequência de paradas.</p>
             </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-300/20 bg-[#e6e6e6]">
             <div className="p-2 rounded-full bg-red-200 text-red-800 shadow-sm"><AlertTriangle size={20} /></div>
             <div>
                <h4 className="font-bold">Anomalia de Consumo</h4>
                <p className="text-sm text-gray-600">O veículo ATEGO 3030 apresentou média de 2.79 KM/L em rota recente. 18% abaixo da média da frota. Sugere-se revisão no sistema de injeção.</p>
             </div>
          </div>
        </div>
      </NeumorphicCard>
    </div>
  );
};