# Setup Guide - GitHub Talent Sourcer

## Quick Start

### 1. Install Dependencies

If you encounter SSL certificate issues, try one of these solutions:

**Option A: Use npm registry with legacy SSL**
```bash
pnpm install --strict-ssl=false
```

**Option B: Use npm instead**
```bash
npm install
```

**Option C: Configure npm registry**
```bash
npm config set registry http://registry.npmjs.org/
pnpm install
```

### 2. Get Required API Keys

#### GitHub Personal Access Token (Required)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitHub Talent Sourcer")
4. Select scopes:
   - ✅ `read:user`
   - ✅ `public_repo`
5. Click "Generate token"
6. Copy and save the token (it starts with `ghp_`)

#### OpenAI API Key (Optional but Recommended)

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (it starts with `sk-`)
4. Ensure you have credits/billing set up

**OR**

#### Anthropic API Key (Alternative to OpenAI)

1. Go to https://console.anthropic.com/
2. Create a new API key
3. Copy the key (it starts with `sk-ant-`)

#### Clay API Key (Optional)

1. Sign up at https://clay.com
2. Navigate to API settings
3. Generate an API key

#### Crunchbase API Key (Optional)

1. Go to https://data.crunchbase.com/docs/using-the-api
2. Sign up for API access
3. Get your API key from the dashboard

### 3. Run the Application

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Step-by-Step Usage

### Step 1: Configure API Keys

1. Open the application in your browser
2. In the "API Keys Configuration" section:
   - Enter your GitHub Personal Access Token (Required)
   - Optionally add OpenAI or Anthropic key for AI-powered analysis
   - Optionally add Clay/Crunchbase keys for enrichment
3. Keys are hidden as you type and never stored permanently

### Step 2: Set Search Parameters

1. In the "Search Parameters" section:
   - Add required skills (e.g., "python", "react", "kubernetes")
   - Click popular skills or type custom ones
   - Optionally set location filter
   - Adjust minimum repositories (default: 5)
   - Set maximum results (10-15 candidates)
   - Add company name and position for personalized outreach

### Step 3: Search for Candidates

1. Click "Find Candidates"
2. The tool will:
   - Search GitHub for matching developers
   - Analyze their repositories
   - Rate each repository based on quality and relevance
   - Generate an overall score for each candidate
   - Create personalized outreach messages

### Step 4: Review Results

For each candidate, you'll see:
- Overall score (0-100)
- Profile information (name, location, bio, etc.)
- Matched skills
- Top 5 repositories with individual scores
- Repository analysis and highlights
- Personalized outreach message

### Step 5: Take Action

- Click "View GitHub Profile" to see their full GitHub page
- Click "Copy" to copy the personalized outreach message
- Click "Send Email" if email is available
- Use the outreach message to contact candidates

## Understanding the Scores

### Repository Score (0-100)

Repositories are scored based on:
- **Language Match** (30 points): Does it use required skills?
- **Popularity** (25 points): Star count
- **Activity** (20 points): Recent updates
- **Community** (15 points): Fork count
- **Topics** (10 points): Matching topics/tags

With AI enabled, scoring also considers:
- Code quality and complexity
- Project innovation
- Documentation quality
- Real-world applicability

### Overall Candidate Score

Average of their top repository scores, weighted by:
- Repository relevance
- Skill match percentage
- Profile completeness
- Activity level

## Tips for Best Results

### Choosing Skills

- ✅ Use specific languages: `python`, `javascript`, `rust`
- ✅ Include frameworks: `react`, `django`, `tensorflow`
- ✅ Add technologies: `docker`, `kubernetes`, `aws`
- ❌ Avoid generic terms: `coding`, `development`

### Search Parameters

- **Narrow Search**: More skills + location = fewer, more specific results
- **Broad Search**: Fewer skills + no location = more candidates
- **Quality Filter**: Higher minimum repos = more experienced developers
- **Fresh Talent**: Lower minimum repos = emerging developers

### API Keys

- **Without AI keys**: Uses algorithmic scoring (fast, free, good results)
- **With AI keys**: Deep analysis, better insights, personalized outreach (slower, costs API credits)
- **Enrichment keys**: Additional contact info and company data (optional)

## Troubleshooting

### "No candidates found"

- Try reducing the number of skills
- Remove location filter
- Lower minimum repository count
- Use more common skill terms

### API Rate Limit Errors

**GitHub**:
- Authenticated: 5,000 requests/hour
- Wait for rate limit to reset
- Use a fresh token

**OpenAI/Anthropic**:
- Check your API quota
- Verify billing is set up
- Wait a few minutes and retry

### Certificate/Installation Issues

If you get SSL certificate errors:
```bash
# Try disabling strict SSL
pnpm install --strict-ssl=false

# Or use npm
npm install

# Or update certificates
npm config set cafile /path/to/your/ca-bundle.crt
```

### "Searching and analyzing candidates..." Hangs

- This is normal for 10-15 candidates
- Each candidate requires multiple API calls
- With AI enabled, expect 2-5 minutes
- Check browser console for errors
- Verify API keys are correct

## Performance Notes

### Processing Time

- **Without AI**: ~30 seconds for 15 candidates
- **With AI**: 2-5 minutes for 15 candidates
- **With Enrichment**: Additional 1-2 minutes

### API Usage

For 15 candidates:
- **GitHub**: ~100-150 API calls
- **OpenAI/Anthropic**: ~75-100 requests (if enabled)
- **Clay/Crunchbase**: ~15 requests (if enabled)

### Cost Estimation

With OpenAI GPT-4:
- Repository rating: ~$0.01 per candidate
- Outreach generation: ~$0.01 per candidate
- **Total**: ~$0.30 for 15 candidates

With Anthropic Claude:
- Similar costs, sometimes slightly cheaper

## Security & Privacy

### API Key Storage

- Keys are stored **only in browser memory** during the session
- Never sent to any server except the respective APIs
- Cleared when you close the browser tab
- Not logged or persisted anywhere

### Data Handling

- All processing happens in your Next.js API routes
- No data is sent to third-party services (except APIs you configure)
- GitHub data is fetched directly from GitHub API
- Outreach messages are generated and stored in memory only

### Best Practices

- Don't share your API keys
- Regenerate tokens periodically
- Use read-only permissions when possible
- Monitor API usage on respective platforms

## Advanced Configuration

### Custom Scoring Weights

Edit `app/api/rate-repos/route.ts` to adjust:
- `starsScore`: Popularity weight
- `activityScore`: Recent activity weight
- `forksScore`: Community engagement weight

### Outreach Templates

Edit `app/api/generate-outreach/route.ts` to customize:
- Tone and style
- Message length
- Specific highlights to mention

### Search Filters

Edit `app/api/search/route.ts` to add:
- Minimum followers filter
- Account age filter
- Contribution frequency filter

## Next Steps

Once you've found candidates:

1. **Review Thoroughly**: Check their actual GitHub profiles
2. **Personalize Further**: Add specific details to outreach messages
3. **Track Outreach**: Use a spreadsheet or CRM
4. **Follow Up**: Set reminders for non-responders
5. **Iterate**: Refine search parameters based on results

## Support & Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## License & Compliance

- Use this tool responsibly
- Comply with GitHub's Terms of Service
- Respect developers' privacy
- Follow anti-spam regulations for outreach
- Be transparent in your recruiting efforts

