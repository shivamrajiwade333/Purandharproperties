# 🗺️ Page and Component Mapping Specification

This document provides a comprehensive, verified mapping of **every single page and route** in the **Purandhar Properties** web application to its source `.tsx` files, standalone and embedded UI components, CSS/Tailwind classes, backend API calls, and Mongoose data models.

> **Verification Guarantee:** Every component, file path, and line number listed in this document has been verified against the physical codebase files. No non-existent files or fabricated components are included.

---

## 📑 Quick Navigation & Page Inventory

| # | Page / Route | Main File Path | Primary Purpose | Hero / Header Banner |
|---|---|---|---|---|
| 1 | `/` (Home) | `app/(public)/page.tsx` | Main marketing portal, featured listings & video tours | `components/hero/HeroSection.tsx` |
| 2 | `/properties` | `app/(public)/properties/page.tsx` | Search catalog with multi-filter sidebar & sort | Built-in Catalog Header & Search Bar |
| 3 | `/property/[id]` | `app/(public)/property/[id]/page.tsx` | Full property listing details, photo lightbox, inquiry form | Interactive Gallery & Highlights Banner |
| 4 | `/buy` | `app/(public)/buy/page.tsx` | Redirects to properties for sale | N/A (Redirect to `/properties?listingType=Sale`) |
| 5 | `/rent` | `app/(public)/rent/page.tsx` | Redirects to rental properties | N/A (Redirect to `/properties?listingType=Rent`) |
| 6 | `/commercial` | `app/(public)/commercial/page.tsx` | Redirects to commercial plots/shops | N/A (Redirect to `/properties?propertyType=Commercial+Property`) |
| 7 | `/contact` | `app/(public)/contact/page.tsx` | Contact info, map, inquiry form & branch offices | Built-in Page Title & Header Section |
| 8 | `/favorites` | `app/(public)/favorites/page.tsx` | Saved favorite listings (localStorage synced) | Built-in Shortlist Header Section |
| 9 | `/admin/login` | `app/admin/login/page.tsx` | Secure admin login & JWT session creation | Floating Centered Auth Modal |
| 10 | `/admin/dashboard` | `app/admin/dashboard/page.tsx` | Metric cards, quick actions & listings table | `components/admin/AdminHeader.tsx` |
| 11 | `/admin/properties` | `app/admin/properties/page.tsx` | Manage all listings, search, toggle publish, delete | `components/admin/AdminHeader.tsx` |
| 12 | `/admin/properties/new` | `app/admin/properties/new/page.tsx` | Create new listing with photo/video upload | `components/admin/AdminHeader.tsx` |
| 13 | `/admin/properties/[id]/edit` | `app/admin/properties/[id]/edit/page.tsx` | Modify existing property record | `components/admin/AdminHeader.tsx` |
| 14 | `/admin/enquiries` | `app/admin/enquiries/page.tsx` | CRM lead pipeline, status triage (`New`/`Contacted`/`Closed`) | `components/admin/AdminHeader.tsx` |
| 15 | `/admin/settings` | `app/admin/settings/page.tsx` | System credentials, database status, sample data seed | `components/admin/AdminHeader.tsx` |

---

## 🌐 Public Pages Detail

### 1. Home Page (`/`)
- **URL Route:** `/`
- **Main Page File:** [`app/(public)/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/page.tsx)
- **Layout File:** [`app/(public)/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/layout.tsx)
- **Hero Component:** [`components/hero/HeroSection.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/hero/HeroSection.tsx) (Re-exported in `components/hero/Hero.tsx`)
- **Navbar Component:** [`components/layout/Navbar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Navbar.tsx)
- **Footer Component:** [`components/layout/Footer.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Footer.tsx)
- **Other Components Used:**
  - [`components/property/PropertyCard.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/property/PropertyCard.tsx) (Featured & Latest properties grid)
  - [`components/modals/VideoPlayerModal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/VideoPlayerModal.tsx) (Pop-up video player for property tours)
  - [`components/shared/ScrollReveal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/ScrollReveal.tsx) (Animation wrapper)
  - [`components/shared/BackToTop.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/BackToTop.tsx) (Floating smooth scroll button)
- **Hidden / Embedded Sub-Components (in `app/(public)/page.tsx`):**
  - **Property Types Grid:** Lines 149–174 (Interactive categories for Apartment, Villa, Plot, Commercial, Farmhouse).
  - **Virtual Video Walkthroughs Banner:** Lines 178–237 (Dark-themed showcase with play overlay button).
  - **Purandar Villages Spotlight:** Lines 274–313 (Cards for Saswad, Jejuri, Narayanpur, Dive).
  - **Why Choose Us Advantage Cards:** Lines 316–379 (Verified legal status, direct owners, virtual tours, local support).
- **CSS / Styling Location:** Tailwind CSS inline classes with custom slate/navy color scheme; background blur in `app/globals.css`.
- **API Calls:** `GET /api/properties?publishStatus=Published`
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts), fallback to [`lib/utilities/store.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/lib/utilities/store.ts) and `data/properties.json`.

