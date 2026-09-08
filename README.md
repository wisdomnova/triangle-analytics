<div align="center">
  <img src="public/images/logo.png" alt="Triangle Analytics" width="120" />
  <h1>Triangle Analytics</h1>
  <p><strong>Ultra-lightweight, privacy-friendly web analytics for modern builders.</strong></p>
  <p>The fast, simple, and privacy-first web analytics platform without the tracking bloat.</p>

  <div>
    <a href="https://github.com/wisdomnova/triangle-analytics"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://github.com/wisdomnova/triangle-analytics"><img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://github.com/wisdomnova/triangle-analytics"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://github.com/wisdomnova/triangle-analytics"><img src="https://img.shields.io/badge/Privacy-First-emerald?style=flat-square" alt="Privacy First" /></a>
  </div>
</div>

---

## 🌟 Overview

**Triangle Analytics** is an ultra-lightweight, privacy-conscious web analytics SaaS. Built as the sister platform to [**The Triangle**](https://github.com/wisdomnova/the-triangle), it provides clean real-time traffic statistics, pageviews, referrers, and device breakdowns without cookie banners, invasive cross-site tracking, or heavy script overhead.

---

## ✨ Features

- ⚡ **Ultra-Lightweight Script**: Sub-kilobyte tracking script that won't slow down your website.
- 🔒 **Privacy-First & Cookie-Free**: Compliant with GDPR, CCPA, and PECR out of the box with zero annoying cookie consent banners required.
- 📊 **Real-Time Live Dashboard**: Instant insights into active visitors, top pages, referrers, and geographic distribution.
- 🎨 **Signature Triangle Design**: Built with the clean, warm minimalist aesthetic of The Triangle design system.
- 🔑 **Simple Domain Claiming**: Easy onboarding with Email OTP and DNS TXT challenge verification.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 & custom warm brand tokens (`#FAF8F5` canvas, `#EAE5D9` borders, `#1E1E1C` charcoal)
- **Motion & UI**: Framer Motion, Google Material Symbols Outlined, Google Font Outfit
- **Data Visualization**: Recharts

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/wisdomnova/triangle-analytics.git
cd triangle-analytics
npm install
```

### 2. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📦 Project Structure

```text
triangle-analytics/
├── app/
│   ├── (auth)/auth/           # Authentication suite
│   │   ├── signin/            # Sign In page
│   │   ├── join/              # Sign Up page
│   │   ├── forgot-password/   # Password recovery
│   │   ├── reset-password/    # Password reset
│   │   └── claim-onboarding/  # Domain verification wizard
│   ├── components/            # Landing page header and hero
│   ├── globals.css            # Brand theme & design tokens
│   ├── layout.tsx             # Root layout & Outfit typography
│   └── page.tsx               # Landing page
├── components/                # Reusable UI components (Dropdown, etc.)
└── public/                    # Brand assets, logos, and illustrations
```

---

## 🤝 Sister Project
- **[The Triangle](https://github.com/wisdomnova/the-triangle)**: Qualitative Product Intelligence Engine & Experience Compiler.

---

## 📄 License
Private & Proprietary. All rights reserved.
