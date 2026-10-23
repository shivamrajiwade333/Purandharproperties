# 📁 Project Folder Structure Guide

This document provides a beginner-friendly, visual walkthrough of the **Purandhar Properties** codebase. Any developer, student, or external examiner can navigate to the exact file they need in seconds.

---

## 🌳 High-Level Visual Directory Tree

```text
PurandharProperties/
├── app/                              # Next.js 14 App Router (Routing & Pages)
│   ├── (public)/                     # Route group: Publicly accessible pages
│   │   ├── page.tsx                  # Landing Homepage (Hero, Highlights, Village cards)
│   │   ├── layout.tsx                # Public Layout (Navbar, Footer, BackToTop)
│   │   ├── buy/page.tsx              # "Buy Properties" filter view
│   │   ├── rent/page.tsx             # "Rent Properties" filter view
│   │   ├── commercial/page.tsx       # "Commercial Spaces" filter view
│   │   ├── contact/page.tsx          # Office address, contact form, inquiry channels
│   │   ├── favorites/page.tsx        # Client-side saved properties (Wishlist)
│   │   ├── properties/page.tsx       # Full searchable & filterable property catalog
│   │   └── property/[id]/page.tsx    # Dynamic detailed single property view
│   │
│   ├── admin/                        # Protected Admin Portal (CMS)
│   │   ├── layout.tsx                # Admin Dashboard Layout (Sidebar navigation)
│   │   ├── dashboard/page.tsx        # Admin KPIs & Analytics Overview
│   │   ├── enquiries/page.tsx        # Customer leads and enquiry triage
│   │   ├── login/page.tsx            # Admin authentication login screen
│   │   ├── properties/page.tsx       # Admin inventory table (Publish/Unpublish/Delete)
│   │   ├── properties/new/page.tsx   # Add new property listing form
│   │   ├── properties/[id]/edit/     # Edit existing property listing
│   │   └── settings/page.tsx         # Admin account preferences & seed reset
│   │
│   ├── api/                          # REST API Backend Endpoints (Serverless)
│   │   ├── auth/                     # Authentication routes (login, logout, me)
│   │   ├── enquiries/                # Customer inquiry CRUD endpoints
│   │   ├── properties/               # Property catalog CRUD & dynamic filters
│   │   ├── seed/                     # Database reset & initialization
│   │   └── upload/                   # Cloudinary / Image asset upload handler
│   │
│   ├── globals.css                   # Global Tailwind CSS and custom scrollbars
│   └── layout.tsx                    # Root HTML document wrapper & LanguageProvider
│
├── components/                       # Feature-based Reusable React Components
│   ├── layout/                       # Structural layout elements
│   │   ├── Navbar.tsx                # Main top navigation bar & mobile drawer
│   │   └── Footer.tsx                # Footer with office address, links & legal notes
│   ├── hero/                         # Landing page hero components
│   │   └── HeroSection.tsx           # Main hero banner with quick property search
│   ├── property/                     # Property listing components
│   │   └── PropertyCard.tsx          # Reusable property card with badges & pricing
│   ├── admin/                        # Admin dashboard UI components
│   │   ├── AdminHeader.tsx           # Dashboard top header with user status
│   │   ├── AdminSidebar.tsx          # Dashboard left drawer navigation
│   │   └── PropertyForm.tsx          # Comprehensive property creation/edit form
│   ├── modals/                       # Interactive overlay modals
│   │   ├── ImageLightbox.tsx         # Full-screen image gallery lightbox
│   │   └── VideoPlayerModal.tsx      # Video walkthrough modal player
│   └── shared/                       # Cross-cutting UI utilities
│       ├── BackToTop.tsx             # Floating scroll-to-top action button
│       ├── LanguageSwitcher.tsx      # Language selector pill (EN / MR / HI)
│       └── ScrollReveal.tsx          # Smooth intersection-observer scroll animation
│
├── lib/                              # Services, Utilities & Infrastructure
│   ├── database/                     # Database connectivity
│   │   ├── db.ts                     # MongoDB Mongoose connection pooling
│   │   └── seedData.ts               # Default seed properties & mock records
│   ├── auth/                         # Authentication & Security
│   │   ├── auth.ts                   # Cookie extraction, bcrypt password hashing
│   │   └── jwt.ts                    # Edge-compatible Jose JWT token signing
│   └── utilities/                    # Helper functions & state
│       ├── utils.ts                  # Currency formatter ₹, Guntha/Acre converter
│       ├── translations.ts           # Trilingual dictionary (EN, MR, HI)
│       └── store.ts                  # In-memory + local JSON file fallback store
│
├── models/                           # Mongoose MongoDB Data Schemas
│   ├── Admin.ts                      # Admin user credentials schema
│   ├── Enquiry.ts                    # Customer enquiry lead schema
│   └── Property.ts                   # Comprehensive real estate property schema
│
├── types/                            # TypeScript Type Definitions & Interfaces
│   └── index.ts                      # PropertyItem, EnquiryItem, AdminItem interfaces
│
├── context/                          # React Context Providers
│   └── LanguageContext.tsx           # Language state management across the app
│
├── data/                             # Local Data Persistence
│   ├── properties.json               # Offline fallback backup of all properties
│   └── enquiries.json                # Offline fallback backup of customer leads
│
├── tests/                            # Performance & Automation Testing
│   └── k6/                           # Grafana k6 performance testing suite
│       ├── smoke-test.js             # Low-concurrency health check script
│       ├── load-test.js              # 25-VU multi-stage realistic user simulation
│       ├── stress-test.js            # 150-VU high-concurrency capacity stress test
│       └── README.md                 # Test execution commands & parameters
│
├── docs/                             # Academic & Architectural Documentation
│   ├── PROJECT_OVERVIEW.md           # Problem statement, objectives, architecture
│   ├── FOLDER_STRUCTURE.md           # Directory guide and beginner walkthrough
│   ├── PAGE_AND_COMPONENT_MAP.md     # Complete mapping of every page to code files
│   ├── API_DOCUMENTATION.md          # REST API specifications and payloads
│   └── DATABASE_DOCUMENTATION.md     # MongoDB schemas, indexes, and ER diagram
│
├── middleware.ts                     # Next.js Route Guard (protects /admin/*)
├── next.config.js                    # Next.js compiler & remote image CDN rules
├── tailwind.config.js                # Tailwind color palettes, fonts & breakpoints
├── tsconfig.json                     # TypeScript compiler settings & `@/*` alias
└── package.json                      # Project dependencies & npm scripts
```

---

## 🔍 Directory Breakdown & Purpose

### 1. `app/` — Next.js 14 App Router
Next.js uses a file-system based router:
- **Route Groups `(folder)`**: The parentheses in `app/(public)` tell Next.js to group routes logically without including `(public)` in the URL. So `app/(public)/properties/page.tsx` is reached simply at `https://website.com/properties`.
- **Dynamic Routes `[id]`**: Folders with brackets like `property/[id]` capture URL parameters dynamically (e.g., `/property/65a123` assigns `params.id = '65a123'`).
- **Layouts (`layout.tsx`)**: Reusable UI wrappers that preserve state across page transitions.
- **Route Handlers (`route.ts`)**: Server-side API endpoints responding to `GET`, `POST`, `PATCH`, `DELETE`.

### 2. `components/` — UI Component Architecture
Every visual UI element is partitioned by responsibility:
- **`components/layout/`**: Persistent frames (top navbar with language switcher, bottom footer with office contact info).
- **`components/hero/`**: First fold landing banner with interactive search filters.
- **`components/property/`**: Real estate card displaying thumbnail, price in Lakh/Crore, Guntha/Sq.ft badges, and wishlist toggle.
- **`components/admin/`**: Control panel widgets, sidebar navigation links, and property submission forms.
- **`components/modals/`**: Portals rendering video tours and image lightboxes without disrupting page flow.
- **`components/shared/`**: Reusable interactive widgets (ScrollReveal, BackToTop, LanguageSwitcher).

### 3. `lib/` — Business Logic & Utilities
Contains non-UI logic:
- **`lib/database/`**: Mongoose connection caching to prevent exhausting MongoDB Atlas connection limits in serverless functions.
- **`lib/auth/`**: JSON Web Token issuance and password comparison using bcrypt.
- **`lib/utilities/`**: Formatters (`₹ 45.00 L`, `3.5 Guntha`), translations dictionary, and JSON file store fallback.

### 4. `models/` & `types/` — Data Contracts
- `models/`: Mongoose schemas defining database tables, default values, and timestamps (`createdAt`, `updatedAt`).
- `types/index.ts`: TypeScript interfaces ensuring strict type safety between client components and backend APIs.

---

## 🧭 How to Find Code in 10 Seconds (Beginner Guide)

| If you want to change: | Go to this file: |
|---|---|
| The Homepage banner or title | `components/hero/HeroSection.tsx` or `app/(public)/page.tsx` |
| The top Navigation Bar or links | `components/layout/Navbar.tsx` |
| The Website Footer and office address | `components/layout/Footer.tsx` |
| How property cards look (price, badges) | `components/property/PropertyCard.tsx` |
| Marathi / Hindi / English translations | `lib/utilities/translations.ts` |
| Property fields in the database | `models/Property.ts` |
| Admin Dashboard navigation links | `components/admin/AdminSidebar.tsx` |
| Admin Property Add/Edit form | `components/admin/PropertyForm.tsx` |
| Global colors, fonts, or styling | `app/globals.css` or `tailwind.config.js` |
| Database connection logic | `lib/database/db.ts` |
| Public API endpoints | `app/api/properties/route.ts` |