---

### 2. Properties Search & Catalog Page (`/properties`)
- **URL Route:** `/properties`
- **Main Page File:** [`app/(public)/properties/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/properties/page.tsx)
- **Layout File:** [`app/(public)/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/layout.tsx)
- **Hero Component:** *None* (Uses integrated top search header).
- **Navbar Component:** [`components/layout/Navbar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Navbar.tsx)
- **Footer Component:** [`components/layout/Footer.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Footer.tsx)
- **Other Components Used:**
  - [`components/property/PropertyCard.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/property/PropertyCard.tsx)
  - [`components/modals/VideoPlayerModal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/VideoPlayerModal.tsx)
  - [`components/shared/ScrollReveal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/ScrollReveal.tsx)
- **Hidden / Embedded Sub-Components (in `app/(public)/properties/page.tsx`):**
  - **`SearchCatalogContent()`:** Lines 25–420 (Client-side interactive state, search params sync, layout switcher).
  - **Top Search & Reset Bar:** Lines 112–132 (Input search, count badge, reset filters button).
  - **Mobile Filters Drawer Modal:** Lines 135–245 (Full-screen mobile filter drawer with sliding animation).
  - **Desktop Sticky Filter Sidebar:** Lines 248–340 (Sidebar card with range sliders, property type pills, BHK buttons, amenity checkboxes).
  - **Sort & View Mode Switcher:** Lines 344–366 (Price asc/desc, newest, area desc, grid vs list view toggle).
  - **`PropertiesCatalogPage()` Root Export:** Lines 422–432 (Suspense wrapper around `SearchCatalogContent`).
- **CSS / Styling Location:** Tailwind classes (`grid grid-cols-1 lg:grid-cols-4`, `sticky top-24`).
- **API Calls:** `GET /api/properties?query=...&location=...&propertyType=...&minPrice=...&maxPrice=...&sortBy=...`
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts).

---

### 3. Property Detail Page (`/property/[id]`)
- **URL Route:** `/property/[id]` (e.g., `/property/2-guntha-scenic-farm-land-near-jejuri-4821`)
- **Main Page File:** [`app/(public)/property/[id]/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/property/[id]/page.tsx)
- **Layout File:** [`app/(public)/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/layout.tsx)
- **Hero Component:** *None* (Has hero photo gallery with thumbnails and lightbox launcher).
- **Navbar Component:** [`components/layout/Navbar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Navbar.tsx)
- **Footer Component:** [`components/layout/Footer.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Footer.tsx)
- **Other Components Used:**
  - [`components/modals/ImageLightbox.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/ImageLightbox.tsx) (Full-screen zoomable image viewer)
  - [`components/modals/VideoPlayerModal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/VideoPlayerModal.tsx) (Video tour dialog)
- **Hidden / Embedded Sub-Components (in `app/(public)/property/[id]/page.tsx`):**
  - **Image Gallery & Carousel:** Lines 180–252 (Main cover display, thumbnail strip, image count pill, video tour button).
  - **Key Highlights Bar:** Lines 260–330 (Price formatting in Lakh/Cr, Guntha/Sq Ft area display, BHK badges).
  - **Detailed Land Specifications Table:** Lines 332–385 (Carpet area, floor, total floors, deposit, maintenance, parking).
  - **Amenities & Features Checklist:** Lines 388–460 (Fencing, road touch, water connection, electricity).
  - **Direct Inquiry & WhatsApp Sidebar Form:** Lines 465–545 (Sticky contact card with instant call, WhatsApp, and form submission to `/api/enquiries`).
  - **Floating Consultation Popup:** Lines 555–645 (Bottom-right animated lead capture card triggered after scrolling 400px).
- **CSS / Styling Location:** Tailwind flexbox & grid (`lg:grid-cols-3`, `sticky top-24`).
- **API Calls:**
  - `GET /api/properties/[id]` (Fetches property details and auto-increments `viewsCount`)
  - `POST /api/enquiries` (Sends customer inquiry)
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts), [`models/Enquiry.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Enquiry.ts).

