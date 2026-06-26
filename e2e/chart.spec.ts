import { test, expect } from '@playwright/test';

test.describe('Chart Component E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the test page
    await page.goto('/');
  });

  test('should render a chart container', async ({ page }) => {
    // Check if the chart container exists
    const chartContainer = page.locator('[data-testid="chart-container"]').first();
    await expect(chartContainer).toBeVisible();
  });

  test('should have correct dimensions', async ({ page }) => {
    const chartContainer = page.locator('[data-testid="chart-container"]').first();
    const box = await chartContainer.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  });

  test('should respond to window resize', async ({ page }) => {
    const chart = page.locator('canvas').first();

    const initialBox = await chart.boundingBox();
    expect(initialBox?.width).toBeGreaterThan(0);

    await page.setViewportSize({ width: 800, height: 600 });

    await expect
      .poll(async () => (await chart.boundingBox())?.width)
      .not.toBe(initialBox?.width);
  });

  test('should handle click events', async ({ page }) => {
    const chart = page.locator('canvas').first();
    const clickCount = page.locator('[data-testid="click-count"]');
    await expect(chart).toBeVisible();
    await expect(clickCount).toHaveText('0');

    const box = await chart.boundingBox();
    expect(box).not.toBeNull();
    await chart.click({
      position: {
        x: Math.floor((box?.width ?? 0) / 2),
        y: Math.floor((box?.height ?? 0) / 2),
      },
    });

    await expect(clickCount).toHaveText('1');
  });
});
