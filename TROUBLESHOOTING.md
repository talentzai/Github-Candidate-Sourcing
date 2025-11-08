# Troubleshooting Guide

## Common Issues and Solutions

### "Failed to search candidates"

This generic error can have several causes. Here's how to diagnose and fix:

#### 1. GitHub API Rate Limit

**Error Message:** 
> "GitHub API rate limit exceeded"

**Cause:** 
- Without a GitHub token: 60 requests/hour limit
- Each search uses ~10-15 API calls
- You can do about 4-5 searches per hour without a token

**Solutions:**
```
✅ Solution 1: Add a GitHub Personal Access Token (Recommended)
   - Go to https://github.com/settings/tokens
   - Generate a new token (read:user, public_repo)
   - Paste it in the GitHub Token field
   - Rate limit increases to 5,000/hour (free!)

✅ Solution 2: Wait for Rate Limit Reset
   - Rate limits reset every hour
   - Check your current limit: https://api.github.com/rate_limit
   - Wait and try again

✅ Solution 3: Reduce Search Frequency
   - Space out your searches
   - Use more specific criteria to reduce API calls
```

#### 2. No Candidates Found

**Error Message:** 
> "No candidates found" or "No valid candidates found"

**Cause:** 
- Search criteria too specific
- Uncommon skill combinations
- Location filter too narrow
- Minimum repos too high

**Solutions:**
```
✅ Use more common programming languages
   - Instead of: "elixir", "clojure", "haskell"
   - Try: "python", "javascript", "java"

✅ Remove or broaden location filter
   - Remove location entirely for global search
   - Use major cities: "San Francisco", "New York", "London"
   - Try "Remote" for remote-friendly developers

✅ Lower minimum repository count
   - Change from 10-15 to 3-5
   - Many great developers have fewer public repos

✅ Use 2-3 skills instead of 5+
   - More skills = fewer matching candidates
   - Start broad, refine later
```

#### 3. Invalid GitHub Token

**Error Message:** 
> "Invalid GitHub token"

**Cause:** 
- Token is expired
- Token was revoked
- Token has wrong permissions
- Token is malformed

**Solutions:**
```
✅ Check token validity
   - Test it: curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
   - Should return your GitHub user info

✅ Regenerate the token
   - Go to https://github.com/settings/tokens
   - Delete the old token
   - Create a new one with: read:user, public_repo

✅ Or just remove it
   - Clear the GitHub Token field
   - Use keyless mode (60 requests/hour)
```

#### 4. Network/CORS Issues

**Error Message:** 
> "Network error" or "CORS policy"

**Cause:** 
- Development server not running
- Port conflicts
- Firewall blocking requests

**Solutions:**
```
✅ Restart development server
   pnpm dev

✅ Check if port 3000 is available
   lsof -i :3000
   # If something is using it, kill it or use different port
   PORT=3001 pnpm dev

✅ Check firewall settings
   - Allow connections to localhost:3000
   - Allow outbound connections to api.github.com
```

### White Text / Invisible Input

**Issue:** 
Can't see what you're typing in input fields

**Cause:** 
CSS color issue with dark/light mode

**Solution:**
✅ Already fixed! Update to latest code:
- All inputs now have `text-gray-900` class
- Visible on all backgrounds
- If still having issues, hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Installation Errors

#### SSL Certificate Issues

**Error:** 
> "unable to get local issuer certificate"

**Solutions:**
```
✅ Solution 1: Disable SSL checking (quick fix)
   pnpm install --strict-ssl=false

✅ Solution 2: Use npm instead
   npm install

✅ Solution 3: Fix SSL certificates
   npm config set cafile /path/to/certificate.pem
```

#### Module Not Found

**Error:** 
> "Cannot find module 'xyz'"

**Solutions:**
```
✅ Clean install
   rm -rf node_modules pnpm-lock.yaml
   pnpm install

✅ Check package.json
   - Verify all dependencies are listed
   - Run: pnpm install --force
```

### AI API Errors

#### OpenAI Errors

**Error:** 
> "401 Unauthorized" or "429 Too Many Requests"

**Solutions:**
```
✅ Check API key
   - Verify it starts with "sk-"
   - Test at: https://platform.openai.com/playground

✅ Check billing
   - Ensure payment method is added
   - Check usage: https://platform.openai.com/usage
   - Add credits if needed

✅ Rate limit
   - Wait a few minutes
   - Upgrade tier at: https://platform.openai.com/account/billing
```

#### Anthropic Errors

**Error:** 
> "401 Unauthorized" or "429 Too Many Requests"

**Solutions:**
```
✅ Check API key
   - Verify it starts with "sk-ant-"
   - Check console: https://console.anthropic.com/

✅ Check credits
   - Ensure you have credits
   - Add payment method

✅ Or use keyless mode
   - Remove all AI keys
   - Uses algorithmic rating (works great!)
```

