import React, { useState, useEffect } from 'react';

interface ProviderApisProps {
  provider: string;
  onSelectApi: (apiId: string, api: any) => void;
}

interface ApiInfo {
  added: string;
  updated: string;
  swaggerUrl?: string;
  swaggerYamlUrl?: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact?: {
      email?: string;
      url?: string;
      name?: string;
      'x-twitter'?: string;
    };
    'x-logo'?: {
      url: string;
    };
    'x-apisguru-categories'?: string[];
  };
}

const ProviderApis: React.FC<ProviderApisProps> = ({ provider, onSelectApi }) => {
  const [apis, setApis] = useState<Record<string, ApiInfo> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
        if (!response.ok) throw new Error('Failed to fetch API details');
        const data = await response.json();
        setApis(data.apis || {});
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load API details');
        setIsLoading(false);
      }
    };

    if (provider) {
      fetchApiDetails();
    }
  }, [provider]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-4">{error}</div>
    );
  }

  if (!apis || Object.keys(apis).length === 0) {
    return (
      <div className="text-center text-slate-400 py-4">No APIs found for this provider.</div>
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(apis).map(([apiId, api]) => (
        <button
          key={apiId}
          onClick={() => onSelectApi(apiId, api)}
          className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            {api.info['x-logo'] && (
              <img 
                src={api.info['x-logo'].url} 
                alt={`${api.info.title} logo`}
                className="w-8 h-8 rounded-full object-cover bg-white p-1"
              />
            )}
            <div>
              <h3 className="font-medium text-white">{api.info.title}</h3>
              <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                {api.info.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProviderApis;