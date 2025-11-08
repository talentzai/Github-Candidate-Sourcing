# API Integration Guide

## Overview

This guide explains how to obtain and configure all API keys needed for the GitHub Talent Sourcer.

## Required APIs

### GitHub API (Required)

**Cost:** Free (with rate limits)

**Rate Limits:**
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour

**Setup Steps:**

1. **Go to GitHub Settings**
   - Navigate to: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens

2. **Generate New Token (Classic)**
   - Click "Generate new token (classic)"
   - Give it a name: "GitHub Talent Sourcer"

3. **Select Scopes**
   - ✅ `public_repo` - Access public repositories
   - ✅ `read:user` - Read user profile data
   - ✅ `user:email` - Read user email (optional but recommended)

4. **Generate and Copy**
   - Click "Generate token"
   - Copy the token immediately (starts with `ghp_`)
   - Store it securely

5. **Token Format**
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Troubleshooting:**
- If you get 401 errors, your token may be expired
- If you get 403 errors, check your rate limit: https://api.github.com/rate_limit
- Tokens expire based on your settings (choose "No expiration" for this tool)

---

## Optional AI APIs (Highly Recommended)

### OpenAI API

**Cost:** Pay-per-use
- GPT-4: ~$0.03 per 1K tokens input, ~$0.06 per 1K tokens output
- Estimated cost: ~$0.01-0.02 per candidate
- For 15 candidates: ~$0.20-0.30

**Rate Limits:**
- Depends on your tier
- Tier 1: 500 requests/day
- Tier 2+: Much higher limits

**Setup Steps:**

1. **Create OpenAI Account**
   - Go to: https://platform.openai.com/signup

2. **Set Up Billing**
   - Navigate to: https://platform.openai.com/account/billing
   - Add a payment method
   - Set usage limits (optional but recommended)

3. **Generate API Key**
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name: "GitHub Talent Sourcer"
   - Copy the key (starts with `sk-`)

4. **Key Format**
   ```
   sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Recommended Settings:**
- Set a monthly usage limit: $5-10 is plenty
- Enable usage notifications
- Monitor usage at: https://platform.openai.com/usage

**Models Used:**
- GPT-4 for repository analysis (best quality)
- GPT-4 for outreach generation (most natural)

**Troubleshooting:**
- 429 errors: Rate limit reached, wait or upgrade tier
- 401 errors: Invalid API key
- 403 errors: Billing issue or no credits

---

### Anthropic API (Alternative to OpenAI)

**Cost:** Pay-per-use
- Claude 3.5 Sonnet: ~$0.003 per 1K tokens input, ~$0.015 per 1K tokens output
- Generally cheaper than GPT-4
- Estimated cost: ~$0.01 per candidate

**Rate Limits:**
- Depends on your tier
- Generally similar to OpenAI

**Setup Steps:**

1. **Create Anthropic Account**
   - Go to: https://console.anthropic.com/

2. **Set Up Billing**
   - Navigate to billing settings
   - Add payment method

3. **Generate API Key**
   - Go to: https://console.anthropic.com/account/keys
   - Click "Create Key"
   - Copy the key (starts with `sk-ant-`)

4. **Key Format**
   ```
   sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Models Used:**
- Claude 3.5 Sonnet for all analysis

**Troubleshooting:**
- Similar to OpenAI
- Check console for detailed error messages

---

## Optional Enrichment APIs

### Clay API

**Cost:** Starts at $149/month
- Includes credits for enrichment
- Pay-per-enrichment after credits

**What It Provides:**
- Email addresses
- Phone numbers
- Social media profiles
- Work history
- Education background

**Setup Steps:**

1. **Sign Up for Clay**
   - Go to: https://clay.com
   - Choose a plan (has free trial)

2. **Get API Key**
   - Navigate to Settings → API
   - Generate new API key
   - Copy the key

