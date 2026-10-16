import http from 'k6/http';
import { check, group, sleep } from 'k6';

// Load Test Configuration: Ramp up to 30 Virtual Users over 1.5 minutes
export const options = {
  stages: [
    { duration: '15s', target: 10 }, // Ramp up to 10 VUs
    { duration: '30s', target: 25 }, // Ramp up to 25 VUs
    { duration: '30s', target: 25 }, // Sustained load at 25 VUs
    { duration: '15s', target: 0 },  // Ramp down to 0 VUs
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],    // Error rate under 2%
    http_req_duration: ['p(95)<2500'], // 95% of requests completed under 2.5s
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  // Scenario 1: User visits Home & browse properties
  group('1_Browse_Catalog', function () {
    let homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, { 'Home 200': (r) => r.status === 200 });
    sleep(Math.random() * 1.5 + 0.5);

    let propRes = http.get(`${BASE_URL}/properties`);
    check(propRes, { 'Properties 200': (r) => r.status === 200 });
    sleep(Math.random() * 1.5 + 0.5);
  });

  // Scenario 2: User filters properties via API
  group('2_Filter_Properties', function () {
    const filterTypes = ['Plot', 'Agricultural', 'Commercial', 'Residential'];
    const selectedType = filterTypes[Math.floor(Math.random() * filterTypes.length)];
    
    let apiRes = http.get(`${BASE_URL}/api/properties?propertyType=${selectedType}`);
    check(apiRes, {
      'API Filter 200': (r) => r.status === 200,
      'API returned data array': (r) => {
        try {
          const json = JSON.parse(r.body);
          return json.success === true && Array.isArray(json.data);
        } catch (e) {
          return false;
        }
      },
    });
    sleep(Math.random() * 1.5 + 0.5);
  });

  // Scenario 3: User submits an enquiry
  group('3_Submit_Enquiry', function () {
    const payload = JSON.stringify({
      name: 'k6 Load Test User',
      phone: '9876543210',
      email: 'k6test@example.com',
      message: 'Automated k6 load test inquiry',
      propertyTitle: 'Purandhar Plot Benchmark',
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let enquiryRes = http.post(`${BASE_URL}/api/enquiries`, payload, params);
    check(enquiryRes, {
      'Enquiry submission status 200/201': (r) => r.status === 200 || r.status === 201,
    });
    sleep(Math.random() * 1.5 + 0.5);
  });
}
