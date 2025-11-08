import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Candidate } from '@/types';

interface OutreachRequest {
  candidate: Candidate;
  skills: string[];
  apiKeys: {
    openaiKey?: string;
    anthropicKey?: string;
  };
  companyName?: string;
  position?: string;
}

// Fallback outreach generator (template-based)
function fallbackOutreach(candidate: Candidate, skills: string[], companyName?: string, position?: string): string {
  const topRepos = candidate.repoRatings.slice(0, 3);
  const topSkills = candidate.repoRatings
    .flatMap(r => r.skillMatch)
    .filter((skill, index, self) => self.indexOf(skill) === index)
    .slice(0, 3);

  return `Hi ${candidate.user.name || candidate.user.login},

I came across your GitHub profile and was impressed by your work, particularly your ${topRepos[0]?.repo.name} repository${topRepos[0] ? ` (${topRepos[0].repo.stargazers_count} stars)` : ''}.

Your expertise in ${topSkills.join(', ')} aligns perfectly with what we're looking for${position ? ` for a ${position} role` : ''}${companyName ? ` at ${companyName}` : ''}.

${topRepos.length > 1 ? `I also noticed your contributions to ${topRepos.slice(1).map(r => r.repo.name).join(' and ')}, which demonstrate your versatility and commitment to quality code.` : ''}

Would you be open to a brief conversation about potential opportunities? I'd love to learn more about your work and discuss how your skills could contribute to exciting projects.

Looking forward to hearing from you!

Best regards`;
}

// AI-powered outreach using OpenAI
async function generateWithOpenAI(
  candidate: Candidate,
  skills: string[],
  apiKey: string,
  companyName?: string,
  position?: string
): Promise<string> {
  try {
    const topRepos = candidate.repoRatings.slice(0, 5);
    const repoInfo = topRepos.map(r => 
      `- ${r.repo.name}: ${r.repo.description || 'No description'} (${r.repo.stargazers_count} stars, Language: ${r.repo.language})`
    ).join('\n');

    const prompt = `Write a personalized, professional outreach message to recruit this GitHub developer:

Developer: ${candidate.user.name || candidate.user.login}
Bio: ${candidate.user.bio || 'Not provided'}
Location: ${candidate.user.location || 'Not provided'}
Public Repos: ${candidate.user.public_repos}
Followers: ${candidate.user.followers}

Top Repositories:
${repoInfo}

Required Skills: ${skills.join(', ')}
Matched Skills: ${candidate.repoRatings.flatMap(r => r.skillMatch).filter((s, i, arr) => arr.indexOf(s) === i).join(', ')}
${companyName ? `Company: ${companyName}` : ''}
${position ? `Position: ${position}` : ''}

Requirements:
- Be genuine and specific about their work
- Mention 1-2 specific repositories and why they're impressive
- Keep it concise (150-200 words)
- Professional but friendly tone
- Include a clear call-to-action
- Don't be overly salesy

Write the outreach message:`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical recruiter writing personalized outreach messages.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 400,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI outreach generation error:', error);
    return fallbackOutreach(candidate, skills, companyName, position);
  }
}

// AI-powered outreach using Anthropic Claude
async function generateWithAnthropic(
  candidate: Candidate,
  skills: string[],
  apiKey: string,
  companyName?: string,
  position?: string
): Promise<string> {
  try {
    const topRepos = candidate.repoRatings.slice(0, 5);
    const repoInfo = topRepos.map(r => 
      `- ${r.repo.name}: ${r.repo.description || 'No description'} (${r.repo.stargazers_count} stars, Language: ${r.repo.language})`
    ).join('\n');

    const prompt = `Write a personalized, professional outreach message to recruit this GitHub developer:

Developer: ${candidate.user.name || candidate.user.login}
Bio: ${candidate.user.bio || 'Not provided'}
Location: ${candidate.user.location || 'Not provided'}
Public Repos: ${candidate.user.public_repos}
Followers: ${candidate.user.followers}

Top Repositories:
${repoInfo}

Required Skills: ${skills.join(', ')}
Matched Skills: ${candidate.repoRatings.flatMap(r => r.skillMatch).filter((s, i, arr) => arr.indexOf(s) === i).join(', ')}
${companyName ? `Company: ${companyName}` : ''}
${position ? `Position: ${position}` : ''}

Requirements:
- Be genuine and specific about their work
- Mention 1-2 specific repositories and why they're impressive
- Keep it concise (150-200 words)
- Professional but friendly tone
- Include a clear call-to-action
- Don't be overly salesy

Write the outreach message:`;

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

    return response.data.content[0].text.trim();
  } catch (error) {
    console.error('Anthropic outreach generation error:', error);
    return fallbackOutreach(candidate, skills, companyName, position);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: OutreachRequest = await request.json();
    const { candidate, skills, apiKeys, companyName, position } = body;

    if (!candidate) {
      return NextResponse.json(
        { error: 'No candidate provided' },
        { status: 400 }
      );
    }

    let outreach: string;

    if (apiKeys.anthropicKey) {
      outreach = await generateWithAnthropic(candidate, skills, apiKeys.anthropicKey, companyName, position);
    } else if (apiKeys.openaiKey) {
      outreach = await generateWithOpenAI(candidate, skills, apiKeys.openaiKey, companyName, position);
    } else {
      outreach = fallbackOutreach(candidate, skills, companyName, position);
    }

    return NextResponse.json({
      success: true,
      outreach,
    });

  } catch (error: any) {
    console.error('Outreach generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate outreach message',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

