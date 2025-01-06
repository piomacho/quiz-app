import { test, expect, Locator, Page } from "@playwright/test";
import { waitForElementAndAssert } from "./helpers";
async function waitForElement(page: Page, selector: string): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor(); // Wait for the element to appear in the DOM
  return element;
}

test.describe("Roulette Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display all elements on initial state", async ({ page }) => {
    const roullette = await waitForElementAndAssert(
      page,
      '[data-test="roulette-wheel"]',
      "visible"
    );

    const spinButton = await waitForElementAndAssert(
      page,
      '[data-test="spin-button"]',
      "visible"
    );
    const levelPicker = await waitForElementAndAssert(
      page,
      '[data-test="difficulty-level-picker"]',
      "visible"
    );

    await expect(roullette).toBeVisible();
    await expect(spinButton).toBeVisible();
    await expect(levelPicker).toBeVisible();
  });

  test("should show test after setting options", async ({ page }) => {
    const spinButton = await waitForElementAndAssert(
      page,
      '[data-test="spin-button"]',
      "visible"
    );
    spinButton.click();
    await page.waitForTimeout(6000);
    await expect(spinButton).toHaveText("START TEST");

    await spinButton.click();
    const quizTitle = await waitForElementAndAssert(
      page,
      '[data-test="quiz-title"]',
      "visible"
    );
    page.locator('[data-test="quiz-title"]');
    const closeButton = await waitForElementAndAssert(
      page,
      '[data-test="close-test-button"]',
      "visible"
    );

    await expect(quizTitle).toBeVisible();
    await expect(closeButton).toBeVisible();
  });
});
