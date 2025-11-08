import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { GitHubUser, Repository, SearchParams } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skills, location, minRepos = 5, maxResults = 15 } = body.searchParams as SearchParams;
    const { githubToken } = body.apiKeys || {};

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: 'At least one skill is required' },
        { status: 400 }
      );
    }

    // Build headers - use token if provided, otherwise use unauthenticated requests
    const headers: any = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    // Build search query
    // GitHub search requires proper syntax when using OR with other filters
    // We need to group the OR conditions in parentheses or use a different approach
    
    // Strategy: Search for first skill with all filters, then filter results for other skills
    const primarySkill = skills[0];
    let searchQuery = `language:${primarySkill} repos:>${minRepos}`;
    if (location) {
      searchQuery += ` location:${location}`;
    }
    searchQuery += ' type:user';
    
    // For multiple skills, we'll search for the first one and filter results by other skills later

    // Search for users
    // If multiple skills, we need to fetch more results and filter
    const fetchCount = skills.length > 1 ? Math.min(maxResults * 2, 100) : maxResults;
    
    const searchResponse = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}&per_page=${fetchCount}`,
      { headers }
    );

    const users = searchResponse.data.items;
    
    // Check if any users were found
    if (!users || users.length === 0) {
      return NextResponse.json(
        { 
          error: 'No candidates found',
          details: 'Try adjusting your search criteria: use more common programming languages, remove location filter, or lower the minimum repository count.'
        },
        { status: 404 }
      );
    }

    // Fetch detailed user data and repositories for each user
    const candidatesData = await Promise.all(
      users.slice(0, maxResults).map(async (user: any) => {
        try {
          // Get user details
          const userDetailResponse = await axios.get(
            `https://api.github.com/users/${user.login}`,
            { headers }
          );

          // Get user repositories
          const reposResponse = await axios.get(
            `https://api.github.com/users/${user.login}/repos?sort=updated&per_page=30`,
            { headers }
          );

          // Filter repos by skills/languages
          const relevantRepos = reposResponse.data.filter((repo: Repository) => {
            const repoLanguage = repo.language?.toLowerCase();
            const repoTopics = repo.topics || [];
            return skills.some(skill => 
              repoLanguage === skill.toLowerCase() || 
              repoTopics.includes(skill.toLowerCase())
            );
          });
          
          // For multi-skill search, only return users that have repos matching at least one other skill
          if (skills.length > 1 && relevantRepos.length === 0) {
            return null; // Filter out users with no matching repos
          }

          return {
            user: userDetailResponse.data as GitHubUser,
            repositories: relevantRepos as Repository[],
          };
        } catch (error) {
          console.error(`Error fetching data for user ${user.login}:`, error);
          return null;
        }
      })
    );

    // Filter out null results
    const validCandidates = candidatesData.filter(candidate => candidate !== null);
    
    // Check if we have any valid candidates
    if (validCandidates.length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid candidates found',
          details: 'Could not fetch data for any candidates. This might be due to API rate limits. Try adding a GitHub token or wait a few minutes.'
        },
        { status: 404 }
      );
    }
    
    // Limit to requested maxResults
    const finalCandidates = validCandidates.slice(0, maxResults);

    return NextResponse.json({
      success: true,
      candidates: finalCandidates,
      count: finalCandidates.length,
    });

  } catch (error: any) {
    console.error('Search error:', error);
    
    // Handle validation errors
    if (error.response?.status === 422) {
      return NextResponse.json(
        { 
          error: 'Invalid search query',
          details: 'The search parameters are invalid. Try using common programming languages (python, javascript, java) and avoid special characters.'
        },
        { status: 422 }
      );
    }
    
    // Handle rate limit errors
    if (error.response?.status === 403 && error.response?.data?.message?.includes('rate limit')) {
      return NextResponse.json(
        { 
          error: 'GitHub API rate limit exceeded',
          details: 'Please add a GitHub Personal Access Token to increase your rate limit from 60 to 5,000 requests per hour. Or wait an hour for the limit to reset.'
        },
        { status: 429 }
      );
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      return NextResponse.json(
        { 
          error: 'Invalid GitHub token',
          details: 'Your GitHub Personal Access Token appears to be invalid. Please check it and try again, or remove it to use unauthenticated mode.'
        },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to search candidates',
        details: error.response?.data?.message || error.message || 'Unknown error occurred. Please try again.'
      },
      { status: error.response?.status || 500 }
    );
  }
}

