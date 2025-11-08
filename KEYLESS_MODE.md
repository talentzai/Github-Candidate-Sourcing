# Keyless Mode - Using the Tool Without API Keys

## 🎉 Good News!

**You can now use the GitHub Talent Sourcer without ANY API keys!**

The tool has been designed with intelligent fallback mechanisms that allow full functionality even without providing any API keys. This makes it accessible to everyone, regardless of whether they have access to paid AI services.

## 🚀 How It Works

### Without Any Keys

When you use the tool without API keys:

1. **GitHub Search** - Uses unauthenticated GitHub API
   - Rate limit: 60 requests/hour
   - Sufficient for 10-15 candidates
   - Public data only (works great!)

2. **Repository Rating** - Algorithmic scoring
   - Multi-factor analysis
   - Language matching
   - Star/fork analysis
   - Activity tracking
   - Topic matching
   - **Accurate and reliable**

3. **Outreach Generation** - Template-based
   - Professional structure
   - Personalized with candidate name
   - References top repositories
   - Mentions key metrics
   - **Ready to use**

### With GitHub Token (Recommended)

Adding just a GitHub token (free!):
- ✅ Rate limit: 5,000 requests/hour
- ✅ Can search many times
- ✅ No costs involved
- ✅ Still uses algorithmic rating and template outreach

### With AI Keys (Optional Enhancement)

Adding OpenAI or Anthropic:
- ✅ Deep repository analysis
- ✅ AI-powered insights
- ✅ Highly personalized outreach
- ❌ Costs ~$0.20-0.30 per search

## 📊 Comparison Table

| Feature | No Keys | GitHub Token | + AI Keys |
|---------|---------|--------------|-----------|
| **Cost** | $0 | $0 | ~$0.30/search |
| **GitHub Rate Limit** | 60/hour | 5,000/hour | 5,000/hour |
| **Candidates Found** | 10-15 | 10-15 | 10-15 |
| **Repo Rating** | Algorithmic | Algorithmic | AI-powered |
| **Rating Quality** | Good | Good | Excellent |
| **Outreach** | Template | Template | AI-generated |
| **Personalization** | Basic | Basic | High |
| **Speed** | Fast (~30s) | Fast (~30s) | Slower (2-5min) |

## 🎯 Best Use Cases

### Keyless Mode (No API Keys)
Perfect for:
- Testing the tool
- Budget-conscious recruiting
- Small volume hiring
- Quick candidate checks
- Learning and exploration

**Limitations:**
- 60 API calls per hour (enough for 4-5 searches)
- Template-based outreach
- Algorithmic scoring only

### GitHub Token Only
Perfect for:
- Regular recruiting use
- Multiple searches per day
- Building candidate pipelines
- Cost-free operation

**Benefits:**
- 5,000 API calls per hour
- Can search all day
- Still $0 cost
- Good quality results

### Full Configuration (All Keys)
Perfect for:
- High-volume recruiting
- Enterprise hiring
- When quality is critical
- Executive search
- Specialized roles

**Benefits:**
- Best possible analysis
- Highest quality outreach
- Deep insights
- Professional results

## 🔧 How to Use Keyless Mode

### Step 1: Start the Application

```bash
pnpm dev
```

Open http://localhost:3000

### Step 2: Skip API Keys

Simply leave all API key fields empty! You'll see a blue information box that says:

> 💡 **No API keys?** No problem! The tool works without any keys using algorithmic analysis.

### Step 3: Enter Search Parameters

1. Add skills (e.g., "python", "react")
2. Optionally add location, company name, position
3. Click "Find Candidates"

### Step 4: Get Results!

You'll receive:
- 10-15 candidates matching your criteria
- Repository scores for each candidate
- Overall candidate rankings
- Personalized outreach messages
- All data ready to use

## 📝 Example: Keyless Search Results

### Repository Rating (Algorithmic)

For a repository, you'll see:

