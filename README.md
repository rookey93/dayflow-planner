# DayFlow - AI-Powered Day Planner

An intelligent day planning application that helps travelers and explorers create perfect itineraries based on their location, interests, and preferences.

## Features

- 🗺️ Location-based planning
- 🎯 Interest-based recommendations
- ⏰ Time-optimized itineraries
- 💰 Budget-aware suggestions
- 🔍 Real-time event discovery
- 📱 Mobile-responsive design
- ✨ Beautiful, modern UI

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel

## Prerequisites

Before you begin, make sure you have:

1. A GitHub account
2. An Anthropic API key (get one at: https://console.anthropic.com/)
3. A Vercel account (sign up at: https://vercel.com)

## Step-by-Step Deployment Guide

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Click "Create Key"
5. Copy your API key (it starts with `sk-ant-`)
6. **IMPORTANT**: Save this key securely - you won't be able to see it again!

### Step 2: Set Up GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "dayflow-planner")
4. Choose "Public" or "Private"
5. Do NOT initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 3: Upload Your Code to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all these files:
   - `index.html`
   - `package.json`
   - `vercel.json`
   - `.gitignore` (rename `gitignore` to `.gitignore`)
3. Create a new folder called `api` and upload `plan.js` into it
4. Add a commit message like "Initial commit"
5. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd /path/to/your/project

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Find and select your GitHub repository
5. Click "Import"

**Configure Your Project:**

6. In the "Configure Project" screen:
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as default)
   - Build Command: Leave empty
   - Output Directory: Leave empty

7. **CRITICAL**: Add Environment Variables
   - Click "Environment Variables"
   - Add a new variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Paste your Anthropic API key (the one starting with `sk-ant-`)
   - Make sure it's available for all environments (Production, Preview, Development)

8. Click "Deploy"

9. Wait 1-2 minutes for deployment to complete

10. Once deployed, you'll see "Congratulations!" with your live URL

### Step 5: Test Your Application

1. Click on the deployment URL (e.g., `your-project.vercel.app`)
2. Try planning a day:
   - Enter a location (e.g., "Paris, France")
   - Select a date
   - Choose your preferences
   - Click "Plan My Day"
3. The AI should generate a personalized itinerary!

## Troubleshooting

### "API request failed" Error

- **Check your API key**: Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Make sure `ANTHROPIC_API_KEY` is set correctly
- Redeploy after adding/changing environment variables

### "Method not allowed" Error

- Check that the `api` folder structure is correct
- Make sure `plan.js` is in the `api` folder
- Try redeploying

### No results showing

- Open browser console (F12) to see errors
- Check Vercel deployment logs for backend errors
- Verify the API key has available credits

### Deployment fails

- Make sure all files are uploaded correctly
- Check `vercel.json` is in the root directory
- Verify `api/plan.js` file path is correct

## Customization Ideas

### Monetization
- Add affiliate booking links (restaurants, activities)
- Integrate banner ads during loading
- Add premium features (save plans, multi-day trips)
- Partner with local businesses for sponsored recommendations

### Features to Add
- Save favorite plans
- Share itineraries with friends
- Export to Google Calendar
- Multi-day trip planning
- Group planning features
- Weather integration
- Real-time pricing

### UI Improvements
- Add dark/light mode toggle
- Create mobile app version
- Add map visualization
- Include photos for activities
- Add user reviews/ratings

## Project Structure

```
dayflow-planner/
├── index.html          # Main frontend file
├── api/
│   └── plan.js        # Serverless API endpoint
├── package.json       # Project dependencies
├── vercel.json        # Vercel configuration
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## API Usage

The application uses Claude API with web search enabled to:
- Find real-time events and activities
- Get current venue information
- Optimize routing and timing
- Provide personalized recommendations

## Cost Considerations

- Claude API costs: ~$0.003-0.015 per request
- Vercel hosting: Free tier includes 100GB bandwidth
- For production: Monitor usage and consider implementing request limits

## Support

For issues with:
- **Deployment**: Check Vercel documentation
- **API**: Visit Anthropic documentation
- **Code**: Review the inline comments in the files

## License

MIT License - Feel free to modify and use for your own projects!

---

Built with ❤️ using Claude AI
