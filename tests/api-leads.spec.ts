import { test, expect } from '@playwright/test';
import { validateLead, deliverLead, type Lead } from '../lib/leads';

test.describe('API Unit & Logic Tests - lib/leads.ts', () => {
  test('validateLead detects honeypot spam bot submissions', () => {
    const spamSubmission = {
      fullName: 'Bot Spammer',
      company: 'Spam Co',
      email: 'bot@spam.com',
      website: 'https://spam-link.ru', // honeypot field
      phone: '+1 555 1234567',
      location: 'Internet',
      industry: 'Other',
      role: 'Other',
      machines: '5 machines — pilot',
      consent: true,
    };
    const result = validateLead(spamSubmission);
    expect(result.spam).toBe(true);
    expect(result.lead).toBeUndefined();
  });

  test('validateLead rejects invalid email and malformed phone numbers', () => {
    const badEmail = validateLead({
      fullName: 'John Doe',
      company: 'Acme',
      email: 'not-an-email',
      phone: '+91 9876543210',
      location: 'Odisha',
      industry: 'Steel & Metals',
      role: 'Plant Head',
      machines: '5 machines — pilot',
      consent: true,
    });
    expect(badEmail.error).toContain('valid work email');

    const badPhone = validateLead({
      fullName: 'John Doe',
      company: 'Acme',
      email: 'valid@acme.com',
      phone: '12', // too short (< 7 chars)
      location: 'Odisha',
      industry: 'Steel & Metals',
      role: 'Plant Head',
      machines: '5 machines — pilot',
      consent: true,
    });
    expect(badPhone.error).toContain('valid phone number');
  });

  test('validateLead validates required consent check', () => {
    const noConsent = validateLead({
      fullName: 'John Doe',
      company: 'Acme',
      email: 'valid@acme.com',
      phone: '+91 9876543210',
      location: 'Odisha',
      industry: 'Steel & Metals',
      role: 'Plant Head',
      machines: '5 machines — pilot',
      consent: false,
    });
    expect(noConsent.error).toContain('confirm your consent');
  });

  test('validateLead processes valid pilot enquiry correctly', () => {
    const valid = validateLead({
      fullName: 'Alice Engineer',
      company: 'Tata Steel Plant',
      email: 'alice@tatasteel.com',
      phone: '+91 9876543210',
      location: 'Jamshedpur',
      industry: 'Steel & Metals',
      role: 'Reliability Engineer',
      machines: '6–20 machines',
      message: 'Interested in vibration monitoring for blast furnace fans.',
      consent: 'on',
    });
    expect(valid.error).toBeUndefined();
    expect(valid.spam).toBeUndefined();
    expect(valid.lead).toBeDefined();
    expect(valid.lead?.source).toBe('revuptime.com');
    expect(valid.lead?.fullName).toBe('Alice Engineer');
  });

  test('validateLead handles whitepaper lead download', () => {
    const whitepaper = validateLead({
      type: 'whitepaper',
      fullName: 'Bob Director',
      company: 'Mining Corp',
      email: 'bob@mining.internal',
      consent: true,
    });
    expect(whitepaper.error).toBeUndefined();
    expect(whitepaper.lead).toBeDefined();
    if (whitepaper.lead && 'leadType' in whitepaper.lead) {
      expect(whitepaper.lead.leadType).toBe('whitepaper-download');
      expect(whitepaper.lead.resource).toBe('industrial-reliability-guide');
    } else {
      throw new Error('Expected lead to be whitepaper lead type');
    }
  });

  test('deliverLead enforces HTTPS endpoint security', async () => {
    const originalEnv = process.env.LEAD_WEBHOOK_URL;
    process.env.LEAD_WEBHOOK_URL = 'http://insecure-endpoint.internal/webhook';

    const testLead: Lead = {
      fullName: 'Test User',
      company: 'Test Co',
      email: 'test@example.com',
      phone: '+91 9876543210',
      location: 'Test Location',
      industry: 'Cement',
      role: 'Plant Head',
      machines: '5 machines — pilot',
      message: '',
      consent: true,
      source: 'revuptime.com',
      submittedAt: new Date().toISOString(),
    };

    await expect(deliverLead(testLead)).rejects.toThrow('Lead destination must use HTTPS');
    process.env.LEAD_WEBHOOK_URL = originalEnv;
  });

  test('deliverLead handles simulated webhook success, failure, and timeout using mocked fetch', async () => {
    const originalFetch = globalThis.fetch;
    const originalEnv = process.env.LEAD_WEBHOOK_URL;
    process.env.LEAD_WEBHOOK_URL = 'https://mock-webhook.internal/leads';

    const testLead: Lead = {
      fullName: 'Test Lead',
      company: 'Mock Plant',
      email: 'mock@example.com',
      phone: '+91 9876543210',
      location: 'Mock City',
      industry: 'Cement',
      role: 'Plant Head',
      machines: '5 machines — pilot',
      message: '',
      consent: true,
      source: 'revuptime.com',
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Mock Success (HTTP 200)
      globalThis.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
      const successResult = await deliverLead(testLead);
      expect(successResult).toBe(true);

      // 2. Mock Upstream Error (HTTP 500)
      globalThis.fetch = async () => new Response('Internal Server Error', { status: 500 });
      const failResult = await deliverLead(testLead);
      expect(failResult).toBe(false);

      // 3. Mock Upstream Timeout (AbortError)
      globalThis.fetch = async () => {
        const error = new Error('The operation was aborted');
        error.name = 'TimeoutError';
        throw error;
      };
      await expect(deliverLead(testLead)).rejects.toThrow('aborted');
    } finally {
      globalThis.fetch = originalFetch;
      process.env.LEAD_WEBHOOK_URL = originalEnv;
    }
  });
});

