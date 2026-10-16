# 🗺️ Page and Component Mapping Specification

This document maps **every single page** in the **Purandhar Properties** application to its exact source files, UI components, styling locations, API endpoints, and database models.

---

## 🌐 Public Application Pages

### 1. Home Page (Landing Page)
- **1. Page Name & Purpose**: Home Landing Page — Main promotional showcase displaying the hero search bar, featured Purandhar listings, property types, virtual video walkthroughs, village spotlights, and trust badges.
- **2. Browser URL / Route**: `/`
- **3. Main Page File Path**: `app/(public)/page.tsx`
- **4. Hero Section File Path**: `components/hero/HeroSection.tsx` (Alias: `components/hero/Hero.tsx`)
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx` (Wrapped in `app/(public)/layout.tsx`)
- **6. Main Content Component Paths**:
  - `components/property/PropertyCard.tsx` (Property Cards Grid)
  - `components/modals/VideoPlayerModal.tsx` (Video Walkthrough Player)
  - `components/shared/ScrollReveal.tsx` (Scroll-triggered animations)
  - `components/shared/BackToTop.tsx` (Floating scroll button)
- **7. Footer File Path**: `components/layout/Footer.tsx` (Wrapped in `app/(public)/layout.tsx`)
- **8. CSS / Styling Location**: Tailwind CSS utility classes inside JSX, animations in `app/globals.css`
- **9. API Routes Used**: `GET /api/properties?publishStatus=Published` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`, fallback `data/properties.json`

---

