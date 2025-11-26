import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { RouteMap } from './components/RouteMap.tsx';
import { Maintenance } from './components/Maintenance.tsx';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <RouteMap />;
      case 'maintenance': return <Maintenance />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#e0e0e0] text-black overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 overflow-y-auto h-screen p-2 md:p-4">
        {renderView()}
      </main>
    </div>
  );
}

export default App;