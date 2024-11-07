import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ApiDisplay from './components/ApiDisplay';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState<{
    provider: string;
    apiId: string;
    api: any;
  } | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-700">
      <div className="container mx-auto px-4 py-8">
        {selectedApi && (
          <div className="mb-8">
            <ApiDisplay
              provider={selectedApi.provider}
              apiId={selectedApi.apiId}
              api={selectedApi.api}
              onClose={() => setSelectedApi(null)}
            />
          </div>
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleSidebar}
            className="px-6 py-3 bg-cyan-500 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-200 flex items-center space-x-2 group text-white"
          >
            <Menu className="h-5 w-5" />
            <span className="font-medium">Explore web APIs</span>
          </button>
        </div>
      </div>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={toggleSidebar} 
        onSelectApi={(provider, apiId, api) => {
          setSelectedApi({ provider, apiId, api });
          setIsSidebarOpen(false);
        }}
      />
    </div>
  );
}

export default App;