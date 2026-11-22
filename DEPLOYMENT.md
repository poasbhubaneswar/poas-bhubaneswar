# Step-by-Step GitHub & Hosting Deployment Guide
## Paschim Odisha Agrani Sangathana (POAS) Web Platform

This guide walks you through uploading this repository to **GitHub** and deploying it for live hosting on **Vercel**, **Netlify**, **Render**, or a **VPS / Cloud Server**.

---

## 1. Quick Git Upload to GitHub

Follow these steps in your terminal inside the project directory:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all files (node_modules and temporary build artifacts are ignored by .gitignore)
git add .

# 3. Create initial commit
git commit -m "feat: complete POAS rebranding, leadership roster, meetings, and two-tier membership"

# 4. Rename default branch to main
git branch -M main

# 5. Add your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/poas-bhubaneswar.git

# 6. Push to GitHub
git push -u origin main
```

---

## 2. Deploying on Vercel (Recommended)

Vercel provides native, zero-configuration hosting for Next.js applications:

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Import the `poas-bhubaneswar` repository.
4. In the **Environment Variables** section, add:
   - `DATABASE_URL`: `file:./dev.db`
   - `AUTH_SECRET`: A secure random string (e.g. `poas-bhubaneswar-secure-secret-key-2026-production`)
   - `NEXTAUTH_SECRET`: Same value as `AUTH_SECRET`
   - `NEXTAUTH_URL`: Your Vercel production domain (e.g. `https://poas-bhubaneswar.vercel.app`)
   - `NEXT_PUBLIC_SITE_URL`: Same value as `NEXTAUTH_URL`
   - `NEXT_PUBLIC_SITE_NAME`: `POAS – Paschim Odisha Agrani Sangathana`
5. Click **"Deploy"**.
6. The `package.json` includes `"postinstall": "prisma generate"`, ensuring the Prisma client compiles seamlessly on Vercel build servers.

---

## 3. Production Database Options

### Option A: Portable SQLite (Current Default)
- Pre-seeded with all 19 Governing Body office bearers, 6 documented meetings, gallery archives, and site settings.
- The `prisma/dev.db` database is tracked in git, meaning initial builds on Vercel/Netlify/VPS work out of the box with zero external database configuration.

### Option B: Cloud PostgreSQL (Recommended for Persistent Admin Edits on Serverless)
Because serverless functions (like Vercel) have an ephemeral filesystem, any new content written via the Admin Panel is best stored in a managed cloud database.
To connect a free PostgreSQL database (e.g. [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Railway](https://railway.app)):

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set your `DATABASE_URL` in `.env` to your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgres://username:password@ep-host.aws.neon.tech/poas?sslmode=require"
   ```
3. Push schema and seed the remote database:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

---

## 4. Default Admin Panel Credentials

Once deployed, access the admin panel at `/admin`:

- **Portal URL**: `https://your-domain.com/admin`
- **Email**: `admin@nuakhaivetaghat.org`
- **Password**: `Nuakhai@2026!POAS`

*(You can update administrator credentials or create new administrator accounts directly via the Prisma CLI or database studio using `npm run db:studio`.)*

---

## 5. Verification Checklist

- [x] Unchanged official POAS logo in header, hero, footer, and admin.
- [x] Sambalpuri Red, Black, and White (*Lal, Kala, Dhala*) theme with sacred animations.
- [x] All 19 Governing Body and Executive Council members displayed on `/leadership`.
- [x] All 6 documented meetings with photos and writeups on `/meetings`.
- [x] Two-Tier Membership (Lifetime ₹1,000 & Yearly ₹100) with 10+ Western Odisha districts dropdown.
- [x] Presiding Deity Maa Samaleswari sacred darshan photograph featured on `/` and `/maasamalei`.
- [x] Zero ₹1 references across all public and admin pages.
- [x] `npm run build` passes with 0 errors.
