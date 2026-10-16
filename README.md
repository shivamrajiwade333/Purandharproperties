# 🏡 Purandhar Properties - Real Estate Web Platform

> **Final Year Computer Science / IT Engineering Capstone Project**  
> A high-performance, bilingual (English & Marathi) real estate web portal tailored for agricultural land, NA residential plots, and villas in the Purandar / Pune region (Saswad, Jejuri, Narayanpur, Bhor, Hadapsar, Shirwal).

---

## 🌟 Key Features

- **⚡ Modern Architecture:** Built on Next.js 14 App Router, React 18, and TypeScript with full Server-Side Rendering (SSR) and Static Generation (SSG).
- **🎨 Premium UI / UX:** Tailwind CSS styling with glassmorphism cards, responsive hero banners, smooth interactive carousels, and bottom-right floating inquiry modals.
- **🌐 Bilingual Localization:** Instant one-click toggle between **English** and **मराठी (Marathi)** with persistent state.
- **📱 Direct Customer Connect:** One-click WhatsApp inquiries, direct telephonic calling, and structured visit booking forms.
- **🔒 Secure Admin Portal:** JWT cookie-authenticated dashboard for creating, editing, and managing property listings and CRM inquiries.
- **☁️ Resilient Dual Data Engine:** Works seamlessly with MongoDB Atlas via Mongoose ORM, and automatically falls back to an in-memory database if running offline for college viva demos.
- **🚀 Cloud & Local Media Uploads:** Direct upload to Cloudinary cloud storage with automatic local fallback to `/public/uploads/`.
- **📊 Verified High Performance:** Validated under k6 load tests with **99.98% success rate** and **sub-12ms average latency**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (Tested on v20 and v24)
- **npm** or **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/shivamrajiwade333/Purandharproperties.git
cd Purandharproperties

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory (optional for offline demo):
```env
# Database (Optional - defaults to in-memory fallback if omitted)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/purandhar_properties

# Authentication Secrets
JWT_SECRET=purandhar_super_secure_secret_key_2026
ADMIN_EMAIL=admin@realestate.com
ADMIN_PASSWORD=admin123

# Cloud Media Storage (Optional - defaults to local /public/uploads/ if omitted)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=
```

### 4. Running the Application
```bash
# Start development server
npm run dev
```
Open your browser and navigate to:
- **Public Portal:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Default Admin Credentials

For viva examiners and evaluators:
- **Login URL:** `/admin/login`
- **Email:** `admin@realestate.com`
- **Password:** `admin123`
- **One-click Seed:** Visit `/api/seed` or click "Seed Sample Data" inside the admin panel.

---

## 📁 Reorganized & Simplified Folder Structure

The project has been organized into modular, feature-focused folders to make navigation effortless for beginners and examiners:

```text
Purandharproperties/
├── app/                      # Next.js App Router (Pages & API Routes)
│   ├── (public)/             # All public-facing pages (Home, Listings, Detail, About, Contact)
│   ├── admin/                # Admin portal pages (Dashboard, Add/Edit Property, Enquiries)
│   └── api/                  # Backend REST API endpoints (Properties, Auth, Enquiries, Upload)
├── components/               # Modular UI Components organized by feature
│   ├── layout/               # Global Header, Navbar, Footer
│   ├── hero/                 # Homepage Hero sections & search bars
│   ├── property/             # Property cards, badges, grids
│   ├── modals/               # Video player modals, image lightboxes, inquiry popups
│   ├── shared/               # Reusable widgets (Language switcher, Back-to-top, Scroll reveal)
│   └── admin/                # Admin-specific navigation, sidebar, and forms
├── lib/                      # Core business logic, backend utilities & configurations
│   ├── database/             # MongoDB connection pooling & seed data
│   ├── auth/                 # JWT signing, password hashing & cookie auth
│   └── utilities/            # Helper functions, in-memory store & translations
├── models/                   # Mongoose data schemas (Property, Enquiry, Admin)
├── types/                    # TypeScript interfaces and type definitions
├── docs/                     # 📚 Complete project documentation & viva guides
└── public/                   # Static media, regional imagery, and user uploads
```

---

## 📚 Comprehensive Documentation Suite

For in-depth explanations, refer to the detailed documentation files inside the `docs/` folder:

1. **[docs/PROJECT_OVERVIEW.md](file:///c:/Users/omraj/OneDrive/Desktop/bw/docs/PROJECT_OVERVIEW.md)**  
   *Academic abstract, system architecture diagram, complete tech stack justification, and k6 benchmark metrics.*
2. **[docs/FOLDER_STRUCTURE.md](file:///c:/Users/omraj/OneDrive/Desktop/bw/docs/FOLDER_STRUCTURE.md)**  
   *Visual directory tree, folder responsibilities, and 10-second code finder guide for examiners.*
3. **[docs/PAGE_AND_COMPONENT_MAP.md](file:///c:/Users/omraj/OneDrive/Desktop/bw/docs/PAGE_AND_COMPONENT_MAP.md)**  
   *Step-by-step mapping connecting all 15 public and admin pages to their underlying components and CSS classes.*
4. **[docs/API_DOCUMENTATION.md](file:///c:/Users/omraj/OneDrive/Desktop/bw/docs/API_DOCUMENTATION.md)**  
   *REST API reference detailing query parameters, authentication cookies, request/response bodies, and HTTP status codes.*
5. **[docs/DATABASE_DOCUMENTATION.md](file:///c:/Users/omraj/OneDrive/Desktop/bw/docs/DATABASE_DOCUMENTATION.md)**  
   *Mongoose schemas, ER diagram, indexing strategy, regional land metrics (Guntha/Acre conversions), and offline fallback.*

---

## 🎨 HTML & CSS Styling Guide

This project uses **Tailwind CSS** (utility-first CSS). Rather than writing separate `.css` files for every button or card, styling is declared directly within the JSX elements using Tailwind utility classes:

- **Global Styles & CSS Variables:** Located at [`app/globals.css`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/globals.css)
- **Tailwind Configuration:** [`tailwind.config.js`](file:///c:/Users/omraj/OneDrive/Desktop/bw/tailwind.config.js)
- **Locating Styles for Any Element:**
  1. Open the component file in `components/` (e.g. `components/property/PropertyCard.tsx`).
  2. Inspect the `className="..."` string.
  3. Examples:
     - `bg-blue-600 hover:bg-blue-700` = Blue background with darker hover state.
     - `rounded-2xl shadow-xl` = Rounded border with drop shadow.
     - `grid grid-cols-1 md:grid-cols-3 gap-6` = 1 column on mobile, 3 columns on tablet/desktop with 24px gap.

---

## 🧪 Testing & Load Benchmarks

The project includes an automated **k6 load test suite** located in `tests/k6/load-test.js`:
- **Simulated Concurrency:** 20 virtual users (VUs) over 30 seconds
- **Total Requests Executed:** 5,595 requests
- **Success Rate:** 99.98%
- **Average Latency:** 11.87 ms (p95: 31.95 ms)

---

## 👨‍💻 Project Information

- **Developer:** Shivam Rajiwade & Team
- **Course:** Final Year B.Tech / B.E. Computer Engineering
- **Institution:** Savitribai Phule Pune University (SPPU)
- **Academic Year:** 2025–2026
