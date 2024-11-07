import React from 'react';
import { ChevronDown, ChevronUp, Globe, Mail, Calendar, Twitter } from 'lucide-react';

interface ApiDetailsProps {
  api: {
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
  };
  isOpen: boolean;
  onToggle: () => void;
}

const ApiDetails: React.FC<ApiDetailsProps> = ({ api, isOpen, onToggle }) => {
  if (!api || !api.info) return null;

  const { info, updated, added, swaggerUrl, swaggerYamlUrl } = api;
  const formattedDate = new Date(updated).toLocaleDateString();
  const addedDate = new Date(added).toLocaleDateString();

  return (
    <div className="border rounded-lg bg-white shadow-sm mb-2">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {info['x-logo'] && (
              <img 
                src={info['x-logo'].url} 
                alt={`${info.title} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <h3 className="font-medium text-gray-900">{info.title}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{info.description}</p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 text-sm">
          <div className="pt-4 border-t">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Added: {addedDate} | Updated: {formattedDate}</span>
              </div>

              {info.contact?.url && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <a
                    href={info.contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {info.contact.name || 'Documentation'}
                  </a>
                </div>
              )}

              {info.contact?.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a
                    href={`mailto:${info.contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {info.contact.email}
                  </a>
                </div>
              )}

              {info.contact?.['x-twitter'] && (
                <div className="flex items-center text-gray-600">
                  <Twitter className="h-4 w-4 mr-2" />
                  <a
                    href={`https://twitter.com/${info.contact['x-twitter']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{info.contact['x-twitter']}
                  </a>
                </div>
              )}

              {info['x-apisguru-categories'] && info['x-apisguru-categories'].length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {info['x-apisguru-categories'].map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">API Specifications</h4>
                <div className="space-y-2">
                  {swaggerUrl && (
                    <a
                      href={swaggerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      OpenAPI JSON
                    </a>
                  )}
                  {swaggerYamlUrl && (
                    <a
                      href={swaggerYamlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      OpenAPI YAML
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiDetails;