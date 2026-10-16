# REST API Documentation - Purandhar Properties

This document provides a comprehensive specification of all backend REST API endpoints available in the Purandhar Properties application.

---

## 1. Overview & Architecture

- **Base URL:** `/api`
- **Response Format:** JSON (`application/json`)
- **Protocol:** HTTP/HTTPS
- **Dual Mode Data Engine:**
  - When MongoDB URI (`MONGODB_URI`) is configured, queries execute via **Mongoose ORM**.
  - If MongoDB is disconnected or in offline demo mode, endpoints automatically fall back to **in-memory thread-safe state** (`lib/utilities/store.ts`). No server restart or code changes required.

---

## 2. Authentication & Authorization

Protected admin endpoints verify an HTTP-only secure cookie named `admin_token`.

| Header / Cookie | Type | Description |
|---|---|---|
| `admin_token` | Cookie (`HttpOnly`, `SameSite=Lax`) | JSON Web Token (JWT) signed with `JWT_SECRET` containing admin email, name, and role. |

- If a non-authenticated client calls a protected route, the API responds with:
  ```json
  {
    "error": "Unauthorized admin access required"
  }
  ```
  Status Code: `401 Unauthorized`

---

## 3. Properties API Endpoints

### 3.1. List & Filter Properties
Retrieve a paginated/filtered list of properties.

- **Endpoint:** `GET /api/properties`
- **Access:** Public (Only `Published` properties returned to public; Admin token reveals `Draft` and `Published`).
- **Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `query` | `string` | optional | Free text search across title, description, city, address |
| `location` / `city` | `string` | `'All'` | Regional location filter (e.g. `Saswad`, `Jejuri`, `Hadapsar`) |
| `propertyType` | `string` | `'All'` | Filter by type: `Agricultural Land`, `NA Plot`, `Villa`, `Apartment`, `Commercial` |
| `listingType` | `string` | `'All'` | Filter by transaction type: `Sale` or `Rent` |
| `minPrice` | `number` | optional | Minimum price in INR |
| `maxPrice` | `number` | optional | Maximum price in INR |
| `bedrooms` | `string` | `'All'` | Number of bedrooms: `1`, `2`, `3`, `4+` |
| `bathrooms` | `string` | `'All'` | Number of bathrooms |
| `furnishing` | `string` | `'All'` | `Furnished`, `Semi-Furnished`, `Unfurnished` |
| `parking` | `string` | `'All'` | Parking availability |
| `featured` | `boolean` | optional | `true` to fetch only featured listings, `false` otherwise |
| `status` | `string` | `'All'` | Availability status: `Available`, `Sold`, `Rented` |
| `publishStatus` | `string` | `'Published'` | `Published` or `Draft` |
| `sortBy` | `string` | `'newest'` | Sort order: `newest`, `price_asc`, `price_desc`, `area_desc`, `featured` |

- **Sample Request:**
  ```http
  GET /api/properties?location=Saswad&propertyType=Agricultural%20Land&sortBy=price_asc
  ```