3. **Key Format**
   ```
   clay_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Usage in Tool:**
- Automatically attempts to find missing contact info
- Only used if candidate doesn't have email on GitHub
- Fallback: continues without enrichment

**Troubleshooting:**
- Check credit balance
- Verify API permissions
- Some profiles may not be enrichable

---

### Crunchbase API

**Cost:** 
- Basic: Free (limited)
- Pro: $29/month
- Enterprise: Custom pricing

**What It Provides:**
- Company funding information
- Employee count
- Industry classification
- Recent news
- Company growth metrics

**Setup Steps:**

1. **Sign Up for Crunchbase**
   - Go to: https://www.crunchbase.com/
   - Sign up for Pro account (needed for API)

2. **Get API Key**
   - Navigate to: https://data.crunchbase.com/docs
   - Generate API key
   - Copy the key

3. **Key Format**
   ```
   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Usage in Tool:**
- Enriches company information when candidate has company listed
- Provides context for outreach
- Optional: works without it

**Troubleshooting:**
- Check API quota
- Verify company name matches
- Some companies may not be in database

---

## API Key Security Best Practices

### Storage

- ✅ Use environment variables for default keys (optional)
- ✅ Enter keys per-session in the UI
- ❌ Never commit keys to version control
- ❌ Never share keys publicly

### Permissions

- Use minimum required permissions
- GitHub: Only need read access
- AI APIs: Only need text generation
- Regularly rotate keys

### Monitoring

**GitHub:**
- Check usage: https://api.github.com/rate_limit
- Monitor: https://github.com/settings/tokens

**OpenAI:**
- Usage dashboard: https://platform.openai.com/usage
- Set alerts for high usage

**Anthropic:**
- Usage console: https://console.anthropic.com/

### Revocation

If a key is compromised:
1. Immediately revoke it on the respective platform
2. Generate a new key
3. Update your application

---

## Testing Your Setup

### GitHub API Test

```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/user
```

Expected: Your GitHub user info

### OpenAI API Test

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPENAI_KEY" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "test"}],
    "max_tokens": 5
  }'
```

Expected: A short response

### Anthropic API Test

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: YOUR_ANTHROPIC_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 10,
    "messages": [{"role": "user", "content": "test"}]
  }'
```

Expected: A short response

---

## Cost Optimization Tips

### Minimize Costs

1. **Use Algorithmic Rating**
   - No AI key = $0 cost
   - Still provides good results

2. **Use One AI Provider**
   - Don't need both OpenAI and Anthropic
   - Anthropic is generally cheaper

3. **Skip Enrichment**
   - Clay and Crunchbase are expensive
   - Use only when contact info is critical

4. **Set Usage Limits**
   - Configure monthly spending caps
   - Get alerts before limits

5. **Batch Your Searches**
   - Search once for multiple positions
   - Reuse candidate data

### Recommended Setup for Budget

**Minimum (Free):**
- ✅ GitHub token only
- Uses algorithmic rating
- Template-based outreach
- Cost: $0

**Optimal (Low Cost):**
- ✅ GitHub token
- ✅ Anthropic API (cheaper than OpenAI)
- ❌ No enrichment
- Cost: ~$0.15-0.30 per search

**Full Featured:**
- ✅ All APIs
- Best results
- Cost: ~$5-10 per search (with enrichment)

---

## API Alternatives

### Instead of OpenAI:
- Anthropic Claude (recommended)
- Google Gemini (not integrated yet)
- Local LLMs (Ollama, LM Studio) - requires code changes

### Instead of Clay:
- Hunter.io
- Clearbit
- Apollo.io

### Instead of Crunchbase:
- Pitchbook
- LinkedIn Company Pages
- Manual research

---

## Rate Limit Management

### GitHub

**Checking Rate Limit:**
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/rate_limit
```

**Avoiding Limits:**
- Use authenticated requests (always)
- Cache results when possible
- Limit searches to reasonable numbers
- Wait 1 hour for limit reset

### AI APIs

**Best Practices:**
- Start with lower tier to test
- Implement retries with exponential backoff (built-in)
- Monitor usage dashboards
- Set up billing alerts

---

## Support & Resources

### GitHub API
- Docs: https://docs.github.com/en/rest
- Status: https://www.githubstatus.com/
- Support: https://support.github.com/

### OpenAI
- Docs: https://platform.openai.com/docs
- Status: https://status.openai.com/
- Support: https://help.openai.com/

### Anthropic
- Docs: https://docs.anthropic.com/
- Support: https://support.anthropic.com/

### Clay
- Docs: https://docs.clay.com/
- Support: support@clay.com

### Crunchbase
- Docs: https://data.crunchbase.com/docs
- Support: https://support.crunchbase.com/

