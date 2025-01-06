import { test, expect } from "@playwright/test";
import { waitForElementAndAssert } from "./helpers";

test.describe("Question Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("domcontentloaded");

    const spinButton = await waitForElementAndAssert(
      page,
      '[data-test="spin-button"]',
      "visible"
    );
    await spinButton.click();
    await page.waitForTimeout(6000);
    await expect(spinButton).toHaveText("START TEST");

    await spinButton.click();
    await page.waitForTimeout(3000);
  });

  test("should show test after setting options", async ({ page }) => {
    const quizTitle = await waitForElementAndAssert(
      page,
      '[data-test="quiz-title"]',
      "visible"
    );
    const closeButton = await waitForElementAndAssert(
      page,
      '[data-test="close-test-button"]',
      "visible"
    );

    await expect(quizTitle).toBeVisible();
    await expect(closeButton).toBeVisible();
  });

  test("should show if answer is correct ", async ({ page }) => {
    const firstQuestionCheckbox = page
      .locator('[data-test="answer-checkbox"]')
      .first();
    await firstQuestionCheckbox.waitFor(); // Upewnij się, że element istnieje
    await firstQuestionCheckbox.click(); // Kliknij w checkbox

    const firstQuestionSubmitButton = page
      .locator('[data-test="submit-button"]')
      .first();
    await firstQuestionSubmitButton.waitFor();
    await expect(firstQuestionSubmitButton).toBeVisible();
    await firstQuestionSubmitButton.click();
    await page.waitForTimeout(1000);
    const feedback = await waitForElementAndAssert(
      page,
      '[data-test="feedback-text"]',
      "visible"
    );

    await expect(feedback).toBeVisible();

    const feedbackText = await feedback.textContent();
    expect(
      feedbackText?.includes("Correct!") || feedbackText?.includes("Incorrect!")
    ).toBe(true);
  });
});