- **Sample Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "651d9e4a8b1c2d3e4f5a6b7c",
        "title": "2 Guntha Scenic Farm Land near Jejuri",
        "slug": "2-guntha-scenic-farm-land-near-jejuri-4821",
        "description": "Fertile agricultural land with road access, water connection and mountain view.",
        "propertyType": "Agricultural Land",
        "listingType": "Sale",
        "price": 850000,
        "maintenance": 0,
        "deposit": 0,
        "address": "Opposite Jejuri Temple Road, Taluka Purandar",
        "city": "Jejuri",
        "state": "Maharashtra",
        "pincode": "412303",
        "bedrooms": 0,
        "bathrooms": 0,
        "area": 2178,
        "parking": "Open",
        "furnishing": "Unfurnished",
        "amenities": ["Water Connection", "Fenced Boundary", "Tar Road Touch"],
        "images": ["/uploads/farm1.jpg"],
        "videos": [{ "url": "https://www.youtube.com/embed/dQw4w9WgXcQ", "title": "Drone Tour" }],
        "coverImage": "/uploads/farm1.jpg",
        "featured": true,
        "status": "Available",
        "publishStatus": "Published",
        "ownerName": "Purandhar Realty Desk",
        "phone": "+91 98765 43210",
        "whatsapp": "+919876543210",
        "email": "contact@purandharproperties.com",
        "viewsCount": 142,
        "createdAt": "2026-10-01T10:00:00.000Z",
        "updatedAt": "2026-10-15T12:00:00.000Z"
      }
    ]
  }
  ```

---

### 3.2. Create Property
Add a new property listing to the platform.

- **Endpoint:** `POST /api/properties`
- **Access:** Admin Protected (`admin_token` cookie required)
- **Request Body (JSON):**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | **Yes** | Listing headline |
| `propertyType` | `string` | **Yes** | e.g. `'Agricultural Land'`, `'Villa'` |
| `listingType` | `string` | **Yes** | `'Sale'` or `'Rent'` |
| `price` | `number` | **Yes** | Total price or monthly rent |
| `city` | `string` | **Yes** | e.g. `'Saswad'` |
| `address` | `string` | **Yes** | Street/location detail |
| `state` | `string` | **Yes** | e.g. `'Maharashtra'` |
| `pincode` | `string` | **Yes** | 6-digit postal code |
| `area` | `number` | **Yes** | Square feet area |
| `bedrooms` | `number` | No | Bedroom count (0 for land) |
| `bathrooms` | `number` | No | Bathroom count |
| `amenities` | `string[]`| No | Array of amenity strings |
| `images` | `string[]`| No | Array of image URLs |
| `videoUrl` | `string` | No | Optional video tour link |
| `featured` | `boolean` | No | Display on homepage showcase |
| `publishStatus` | `string` | No | `'Published'` or `'Draft'` |
| `ownerName` | `string` | **Yes** | Contact person / agency |
| `phone` | `string` | **Yes** | Direct calling number |
| `whatsapp` | `string` | **Yes** | WhatsApp chat number |
| `email` | `string` | **Yes** | Contact email |

- **Sample Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "670f5e1a2b3c4d5e6f7a8b9c",
      "slug": "prime-residential-plot-saswad-7104",
      "title": "Prime Residential Plot Saswad",
      "propertyType": "NA Plot",
      "price": 1500000,
      "viewsCount": 0
    }
  }
  ```

---

### 3.3. Get Property by ID or Slug
Fetch complete details for a single property. Automatically increments `viewsCount`.

- **Endpoint:** `GET /api/properties/[id]`
- **Access:** Public
- **URL Parameter:** `[id]` can be either a 24-character MongoDB `ObjectId` or the human-readable SEO `slug`.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "651d9e4a8b1c2d3e4f5a6b7c",
      "slug": "2-guntha-scenic-farm-land-near-jejuri-4821",
      "viewsCount": 143
    }
  }
  ```
- **Error Response (404 Not Found):**
  ```json
  {
    "error": "Property not found"
  }
  ```

---

### 3.4. Update Property
Modify an existing property record.

- **Endpoint:** `PUT /api/properties/[id]`
- **Access:** Admin Protected
- **URL Parameter:** `[id]` (ObjectId or slug)
- **Request Body (JSON):** Any partial or full property fields to update.
- **Response (200 OK):** Returns the updated document.

---

### 3.5. Delete Property
Remove a property from the database or in-memory store.

- **Endpoint:** `DELETE /api/properties/[id]`
- **Access:** Admin Protected
- **URL Parameter:** `[id]` (ObjectId or slug)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Property deleted successfully"
  }
  ```

---

## 4. Enquiries API Endpoints

### 4.1. Submit Customer Enquiry / Consultation
Triggered by property detail enquiry forms and the floating consultation popup.

- **Endpoint:** `POST /api/enquiries`
- **Access:** Public
- **Request Body (JSON):**

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | **Yes** | Customer full name |
| `phone` | `string` | **Yes** | Customer 10-digit mobile number |
| `email` | `string` | **Yes** | Valid customer email address |
| `message` | `string` | **Yes** | Message or requested consultation time |
| `propertyId` | `string` | No | ID of associated property (if inquiring on listing) |
| `propertyTitle` | `string` | No | Title of associated property |

- **Sample Request:**
  ```json
  {
    "name": "Rohan Deshmukh",
    "phone": "9822012345",
    "email": "rohan.deshmukh@example.com",
    "message": "Interested in site inspection for Saswad plots this Saturday.",
    "propertyTitle": "2 Guntha Scenic Farm Land near Jejuri"
  }
  ```

