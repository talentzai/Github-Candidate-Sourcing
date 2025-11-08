export interface ApiKeys {
  githubToken: string;
  openaiKey?: string;
  anthropicKey?: string;
  clayApiKey?: string;
  crunchbaseKey?: string;
}

export interface SearchParams {
  skills: string[];
  location?: string;
  minRepos?: number;
  maxResults?: number;
  companyName?: string;
  position?: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
}

export interface RepoRating {
  repo: Repository;
  score: number;
  analysis: string;
  skillMatch: string[];
  highlights: string[];
}

export interface Candidate {
  user: GitHubUser;
  repositories: Repository[];
  repoRatings: RepoRating[];
  overallScore: number;
  skillMatch: number;
  personalizedOutreach: string;
  enrichedData?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    companyInfo?: any;
  };
}

export interface EnrichmentRequest {
  username: string;
  profileUrl: string;
  email?: string;
  company?: string;
}

