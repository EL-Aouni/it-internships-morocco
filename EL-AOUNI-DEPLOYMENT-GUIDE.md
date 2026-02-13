# 🚀 Your Personal Deployment Guide - EL-Aouni

## Your GitHub: https://github.com/EL-Aouni
## Your Future Site: https://it-internships-morocco.vercel.app

---

## 🎯 COMPLETE STEP-BY-STEP GUIDE (30 Minutes)

Follow these steps **exactly** and your site will be live!

---

## STEP 1: Upload Your Code to GitHub (10 minutes)

### A. Prepare Your Project Folder

1. **Open your project folder** in terminal/command prompt
   ```bash
   # Navigate to your project (example - adjust to your path)
   cd /path/to/cyber-internships-maroc
   # or on Windows:
   cd C:\Users\YourName\Documents\cyber-internships-maroc
   ```

2. **Add these files to your project root** (from the files I gave you):
   - Copy `gitignore.txt` → Rename to `.gitignore`
   - Copy `env.example.txt` → Rename to `.env.example`
   - Copy `vercel.json` (keep same name)
   - Copy `companies.sql` (you'll need this for database)

### B. Initialize Git & Upload

**Method 1 - Automatic Script (Easiest):**

For Mac/Linux:
```bash
bash upload-to-github.sh
# When asked for username, type: EL-Aouni
```

For Windows:
```cmd
upload-to-github.bat
# When asked for username, type: EL-Aouni
```

**Method 2 - Manual Commands:**

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit - IT Internships Morocco Platform"

# 4. Create main branch
git branch -M main

# 5. Connect to YOUR GitHub (note: YOUR username is EL-Aouni)
git remote add origin https://github.com/EL-Aouni/it-internships-morocco.git

# 6. Push to GitHub
git push -u origin main
```

### C. Create the Repository on GitHub FIRST

**IMPORTANT:** Before running the git commands, you need to create the repository:

1. Go to: https://github.com/new
2. **Repository name**: `it-internships-morocco`
3. **Description**: `IT Internship Search Platform for Morocco - Full-stack Next.js app`
4. **Visibility**: ✅ Public (MUST be public for free Vercel)
5. **DON'T check** "Add a README file"
6. **DON'T check** "Add .gitignore"
7. **DON'T check** "Choose a license"
8. Click **"Create repository"**

**Then run the git commands above.**

### D. Verify Upload

Go to: https://github.com/EL-Aouni/it-internships-morocco

You should see all your files there! ✅

---

## STEP 2: Set Up FREE Database (10 minutes)

### A. Create PlanetScale Account

1. Go to: https://planetscale.com
2. Click **"Sign up"**
3. Choose **"Continue with GitHub"**
4. Authorize PlanetScale
5. You're in! ✅

### B. Create Database

1. Click **"Create a new database"**
2. **Name**: `cyber-internships-db`
3. **Region**: Select **"AWS eu-west-1 (Dublin)"** (closest to Morocco)
4. **Plan**: Select **"Hobby"** (FREE - $0/month)
5. Click **"Create database"**
6. Wait ~30 seconds for database to be ready

### C. Get Your Connection String (SAVE THIS!)

1. In your database dashboard, click **"Connect"**
2. Select **"Connect with: Prisma"** (or Node.js)
3. You'll see something like:
   ```
   DATABASE_URL="mysql://xxxxxxx:pscale_pw_xxxxxxx@aws.connect.psdb.cloud/cyber-internships-db?sslaccept=strict"
   ```
4. **COPY THIS ENTIRE STRING** - you'll need it in Step 3!
5. Save it in a text file temporarily

### D. Create the Database Table

1. In PlanetScale dashboard, click **"Console"** tab
2. Click **"Open console"** button
3. Copy this SQL and paste it:

```sql
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  speciality VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_city (city),
  INDEX idx_speciality (speciality),
  INDEX idx_priority (priority)
);
```

4. Click **"Execute"** or press **Ctrl+Enter**
5. You should see: "Query executed successfully" ✅

### E. Import the 94 Companies

1. Still in the console
2. Open the `companies.sql` file I gave you
3. **Copy everything AFTER** the line `USE cyber_internships;` (skip that line)
4. **Paste** all the INSERT statements into the console
5. Click **"Execute"**
6. Wait ~10 seconds (it's inserting 94 companies!)
7. Verify with this query:
   ```sql
   SELECT COUNT(*) FROM companies;
   ```
8. Should return: **94** ✅

**Your database is ready!** 🎉

---

## STEP 3: Deploy to Vercel (10 minutes)

### A. Create Vercel Account

1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub
5. You're in! ✅

### B. Import Your Project

1. Click **"Add New..."** → **"Project"**
2. You'll see your repositories
3. Find **"it-internships-morocco"**
4. Click **"Import"**

### C. Configure Your Project

Vercel will auto-detect Next.js settings. You should see:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**IMPORTANT - Add Environment Variables:**

1. Scroll down to **"Environment Variables"**
2. Add this variable:

   **Name**: `DATABASE_URL`
   
   **Value**: [Paste the connection string from Step 2C]
   
   Example:
   ```
   mysql://xxxxxxx:pscale_pw_xxxxxxx@aws.connect.psdb.cloud/cyber-internships-db?sslaccept=strict
   ```

3. Click **"Add"**

4. Add another variable:

   **Name**: `NODE_ENV`
   
   **Value**: `production`
   
   Click **"Add"**

### D. Deploy!

1. Click **"Deploy"** button
2. Vercel will now:
   - Install dependencies
   - Build your project
   - Deploy to their global CDN
3. Wait 2-3 minutes (you'll see build logs)
4. When you see **"🎉 Congratulations!"** with confetti - you're LIVE!

### E. Access Your Live Site

1. Click **"Visit"** or **"Go to Dashboard"**
2. Your site will be at something like:
   ```
   https://it-internships-morocco.vercel.app
   ```
   or
   ```
   https://it-internships-morocco-el-aouni.vercel.app
   ```

**COPY THIS URL - THIS IS YOUR LIVE SITE!** 🌍

---

## STEP 4: Test Your Live Site (5 minutes)

Visit your site and test:

### Homepage Test:
- [ ] Site loads without errors
- [ ] You can see the welcome page
- [ ] Navigation works

### Filter Page Test:
- [ ] Go to the filter/search page
- [ ] **City dropdown** shows all 18 cities
- [ ] **Specialty dropdown** shows all 15 IT specialties
- [ ] **Priority dropdown** works

### Search Test:
- [ ] Select "Casablanca" → Should show ~23 companies
- [ ] Select "Cybersecurity" specialty → Should show ~9 companies
- [ ] Select "High" priority → Should show ~24 companies
- [ ] Try combinations → Should work!
- [ ] **NO MORE** "Aucune entreprise ne correspond" errors! ✅

### Company Cards Test:
- [ ] Company names show correctly
- [ ] Email addresses visible
- [ ] Phone numbers display
- [ ] "Copy Email" button works
- [ ] Website links clickable

### Mobile Test:
- [ ] Open on phone
- [ ] Everything looks good
- [ ] Filters work on mobile

**If all tests pass - CONGRATULATIONS! YOUR SITE IS LIVE!** 🎉

---

## 🎯 Your Live URLs

Once deployed, you'll have:

- **GitHub Code**: https://github.com/EL-Aouni/it-internships-morocco
- **Live Site**: https://it-internships-morocco.vercel.app (or similar)
- **Vercel Dashboard**: https://vercel.com/dashboard (to manage deployments)
- **PlanetScale Dashboard**: https://app.planetscale.com (to manage database)

---

## 🔄 How to Update Your Site Later

Vercel has **automatic deployments**! This means:

1. Make changes to your code locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
3. Vercel automatically rebuilds and deploys! (2-3 minutes)
4. Your live site updates automatically! ✅

**No need to manually deploy again!**

---

## 🆘 Troubleshooting

### Problem: "Repository already exists"
**Solution**: The repo name is taken. Either:
- Delete the existing repo on GitHub
- Or use a different name like `it-internships-morocco-v2`

### Problem: "Authentication failed" when pushing
**Solution**: You need to authenticate GitHub:
```bash
# Set your GitHub username
git config --global user.name "EL-Aouni"