---

### 4. Buy, Rent, and Commercial Redirect Pages
- **Buy Page:** [`app/(public)/buy/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/buy/page.tsx)
  - Next.js server-side redirect: `redirect('/properties?listingType=Sale')`
- **Rent Page:** [`app/(public)/rent/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/rent/page.tsx)
  - Next.js server-side redirect: `redirect('/properties?listingType=Rent')`
- **Commercial Page:** [`app/(public)/commercial/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/commercial/page.tsx)
  - Next.js server-side redirect: `redirect('/properties?propertyType=Commercial+Property')`

---

### 5. Contact Page (`/contact`)
- **URL Route:** `/contact`
- **Main Page File:** [`app/(public)/contact/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/contact/page.tsx)
- **Layout File:** [`app/(public)/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/layout.tsx)
- **Navbar / Footer:** [`Navbar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Navbar.tsx) & [`Footer.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Footer.tsx)
- **Hidden / Embedded Sub-Components (in `app/(public)/contact/page.tsx`):**
  - **Direct Office Information Cards:** Lines 64–105 (Address, Hotline +91 98765 43210, Email, Working hours).
  - **Contact Form Card:** Lines 107–168 (`handleSubmit`, name, phone, email, message inputs, success banner).
  - **Embedded Google Maps Frame:** Lines 170–220 (Interactive Purandar taluka location map).
- **CSS / Styling Location:** Tailwind classes.
- **API Calls:** `POST /api/enquiries`
- **Data Models Involved:** [`models/Enquiry.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Enquiry.ts).

---

### 6. Saved Favorites Page (`/favorites`)
- **URL Route:** `/favorites`
- **Main Page File:** [`app/(public)/favorites/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/favorites/page.tsx)
- **Layout File:** [`app/(public)/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/(public)/layout.tsx)
- **Navbar / Footer:** Standard public layout.
- **Other Components Used:** [`PropertyCard.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/property/PropertyCard.tsx), [`VideoPlayerModal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/VideoPlayerModal.tsx).
- **Hidden / Embedded Sub-Components:**
  - **Empty State Card:** Lines 92–115 (Renders illustration and "Explore Properties" button when no items are bookmarked).
- **API Calls:** `GET /api/properties` (Filters by ID array stored in browser `localStorage`).
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts).

---

## 🔒 Admin Portal Pages

### 7. Admin Login Page (`/admin/login`)
- **URL Route:** `/admin/login`
- **Main Page File:** [`app/admin/login/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/login/page.tsx)
- **Layout File:** [`app/admin/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/layout.tsx) (Special rule: when on `/admin/login`, renders full-screen without sidebar).
- **Hero / Header:** *None* (Dark-themed glassmorphism login card).
- **Navbar / Footer:** *None* (Protected isolated login view).
- **Hidden / Embedded Sub-Components (in `app/admin/login/page.tsx`):**
  - **`AdminLoginFormContent()`:** Lines 7–175 (Client component with session auto-clear, credentials form, error banner).
  - **Quick Demo Fill Button:** Lines 58–61 (`handleQuickFillDemo` pre-fills `admin@realestate.com` and `admin123`).
  - **`AdminLoginPage()` Root Export:** Lines 177–185 (Wrapped in `<Suspense>`).
- **CSS / Styling Location:** Dark mode theme (`bg-slate-950`, `border-slate-800`).
- **API Calls:**
  - `POST /api/auth/logout` (Ensures clean login state on arrival)
  - `POST /api/auth/login` (Validates password hash and sets `admin_token` cookie)
