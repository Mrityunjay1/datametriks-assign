import React from 'react';
import { X, Globe, Mail, Calendar, Twitter, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ApiDisplayProps {
  provider: string;
  apiId: string;
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
  onClose: () => void;
}

const ApiDisplay: React.FC<ApiDisplayProps> = ({ provider, apiId, api, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { info, updated, added, swaggerUrl, swaggerYamlUrl } = api;
  const formattedDate = new Date(updated).toLocaleDateString();
  const addedDate = new Date(added).toLocaleDateString();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {info['x-logo'] && (
              <img
                src={info['x-logo'].url}
                alt={`${info.title} logo`}
                className="w-12 h-12 rounded-lg bg-white p-1"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{info.title}</h1>
              <p className="text-cyan-100 text-sm">Provider: {provider}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyan-700 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
              <p className="text-slate-300">{info.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Version Information</h2>
              <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-slate-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Added: {addedDate}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Updated: {formattedDate}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Version:</span>
                    {info.version}
                  </div>
                </div>
              </div>
            </div>

            {info['x-apisguru-categories'] && info['x-apisguru-categories'].length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {info['x-apisguru-categories'].map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-cyan-900 text-cyan-100 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Contact Information</h2>
              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                {info.contact?.url && (
                  <a
                    href={info.contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-cyan-400 hover:text-cyan-300"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{info.contact.name || 'Documentation'}</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
                {info.contact?.email && (
                  <a
                    href={`mailto:${info.contact.email}`}
                    className="flex items-center text-cyan-400 hover:text-cyan-300"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{info.contact.email}</span>
                  </a>
                )}
                {info.contact?.['x-twitter'] && (
                  <a
                    href={`https://twitter.com/${info.contact['x-twitter']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-cyan-400 hover:text-cyan-300"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    <span>@{info.contact['x-twitter']}</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-2">API Specifications</h2>
              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                {swaggerUrl && (
                  <div className="flex items-center justify-between">
                    <a
                      href={swaggerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-cyan-400 hover:text-cyan-300"
                    >
                      <span>OpenAPI JSON</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(swaggerUrl)}
                      className="p-2 hover:bg-slate-600 rounded-full transition-colors"
                      title="Copy URL"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-300" />
                      )}
                    </button>
                  </div>
                )}
                {swaggerYamlUrl && (
                  <div className="flex items-center justify-between">
                    <a
                      href={swaggerYamlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-cyan-400 hover:text-cyan-300"
                    >
                      <span>OpenAPI YAML</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(swaggerYamlUrl)}
                      className="p-2 hover:bg-slate-600 rounded-full transition-colors"
                      title="Copy URL"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-300" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDisplay;