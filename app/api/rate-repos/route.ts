import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Repository, RepoRating } from '@/types';

interface RateReposRequest {
  repositories: Repository[];
  skills: string[];
  apiKeys: {
    openaiKey?: string;
    anthropicKey?: string;
  };
}

// Fallback rating algorithm (if no AI API key provided)
function fallbackRating(repo: Repository, skills: string[]): RepoRating {
  let score = 0;
  const highlights: string[] = [];
  const skillMatch: string[] = [];

  // Language match
  if (repo.language && skills.some(s => s.toLowerCase() === repo.language!.toLowerCase())) {
    score += 30;
    skillMatch.push(repo.language);
  }

  // Stars rating (0-25 points)
  const starsScore = Math.min(25, (repo.stargazers_count / 100) * 25);
  score += starsScore;
  if (repo.stargazers_count > 50) {
    highlights.push(`${repo.stargazers_count} stars`);
  }

  // Activity rating (0-20 points)
  const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
  const activityScore = Math.max(0, 20 - (daysSinceUpdate / 30) * 5);
  score += activityScore;
  if (daysSinceUpdate < 30) {
    highlights.push('Recently active');
  }

  // Forks rating (0-15 points)
  const forksScore = Math.min(15, (repo.forks_count / 50) * 15);
  score += forksScore;
  if (repo.forks_count > 20) {
    highlights.push(`${repo.forks_count} forks`);
  }

  // Topics match (0-10 points)
  const topicsMatch = repo.topics?.filter(t => 
    skills.some(s => s.toLowerCase() === t.toLowerCase())
  ) || [];
  score += topicsMatch.length * 2;
  skillMatch.push(...topicsMatch);

  const analysis = `Repository scores ${score.toFixed(1)}/100. ${
    highlights.length > 0 ? 'Notable: ' + highlights.join(', ') + '.' : ''
  } ${
    repo.description || 'No description available.'
  }`;

  return {
    repo,
    score: Math.min(100, score),
    analysis,
    skillMatch: [...new Set(skillMatch)],
    highlights,
  };
}

// AI-powered rating using OpenAI
async function rateWithOpenAI(repo: Repository, skills: string[], apiKey: string): Promise<RepoRating> {
  try {
    const prompt = `Analyze this GitHub repository for a talent sourcing perspective:

Repository: ${repo.name}
Description: ${repo.description || 'No description'}
Language: ${repo.language || 'Not specified'}
Stars: ${repo.stargazers_count}
Forks: ${repo.forks_count}
Topics: ${repo.topics?.join(', ') || 'None'}
Last Updated: ${repo.updated_at}

Required Skills: ${skills.join(', ')}

Provide a JSON response with:
1. score (0-100): Overall quality and relevance score
2. analysis (string): 2-3 sentence analysis of the repository quality and relevance
3. skillMatch (array): Which of the required skills are demonstrated
4. highlights (array): 2-3 key impressive aspects

JSON format only:`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a technical recruiter analyzing GitHub repositories. Respond only with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return {
      repo,
      score: parsed.score,
      analysis: parsed.analysis,
      skillMatch: parsed.skillMatch,
      highlights: parsed.highlights,
    };
  } catch (error) {
    console.error('OpenAI rating error:', error);
    return fallbackRating(repo, skills);
  }
}

// AI-powered rating using Anthropic Claude
async function rateWithAnthropic(repo: Repository, skills: string[], apiKey: string): Promise<RepoRating> {
  try {
    const prompt = `Analyze this GitHub repository for a talent sourcing perspective:

Repository: ${repo.name}
Description: ${repo.description || 'No description'}
Language: ${repo.language || 'Not specified'}
Stars: ${repo.stargazers_count}
Forks: ${repo.forks_count}
Topics: ${repo.topics?.join(', ') || 'None'}
Last Updated: ${repo.updated_at}

Required Skills: ${skills.join(', ')}

Provide a JSON response with:
1. score (0-100): Overall quality and relevance score
2. analysis (string): 2-3 sentence analysis of the repository quality and relevance
3. skillMatch (array): Which of the required skills are demonstrated
4. highlights (array): 2-3 key impressive aspects`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
      }
    );

    const content = response.data.content[0].text;
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
    const parsed = JSON.parse(jsonStr);

    return {
      repo,
      score: parsed.score,
      analysis: parsed.analysis,
      skillMatch: parsed.skillMatch,
      highlights: parsed.highlights,
    };
  } catch (error) {
    console.error('Anthropic rating error:', error);
    return fallbackRating(repo, skills);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RateReposRequest = await request.json();
    const { repositories, skills, apiKeys } = body;

    if (!repositories || repositories.length === 0) {
      return NextResponse.json(
        { error: 'No repositories provided' },
        { status: 400 }
      );
    }

    // Choose rating method based on available API keys
    const ratings: RepoRating[] = [];

    for (const repo of repositories) {
      let rating: RepoRating;

      if (apiKeys.anthropicKey) {
        rating = await rateWithAnthropic(repo, skills, apiKeys.anthropicKey);
      } else if (apiKeys.openaiKey) {
        rating = await rateWithOpenAI(repo, skills, apiKeys.openaiKey);
      } else {
        rating = fallbackRating(repo, skills);
      }

      ratings.push(rating);
    }

    // Sort by score
    ratings.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      ratings,
    });

  } catch (error: any) {
    console.error('Rating error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to rate repositories',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

