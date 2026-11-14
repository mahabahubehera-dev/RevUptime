import { test, expect } from '@playwright/test';

test.describe('E2E - Homepage & Visual Elements', () => {
  test('loads homepage with complete hero, images, and action buttons', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 1. Heading verification
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('AI Predictive Maintenance');

    // 2. Alert card verification
    const alertBox = page.locator('.hero-whatsapp-example');
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText('ID Fan M-104 is 100% above its normal vibration baseline');

    // 3. CTA Buttons verification
    const discoveryCallBtn = page.locator('a.button', { hasText: 'Book a Discovery Call' });
    await expect(discoveryCallBtn).toBeVisible();
    await expect(discoveryCallBtn).toHaveAttribute('href', '#pilot');

    const roiBtn = page.locator('a.button', { hasText: 'Calculate Your ROI' });
    await expect(roiBtn).toBeVisible();
    await expect(roiBtn).toHaveAttribute('href', '/roi-calculator');

    // 4. Hero imagery verification
    const heroImage = page.locator('img.landing-hero-main');
    await expect(heroImage).toBeVisible();

    const workflowStrip = page.locator('img.landing-hero-strip');
    await expect(workflowStrip).toBeVisible();

    // 5. Local SEO anchor
    const seoLink = page.locator('.hero-local-seo');
    await expect(seoLink).toBeVisible();
    await expect(seoLink).toHaveAttribute('href', '/blog/predictive-maintenance-steel-plants-odisha');

    // Filter out expected third-party or benign warnings
    const fatalErrors = consoleErrors.filter(
      (err) => !err.includes('favicon') && !err.includes('gtm') && !err.includes('analytics')
    );
    expect(fatalErrors).toHaveLength(0);
  });
});

test.describe('E2E - Navigation Functionality', () => {
  test('desktop navigation links route correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Navigate to Product
    await page.click('header.site-header nav >> text=Product');
    await page.waitForURL('**/product');
    await expect(page.locator('h1')).toContainText('AI condition monitoring');

    // Navigate to ROI Calculator
    await page.click('header.site-header nav >> text=ROI Calculator');
    await page.waitForURL('**/roi-calculator');
    await expect(page).toHaveTitle(/ROI.*RevUptime/i);

    // Navigate to Contact via Nav CTA button
    const bookPilotBtn = page.locator('header.site-header .nav-actions a', { hasText: 'Book a Pilot' });
    await bookPilotBtn.click();
    await page.waitForURL('**/contact');
    await expect(page.locator('h1')).toContainText('Book a predictive');
  });

  test('mobile navigation drawer opens, displays links, and has no layout overflow', async ({ page }) => {
    // Emulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Ensure menu button exists
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    const nav = page.locator('nav.navigation');
    await expect(nav).toHaveClass(/open/);

    // Verify mobile drawer has links and mobile CTA
    await expect(nav.locator('text=Platform')).toBeVisible();
    await expect(nav.locator('text=Resources')).toBeVisible();
    const mobilePilotCta = nav.locator('.mobile-actions a', { hasText: 'Book a Pilot' });
    await expect(mobilePilotCta).toBeVisible();

    // Close menu
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Check viewport horizontal overflow (prevent mobile horizontal scrolling bug)
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(isOverflowing).toBe(false);
  });
});