- **Data Models Involved:** [`models/Admin.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Admin.ts).

---

### 8. Admin Dashboard (`/admin/dashboard`)
- **URL Route:** `/admin/dashboard`
- **Main Page File:** [`app/admin/dashboard/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/dashboard/page.tsx)
- **Layout File:** [`app/admin/layout.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/layout.tsx) (Provides [`AdminSidebar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminSidebar.tsx)).
- **Header Component:** [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx)
- **Hidden / Embedded Sub-Components (in `app/admin/dashboard/page.tsx`):**
  - **Metric Stat Cards:** Lines 138–195 (Total Properties, Active Listings, Total Enquiries, Estimated Valuation).
  - **Recent Properties Management Table:** Lines 218–320 (Thumbnail preview, title, price, publish status badge, quick actions).
  - **Live Publish Toggle Switch:** Lines 76–91 (`handleTogglePublish` toggles between `Published` and `Draft`).
  - **Recent Inquiries Preview List:** Lines 325–375 (Customer contact name, mobile number, message preview, timestamp).
  - **Delete Confirmation Modal:** Lines 377–382 (Safe deletion confirmation modal).
- **CSS / Styling Location:** Clean administrative table styling (`bg-white rounded-2xl border border-slate-200`).
- **API Calls:**
  - `GET /api/auth/me` (Auth guard)
  - `GET /api/properties?publishStatus=All`
  - `GET /api/enquiries`
  - `PUT /api/properties/[id]` (Publish status toggle)
  - `DELETE /api/properties/[id]` (Delete property)
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts), [`models/Enquiry.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Enquiry.ts).

---

### 9. Admin Properties Management (`/admin/properties`)
- **URL Route:** `/admin/properties`
- **Main Page File:** [`app/admin/properties/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/properties/page.tsx)
- **Header Component:** [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx)
- **Hidden / Embedded Sub-Components:**
  - **Search & Filter Controls:** Lines 102–145 (Search query input, type selector, publish status dropdown).
  - **Master Listings Table:** Lines 150–280 (Row item with property image, city, price, views counter, live toggle switch, edit link, delete button).
  - **Delete Modal Dialog:** Lines 285–298.
- **API Calls:** `GET /api/properties?publishStatus=All`, `PUT /api/properties/[id]`, `DELETE /api/properties/[id]`.

---

### 10. Add New Property (`/admin/properties/new`) & Edit (`/admin/properties/[id]/edit`)
- **Add Page File:** [`app/admin/properties/new/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/properties/new/page.tsx)
- **Edit Page File:** [`app/admin/properties/[id]/edit/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/properties/[id]/edit/page.tsx)
- **Header Component:** [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx)
- **Core Form Component:** [`components/admin/PropertyForm.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/PropertyForm.tsx) (Unified form for creating and updating).
- **Hidden / Embedded Sub-Components (in `components/admin/PropertyForm.tsx`):**
  - **Media Upload Manager:** Lines 97–150 (Drag & drop or file picker uploading photos/videos to `/api/upload` via Cloudinary/local storage).
  - **General Listing Details Section:** Lines 255–340 (Title, Description, Category, Listing Type, Availability, Featured).
  - **Pricing & Charges Section:** Lines 345–410 (Price, Monthly Maintenance, Security Deposit).
  - **Regional Location Section:** Lines 415–495 (Street address, City/Town, PIN code, Latitude, Longitude).
  - **Land & Property Specifications:** Lines 500–610 (Bedrooms, Bathrooms, Balconies, Super Built-up Area, Carpet Area, Parking, Furnishing).
  - **Amenities Multi-Selector:** Lines 615–680 (Interactive badge checklist for road, water, fence, etc.).
  - **Contact & Agent Details:** Lines 785–845 (Owner name, contact phone, WhatsApp number, email).
- **API Calls:** `POST /api/upload`, `POST /api/properties`, `PUT /api/properties/[id]`.
- **Data Models Involved:** [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts).

---

### 11. Customer Enquiries CRM (`/admin/enquiries`)
- **URL Route:** `/admin/enquiries`
- **Main Page File:** [`app/admin/enquiries/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/enquiries/page.tsx)
- **Header Component:** [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx)
- **Hidden / Embedded Sub-Components:**
  - **Status Filter Tabs:** Lines 76–99 (`All`, `New`, `Contacted`, `Closed`).
  - **Lead Card / Table Item:** Lines 110–210 (Customer name, click-to-call link, email link, inquiry timestamp, status dropdown).
  - **Status Update Handler:** Lines 33–47 (`handleUpdateStatus` triggers `PATCH /api/enquiries`).
