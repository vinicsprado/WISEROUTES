import React from 'react';
import { ViewState } from '../types';
import { NeumorphicButton } from './Neumorphic.tsx';
import { LayoutDashboard, Map, Wrench, Truck } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-full md:w-64 flex flex-col gap-6 p-4 md:h-screen sticky top-0">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="p-3 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">
          <Truck size={24} className="text-black" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Wise Routes</h1>
      </div>

      <nav className="flex flex-col gap-4">
        <NeumorphicButton 
          active={currentView === 'dashboard'} 
          onClick={() => setView('dashboard')}
          className="flex items-center gap-3 justify-start"
        >
          <LayoutDashboard size={20} />
          Painel de Controle
        </NeumorphicButton>

        <NeumorphicButton 
          active={currentView === 'map'} 
          onClick={() => setView('map')}
          className="flex items-center gap-3 justify-start"
        >
          <Map size={20} />
          Planejador de Rotas
        </NeumorphicButton>

        <NeumorphicButton 
          active={currentView === 'maintenance'} 
          onClick={() => setView('maintenance')}
          className="flex items-center gap-3 justify-start"
        >
          <Wrench size={20} />
          Frota e Motoristas
        </NeumorphicButton>
      </nav>

      <div className="mt-auto p-4 text-xs text-gray-600 text-center">
        Torre de Controle v1.0
      </div>
    </div>
  );
};