### Slow Performance

**Issue:** 
Search taking 5+ minutes or hanging

**Causes & Solutions:**
```
✅ With AI keys (normal: 2-5 minutes)
   - Processing 15 candidates with AI takes time
   - Each candidate = 5+ AI API calls
   - This is expected behavior
   - Reduce maxResults to 10 for faster searches

✅ Without AI keys (should be ~30 seconds)
   - If taking longer, check network connection
   - GitHub API might be slow
   - Try again in a few minutes

✅ Hanging/frozen
   - Check browser console for errors (F12)
   - Check terminal for API errors
   - Restart dev server: pnpm dev
```

### Enrichment Errors

#### Clay API Issues

**Error:** 
> "Clay enrichment failed"

**Non-critical:** 
The app continues without enrichment data

**Solutions:**
```
✅ Check API key
   - Verify at: https://clay.com/settings/api

✅ Check credits
   - Enrichment uses credits
   - Ensure you have credits available

✅ Or skip it
   - Enrichment is optional
   - App works great without it
   - Only needed for missing contact info
```

#### Crunchbase API Issues

Similar to Clay - it's optional and non-critical.

### Browser-Specific Issues

#### Safari

**Issue:** 
Some features not working

**Solution:**
```
✅ Enable Developer features
   Safari > Preferences > Advanced > Show Develop menu

✅ Or use Chrome/Firefox
   - Better development experience
   - More consistent behavior
```

#### Firefox

**Issue:** 
CORS errors

**Solution:**
```
✅ Ensure you're accessing via localhost:3000
   - Not 127.0.0.1:3000
   - Not your IP address

✅ Check Firefox privacy settings
   - Don't block API requests
```

## Debugging Tips

### Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for errors in red
4. Copy error message for troubleshooting

### Check Terminal Output

1. Look at the terminal where `pnpm dev` is running
2. Check for API errors
3. Note any 401, 403, 429 status codes

### Test GitHub API Directly

```bash
# Without token (should work, 60/hour limit)
curl https://api.github.com/search/users?q=language:python

# With token (should show higher rate limit)
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
```

### Test Individual Components

1. **Test just search** - Add skills and search
2. **Test without AI** - Remove all AI keys
3. **Test with minimal params** - Just 1 skill, no location
4. **Check rate limit** - Visit https://api.github.com/rate_limit

## Getting Help

### Before Asking for Help

Gather this information:
- Error message (exact text)
- Browser console errors
- Terminal output
- What you were trying to do
- What API keys you're using (don't share the actual keys!)

### Quick Diagnostic

Run this checklist:
```
□ Dev server is running (pnpm dev)
□ Can access http://localhost:3000
□ Browser console shows no errors
□ If using GitHub token, it's valid
□ If using AI keys, they're valid
□ Not hitting rate limits
□ Search parameters are reasonable
```

### Still Having Issues?

1. **Try keyless mode first**
   - Remove all API keys
   - Try with just skills: "python", "javascript"
   - No location filter
   - See if basic search works

2. **Check GitHub Status**
   - Visit: https://www.githubstatus.com/
   - API might be down

3. **Restart everything**
   ```bash
   # Stop dev server (Ctrl+C)
   # Clear cache
   rm -rf .next
   # Reinstall
   rm -rf node_modules
   pnpm install
   # Restart
   pnpm dev
   ```

## Error Code Reference

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check search parameters |
| 401 | Unauthorized | Check API key validity |
| 403 | Forbidden | Likely rate limit, add token |
| 404 | Not Found | No candidates match criteria |
| 429 | Too Many Requests | Rate limit exceeded, wait or add token |
| 500 | Server Error | Check terminal logs, might be temporary |

## Prevention Tips

### Avoid Rate Limits
- ✅ Always use a GitHub token (free!)
- ✅ Space out searches
- ✅ Use specific search criteria

### Optimize Performance
- ✅ Start with 10 candidates, not 15
- ✅ Use algorithmic rating first (no AI)
- ✅ Add AI keys only when needed

### Best Practices
- ✅ Test with simple searches first
- ✅ Keep browser console open
- ✅ Monitor rate limits
- ✅ Save good search parameters

## Success Checklist

If everything is working, you should be able to:
- ✅ Access the app at http://localhost:3000
- ✅ See all text clearly (no white-on-white)
- ✅ Enter skills and search
- ✅ Get 10-15 candidates in 30 seconds (no AI) or 2-5 minutes (with AI)
- ✅ See repository scores
- ✅ Copy outreach messages
- ✅ Click through to GitHub profiles

If you can do all of the above, everything is working perfectly! 🎉

