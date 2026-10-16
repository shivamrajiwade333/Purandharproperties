import http from 'k6/http';
import { check, sleep } from 'k6';

// Smoke Test Configuration: 3 Virtual Users for 30s
export const options = {
  vus: 3,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],    // < 1% error rate
    http_req_duration: ['p(95)<2000'], // 95% of requests complete within 2s
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  // 1. Homepage
  let resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'Homepage status is 200': (r) => r.status === 200,
    'Homepage has content': (r) => r.body && r.body.includes('Purandhar'),
  });
  sleep(1);

  // 2. Properties Listing
  let resProperties = http.get(`${BASE_URL}/properties`);
  check(resProperties, {
    'Properties page status is 200': (r) => r.status === 200,
  });
  sleep(1);

  // 3. API Properties Endpoint
  let resApiProperties = http.get(`${BASE_URL}/api/properties`);
  check(resApiProperties, {
    'API Properties status is 200': (r) => r.status === 200,
    'API returned valid properties array': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.success === true && Array.isArray(json.data);
      } catch (e) {
        return false;
      }
    },
  });
  sleep(1);

  // 4. Contact Page
  let resContact = http.get(`${BASE_URL}/contact`);
  check(resContact, {
    'Contact page status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
