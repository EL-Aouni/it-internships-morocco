# ⚡ Quick Commands - Copy & Paste These

## Your Info:
- **GitHub Username**: EL-Aouni
- **Repository URL**: https://github.com/EL-Aouni/it-internships-morocco
- **Future Live Site**: https://it-internships-morocco.vercel.app

---

## 📋 STEP 1: Upload to GitHub

### First, create repository on GitHub:
1. Go to: https://github.com/new
2. Name: `it-internships-morocco`
3. Public repository ✅
4. Don't initialize anything
5. Click "Create repository"

### Then run these commands in your project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - IT Internships Morocco"

# Rename to main branch
git branch -M main

# Add YOUR GitHub repository
git remote add origin https://github.com/EL-Aouni/it-internships-morocco.git

# Push to GitHub
git push -u origin main
```

**If asked for credentials:**
- Username: `EL-Aouni`
- Password: Your GitHub password (or Personal Access Token)

---

## 📋 STEP 2: Database SQL Commands

### In PlanetScale Console - Command 1 (Create Table):

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

### Command 2 (Insert Companies):
Copy all INSERT statements from `companies.sql` file (skip the `USE cyber_internships;` line)

### Command 3 (Verify):
```sql
SELECT COUNT(*) FROM companies;
```
Should return: **94**

---

## 📋 STEP 3: Vercel Environment Variables

Add these in Vercel deployment settings:

**Variable 1:**
```
Name: DATABASE_URL
Value: [Your PlanetScale connection string from console]
```

**Variable 2:**
```
Name: NODE_ENV
Value: production
```

---

## 🔄 Update Your Site Later (After Initial Deploy)

```bash
# Make your changes in code, then:

git add .
git commit -m "Update: describe what you changed"
git push

# Vercel automatically deploys! Wait 2-3 minutes and refresh your site.
```

---

## ✅ Verification Commands

### Check if Git is installed:
```bash
git --version
```

### Check if Node is installed:
```bash
node --version
npm --version
```

### Test build locally before deploying:
```bash
npm install
npm run build
npm start
```

---

## 🆘 Quick Fixes

### If "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/EL-Aouni/it-internships-morocco.git
```

### If you need to force push (BE CAREFUL):
```bash
git push -u origin main --force
```

### If git asks for your identity:
```bash
git config --global user.name "EL-Aouni"
git config --global user.email "your-email@example.com"
```

### Create .gitignore file manually:
```bash
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.next/
.DS_Store
*.log
.vercel
EOF
```

---

## 📱 Important URLs

**Bookmark these:**

- GitHub Repo: https://github.com/EL-Aouni/it-internships-morocco
- Create New Repo: https://github.com/new
- Vercel Dashboard: https://vercel.com/dashboard
- PlanetScale: https://app.planetscale.com
- Your Live Site: [Will be shown after deployment]

---

## 🎯 The Complete Flow

```
Your Computer → Git Commands → GitHub
                                  ↓
                             Vercel (auto-detects)
                                  ↓
                           Builds & Deploys
                                  ↓
                      Live Site on the Internet! 🎉
```

---

**Copy these commands when you need them!**
**Follow the full guide: EL-AOUNI-DEPLOYMENT-GUIDE.md**
