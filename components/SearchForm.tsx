'use client';

import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { SearchParams } from '@/types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [skills, setSkills] = useState<string[]>(['javascript']);
  const [currentSkill, setCurrentSkill] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(5);
  const [maxResults, setMaxResults] = useState(15);
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim().toLowerCase())) {
      setSkills([...skills, currentSkill.trim().toLowerCase()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    onSearch({
      skills,
      location: location.trim() || undefined,
      minRepos,
      maxResults,
      companyName: companyName.trim() || undefined,
      position: position.trim() || undefined,
    });
  };

  const popularSkills = [
    'javascript', 'typescript', 'python', 'java', 'go', 'rust', 
    'react', 'vue', 'angular', 'node', 'django', 'flask',
    'machine-learning', 'devops', 'kubernetes', 'docker'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-primary-600" />
        Search Parameters
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Skills Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="e.g., python, react, kubernetes"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center gap-1"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          
          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-primary-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          {/* Popular Skills */}
          <div className="text-xs text-gray-500">
            <span className="font-medium">Popular: </span>
            {popularSkills.slice(0, 8).map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  if (!skills.includes(skill)) {
                    setSkills([...skills, skill]);
                  }
                }}
                className="text-primary-600 hover:underline mr-2"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (Optional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, Remote"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Repositories
            </label>
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Results (10-15)
            </label>
            <input
              type="number"
              value={maxResults}
              onChange={(e) => setMaxResults(Math.min(15, Math.max(10, parseInt(e.target.value) || 10)))}
              min="10"
              max="15"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="For outreach personalization"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position Title (Optional)
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g., Senior Full Stack Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || skills.length === 0}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="loader border-white border-t-transparent w-5 h-5"></div>
              Searching...
            </>
          ) : (
            <>
              <Search size={20} />
              Find Candidates
            </>
          )}
        </button>
      </form>
    </div>
  );
}

