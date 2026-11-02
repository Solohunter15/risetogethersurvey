import { preview } from 'vite';
import { chromium } from 'playwright';
import path from 'node:path';
import assert from 'node:assert/strict';

async function runEmpiricalSuite() {
  console.log('=== Starting Milestone 1 Empirical Verification Suite ===');
  
  // 1. Start Vite Preview Server
  console.log('[1/6] Launching Vite preview server...');
  const server = await preview({
    preview: {
      port: 4173,
      strictPort: true,
    },
  });
  
  const serverUrl = 'http://localhost:4173';
  console.log(`✓ Preview server running at ${serverUrl}`);

  // 2. Launch Chromium using installed ms-playwright binary
  const chromePath = path.join(
    process.env.LOCALAPPDATA || '',
    'ms-playwright',
    'chromium-1223',
    'chrome-win64',
    'chrome.exe'
  );
  console.log(`[2/6] Launching Chromium from: ${chromePath}`);

  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  try {
    // 3. Test Desktop Viewport (1280x800)
    console.log('[3/6] Testing Desktop Viewport (1280x800)...');
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });

    const page = await context.newPage();

    // Listen for console errors or warnings
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto(serverUrl, { waitUntil: 'networkidle' });

    // Assert zero console errors
    assert.equal(
      consoleErrors.length,
      0,
      `Expected 0 console errors, but got: ${consoleErrors.join(', ')}`
    );
    console.log('✓ Page loaded with ZERO console errors or unhandled exceptions');

    // Header Verification
    const headerTitle = await page.textContent('header');
    assert.ok(headerTitle?.includes('RISE TOGETHER'), 'Header must contain "RISE TOGETHER"');
    assert.ok(headerTitle?.includes('2026'), 'Header must contain "2026"');
    assert.ok(headerTitle?.includes('Kerala Student Survey'), 'Header must contain "Kerala Student Survey" badge');

    // Check Emblem image rendering
    const emblemImg = page.locator('header img');
    await emblemImg.waitFor({ state: 'visible' });
    const isEmblemLoaded = await emblemImg.evaluate((img: HTMLImageElement) => img.naturalWidth > 0);
    assert.ok(isEmblemLoaded, 'Header logo emblem must load with naturalWidth > 0');
    console.log('✓ Header brand assets and titles rendered correctly');

    // Theme Switching & LocalStorage Persistence Verification
    console.log('[4/6] Verifying Theme Switching & LocalStorage...');
    const themeBtn = page.locator('header button[title*="mode"]');
    await themeBtn.waitFor({ state: 'visible' });

    const initialThemeLabel = await themeBtn.getAttribute('aria-label');
    const initialIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));

    // Toggle theme
    await themeBtn.click();
    await page.waitForTimeout(200);

    const toggledIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const storedThemeAfterToggle = await page.evaluate(() => localStorage.getItem('rt2026_theme'));

    assert.notEqual(toggledIsDark, initialIsDark, 'HTML root dark class must toggle on click');
    assert.equal(storedThemeAfterToggle, toggledIsDark ? 'dark' : 'light', 'localStorage must reflect toggled theme');

    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(200);
    const revertedIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    assert.equal(revertedIsDark, initialIsDark, 'Theme must revert on second toggle');

    // Reload page to verify persistence
    await page.reload({ waitUntil: 'networkidle' });
    const persistedTheme = await page.evaluate(() => localStorage.getItem('rt2026_theme'));
    const persistedIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    assert.equal(persistedIsDark, persistedTheme === 'dark', 'Theme after reload must match localStorage');
    console.log('✓ Theme toggle switches "dark" class and persists to localStorage across reloads');

    // Hero Section Verification
    const heroTitle = await page.textContent('h1');
    assert.equal(
      heroTitle?.trim(),
      'Kerala Student Experience & Higher Education Transformation Survey',
      'Hero title must match verbatim'
    );

    // Collapsible Hero Context Toggle
    const contextToggleBtn = page.locator('button:has-text("Hide survey context")');
    await contextToggleBtn.waitFor({ state: 'visible' });
    await contextToggleBtn.click();
    await page.waitForTimeout(200);

    const showContextBtn = page.locator('button:has-text("Show survey context")');
    await showContextBtn.waitFor({ state: 'visible' });
    console.log('✓ Hero context collapse toggles correctly');

    // Re-expand Hero
    await showContextBtn.click();
    await page.waitForTimeout(200);

    // ProgressBar & Wizard Navigation Verification
    console.log('[5/6] Verifying ProgressBar & Wizard Navigation Step Progression...');
    const stepText = await page.textContent('nav[aria-label="Survey Step Navigation"]');
    assert.ok(stepText?.includes('Step 1 of 7'), 'Should start at Step 1 of 7');
    assert.ok(stepText?.includes('0% Complete'), 'Should start at 0% Complete');

    // Initial WizardNav state: Prev button should NOT exist on Step 1
    const prevBtnStep1 = await page.locator('button:has-text("Previous Section")').count();
    assert.equal(prevBtnStep1, 0, 'Step 1 must NOT display "Previous Section" button');

    // Click Next Section -> Step 2
    const nextBtn = page.locator('button:has-text("Next Section")');
    await nextBtn.click();
    await page.waitForTimeout(200);

    const step2Text = await page.textContent('nav[aria-label="Survey Step Navigation"]');
    assert.ok(step2Text?.includes('Step 2 of 7'), 'Should advance to Step 2 of 7');
    assert.ok(step2Text?.includes('17% Complete'), 'Should show 17% Complete on Step 2');

    // Prev button should now exist
    const prevBtnStep2 = page.locator('button:has-text("Previous Section")');
    await prevBtnStep2.waitFor({ state: 'visible' });

    // Click Prev -> Step 1
    await prevBtnStep2.click();
    await page.waitForTimeout(200);

    const step1Reverted = await page.textContent('nav[aria-label="Survey Step Navigation"]');
    assert.ok(step1Reverted?.includes('Step 1 of 7'), 'Should return to Step 1 of 7');

    // Progress through all steps to Step 7 (Review)
    for (let s = 1; s < 7; s++) {
      await page.locator('button:has-text("Next Section")').click();
      await page.waitForTimeout(100);
    }

    const step7Text = await page.textContent('nav[aria-label="Survey Step Navigation"]');
    assert.ok(step7Text?.includes('Step 7 of 7'), 'Should reach Step 7 of 7');
    assert.ok(step7Text?.includes('100% Complete'), 'Should show 100% Complete on Step 7');

    // On Step 7, Next button changes to "Submit Survey"
    const submitBtn = page.locator('button:has-text("Submit Survey")');
    await submitBtn.waitFor({ state: 'visible' });
    console.log('✓ Full step navigation (1 -> 7) and step indicators verified');

    // Footer Verification
    const footerText = await page.textContent('footer');
    assert.ok(footerText?.includes('Beyond Syllabus. Rise Together 2026.'), 'Footer must contain vision header');
    assert.ok(footerText?.includes('Data Protection & Privacy'), 'Footer must contain privacy section');
    assert.ok(footerText?.includes('Reset saved survey draft'), 'Footer must contain draft reset button');
    console.log('✓ Footer attribution, confidentiality, and reset controls verified');

    await context.close();

    // 4. Test Mobile Viewport (375x812 - iPhone X / 13)
    console.log('[6/6] Testing Mobile Viewport (375x812)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });

    const mobilePage = await mobileContext.newPage();
    const mobileErrors: string[] = [];
    mobilePage.on('pageerror', (err) => mobileErrors.push(err.message));

    await mobilePage.goto(serverUrl, { waitUntil: 'networkidle' });
    assert.equal(mobileErrors.length, 0, 'Zero errors on mobile viewport');

    // Mobile Step Counter pill in Header
    const mobileCounter = mobilePage.locator('header div.sm\\:hidden:has-text("1/7")');
    await mobileCounter.waitFor({ state: 'visible' });

    // Mobile sections drawer toggle in ProgressBar
    const sectionsMenuBtn = mobilePage.locator('button:has-text("Sections")');
    await sectionsMenuBtn.waitFor({ state: 'visible' });
    await sectionsMenuBtn.click();
    await mobilePage.waitForTimeout(200);

    // Verify mobile drawer lists all sections
    const mobileStepItems = await mobilePage.locator('nav button:has-text("Section")').count();
    assert.ok(mobileStepItems >= 6, 'Mobile drawer must list survey sections');
    console.log('✓ Mobile responsive controls, counter pill, and drawer verified');

    await mobileContext.close();

    console.log('=== ALL EMPIRICAL BROWSER TESTS PASSED 100% ===');
  } finally {
    await browser.close();
    server.httpServer.close();
  }
}

runEmpiricalSuite().catch((err) => {
  console.error('Empirical Suite Failure:', err);
  process.exit(1);
});
