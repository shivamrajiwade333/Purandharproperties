import http from 'k6/http';
import { check, sleep } from 'k6';

// Stress Test Configuration: Push up to 150 Virtual Users to test stress limits
export const options = {
  stages: [
    { duration: '15s', target: 20 },  // Warm up
    { duration: '30s', target: 80 },  // Normal stress load
    { duration: '30s', target: 150 }, // Heavy stress load
    { duration: '15s', target: 0 },   // Cool down
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],    // Allow up to 5% failure under extreme stress
    http_req_duration: ['p(95)<3000'], // 95% under 3s
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  const endpoints = [
    '/',
    '/properties',
    '/api/properties',
    '/contact',
  ];

  const targetEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  let res = http.get(`${BASE_URL}${targetEndpoint}`);

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(0.5);
}
