'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import { ApiKeys } from '@/types';

interface ApiKeyInputProps {
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
}

export default function ApiKeyInput({ apiKeys, setApiKeys }: ApiKeyInputProps) {
  const [showKeys, setShowKeys] = useState({
    githubToken: false,
    openaiKey: false,
    anthropicKey: false,
    clayApiKey: false,
    crunchbaseKey: false,
  });

  const toggleShowKey = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleKeyChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys({ ...apiKeys, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-800">API Keys Configuration</h2>
        <span className="text-sm text-gray-500">(All Optional)</span>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          💡 <strong>No API keys?</strong> No problem! The tool works without any keys using algorithmic analysis. 
          Adding keys improves results with AI-powered insights and higher rate limits.
        </p>
      </div>
      
      <div className="space-y-4">
        {/* GitHub Token - Optional but recommended */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Personal Access Token <span className="text-gray-400">(Recommended)</span>
          </label>
          <div className="relative">
            <input
              type={showKeys.githubToken ? 'text' : 'password'}
              value={apiKeys.githubToken}
              onChange={(e) => handleKeyChange('githubToken', e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Optional - increases rate limit)"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
            <button
              type="button"
              onClick={() => toggleShowKey('githubToken')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showKeys.githubToken ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Optional but recommended for higher rate limits (5,000/hour vs 60/hour). Get it from{' '}
            <a 
              href="https://github.com/settings/tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              GitHub Settings
            </a>
          </p>
        </div>

        {/* AI API Keys - Optional but recommended */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            AI API Keys (Optional - for enhanced analysis)
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">OpenAI API Key</label>
              <div className="relative">
                <input
                  type={showKeys.openaiKey ? 'text' : 'password'}
                  value={apiKeys.openaiKey || ''}
                  onChange={(e) => handleKeyChange('openaiKey', e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('openaiKey')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKeys.openaiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Anthropic API Key</label>
              <div className="relative">
                <input
                  type={showKeys.anthropicKey ? 'text' : 'password'}
                  value={apiKeys.anthropicKey || ''}
                  onChange={(e) => handleKeyChange('anthropicKey', e.target.value)}
                  placeholder="sk-ant-xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('anthropicKey')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKeys.anthropicKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enrichment API Keys - Optional */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Enrichment API Keys (Optional)
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Clay API Key</label>
              <div className="relative">
                <input
                  type={showKeys.clayApiKey ? 'text' : 'password'}
                  value={apiKeys.clayApiKey || ''}
                  onChange={(e) => handleKeyChange('clayApiKey', e.target.value)}
                  placeholder="clay_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('clayApiKey')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKeys.clayApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Crunchbase API Key</label>
              <div className="relative">
                <input
                  type={showKeys.crunchbaseKey ? 'text' : 'password'}
                  value={apiKeys.crunchbaseKey || ''}
                  onChange={(e) => handleKeyChange('crunchbaseKey', e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('crunchbaseKey')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKeys.crunchbaseKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

