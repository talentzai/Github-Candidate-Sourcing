# GitHub Talent Sourcer

A powerful Next.js application for finding and evaluating GitHub developers based on their skills, repositories, and contributions. The tool uses AI to rate repositories and generate personalized outreach messages for each candidate.

## Features

- 🔍 **Smart Search**: Find developers by programming languages, skills, location, and more
- 🤖 **AI-Powered Analysis**: Automatically rate repositories using OpenAI GPT-4 or Anthropic Claude
- 📊 **Comprehensive Scoring**: Overall candidate scoring based on repository quality, activity, and skill match
- ✉️ **Personalized Outreach**: AI-generated, personalized recruitment messages for each candidate
- 🔐 **Secure API Management**: Session-based API key management (never stored permanently)
- 🌐 **Optional Enrichment**: Integration with Clay and Crunchbase for additional candidate data

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- GitHub Personal Access Token ([Create one here](https://github.com/settings/tokens))
- (Optional) OpenAI API Key or Anthropic API Key for enhanced analysis
- (Optional) Clay API Key and/or Crunchbase API Key for data enrichment

## Installation

1. Clone or navigate to this directory:

```bash
cd "/Users/nhadiq/Desktop/workbase/Tech Vibes with Shaphy/EP 3"
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### 1. Configure API Keys

Enter your API keys in the configuration section:
- **GitHub Token** (Required): Personal access token with `read:user` and `repo` scopes
- **OpenAI or Anthropic Key** (Optional): For AI-powered repository analysis and outreach generation
- **Clay API Key** (Optional): For candidate enrichment
- **Crunchbase Key** (Optional): For company information enrichment

All keys are session-based and never stored permanently.

### 2. Set Search Parameters

- **Skills**: Add one or more programming languages or technologies (e.g., JavaScript, Python, React)
- **Location**: Optional geographic filter
- **Minimum Repositories**: Filter candidates by repository count
- **Maximum Results**: Limit results (10-15 candidates)
- **Company Name**: Optional, for outreach personalization
- **Position Title**: Optional, for outreach personalization

### 3. Review Results

The tool will:
1. Search GitHub for matching developers
2. Analyze their repositories and rate them based on quality and relevance
3. Generate an overall candidate score
4. Create personalized outreach messages
5. (Optional) Enrich candidate data with additional information

### 4. Take Action

For each candidate, you can:
- View their GitHub profile
- Copy the personalized outreach message
- Send an email (if available)
- Review repository ratings and analysis

## How It Works

### Search Algorithm

1. Uses GitHub's Search API with language and user filters
2. Fetches detailed user profiles and repositories
3. Filters repositories by relevance to specified skills

### Repository Rating

The tool uses multiple factors to rate repositories:
- **Language Match**: How well the repository matches required skills
- **Popularity**: Star count and fork count
- **Activity**: Recent commits and updates
- **Topics**: Matching repository topics with required skills

With AI enabled (OpenAI or Anthropic):
- Deep analysis of repository content and quality
- Contextual understanding of project complexity
- Identification of specific skills demonstrated

### Outreach Generation

AI-powered outreach messages are:
- Personalized with candidate's name and specific repositories
- Focused on their most impressive work
- Professional yet friendly in tone
- Include clear call-to-action
- Mention relevant skills and projects

## API Rate Limits

- **GitHub**: 5,000 requests/hour (authenticated)
- **OpenAI**: Depends on your plan
- **Anthropic**: Depends on your plan
- **Clay/Crunchbase**: Varies by subscription

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── search/route.ts          # GitHub user search
│   │   ├── rate-repos/route.ts      # Repository rating
│   │   ├── generate-outreach/route.ts # Outreach generation
│   │   └── enrich/route.ts          # Data enrichment
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Main page
├── components/
│   ├── ApiKeyInput.tsx              # API key configuration
│   ├── SearchForm.tsx               # Search parameters form
│   └── CandidateCard.tsx            # Candidate display
├── types/
│   └── index.ts                     # TypeScript types
├── lib/
│   └── utils.ts                     # Utility functions
└── README.md
```

## Security Notes

- All API keys are stored only in memory during the session
- Keys are never sent to any third-party services except their respective APIs
- The application runs locally on your machine
- No data is persisted to disk or sent to external servers

## Fallback Mechanisms

The application includes intelligent fallback mechanisms:
- If no AI API key is provided, uses algorithmic repository rating
- If enrichment APIs are unavailable, continues with GitHub data only
- Handles API errors gracefully without breaking the workflow

## Troubleshooting

### "No candidates found"
- Try broader search criteria
- Reduce minimum repository count
- Check that your GitHub token is valid

### "API rate limit exceeded"
- Wait for the rate limit to reset
- Use authenticated requests (GitHub token)

### AI analysis not working
- Verify your OpenAI or Anthropic API key
- Check API quota and usage limits
- The tool will fall back to algorithmic rating if AI fails

## Future Enhancements

- Export results to CSV
- Save searches and candidates
- Advanced filtering options
- Batch email sending
- LinkedIn integration
- Custom scoring criteria

## License

This project is for educational and professional use. Ensure you comply with GitHub's Terms of Service and API usage guidelines when using this tool.

## Support

For issues or questions, please refer to the respective API documentation:
- [GitHub API](https://docs.github.com/en/rest)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)

