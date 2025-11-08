# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

Choose one of these methods:

```bash
# Method 1: Using pnpm (with SSL workaround if needed)
pnpm install --strict-ssl=false

# Method 2: Using npm
npm install

# Method 3: Using yarn
yarn install
```

### Step 2: Get Your GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select: `read:user` and `public_repo`
4. Copy the token (starts with `ghp_`)

### Step 3: Run the Application

```bash
# With pnpm
pnpm dev

# With npm
npm run dev

# With yarn
yarn dev
```

Open http://localhost:3000 in your browser.

### Step 4: Start Searching

1. Paste your GitHub token in the first field
2. Add skills (e.g., "python", "react", "kubernetes")
3. Click "Find Candidates"
4. Wait 2-5 minutes for results
5. Review candidates and copy outreach messages!

## 🎯 What You Get

- **10-15 qualified candidates** matching your skills
- **Repository ratings** (0-100 score for each repo)
- **Overall candidate scores** ranked automatically
- **Personalized outreach messages** ready to send
- **All in one interface** - no manual work needed

## 💡 Tips

### For Best Results:

✅ **Add an AI API key** (OpenAI or Anthropic) for better analysis
- Without AI: Good algorithmic ratings
- With AI: Exceptional insights and personalization

✅ **Be specific with skills**
- Good: "typescript", "react", "postgresql"  
- Bad: "programming", "web development"

✅ **Use 3-5 skills** for optimal results
- Too few: Too many irrelevant candidates
- Too many: Too few candidates

### Save Money:

💰 **Free Option (No AI):**
- Just use GitHub token
- Still get good candidates
- Template-based outreach

💰 **Budget Option (~$0.30):**
- GitHub token + Anthropic API
- AI-powered analysis
- Personalized outreach

## 📊 Scoring Explained

### Repository Score (0-100)

- **90-100**: 🌟 Outstanding (production-ready, popular)
- **75-89**: ✨ Excellent (high quality, active)
- **60-74**: ✓ Good (solid work)
- **40-59**: ~ Average
- **0-39**: ✗ Below average

### Overall Candidate Score

Average of their top 5 repositories, considering:
- Skill match percentage
- Repository activity
- Community engagement
- Code quality (with AI)

## 🔧 Troubleshooting

### "No candidates found"

→ Try fewer skills or remove location filter

### Installation fails with SSL errors

→ Use: `pnpm install --strict-ssl=false` or switch to `npm install`

### "API rate limit exceeded"

→ Wait 1 hour or verify your GitHub token is valid

### Search takes too long

→ Normal! With AI, expect 2-5 minutes for 15 candidates

## 📖 Need More Help?

- **Full Setup**: See `SETUP_GUIDE.md`
- **All Features**: See `FEATURES.md`
- **API Setup**: See `API_GUIDE.md`
- **Complete Docs**: See `README.md`

## 🎬 Example Search

**Scenario:** Looking for a Senior React Developer

1. **Skills to add:**
   - react
   - typescript
   - node
   - graphql

2. **Optional filters:**
   - Location: "San Francisco" or "Remote"
   - Min Repos: 10
   - Position: "Senior React Developer"
   - Company: "Your Company Name"

3. **Expected results:**
   - 10-15 candidates with strong React experience
   - Scored repos showing React expertise
   - Personalized messages mentioning their best React projects

## ⚡ Pro Tips

### Finding Different Types of Developers

**Junior Developers:**
- Min Repos: 3-5
- Skills: 1-2 core technologies
- Look for recent activity

**Senior Developers:**
- Min Repos: 15+
- Skills: 4-5 including advanced topics
- Check for popular repos (high stars)

**Specialists:**
- Use specific skills (e.g., "tensorflow", "kubernetes")
- Check repos for depth not breadth
- Look for focused expertise

**Full-Stack:**
- Mix frontend & backend skills
- e.g., "react", "python", "postgresql"
- Higher min repos needed

### Outreach Best Practices

✅ **Do:**
- Personalize further based on their profile
- Mention specific projects you reviewed
- Be genuine about why you're reaching out
- Follow up politely if no response

❌ **Don't:**
- Send mass generic messages
- Be overly salesy
- Rush into detailed requirements
- Forget to proofread

## 🔐 Security Reminder

Your API keys are:
- ✅ Only stored in browser memory during session
- ✅ Never sent anywhere except official APIs
- ✅ Cleared when you close the tab
- ✅ Not logged or saved

Still:
- 🔒 Keep your keys private
- 🔒 Don't share screenshots with keys visible
- 🔒 Regenerate keys periodically

## 📞 What's Next?

After finding candidates:

1. **Review thoroughly** - Check their actual GitHub
2. **Customize outreach** - Add specific details
3. **Track responses** - Use a spreadsheet/CRM
4. **Follow up** - Set reminders for 3-7 days
5. **Refine search** - Adjust based on response rates

## 🎉 You're Ready!

Run `pnpm dev` and start finding amazing developers!

---

**Made with ❤️ using Next.js, TypeScript, and AI**

