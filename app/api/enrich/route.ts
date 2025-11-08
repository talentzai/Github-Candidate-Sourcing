import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { EnrichmentRequest } from '@/types';

interface EnrichRequest {
  candidate: EnrichmentRequest;
  apiKeys: {
    clayApiKey?: string;
    crunchbaseKey?: string;
  };
}

// Clay API enrichment
async function enrichWithClay(candidate: EnrichmentRequest, apiKey: string) {
  try {
    // Clay API endpoint for enrichment
    // Note: This is a placeholder - actual Clay API implementation may vary
    const response = await axios.post(
      'https://api.clay.com/v1/enrich',
      {
        profile_url: candidate.profileUrl,
        username: candidate.username,
        email: candidate.email,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Clay enrichment error:', error.response?.data || error.message);
    return null;
  }
}

// Crunchbase API enrichment
async function enrichWithCrunchbase(company: string, apiKey: string) {
  try {
    if (!company) return null;

    const response = await axios.get(
      `https://api.crunchbase.com/api/v4/entities/organizations/${encodeURIComponent(company)}`,
      {
        headers: {
          'X-cb-user-key': apiKey,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Crunchbase enrichment error:', error.response?.data || error.message);
    return null;
  }
}

// Fallback enrichment using public APIs
async function fallbackEnrichment(candidate: EnrichmentRequest) {
  const enrichedData: any = {
    source: 'github',
    username: candidate.username,
    profileUrl: candidate.profileUrl,
  };

  // Try to extract social links from GitHub profile
  // This would require additional GitHub API calls or scraping
  // For now, return basic data

  return enrichedData;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnrichRequest = await request.json();
    const { candidate, apiKeys } = body;

    if (!candidate) {
      return NextResponse.json(
        { error: 'No candidate provided' },
        { status: 400 }
      );
    }

    let enrichedData: any = {};

    // Try Clay enrichment
    if (apiKeys.clayApiKey) {
      const clayData = await enrichWithClay(candidate, apiKeys.clayApiKey);
      if (clayData) {
        enrichedData = { ...enrichedData, ...clayData, clayEnriched: true };
      }
    }

    // Try Crunchbase enrichment for company info
    if (apiKeys.crunchbaseKey && candidate.company) {
      const crunchbaseData = await enrichWithCrunchbase(candidate.company, apiKeys.crunchbaseKey);
      if (crunchbaseData) {
        enrichedData.companyInfo = crunchbaseData;
        enrichedData.crunchbaseEnriched = true;
      }
    }

    // If no enrichment services available, use fallback
    if (!apiKeys.clayApiKey && !apiKeys.crunchbaseKey) {
      enrichedData = await fallbackEnrichment(candidate);
    }

    return NextResponse.json({
      success: true,
      enrichedData,
    });

  } catch (error: any) {
    console.error('Enrichment error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to enrich candidate data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