### 2. Properties Catalog Page (Full Search & Filter)
- **1. Page Name & Purpose**: Property Catalog & Search Page — Complete searchable directory allowing users to filter by Property Type, Price Range, Bedrooms, Bathrooms, Furnishing, Amenities, and Sorting options with Grid/List views.
- **2. Browser URL / Route**: `/properties`
- **3. Main Page File Path**: `app/(public)/properties/page.tsx`
- **4. Hero Section File Path**: *None* (Has top search filter banner)
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**:
  - `components/property/PropertyCard.tsx`
  - `components/modals/VideoPlayerModal.tsx`
  - `components/shared/ScrollReveal.tsx`
  - `components/shared/BackToTop.tsx`
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS classes in `app/(public)/properties/page.tsx`
- **9. API Routes Used**: `GET /api/properties?query=...&location=...&propertyType=...` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`, fallback `data/properties.json`

---

### 3. Buy Properties Page
- **1. Page Name & Purpose**: Buy Land & Homes Page — Pre-filtered catalog displaying only properties with `listingType=Sale` (NA plots, farmhouses, agricultural lands for sale).
- **2. Browser URL / Route**: `/buy`
- **3. Main Page File Path**: `app/(public)/buy/page.tsx`
- **4. Hero Section File Path**: *None* (Reuses catalog with listingType filter)
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**: Redirects / renders catalog with `listingType=Sale` filter
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**: `GET /api/properties?listingType=Sale` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 4. Rent Properties Page
- **1. Page Name & Purpose**: Rental Listings Page — Pre-filtered catalog displaying properties available for rent or lease.
- **2. Browser URL / Route**: `/rent`
- **3. Main Page File Path**: `app/(public)/rent/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**: Reuses catalog with `listingType=Rent` filter
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**: `GET /api/properties?listingType=Rent` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 5. Commercial Properties Page
- **1. Page Name & Purpose**: Commercial Real Estate Page — Pre-filtered catalog for shops, commercial office buildings, and highway commercial plots.
- **2. Browser URL / Route**: `/commercial`
- **3. Main Page File Path**: `app/(public)/commercial/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**: Reuses catalog with `propertyType=Commercial Property` filter
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**: `GET /api/properties?propertyType=Commercial+Property` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 6. Property Detail Page
- **1. Page Name & Purpose**: Single Property Comprehensive View — Displays high-resolution image carousel, price breakdown (Lakh/Crore & Guntha rate), 7/12 extract status, video walkthrough, amenities grid, location map info, and direct enquiry submission form.
- **2. Browser URL / Route**: `/property/[id]` (e.g. `/property/65a1b2c3d4e5`)
- **3. Main Page File Path**: `app/(public)/property/[id]/page.tsx`
- **4. Hero Section File Path**: *None* (Has top image gallery banner)
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**:
  - `components/modals/ImageLightbox.tsx` (Fullscreen photo lightbox)
  - `components/modals/VideoPlayerModal.tsx` (Video tour modal)
  - Direct Enquiry Form component inside `page.tsx`
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS, responsive aspect ratio utilities
- **9. API Routes Used**:
  - `GET /api/properties/[id]` (`app/api/properties/[id]/route.ts`)
  - `POST /api/enquiries` (`app/api/enquiries/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`, `models/Enquiry.ts`

---

### 7. Saved Favorites Page (Wishlist)
- **1. Page Name & Purpose**: Client Wishlist Page — Reads saved property IDs from browser `localStorage` and presents all favorited properties in a responsive grid.
- **2. Browser URL / Route**: `/favorites`
- **3. Main Page File Path**: `app/(public)/favorites/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**:
  - `components/property/PropertyCard.tsx`
  - `components/modals/VideoPlayerModal.tsx`
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**: `GET /api/properties` (`app/api/properties/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`, `localStorage` key `purandhar_favorites`

---

### 8. Contact Us Page
- **1. Page Name & Purpose**: Contact & Consultation Page — Displays physical office address in Saswad, interactive Google Maps link, direct phone/WhatsApp links, and contact enquiry form.
- **2. Browser URL / Route**: `/contact`
- **3. Main Page File Path**: `app/(public)/contact/page.tsx`
- **4. Hero Section File Path**: Top contact header banner
- **5. Header & Navbar File Path**: `components/layout/Navbar.tsx`
- **6. Main Content Component Paths**: Direct inquiry form with submission handler
- **7. Footer File Path**: `components/layout/Footer.tsx`
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**: `POST /api/enquiries` (`app/api/enquiries/route.ts`)
- **10. Database Models & Data Sources**: `models/Enquiry.ts`

---

## 🔒 Protected Admin Portal Pages

### 9. Admin Login Page
- **1. Page Name & Purpose**: Admin Authentication Page — Secure login form accepting admin credentials, validating against bcrypt password hash, and issuing HTTP-only JWT cookie.
- **2. Browser URL / Route**: `/admin/login`
- **3. Main Page File Path**: `app/admin/login/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: *None* (Renders in dedicated full-screen layout)
- **6. Main Content Component Paths**: Centered credentials login card with stateful error handling
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS with dark slate theme
- **9. API Routes Used**: `POST /api/auth/login` (`app/api/auth/login/route.ts`)
- **10. Database Models & Data Sources**: `models/Admin.ts`, `lib/auth/auth.ts`

---

### 10. Admin Dashboard Overview
- **1. Page Name & Purpose**: Admin KPI Overview — Displays summary statistics (Total Properties, Published Listings, Pending Enquiries, Total Portfolio Value in ₹ Crores) and quick action buttons.
- **2. Browser URL / Route**: `/admin/dashboard`
- **3. Main Page File Path**: `app/admin/dashboard/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**:
  - `components/admin/AdminHeader.tsx` (Top bar)
  - `components/admin/AdminSidebar.tsx` (Sidebar Navigation)
- **6. Main Content Component Paths**: KPI Stat cards, Recent enquiries table, Quick links
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `GET /api/properties` (`app/api/properties/route.ts`)
  - `GET /api/enquiries` (`app/api/enquiries/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`, `models/Enquiry.ts`

---

### 11. Admin Properties Management Table
- **1. Page Name & Purpose**: Property Inventory Control — Full inventory table with filtering by status (Published, Draft, Archived), search by title/location, publish status toggling, and deletion.
- **2. Browser URL / Route**: `/admin/properties`
- **3. Main Page File Path**: `app/admin/properties/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/admin/AdminHeader.tsx`, `components/admin/AdminSidebar.tsx`
- **6. Main Content Component Paths**: Inventory table, Status badge filters, Delete confirmation modal
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `GET /api/properties?publishStatus=All` (`app/api/properties/route.ts`)
  - `PATCH /api/properties/[id]` (`app/api/properties/[id]/route.ts`)
  - `DELETE /api/properties/[id]` (`app/api/properties/[id]/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 12. Admin Add New Property Page
- **1. Page Name & Purpose**: Property Creation Form — Multi-section input form for adding Title, Description, Property Type (Plot, Farmhouse, Apartment), Price, Area (Guntha/Sq.Ft), Cover Image, Gallery Images, Video Tour URL, and Amenities.
- **2. Browser URL / Route**: `/admin/properties/new`
- **3. Main Page File Path**: `app/admin/properties/new/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/admin/AdminHeader.tsx`, `components/admin/AdminSidebar.tsx`
- **6. Main Content Component Paths**: `components/admin/PropertyForm.tsx`
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `POST /api/properties` (`app/api/properties/route.ts`)
  - `POST /api/upload` (`app/api/upload/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 13. Admin Edit Property Page
- **1. Page Name & Purpose**: Property Modification Page — Pre-populates the PropertyForm with existing data for editing specifications, updating pricing, or modifying gallery photos.
- **2. Browser URL / Route**: `/admin/properties/[id]/edit`
- **3. Main Page File Path**: `app/admin/properties/[id]/edit/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/admin/AdminHeader.tsx`, `components/admin/AdminSidebar.tsx`
- **6. Main Content Component Paths**: `components/admin/PropertyForm.tsx`
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `GET /api/properties/[id]` (`app/api/properties/[id]/route.ts`)
  - `PATCH /api/properties/[id]` (`app/api/properties/[id]/route.ts`)
- **10. Database Models & Data Sources**: `models/Property.ts`

---

### 14. Admin Customer Enquiries Page
- **1. Page Name & Purpose**: Lead & CRM Management — Lists all customer contact requests and plot inquiries with status toggles (`New`, `Contacted`, `Closed`).
- **2. Browser URL / Route**: `/admin/enquiries`
- **3. Main Page File Path**: `app/admin/enquiries/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/admin/AdminHeader.tsx`, `components/admin/AdminSidebar.tsx`
- **6. Main Content Component Paths**: Enquiries data table, Status selector, Direct phone/email actions
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `GET /api/enquiries` (`app/api/enquiries/route.ts`)
  - `PATCH /api/enquiries` (`app/api/enquiries/route.ts`)
- **10. Database Models & Data Sources**: `models/Enquiry.ts`

---

### 15. Admin Settings & System Page
- **1. Page Name & Purpose**: Administrative Configuration — Shows logged-in admin profile, security information, and provides a database seed/reset button.
- **2. Browser URL / Route**: `/admin/settings`
- **3. Main Page File Path**: `app/admin/settings/page.tsx`
- **4. Hero Section File Path**: *None*
- **5. Header & Navbar File Path**: `components/admin/AdminHeader.tsx`, `components/admin/AdminSidebar.tsx`
- **6. Main Content Component Paths**: Settings cards, Account info, Seed button
- **7. Footer File Path**: *None*
- **8. CSS / Styling Location**: Tailwind CSS
- **9. API Routes Used**:
  - `GET /api/auth/me` (`app/api/auth/me/route.ts`)
  - `POST /api/seed` (`app/api/seed/route.ts`)
- **10. Database Models & Data Sources**: `models/Admin.ts`