```
Repository: awesome-project
Score: 78/100

Analysis:
Repository scores 78.0/100. Notable: 150 stars, Recently active, 30 forks.
A React-based project management tool with real-time collaboration features.

Skill Match: javascript, react
Highlights:
✓ 150 stars
✓ Recently active
✓ 30 forks
```

### Outreach Message (Template-Based)

```
Hi John Doe,

I came across your GitHub profile and was impressed by your work, 
particularly your awesome-project repository (150 stars).

Your expertise in javascript, react, typescript aligns perfectly with 
what we're looking for for a Senior React Developer role at TechCorp.

I also noticed your contributions to other-project and third-project, 
which demonstrate your versatility and commitment to quality code.

Would you be open to a brief conversation about potential opportunities? 
I'd love to learn more about your work and discuss how your skills could 
contribute to exciting projects.

Looking forward to hearing from you!

Best regards
```

## 🆚 Keyless vs AI-Powered Comparison

### Repository Analysis

**Keyless (Algorithmic):**
- Analyzes stars, forks, activity
- Checks language and topic matching
- Calculates score based on metrics
- Fast and consistent
- Good for most cases

**With AI:**
- Reads actual code quality
- Understands project complexity
- Evaluates documentation
- Assesses innovation
- More nuanced insights

### Outreach Messages

**Keyless (Template):**
- Professional structure
- Names specific repos
- Mentions achievements
- Clear call-to-action
- Customizable by you

**With AI:**
- Deeply personalized
- References specific contributions
- Natural, engaging tone
- Adapts to candidate's style
- Higher response rates

## 💡 Pro Tips for Keyless Mode

### Maximize Results Without Keys

1. **Be Specific with Skills**
   - Use exact technology names
   - Include version if relevant
   - Mix languages and frameworks

2. **Use Location Wisely**
   - Omit for global search
   - Use for local candidates
   - Try "Remote" for remote-friendly devs

3. **Adjust Min Repos**
   - Lower (3-5) for junior devs
   - Higher (15+) for senior devs
   - Default (5-10) for general search

4. **Customize the Outreach**
   - Template is a starting point
   - Add personal touches
   - Reference specific projects you reviewed
   - Mention why they caught your eye

5. **Search Strategically**
   - With 60 API calls/hour limit
   - Each search uses ~10-15 calls
   - Space out searches if needed
   - Or get a free GitHub token!

## 🔑 When to Add a GitHub Token

You should add a GitHub token when:
- ❌ You hit the rate limit (60/hour)
- ❌ You need multiple searches per hour
- ❌ You're building large candidate pipelines
- ✅ It's free and takes 2 minutes!

## 🤖 When to Add AI Keys

Consider AI keys when:
- You need deeper insights into code quality
- Response rates on outreach are critical
- You're recruiting for specialized/senior roles
- Budget allows for ~$0.30 per search
- You want the absolute best results

## 🎓 Educational Value

Keyless mode is perfect for:
- **Learning** - Understand recruiting workflows
- **Prototyping** - Test your recruiting strategy
- **Validation** - Prove concept before investing
- **Training** - Teach others about GitHub sourcing

## 📈 Upgrade Path

Start Simple → Add as Needed:

1. **Start**: No keys (try it out)
2. **Upgrade**: Add GitHub token (still free, better limits)
3. **Enhance**: Add Anthropic (cheap AI, ~$0.15/search)
4. **Optimize**: Add OpenAI (alternative AI)
5. **Complete**: Add enrichment (Clay/Crunchbase) if needed

## ✅ Bottom Line

**The GitHub Talent Sourcer works great without any API keys!**

- No barrier to entry
- No costs
- Good quality results
- Professional outreach templates
- Perfect for testing and light use

Add keys only when you need:
- Higher rate limits (free GitHub token)
- AI-powered insights (paid AI keys)
- Contact enrichment (paid enrichment services)

## 🚀 Ready to Start?

Just run:
```bash
pnpm dev
```

And start searching - no keys required!

---

**Remember:** The best tool is the one you actually use. Start with keyless mode, see the results, and upgrade only if and when you need to!