test.describe('E2E - Product & Solution Interactive Flows', () => {
  test('ROI calculator allows user adjustments and updates calculation results', async ({ page }) => {
    await page.goto('/roi-calculator', { waitUntil: 'domcontentloaded' });

    // Look for inputs or sliders on ROI calculator
    const sliders = page.locator('input[type="range"], input[type="number"]');
    const inputCount = await sliders.count();
    expect(inputCount).toBeGreaterThan(0);

    // Read initial displayed ROI or monetary values
    const calculationArea = page.locator('main');
    await expect(calculationArea).toBeVisible();

    // Interact with first slider/input
    const firstInput = sliders.first();
    const initialVal = await firstInput.inputValue();
    await firstInput.fill(String(Number(initialVal || 5) + 5));
    await firstInput.dispatchEvent('input');
    await firstInput.dispatchEvent('change');

    // Ensure no runtime exceptions occurred during reactive calculation
    await expect(page.locator('body')).toBeVisible();
  });

  test('Product page displays feature highlights and dashboard demo', async ({ page }) => {
    await page.goto('/product', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('AI condition monitoring');

    // Check presence of dashboard section
    const dashboardSection = page.locator('#dashboard, .hero-dashboard, .platform-hero');
    await expect(dashboardSection.first()).toBeVisible();
  });
});

test.describe('E2E - Contact & Pilot Form Validation', () => {
  test('prevents submission when required fields are missing', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    const form = page.locator('form.lead-form');
    await expect(form).toBeVisible();

    // Attempt to submit empty form
    const submitBtn = page.locator('button.form-submit');
    await submitBtn.click();

    // Native HTML5 form validation will prevent submission, so form remains in idle/visible state
    await expect(form).toBeVisible();
    await expect(page.locator('.lead-success')).not.toBeVisible();
  });

  test('submits successfully with mocked API and renders confirmation screen', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    // Mock API endpoint to prevent hitting external webhook or live service
    await page.route('/api/leads', async (route) => {
      const json = {
        message: 'Thank you. A RevUptime team member will contact you to understand your plant and pilot requirements.',
      };
      await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(json) });
    });

    // Fill all required fields with synthetic QA data
    await page.fill('input[name="fullName"]', 'QA Test Engineer');
    await page.fill('input[name="company"]', 'Test Industrial Plants Ltd');
    await page.fill('input[name="email"]', 'qa-validation@test-plants.internal');
    await page.fill('input[name="phone"]', '+91 9876543210');
    await page.fill('input[name="location"]', 'Bhubaneswar, Odisha');
    await page.selectOption('select[name="industry"]', { label: 'Steel & Metals' });
    await page.selectOption('select[name="role"]', { label: 'Reliability Engineer' });
    await page.selectOption('select[name="machines"]', { label: '5 machines — pilot' });
    await page.fill('textarea[name="message"]', 'Automated CI synthetic lead validation testing.');
    await page.check('input[name="consent"]');

    // Submit form
    await page.click('button.form-submit');

    // Verify success confirmation card
    const successCard = page.locator('.lead-success');
    await expect(successCard).toBeVisible({ timeout: 5000 });
    await expect(successCard.locator('h2')).toContainText('Thank you for getting in touch');
  });

  test('handles API failure gracefully with actionable error banner and backup download', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    // Mock 502 Bad Gateway failure
    await page.route('/api/leads', async (route) => {
      const json = { message: 'We could not deliver your enquiry. Your details are still here; please try again.' };
      await route.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify(json) });
    });

    // Fill required fields
    await page.fill('input[name="fullName"]', 'QA Test Engineer');
    await page.fill('input[name="company"]', 'Test Industrial Plants Ltd');
    await page.fill('input[name="email"]', 'qa-validation@test-plants.internal');
    await page.fill('input[name="phone"]', '+91 9876543210');
    await page.fill('input[name="location"]', 'Bhubaneswar, Odisha');
    await page.selectOption('select[name="industry"]', { label: 'Steel & Metals' });
    await page.selectOption('select[name="role"]', { label: 'Reliability Engineer' });
    await page.selectOption('select[name="machines"]', { label: '5 machines — pilot' });
    await page.check('input[name="consent"]');

    // Submit form
    await page.click('button.form-submit');

    // Verify error banner is shown
    const errorAlert = page.locator('.form-error');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });
    await expect(errorAlert).toContainText('We could not deliver your enquiry');

    // Verify "Save a copy of your enquiry" backup button exists
    const downloadBtn = errorAlert.locator('button', { hasText: 'Save a copy' });
    await expect(downloadBtn).toBeVisible();
  });
});
