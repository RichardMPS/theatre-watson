# Airtable Integration Setup Guide

Theatre Watson now supports dynamic show management through Airtable! This means you can add, edit, and remove shows without touching code.

## Benefits

✅ **Easy Updates** - Add/edit shows through a spreadsheet interface
✅ **No Code Changes** - Update show data without committing code
✅ **Automatic Sync** - Website fetches latest data on every page load
✅ **Fallback Support** - Falls back to hardcoded shows if Airtable is unavailable

## Setup Steps

### 1. Create an Airtable Account

1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account (no credit card required)
3. Free tier includes 1,200 records (more than enough!)

### 2. Create Your Base

1. Click "Create a base" from your workspace
2. Choose "Start from scratch"
3. Name it **"Theatre Watson Shows"**

### 3. Set Up the Table

Rename the default table to **"Shows"** and create these fields:

| Field Name | Field Type | Options | Required |
|------------|-----------|---------|----------|
| `title` | Single line text | - | ✅ |
| `venue` | Single line text | - | ✅ |
| `locationType` | Single select | "west-end", "off-west-end", "fringe" | ✅ |
| `date` | Date | Use European format | ✅ |
| `closingDate` | Date | Use European format | ✅ |
| `type` | Single select | "musical", "play" | ✅ |
| `description` | Long text | - | ✅ |
| `bookingUrl` | URL | - | ✅ |
| `reviewUrl` | URL | - | ❌ (Optional) |

**How to create Single Select fields:**
1. Click the "+" to add a field
2. Choose "Single select"
3. Add the options listed above (one per line)

### 4. Add Your Shows

You can:
- **Option A:** Manually add shows one by one through the Airtable interface
- **Option B:** Import from CSV (export from a spreadsheet, then import to Airtable)
- **Option C:** Copy/paste from existing shows (I can provide a CSV export)

**Pro Tip:** Copy all the existing shows from `src/App.jsx` into Airtable to start with the current database!

### 5. Get Your API Credentials

#### Get Your Base ID:
1. Go to your base in Airtable
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. Copy the part starting with `app` - that's your Base ID

#### Get Your API Key:
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Give it a name: "Theatre Watson"
4. Under "Scopes", select:
   - ✅ `data.records:read` (read records)
5. Under "Access", select your "Theatre Watson Shows" base
6. Click "Create token"
7. **IMPORTANT:** Copy the token immediately - you won't see it again!

### 6. Configure Environment Variables

1. Create a file called `.env` in the project root (same folder as `package.json`)
2. Copy the contents from `.env.example`
3. Replace the placeholder values:

```env
VITE_AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXXXX
```

**Security Note:** The `.env` file is already in `.gitignore` so your API key won't be committed to Git.

### 7. Configure Vercel (for Production)

Your API keys need to be set in Vercel for the live site:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add two variables:
   - Name: `VITE_AIRTABLE_API_KEY`, Value: (your API key)
   - Name: `VITE_AIRTABLE_BASE_ID`, Value: (your base ID)
4. Click "Save"
5. Redeploy your site for changes to take effect

### 8. Test Locally

```bash
# Start the dev server
npm run dev

# Open http://localhost:5173
# Check the browser console for "Loaded X shows from Airtable"
```

If you see that message, it's working! 🎉

## How It Works

1. **On Page Load:** Theatre Watson fetches shows from Airtable
2. **If Successful:** Displays shows from Airtable
3. **If Failed:** Falls back to hardcoded shows in `src/App.jsx`
4. **No API Key:** Uses hardcoded shows (perfect for development)

## Managing Shows

### Adding a New Show

1. Open your Airtable base
2. Click "+ Add record" at the bottom
3. Fill in all required fields
4. Save
5. Refresh your website - the new show appears!

### Editing a Show

1. Click on any field in Airtable
2. Edit the value
3. Refresh your website to see changes

### Removing a Show

**Option 1: Delete the record** (permanent)
1. Right-click the record
2. Select "Delete record"

**Option 2: Update the closing date** (recommended)
1. Set the `closingDate` to yesterday's date
2. Theatre Watson automatically hides closed shows

### Extending a Show's Run

1. Find the show in Airtable
2. Update the `closingDate` field
3. Save - the show will remain visible

## Troubleshooting

### Shows Not Loading from Airtable

**Check the browser console (F12):**

- ✅ "Loaded X shows from Airtable" → Working!
- ⚠️ "Airtable not configured" → Check `.env` file exists
- ❌ "Airtable API error: 401" → API key is invalid
- ❌ "Airtable API error: 404" → Base ID or table name is wrong
- ❌ "Failed to fetch" → Check your internet connection

### Common Issues

**1. "Airtable not configured" in production**
- Make sure environment variables are set in Vercel
- Redeploy after adding variables

**2. Shows not updating**
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Airtable API rate limits (5 requests/second, free tier)

**3. Wrong field names**
- Field names must match exactly (case-sensitive!)
- Check spelling in Airtable

**4. Single select values not working**
- Make sure options match: "west-end", "off-west-end", "fringe"
- For type: "musical", "play"
- Must be lowercase with hyphens

## API Rate Limits

Airtable free tier limits:
- **5 requests per second**
- **1,200 records per base**

Theatre Watson makes 1 request when the page loads, so you're well within limits!

## Migrating Existing Shows

Want to move your hardcoded shows to Airtable? I can help you:

1. Export current shows to CSV
2. Import to Airtable
3. Once verified, remove hardcoded shows from `src/App.jsx`

Let me know if you need help with this!

## Need Help?

Questions? Issues? Let me know and I'll help you troubleshoot! 🎭