- **API Calls:** `GET /api/enquiries`, `PATCH /api/enquiries`, `DELETE /api/enquiries`.
- **Data Models Involved:** [`models/Enquiry.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Enquiry.ts).

---

### 12. Admin Settings & Database Utilities (`/admin/settings`)
- **URL Route:** `/admin/settings`
- **Main Page File:** [`app/admin/settings/page.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/app/admin/settings/page.tsx)
- **Header Component:** [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx)
- **Hidden / Embedded Sub-Components:**
  - **Admin Credentials Card:** Lines 41–58 (Shows active admin email and super-admin privilege level).
  - **Database & Storage Status Card:** Lines 61–88 (Explains Mongoose connection state and Cloudinary/local upload provider).
  - **One-Click Re-Seed Button:** Lines 91–120 (Calls `/api/seed` to reset sample properties, inquiries, and admin account).
- **API Calls:** `POST /api/seed`
- **Data Models Involved:** [`models/Admin.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Admin.ts), [`models/Property.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Property.ts), [`models/Enquiry.ts`](file:///c:/Users/omraj/OneDrive/Desktop/bw/models/Enquiry.ts).

---

## 🎨 Global Layout & Reusable Component Registry

| Component Name | File Location | Purpose & Hidden Details |
|---|---|---|
| **`Navbar`** | [`components/layout/Navbar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Navbar.tsx) | Sticky top navigation. **Hidden feature:** Triple-click on the logo (lines 32–61) triggers secret shortcut to `/admin/login`. Live favorites counter (lines 23–31). |
| **`Footer`** | [`components/layout/Footer.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/layout/Footer.tsx) | Multi-column footer. **Hidden feature:** Triple-click on footer logo (lines 15–33) also routes to `/admin/login`. |
| **`HeroSection`** | [`components/hero/HeroSection.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/hero/HeroSection.tsx) | High-impact hero banner with background overlay, Buy/Rent/All tabs, and interactive location & type search bar. |
| **`PropertyCard`** | [`components/property/PropertyCard.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/property/PropertyCard.tsx) | Listing card with image zoom, price formatting, Guntha/Sq Ft conversion, favorite heart toggle, and video badge. |
| **`VideoPlayerModal`** | [`components/modals/VideoPlayerModal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/VideoPlayerModal.tsx) | Responsive modal dialog supporting YouTube embeds and direct MP4 Cloudinary video streaming. |
| **`ImageLightbox`** | [`components/modals/ImageLightbox.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/modals/ImageLightbox.tsx) | Full-screen image viewer with keyboard navigation (`Left`/`Right` arrows) and zoom. |
| **`LanguageSwitcher`**| [`components/shared/LanguageSwitcher.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/LanguageSwitcher.tsx)| One-click toggle between English (`en`), Marathi (`mr`), and Hindi (`hi`). |
| **`BackToTop`** | [`components/shared/BackToTop.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/BackToTop.tsx) | Smooth animated floating scroll-to-top button appearing after 300px scroll. |
| **`ScrollReveal`** | [`components/shared/ScrollReveal.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/shared/ScrollReveal.tsx) | Intersection Observer animation wrapper supporting `fade-up`, `pop-up`, `zoom-in`. |
| **`AdminSidebar`** | [`components/admin/AdminSidebar.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminSidebar.tsx) | Fixed left navigation with mobile drawer for all admin views. |
| **`AdminHeader`** | [`components/admin/AdminHeader.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/AdminHeader.tsx) | Uniform top header for admin pages with "Add Property" and "Public Site" action buttons. |
| **`PropertyForm`** | [`components/admin/PropertyForm.tsx`](file:///c:/Users/omraj/OneDrive/Desktop/bw/components/admin/PropertyForm.tsx) | 874-line unified property creation and editing form with file uploads. |
