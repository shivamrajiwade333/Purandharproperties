# Purandhar Properties - k6 Load & Performance Testing Suite

This directory contains Grafana k6 load test scripts designed to benchmark response times, throughput (RPS), concurrency thresholds, and API endpoints for Purandhar Properties.

## 🚀 Quick Start

### 1. Run Smoke Test (Endpoint Health Check)
```powershell
.\tests\k6\k6-v0.54.0-windows-amd64\k6.exe run tests\k6\smoke-test.js
```

### 2. Run Load Test (Concurrently simulate 50 users over 2 minutes)
```powershell
.\tests\k6\k6-v0.54.0-windows-amd64\k6.exe run tests\k6\load-test.js
```

### 3. Run Stress Test (Ramp up to 150 concurrent users)
```powershell
.\tests\k6\k6-v0.54.0-windows-amd64\k6.exe run tests\k6\stress-test.js
```

### 4. Test Production (Vercel Live Site)
Pass the `TARGET_URL` environment variable:
```powershell
$env:TARGET_URL="https://purandharproperties.vercel.app"; .\tests\k6\k6-v0.54.0-windows-amd64\k6.exe run tests\k6\load-test.js
```

## 📊 Test Breakdown
- **`smoke-test.js`**: 3 VUs for 30s. Validates `GET /`, `GET /properties`, `GET /api/properties`, and `GET /contact`.
- **`load-test.js`**: Ramps 0 ➔ 10 ➔ 30 ➔ 50 VUs over 2 minutes. Tests simulated browsing, filtering, and enquiry form submission (`POST /api/enquiries`).
- **`stress-test.js`**: Ramps up to 150 VUs to determine system response degradation and max request throughput.
