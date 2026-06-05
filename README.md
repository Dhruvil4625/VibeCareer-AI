# VibeCareer AI 🚀

> **The all-in-one AI-powered career acceleration platform** — Designed for modern professionals who want to optimize their application assets, track opportunities, and practice behavioral metrics at an industry-standard level.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?logo=prisma)](https://prisma.io)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Google AI](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)](https://ai.google.dev)

---

## 🎯 Platform Purpose & Core Objectives

VibeCareer AI bridges the gap between candidate qualifications and complex corporate Applicant Tracking Systems (ATS). The platform streamlines the job search workflow by providing automated ATS audits, contextual AI experience boosts, speech-driven mock interviews, interactive application pipelines, and transactional alerts.

---

## 🏗️ Technical Architecture & Orchestration

The application leverages a modern, highly optimized Next.js serverless stack:

```
┌────────────────────────────────────────────────────────┐
│               Next.js 16 (App Router)                  │
├───────────────────────┬────────────────────────────────┤
│  React Server         │  Client-Side Workspace         │
│  Components (RSC)     │  (Framer Motion + Zustand)     │
├───────────────────────┴────────────────────────────────┤
│                 Prisma ORM (Data Access)               │
├────────────────────────────────────────────────────────┤
│             Neon (Serverless PostgreSQL Cloud)         │
├────────────────────────────────────────────────────────┤
│             AI Orchestration Layer                     │
│   ┌───────────────────┬────────────────────────────┐   │
│   │   Google Gemini   │   OpenAI GPT-4o            │   │
│   │  (Primary Model)  │  (Fallback Orchestrator)   │   │
│   └───────────────────┴────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

---

## ⚙️ Detailed Functionality & Libraries Used

### 🔑 1. Authentication & Session Security
* **Purpose:** Provides secure credential-based login alongside Google and GitHub OAuth identity access.
* **Libraries:** `next-auth` (v4), `bcryptjs` (v3).
* **Methods:**
  * Uses salted hashing (12 rounds of bcrypt) for secure storage of credentials in the database.
  * Implements account linking using `allowDangerousEmailAccountLinking: true` inside Google and GitHub OAuth providers. This allows users who registered using an email/password to seamlessly sign in with Google or GitHub without encountering account collisions or blocks.
  * Captures NextAuth redirect parameters on `/sign-in` (like `OAuthAccountNotLinked`) to display client-side error toasts.

### 📄 2. ATS Resume Builder Workspace
* **Purpose:** Formulates standard multi-section resumes with instant layout previews and ATS scoring analysis.
* **Libraries:** `react-hook-form`, `@hookform/resolvers`, `zod`.
* **Methods:**
  * Uses Zod schemas to validate form inputs (Personal Info, Education, Experience, Projects, Skills, Certifications) on the client side.
  * **AI Bullet Boost:** Executes `POST /api/ai/resume` with `{ action: "optimize-bullets" }`. Orchestrates custom prompts to Gemini to optimize bullet points using high-impact verbs and metrics.
  * **ATS Audit Scanner:** Runs `{ action: "ats-score" }` to cross-examine resume content against structural hiring guidelines, returning score cards, strengths, gaps, and improvements.
  * **Sandboxed Print Engine:** Creates a temporary, hidden `iframe` node, injects Google Fonts, stylesheets, and HTML, calls the native window print utility, and cleans up the node, bypassing standard browser page-cropping limitations to yield clean PDFs.

### 🎤 3. Speech Mock Interview Simulator
* **Purpose:** Simulates voice-driven behavioral and technical interview panels.
* **APIs & Methods:**
  * **Text-To-Speech (TTS):** Uses the browser-native **Web Speech API (`window.speechSynthesis`)** to narrate AI-generated questions to the candidate.
  * **Speech-To-Text (STT):** Uses **`webkitSpeechRecognition`** to capture the candidate's microphone audio and transcribe responses in real-time.
  * **AI Scorecards:** Submits candidate answers to the AI Orchestrator to generate rating graphs, analyze answer qualities, point out missing details, and provide copyable model responses.

### 💬 4. AI Career Coach
* **Purpose:** A 24/7 conversational career coach that consults on salaries, career switches, and offers advice.
* **Libraries:** `@google/generative-ai`.
* **Methods:**
  * Persists ongoing dialogue inside Zustand states.
  * Routes conversations with system instruction profiles enforcing professional, actionable career coach personalities.

### 🔗 5. LinkedIn Profile Visibility Auditor
* **Purpose:** Audits search-indexing keyword strengths of LinkedIn profile components.
* **Methods:**
  * Connects to candidate profile records inside the database.
  * Evaluates profile sections and predicts candidate matching indexes for target job roles.
  * Formulates highly optimized headline variations that can be copied directly to optimize recruiter discoverability.

### 🗂️ 6. Kanban Application Tracker
* **Purpose:** A pipeline board to track recruitment cycles from wishlist to offer.
* **Libraries:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
* **Methods:**
  * Manages drag-and-drop operations for columns and cards.
  * Updates application state cards dynamically on database schemas via Prisma endpoints on drag completions.

### 📧 7. Gmail SMTP Mailer
* **Purpose:** Sends responsive transactional emails upon signups and logins.
* **Libraries:** `nodemailer` (v7).
* **Methods:**
  * **Registration Welcome Email:** Sent in the background (non-blocking Promise pattern) when users register, showing links and feature cards.
  * **Login Welcome Back Email:** Sent on successful logins containing a grid platform catalog outlining all modules (Resume Workspace, Interviewer, Coach, LinkedIn Auditor, Tracker, Architecture Spectator).
  * Executes SMTP operations using an encrypted transport (`smtp.gmail.com` port 465) with local environment variables.

---

## 🛠️ Complete Tech Stack

| Category | Technology |
|---|---|
| **Core Framework** | Next.js 16 (Turbopack compiler) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4 |
| **Animation Layers** | Framer Motion v12 |
| **Database** | Serverless PostgreSQL via Neon |
| **ORM** | Prisma 6.x |
| **Primary AI Model** | Google Gemini 1.5 Pro & 1.5 Flash |
| **Fallback AI Model** | OpenAI GPT-4o (Optional configuration) |
| **Mailer Utility** | Nodemailer v7 |
| **Drag & Drop Engine** | @dnd-kit (Core, Sortable, Utilities) |
| **Forms & Schemas** | React Hook Form & Zod |
| **Alert Toasts** | Sonner |

---

## 🚀 Getting Started

### Prerequisites
* Node.js 20+
* npm or pnpm
* A [Neon PostgreSQL](https://neon.tech) account
* A Google Gemini API key from [Google AI Studio](https://aistudio.google.com)
* A Google App Password for SMTP transactional emails

### 1. Installation
```bash
git clone https://github.com/your-username/VibeCareer-AI.git
cd VibeCareer-AI
npm install
```

### 2. Configure Local Environment
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your_random_auth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="VibeCareer AI"

# OAuth Credentials
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
GITHUB_CLIENT_ID="your_github_oauth_client_id"
GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"

# Generative AI APIs
GOOGLE_AI_API_KEY="your_gemini_api_key"

# Gmail SMTP Mailer
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="465"
EMAIL_SERVER_USER="your_email@gmail.com"
EMAIL_SERVER_PASSWORD="your_16_char_gmail_app_password"
EMAIL_FROM="your_email@gmail.com"
```

### 3. Setup Database Schema
Push the schemas to your Neon PostgreSQL instance and generate the local Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Key Directories

```
VibeCareer-AI/
├── app/
│   ├── (auth)/          # Sign-in and registration pages
│   ├── (dashboard)/     # Workspace pages (resume, coach, interview, jobs, tracker)
│   ├── api/             # API endpoints (Auth callback, AI optimizers, mail)
│   ├── about/           # Public About page (developer profile)
│   ├── blog/            # Public Blog listing
│   ├── careers/         # Careers opening list
│   ├── contact/         # Contact developer page with forms
│   ├── globals.css      # Design system variables (auroras, cyber-grids)
│   └── layout.tsx       # Root layout file
├── components/
│   ├── landing/         # Homepage sections (Hero, Features, Testimonials, Footer)
│   ├── layout/          # Dashboard frame components (Sidebar, Topbar)
│   └── shared/          # Providers, 3D Tilt Cards, spotlight trackers
├── lib/
│   ├── ai/              # Gemini interfaces, GPT fallback routing
│   ├── auth/            # NextAuth credential and OAuth options
│   ├── db/              # Prisma DB client singleton
│   └── mail/            # Nodemailer transport configurations and HTML email templates
├── prisma/
│   └── schema.prisma    # Database structural definitions
└── middleware.ts        # Protects dashboard paths from unauthenticated sessions
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p><strong>VibeCareer AI</strong> — Accelerate your career</p>
</div>
