import { test, expect } from "@playwright/test";

test.describe("Roulette Component", () => {
  test.beforeEach(async ({ page }) => {
    // Zakładamy, że aplikacja działa lokalnie na porcie 3000
    await page.goto("http://localhost:3000");
  });

  test("should display initial count value", async ({ page }) => {
    // Locate the element using the data-test attribute
    const countText = await page
      .locator('[data-test="value_count"]')
      .textContent();
    expect(countText).toBe("Value: 0");
  });

  // test("should update count to 2 when the second button is clicked", async ({
  //   page,
  // }) => {
  //   await page.click('button:text("SET COUNT TO 2")');
  //   const countText = await page.locator("p").textContent();
  //   expect(countText).toBe("Value: 2");
  // });

  // test("should trigger spin on the wheel", async ({ page }) => {
  //   await page.click('button:text("SPIN")');

  //   // Sprawdzamy, czy "mustStartSpinning" jest aktywne przez sprawdzenie DOM (jeśli Wheel renderuje coś widocznego podczas spinu).
  //   const wheel = await page.locator(".custom-roulette-container"); // Zmienna klasa CSS w Wheel
  //   await expect(wheel).toBeVisible();

  //   // Czekamy, aż Wheel przestanie się kręcić (symulujemy zakończenie spinu)
  //   await page.waitForTimeout(3000); // Zakładamy, że animacja trwa maksymalnie 3 sekundy

  //   // const countText = await page.locator("p").textContent();
  //   // expect(countText).toContain("Value"); // Sprawdzamy, czy aplikacja wciąż działa poprawnie
  // });

  // test("should disable SPIN button while wheel is spinning", async ({
  //   page,
  // }) => {
  //   await page.click('button:text("SPIN")');

  //   const spinButton = await page.locator('button:text("SPIN")');
  //   await expect(spinButton).toBeDisabled(); // Przy założeniu, że aplikacja dezaktywuje przycisk

  //   await page.waitForTimeout(3000); // Zakładamy czas animacji Wheel

  //   await expect(spinButton).toBeEnabled(); // Po zakończeniu spinu przycisk jest ponownie aktywny
  // });
});
