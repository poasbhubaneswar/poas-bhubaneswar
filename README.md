# POAS – Paschim Odisha Agrani Sangathana (ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ)
### Official Cultural & Community Web Platform | Bhubaneswar, Odisha

Official digital platform of **Paschim Odisha Agrani Sangathana (POAS)**, representing 10+ Western Odisha districts in Bhubaneswar for over 30 years. Dedicated to preserving Sambalpuri cultural heritage, uniting community families, driving social service, and spearheading the landmark **Maa Samalei Mandir & Cultural Complex Project**.

---

## 🎨 Visual Identity & Sambalpuri Heritage

- **Official Colors**: Red (`#A31D1D`, `#EF4444`), Obsidian Black (`#0B0B0C`, `#141416`), and Pure White (`#FFFFFF`).
- **Authentic Sambalpuri Motif**: Red, Black, and White Ikat geometry (*Lal, Kala, Dhala*).
- **Official POAS Logo**: Featured with high fidelity across desktop and mobile headers, hero banner, footer, and admin dashboard.
- **Maa Samalei Sacred Darshan**: High-resolution authentic photograph of Presiding Deity Maa Samaleswari featured with temple architecture status.
- **Atmospheric Animations**: Floating auroras, sacred Sambalpuri mandala aura, glowing border runners, and floating crimson embers.

---

## 🏛️ Core Features & Site Architecture

1. **Homepage (`/`)**:
   - POAS hero with official logo, Odia calligraphic title, and dual CTAs.
   - Impact metrics: 30+ Years, 10+ Districts United, 10,000+ Enrolled Community, 2 Membership Tiers.
   - Sacred Maa Samalei Mandir blueprint spotlight.
   - Meetings & Activities preview.
   - Governing Body leadership cards.
   - Instagram-style photo archives and news announcements.
   - Two-tier membership registration teaser.

2. **Leadership & Governing Body (`/leadership` & `/governing-body`)**:
   - Complete 24-member institutional governance structure based on official source documents:
     - **Board of Advisors (5 Advisors)**: Formulated per **POAS LH.pdf** (Ex-MP, Retd. IRTS, Retd. Bankers, Theater Artist).
     - **Governing Body (9 Office Bearers)**: President, Working President / Vice-President, Secretary General, 4 Secretaries, Treasurer, Project Coordinator with letterhead professional titles.
     - **Executive Body (10 Members)**: Elected Executive Committee members per **NEWLY ELECTED GOVERNING BODY (1).docx**.
   - Matched high-resolution photographic portraits with Odia/English designations and biographical profiles.

3. **Meetings & Activities (`/meetings` & `/meetings/[slug]`)**:
   - Complete documented records of 6 key POAS meetings and consultative assemblies.
   - Instagram-style multi-photo carousel with swipe navigation, counter badges (`1/N`), indicator dots, and fullscreen lightbox modal.
   - Detailed write-ups, participant rosters, resolutions, and date/venue metadata.

4. **Two-Tier Membership System (`/membership`)**:
   - **Option 1 – Lifetime Membership (₹1,000)**: Permanent digital ID, voting rights in General Body, VIP festival seating.
   - **Option 2 – Yearly Membership (₹100)**: Annual membership pass, directory listing, community aid access.
   - Native district dropdown covering all **10+ Western Odisha districts** (Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada, Subarnapur, Deogarh, Jharsuguda, Sundargarh, Boudh, and diaspora).
   - **Zero** ₹1 references across the entire codebase.

5. **Maa Samalei Mandir Project (`/maasamalei`)**:
   - Classical Rekha Deula temple architecture, Sambalpuri Kala Bhavan, and Pilgrim & Student Bhavan blueprints.
   - Consultative status with state MLAs and patrons.

6. **Full-Featured Executive Admin Panel (`/admin`)**:
   - **Leadership CMS (`/admin/leadership`)**: Full CRUD to manage, add, or delete office bearers.
   - **Meetings CMS (`/admin/meetings`)**: Full CRUD for meeting entries with multi-photo carousel attachments.
   - **Events & Timeline CMS (`/admin/events`)**: Event scheduling and one-click deletion of events and timeline milestones.
   - **Membership Inquiries (`/admin/membership`)**: Real-time review of Lifetime vs Yearly submissions with payment/approval status toggles.
   - **Site Settings CMS (`/admin/content`)**: Real-time updates for headlines, phone numbers, and headquarters details.
   - **Gallery & Articles CMS**: Media and press publication controls.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.4.6 (App Router with Turbopack)
- **UI & Runtime**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, Custom CSS Variables, Lucide Icons
- **Database & ORM**: Prisma 5.22 with SQLite (Portable & PostgreSQL compatible)
- **Forms & Actions**: React 19 `useActionState`, Zod validation, Server Actions

---

## 🚀 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/poas-bhubaneswar.git
cd poas-bhubaneswar

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env

# 4. Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# 5. Seed the database with all 19 office bearers, 6 meetings, and site settings
node prisma/seed.js

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live website.

---

## 🔐 Administrator Access

- **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@nuakhaivetaghat.org`
- **Password**: `Nuakhai@2026!POAS`

---

## 🌐 Deployment to GitHub & Cloud Hosting

For comprehensive instructions on pushing to GitHub and deploying to Vercel, Netlify, Render, or a VPS, please see [DEPLOYMENT.md](DEPLOYMENT.md).

```bash
git init
git add .
git commit -m "feat: complete POAS web platform and rebranding"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/poas-bhubaneswar.git
git push -u origin main
```

---

## 📂 Project Directory Structure

```
├── .env.example               <- Sample environment variables
├── .gitignore                 <- Comprehensive git ignore configuration
├── ADMIN_GUIDE.md             <- Administrator handbook
├── DEPLOYMENT.md              <- Step-by-step GitHub & cloud hosting instructions
├── package.json               <- Scripts and dependencies with Prisma postinstall
├── prisma/
│   ├── dev.db                 <- Pre-seeded portable SQLite database (~155 KB)
│   ├── schema.prisma          <- Prisma data models
│   └── seed.js                <- Official seed script for all 19 members & 6 meetings
├── public/
│   └── images/                <- Optimized production web images
│       ├── poas-logo.png
│       ├── maa-samalei-sacred-darshan.jpeg
│       ├── leadership/        <- 14 matched leader portraits
│       ├── meetings/          <- 6 meeting photos
│       └── ...
├── raw_materials/             <- Safely archived source documents, Word doc & raw notes
├── src/
│   ├── actions/               <- Server Actions (submissions, admin CRUD)
│   ├── app/                   <- Next.js App Router pages
│   ├── components/            <- UI and layout components
│   └── lib/                   <- Prisma, session, and utility helpers
└── tsconfig.json              <- TypeScript configuration
```

---

## 📜 License & Copyright

© 2026 **Paschim Odisha Agrani Sangathana (POAS)**, Bhubaneswar, Odisha. All rights reserved.