- **Sample Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully",
    "data": {
      "_id": "670f5e1a2b3c4d5e6f7a8b9d",
      "name": "Rohan Deshmukh",
      "status": "New",
      "createdAt": "2026-10-16T09:30:00.000Z"
    }
  }
  ```

---

### 4.2. List All Enquiries
Retrieve customer inquiries for CRM management in admin dashboard.

- **Endpoint:** `GET /api/enquiries`
- **Access:** Admin Protected
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 12,
    "data": [
      {
        "_id": "670f5e1a2b3c4d5e6f7a8b9d",
        "name": "Rohan Deshmukh",
        "phone": "9822012345",
        "email": "rohan.deshmukh@example.com",
        "message": "Interested in site inspection...",
        "status": "New",
        "createdAt": "2026-10-16T09:30:00.000Z"
      }
    ]
  }
  ```

---

### 4.3. Update Enquiry Status
Cycle customer status between lead stages (`New` -> `Contacted` -> `Closed`).

- **Endpoint:** `PATCH /api/enquiries`
- **Access:** Admin Protected
- **Request Body (JSON):**
  ```json
  {
    "id": "670f5e1a2b3c4d5e6f7a8b9d",
    "status": "Contacted"
  }
  ```
- **Response (200 OK):** Returns updated enquiry object.

---

### 4.4. Delete Enquiry
Remove an inquiry record.

- **Endpoint:** `DELETE /api/enquiries?id=[enquiry_id]`
- **Access:** Admin Protected
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Enquiry deleted"
  }
  ```

---

## 5. Authentication Endpoints

### 5.1. Admin Login
Authenticate administrative credentials and receive secure HTTP-only session cookie.

- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Request Body (JSON):**
  ```json
  {
    "email": "admin@realestate.com",
    "password": "admin123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "email": "admin@realestate.com",
      "name": "Super Admin",
      "role": "admin"
    }
  }
  ```
  *(Cookie `admin_token` is attached to response headers)*

---

### 5.2. Admin Session Check
Inspect whether the current browser session has an active, valid JWT.

- **Endpoint:** `GET /api/auth/me`
- **Access:** Session Check
- **Response if Logged In (200 OK):**
  ```json
  {
    "authenticated": true,
    "user": {
      "email": "admin@realestate.com",
      "name": "Super Admin",
      "role": "admin"
    }
  }
  ```
- **Response if Unauthenticated (401 Unauthorized):**
  ```json
  {
    "authenticated": false,
    "user": null
  }
  ```

---

### 5.3. Admin Logout
Invalidates the session by clearing the `admin_token` cookie.

- **Endpoint:** `POST /api/auth/logout`
- **Access:** Public / Session
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

## 6. Media Upload API Endpoint

Upload photos or video walkthroughs for properties. Automatically selects between Cloudinary cloud CDN and local filesystem storage.

- **Endpoint:** `POST /api/upload`
- **Access:** Admin Protected
- **Content-Type:** `multipart/form-data`
- **Form Data Field:** `file` (Binary image or mp4 video)
- **Storage Strategy:**
  1. If `CLOUDINARY_CLOUD_NAME` is configured: Uploads to Cloudinary and returns a high-speed CDN URL (`https://res.cloudinary.com/...`).
  2. If Cloudinary credentials are missing: Automatically writes the file locally to `/public/uploads/` and returns `/uploads/[filename]`.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "url": "/uploads/1729074000-k8f9a2.jpg",
    "filename": "living_room.jpg",
    "type": "image",
    "provider": "local"
  }
  ```

---

## 7. Database Seeding Endpoint (Dev / Demo)

Initialize the platform with starter data (properties, enquiries, default admin).

- **Endpoint:** `POST /api/seed` or `GET /api/seed`
- **Access:** Development / Admin initialization
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Database seeded successfully with sample properties, enquiries, and admin user!",
    "adminCredentials": {
      "email": "admin@realestate.com",
      "password": "admin123"
    }
  }
  ```

---

## 8. Common HTTP Status Codes

| Code | Meaning | When it occurs |
|---|---|---|
| `200 OK` | Success | Successful GET, PUT, or DELETE request |
| `201 Created` | Created | Successfully created property, enquiry, or user |
| `400 Bad Request` | Validation Error | Missing required fields (e.g. title, city, phone) |
| `401 Unauthorized` | Auth Required | Attempting admin action without valid `admin_token` |
| `404 Not Found` | Resource Missing | Property ID or Slug does not exist |
| `500 Server Error` | Internal Failure | Uncaught database exception or network issue |
