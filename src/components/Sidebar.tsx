import React, { useEffect, useState } from 'react';
import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import ProviderApis from './ProviderApis';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  onSelectApi: (provider: string, apiId: string, api: any) => void;
}

interface Provider {
  title: string;
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle, onSelectApi }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('https://api.apis.guru/v2/providers.json');
        if (!response.ok) throw new Error('Failed to fetch providers');
        const data = await response.json();
        const formattedProviders = data.data.map((provider: string) => ({
          title: provider,
          isOpen: false,
        }));
        setProviders(formattedProviders);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load API providers');
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const toggleProvider = (index: number) => {
    setProviders(providers.map((provider, i) => ({
      ...provider,
      isOpen: i === index ? !provider.isOpen : false,
    })));
  };

  const filteredProviders = providers.filter(provider =>
    provider.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-40 h-screen bg-slate-800 shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-96`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Select Provider</h2>
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 p-4">{error}</div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredProviders.map((provider, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleProvider(index)}
                      className="w-full flex items-center justify-between p-4 text-white hover:bg-slate-600 transition-colors"
                    >
                      <span className="font-medium">{provider.title}</span>
                      {provider.isOpen ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                    {provider.isOpen && (
                      <div className="border-t border-slate-600 bg-slate-800 p-4">
                        <ProviderApis
                          provider={provider.title}
                          onSelectApi={(apiId, api) => onSelectApi(provider.title, apiId, api)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-700 p-4">
            <p className="text-sm text-slate-400 text-center">
              Data provided by APIs.guru
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;