test.describe('API Route Integration Tests - /api/leads', () => {
  test('rejects non-JSON Content-Type with 415 Unsupported Media Type', async ({ request }) => {
    const res = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'text/plain',
      },
      data: 'This is plain text, not JSON',
    });
    expect(res.status()).toBe(415);
    const body = await res.json();
    expect(body.message).toContain('Unsupported request format');
  });

  test('rejects oversized payload (>16KB) with 413 Payload Too Large', async ({ request }) => {
    const hugeMessage = 'A'.repeat(17000);
    const res = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        fullName: 'Test',
        company: 'Test',
        email: 'test@example.com',
        message: hugeMessage,
      }),
    });
    expect(res.status()).toBe(413);
    const body = await res.json();
    expect(body.message).toContain('too large');
  });

  test('rejects cross-origin request when Origin does not match Host (403 Forbidden)', async ({ request }) => {
    const res = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://evil-unauthorized-site.com',
        Host: 'revuptime.com',
      },
      data: JSON.stringify({
        fullName: 'Attacker',
        company: 'Attacker Co',
        email: 'attacker@evil.com',
        phone: '+91 9876543210',
        location: 'Nowhere',
        industry: 'Other',
        role: 'Other',
        machines: '5 machines — pilot',
        consent: true,
      }),
    });
    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.message).toContain('submit this form from the RevUptime website');
  });

  test('rejects invalid or missing required payload with 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        fullName: 'Incomplete Submission',
        // Missing company, email, phone, etc.
      }),
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toContain('complete all required fields');
  });

  test('rejects spam honeypot bot submissions with 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        fullName: 'Bot User',
        company: 'Bot Corp',
        email: 'bot@example.com',
        phone: '+91 9876543210',
        location: 'City',
        industry: 'Cement',
        role: 'Plant Head',
        machines: '5 machines — pilot',
        website: 'http://spam-link-bot.com', // Honeypot populated
        consent: true,
      }),
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toContain('Unable to process this request');
  });
});
