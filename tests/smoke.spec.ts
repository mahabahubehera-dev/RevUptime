import { test, expect } from '@playwright/test';

const ROUTES_TO_TEST = [
  { path: '/', expectedTitle: /RevUptime/i },
  { path: '/platform', expectedTitle: /Platform|RevUptime/i },
  { path: '/product', expectedTitle: /Product|RevUptime/i },
  { path: '/solutions', expectedTitle: /Solutions|RevUptime/i },
  { path: '/solutions/predictive-maintenance', expectedTitle: /Predictive Maintenance|RevUptime/i },
  { path: '/industries', expectedTitle: /Industries|RevUptime/i },
  { path: '/industries/steel', expectedTitle: /Steel|RevUptime/i },
  { path: '/industries/mining', expectedTitle: /Mining|RevUptime/i },
  { path: '/roi-calculator', expectedTitle: /ROI Calculator|RevUptime/i },
  { path: '/resources', expectedTitle: /Resources|RevUptime/i },
  { path: '/pilot', expectedTitle: /Pilot|RevUptime/i },
  { path: '/about', expectedTitle: /About|RevUptime/i },
  { path: '/contact', expectedTitle: /Contact|RevUptime/i },
  { path: '/privacy', expectedTitle: /Privacy|RevUptime/i },
  { path: '/terms', expectedTitle: /Terms|RevUptime/i },
  { path: '/delete-account', expectedTitle: /Delete Account|RevUptime/i },
];

test.describe('Runtime Smoke Testing - Core Routes', () => {
  for (const route of ROUTES_TO_TEST) {
    test(`route ${route.path} returns HTTP 200 without runtime errors`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response, `No response received for ${route.path}`).not.toBeNull();
      expect(response!.status(), `Expected status 200 for ${route.path}`).toBe(200);

      // Verify title is rendered and matches expected pattern
      await expect(page).toHaveTitle(route.expectedTitle);

      // Ensure no unhandled client-side runtime exceptions
      expect(pageErrors, `Runtime errors on ${route.path}: ${pageErrors.join(', ')}`).toEqual([]);
    });
  }

  test('static metadata and SEO endpoints return 200', async ({ request }) => {
    const robotsRes = await request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    const robotsBody = await robotsRes.text();
    expect(robotsBody).toMatch(/User-Agent/i);

    const sitemapRes = await request.get('/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapBody = await sitemapRes.text();
    expect(sitemapBody).toContain('<urlset');

    const llmsRes = await request.get('/llms-full.txt');
    expect(llmsRes.status()).toBe(200);
    const llmsBody = await llmsRes.text();
    expect(llmsBody.length).toBeGreaterThan(50);
  });

  test('non-existent route gracefully returns 404', async ({ page }) => {
    const response = await page.goto('/random-nonexistent-page-xyz-404', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toBeVisible();
  });
});
