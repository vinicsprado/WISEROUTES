import React, { useMemo } from 'react';
import { NeumorphicCard } from './Neumorphic.tsx';
import { MAINTENANCE_DATA, TRUCK_DATA } from "../constants";
import { DriverStats } from '../types';
import { User, Award, TrendingDown, AlertCircle } from 'lucide-react';

export const Maintenance: React.FC = () => {

  const driverStats: DriverStats[] = useMemo(() => {
    const stats: {[key: string]: { 
      km: number, 
      liters: number, 
      cost: number, 
      kmDiffSum: number, 
      trips: number 
    }} = {};

    TRUCK_DATA.forEach(trip => {
      const driverName = trip.driver;
      if (!stats[driverName]) {
        stats[driverName] = { km: 0, liters: 0, cost: 0, kmDiffSum: 0, trips: 0 };
      }
      stats[driverName].km += trip.totalKm;
      stats[driverName].liters += trip.totalDieselLiters;
      stats[driverName].cost += trip.totalExpenses;
      stats[driverName].kmDiffSum += trip.kmDifference;
      stats[driverName].trips += 1;
    });

    return Object.entries(stats).map(([name, data]) => {
      const avgKmL = data.liters > 0 ? data.km / data.liters : 0;
      // Score calculation (simple heuristic)
      let score = 10;
      if (avgKmL < 3.0) score -= 3;
      if (avgKmL < 3.5) score -= 1;
      if (Math.abs(data.kmDiffSum / data.trips) > 50) score -= 2; // Penalize high deviation from planned route

      return {
        name,
        totalKm: data.km,
        avgKmL: parseFloat(avgKmL.toFixed(2)),
        avgKmDiff: parseFloat((data.kmDiffSum / data.trips).toFixed(1)),
        costPerKm: parseFloat((data.cost / data.km).toFixed(2)),
        trips: data.trips,
        score: Math.max(0, score)
      };
    }).sort((a, b) => b.score - a.score);
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-12 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold mb-2">Gestão de Frotas e Motoristas</h2>
        <p className="text-gray-600">Análise de performance individual e histórico de manutenção.</p>
      </header>

      {/* Driver Performance Section */}
      <section>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="text-gray-700" /> Desempenho dos Motoristas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {driverStats.map((driver) => (
            <NeumorphicCard key={driver.name} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award size={100} />
              </div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h4 className="text-lg font-bold">{driver.name}</h4>
                  <span className="text-xs text-gray-500">{driver.trips} Viagens Realizadas</span>
                </div>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner
                  ${driver.score >= 8 ? 'bg-green-500' : driver.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}
                `}>
                  {driver.score}
                </div>
              </div>

              <div className="space-y-3 relative z-10 text-sm">
                <div className="flex justify-between items-center border-b border-gray-300/50 pb-2">
                  <span className="text-gray-600">Eficiência (KM/L)</span>
                  <span className={`font-mono font-bold ${driver.avgKmL > 3.5 ? 'text-green-700' : 'text-red-700'}`}>
                    {driver.avgKmL}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-300/50 pb-2">
                  <span className="text-gray-600">Custo por KM</span>
                  <span className="font-mono font-bold">R$ {driver.costPerKm.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-300/50 pb-2">
                  <span className="text-gray-600" title="Diferença média entre rota planejada e realizada">Desvio de Rota (Médio)</span>
                  <span className={`font-mono font-bold ${Math.abs(driver.avgKmDiff) > 50 ? 'text-red-600' : 'text-gray-800'}`}>
                    {driver.avgKmDiff > 0 ? `+${driver.avgKmDiff}` : driver.avgKmDiff} km
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-2 relative z-10">
                <p className="text-xs font-bold uppercase text-gray-400 mb-1">Pontos de Atenção:</p>
                {driver.score < 8 ? (
                   <ul className="text-xs text-red-600 list-disc list-inside">
                     {driver.avgKmL < 3.5 && <li>Consumo de combustível elevado.</li>}
                     {Math.abs(driver.avgKmDiff) > 100 && <li>Alto desvio de rota planejada.</li>}
                   </ul>
                ) : (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Award size={12} /> Excelente conduta.
                  </p>
                )}
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </section>

      {/* Maintenance Table Section */}
      <section>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingDown className="text-gray-700" /> Histórico de Manutenção da Frota
        </h3>
        <NeumorphicCard className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-400">
                <th className="p-4 text-sm font-bold uppercase tracking-wider">Data</th>
                <th className="p-4 text-sm font-bold uppercase tracking-wider">Veículo</th>
                <th className="p-4 text-sm font-bold uppercase tracking-wider">Categoria</th>
                <th className="p-4 text-sm font-bold uppercase tracking-wider">Observação</th>
                <th className="p-4 text-sm font-bold uppercase tracking-wider">Custo (R$)</th>
              </tr>
            </thead>
            <tbody>
              {MAINTENANCE_DATA.map((item, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-300/20 transition-colors">
                  <td className="p-4 text-sm">{item.date}</td>
                  <td className="p-4 font-semibold">{item.vehicle}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.category === 'MANUTENCAO' ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'}`}>
                      {item.category === 'MANUTENCAO' ? 'MANUTENÇÃO' : 'DIVERSAS'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-700 max-w-xs truncate" title={item.observation}>{item.observation}</td>
                  <td className="p-4 font-mono font-bold">
                    {item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </NeumorphicCard>
      </section>
    </div>
  );
};