# Phan Hong Tai - Developer Portfolio

## Project Overview

A professional developer portfolio built with Next.js App Router and Tailwind CSS. The site highlights skills, projects, education, and contact details in a modern dark-first layout suitable for internship and junior developer applications.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Features

- Dark-first UI with subtle gradients and card-based layout
- Responsive design for mobile, tablet, and desktop
- Modular data-driven sections (skills, projects, experience, education)
- SEO and Open Graph metadata
- Deploy-ready for Vercel

## Folder Structure

```text
.
├─ app/
│  ├─ components/
│  ├─ data/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ public/
├─ .github/
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md
```

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Environment Variables

No environment variables are required at the moment. If you add any later, document them here and provide a `.env.example` file.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose "New Project" and import the repo.
3. Use the default settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Deploy.

Every push to the main branch will trigger an automatic redeploy.

## Author

- Name: Phan Hong Tai
- GitHub: https://github.com/mirramirrayumeume
- Email: taiphce181490@fpt.edu.vn
