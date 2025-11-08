'use client';

import React, { useState } from 'react';
import { 
  Star, GitFork, Calendar, MapPin, Building2, 
  Mail, ExternalLink, Code, TrendingUp, Copy, Check 
} from 'lucide-react';
import { Candidate } from '@/types';
import { formatDate, calculateDaysSince } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  rank: number;
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const [showOutreach, setShowOutreach] = useState(false);
  const [copied, setCopied] = useState(false);

  const topRepos = candidate.repoRatings.slice(0, 5);
  const allSkills = [...new Set(candidate.repoRatings.flatMap(r => r.skillMatch))];

  const copyOutreach = () => {
    navigator.clipboard.writeText(candidate.personalizedOutreach);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={candidate.user.avatar_url}
              alt={candidate.user.login}
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              #{rank}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {candidate.user.name || candidate.user.login}
            </h3>
            <p className="text-gray-600">@{candidate.user.login}</p>
            {candidate.user.bio && (
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">{candidate.user.bio}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-lg ${getScoreColor(candidate.overallScore)}`}>
            <TrendingUp size={20} />
            {candidate.overallScore.toFixed(0)}/100
          </div>
          <p className="text-xs text-gray-500 mt-1">Overall Score</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        {candidate.user.location && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            {candidate.user.location}
          </div>
        )}
        {candidate.user.company && (
          <div className="flex items-center gap-1">
            <Building2 size={16} />
            {candidate.user.company}
          </div>
        )}
        {candidate.user.email && (
          <div className="flex items-center gap-1">
            <Mail size={16} />
            {candidate.user.email}
          </div>
        )}
        <div className="flex items-center gap-1">
          <Code size={16} />
          {candidate.user.public_repos} repos
        </div>
        <div className="flex items-center gap-1">
          <Star size={16} />
          {candidate.user.followers} followers
        </div>
      </div>

      {/* Matched Skills */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Matched Skills:</p>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <span
              key={skill}
              className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Top Repositories */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Top Repositories:</p>
        <div className="space-y-2">
          {topRepos.map((rating) => (
            <div key={rating.repo.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-1">
                <a
                  href={rating.repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 hover:underline flex items-center gap-1"
                >
                  {rating.repo.name}
                  <ExternalLink size={14} />
                </a>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(rating.score)}`}>
                  {rating.score.toFixed(0)}
                </span>
              </div>
              
              {rating.repo.description && (
                <p className="text-sm text-gray-600 mb-2">{rating.repo.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {rating.repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-primary-400"></span>
                    {rating.repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} />
                  {rating.repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} />
                  {rating.repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Updated {calculateDaysSince(rating.repo.updated_at)}d ago
                </span>
              </div>

              {rating.highlights.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {rating.highlights.map((highlight, idx) => (
                    <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                      ✓ {highlight}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-600 mt-2 italic">{rating.analysis}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Outreach */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowOutreach(!showOutreach)}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 mb-2"
        >
          {showOutreach ? '▼' : '▶'} Personalized Outreach Message
        </button>
        
        {showOutreach && (
          <div className="bg-gray-50 rounded-lg p-4 relative">
            <button
              onClick={copyOutreach}
              className="absolute top-2 right-2 px-3 py-1 bg-primary-600 text-white rounded text-xs hover:bg-primary-700 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans pr-20">
              {candidate.personalizedOutreach}
            </pre>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <a
          href={candidate.user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
        >
          View GitHub Profile
          <ExternalLink size={16} />
        </a>
        {candidate.user.email && (
          <a
            href={`mailto:${candidate.user.email}`}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
          >
            Send Email
            <Mail size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

