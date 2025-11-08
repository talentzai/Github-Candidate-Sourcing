'use client';

import React, { useState } from 'react';
import { Github, Users, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import ApiKeyInput from '@/components/ApiKeyInput';
import SearchForm from '@/components/SearchForm';
import CandidateCard from '@/components/CandidateCard';
import { ApiKeys, SearchParams, Candidate, GitHubUser, Repository, RepoRating } from '@/types';

export default function Home() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    githubToken: '',
    openaiKey: '',
    anthropicKey: '',
    clayApiKey: '',
    crunchbaseKey: '',
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setSearchParams(params);
    setCandidates([]);

    try {
      // Step 1: Search for candidates
      const searchResponse = await axios.post('/api/search', {
        searchParams: params,
        apiKeys: { githubToken: apiKeys.githubToken },
      });

      const foundCandidates = searchResponse.data.candidates;
      
      if (!foundCandidates || foundCandidates.length === 0) {
        setError('No candidates found. Try adjusting your search criteria.');
        setIsLoading(false);
        return;
      }

      // Step 2: Rate repositories for each candidate
      const processedCandidates: Candidate[] = [];

      for (const candidateData of foundCandidates) {
        try {
          // Rate repositories
          const rateResponse = await axios.post('/api/rate-repos', {
            repositories: candidateData.repositories,
            skills: params.skills,
            apiKeys: {
              openaiKey: apiKeys.openaiKey,
              anthropicKey: apiKeys.anthropicKey,
            },
          });

          const repoRatings: RepoRating[] = rateResponse.data.ratings;

          // Calculate overall score
          const overallScore = repoRatings.length > 0
            ? repoRatings.reduce((sum, r) => sum + r.score, 0) / repoRatings.length
            : 0;

          // Calculate skill match percentage
          const totalSkills = params.skills.length;
          const matchedSkills = new Set(repoRatings.flatMap(r => r.skillMatch));
          const skillMatch = (matchedSkills.size / totalSkills) * 100;

          const candidate: Candidate = {
            user: candidateData.user,
            repositories: candidateData.repositories,
            repoRatings,
            overallScore,
            skillMatch,
            personalizedOutreach: '', // Will be generated next
          };

          // Step 3: Generate personalized outreach
          const outreachResponse = await axios.post('/api/generate-outreach', {
            candidate,
            skills: params.skills,
            apiKeys: {
              openaiKey: apiKeys.openaiKey,
              anthropicKey: apiKeys.anthropicKey,
            },
            companyName: params.companyName,
            position: params.position,
          });

          candidate.personalizedOutreach = outreachResponse.data.outreach;

          // Step 4: Optional enrichment (only if API keys are provided)
          if (apiKeys.clayApiKey || apiKeys.crunchbaseKey) {
            try {
              const enrichResponse = await axios.post('/api/enrich', {
                candidate: {
                  username: candidate.user.login,
                  profileUrl: candidate.user.html_url,
                  email: candidate.user.email,
                  company: candidate.user.company,
                },
                apiKeys: {
                  clayApiKey: apiKeys.clayApiKey,
                  crunchbaseKey: apiKeys.crunchbaseKey,
                },
              });

              if (enrichResponse.data.enrichedData) {
                candidate.enrichedData = enrichResponse.data.enrichedData;
              }
            } catch (enrichError) {
              console.error('Enrichment failed for candidate:', candidate.user.login, enrichError);
              // Continue without enrichment data
            }
          }

          processedCandidates.push(candidate);
        } catch (candidateError) {
          console.error(`Error processing candidate ${candidateData.user.login}:`, candidateError);
          // Continue with next candidate
        }
      }

      // Sort candidates by overall score
      processedCandidates.sort((a, b) => b.overallScore - a.overallScore);

      setCandidates(processedCandidates);
      setSuccess(`Successfully found and analyzed ${processedCandidates.length} candidates!`);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.details || 
        err.message || 
        'An error occurred while searching for candidates'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Github className="w-10 h-10 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">GitHub Talent Sourcer</h1>
              <p className="text-gray-600">Find and evaluate developers based on their GitHub profiles</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Keys Configuration */}
        <ApiKeyInput apiKeys={apiKeys} setApiKeys={setApiKeys} />

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Success</p>
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="loader mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Searching and analyzing candidates...</p>
            <p className="text-gray-500 text-sm mt-2">
              This may take a few moments as we evaluate repositories and generate personalized outreach.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && candidates.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary-600" />
                Found {candidates.length} Candidate{candidates.length !== 1 ? 's' : ''}
              </h2>
              {searchParams && (
                <div className="text-sm text-gray-600">
                  Searched for:{' '}
                  <span className="font-medium">{searchParams.skills.join(', ')}</span>
                  {searchParams.location && (
                    <span> in <span className="font-medium">{searchParams.location}</span></span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {candidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.user.id}
                  candidate={candidate}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && candidates.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ready to Find Talent
            </h3>
            <p className="text-gray-600">
              Enter your API keys and search parameters above to start finding candidates.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>GitHub Talent Sourcer - Built with Next.js, TypeScript, and AI</p>
            <p className="mt-1">
              All API keys are session-based and never stored permanently.
            </p>
            <p className="mt-2 text-primary-600 font-medium">
              Built with ❤️ by Tech Vibes with Shaphy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