# Set your GitHub email
git config --global user.email "your-email@example.com"

# When pushing, GitHub will ask for credentials
# Use your GitHub password or Personal Access Token
```

### Problem: "Build failed" on Vercel
**Solutions**:
1. Check build logs for specific error
2. Verify `DATABASE_URL` environment variable is set
3. Make sure all dependencies are in `package.json`
4. Check that build works locally: `npm run build`

### Problem: "Database connection error"
**Solutions**:
1. Verify `DATABASE_URL` is copied exactly (including `?sslaccept=strict`)
2. Check database is active in PlanetScale dashboard
3. Make sure you're using the production connection string, not local

### Problem: "Companies not showing"
**Solutions**:
1. Verify database has 94 companies:
   ```sql
   SELECT COUNT(*) FROM companies;
   ```
2. Check browser console (F12) for API errors
3. Verify API routes are working
4. Check Vercel function logs

---

## 📱 Share Your Site!

Once everything works, share it:

1. **Add to your GitHub README**:
   - Go to your repo: https://github.com/EL-Aouni/it-internships-morocco
   - Click "Add a README"
   - Copy content from `GITHUB_README.md` I gave you
   - Replace "YOUR-USERNAME" with "EL-Aouni"
   - Add your live Vercel URL
   - Commit!

2. **Add to LinkedIn/CV**:
   ```
   IT Internships Morocco Platform
   Full-stack web application helping Moroccan students find IT internships
   Tech: Next.js, TypeScript, tRPC, MySQL, Tailwind CSS
   Live: [your-vercel-url]
   Code: https://github.com/EL-Aouni/it-internships-morocco
   ```

3. **Share with friends**:
   - Send the live URL
   - Post in university groups
   - Share on social media
   - Get feedback!

---

## ✅ Final Checklist

Before you start, make sure you have:
- [ ] All project files on your computer
- [ ] Git installed (`git --version` to check)
- [ ] GitHub account (you have: EL-Aouni ✅)
- [ ] Files from me: `.gitignore`, `.env.example`, `vercel.json`, `companies.sql`

Then follow:
- [ ] **STEP 1**: Upload to GitHub
- [ ] **STEP 2**: Create & seed PlanetScale database
- [ ] **STEP 3**: Deploy to Vercel
- [ ] **STEP 4**: Test your live site
- [ ] **CELEBRATE**: Your site is live! 🎉

---

## 💡 Pro Tips

1. **Bookmark these URLs**:
   - Your GitHub repo
   - Your Vercel dashboard
   - Your PlanetScale dashboard

2. **Enable notifications**:
   - Vercel will email you when deployments fail
   - Helps catch issues quickly

3. **Monitor usage**:
   - Check Vercel analytics to see visitors
   - PlanetScale shows database queries
   - Stay within free tier limits

4. **Keep improving**:
   - Add more companies as you find them
   - Implement features users request
   - Fix bugs quickly
   - Build your portfolio!

---

## 🎊 What Happens After You Deploy

1. **Immediate**:
   - Site is live worldwide
   - Anyone can access your URL
   - Fully functional search platform

2. **This Week**:
   - Share with friends and classmates
   - Gather feedback
   - Fix any bugs
   - Add more companies

3. **This Month**:
   - Add features (user accounts, saved searches)
   - Improve design based on feedback
   - Expand database
   - Build your reputation

4. **Long-term**:
   - A real portfolio project
   - Helps Moroccan students find internships
   - You can maintain and improve it
   - Great for job interviews!

---

## 🚀 Ready to Start?

1. Open your terminal/command prompt
2. Navigate to your project folder
3. Start with **STEP 1** above
4. Follow each step carefully
5. In 30 minutes, you'll be LIVE!

**Good luck, EL-Aouni! You've got this! 💪**

---

**Any questions? Just re-read the relevant step. Everything you need is in this guide!**
