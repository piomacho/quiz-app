import { test, expect, Locator, Page } from "@playwright/test";

// Import helper functions
async function waitForElement(page: Page, selector: string): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor();
  return element;
}

export async function waitForElementAndAssert(
  page: Page,
  selector: string,
  assertion?: "visible" | "hidden" | "enabled" | "disabled"
): Promise<Locator> {
  const element = await waitForElement(page, selector);

  if (assertion) {
    switch (assertion) {
      case "visible":
        await expect(element).toBeVisible();
        break;
      case "hidden":
        await expect(element).toBeHidden();
        break;
      case "enabled":
        await expect(element).toBeEnabled();
        break;
      case "disabled":
        await expect(element).toBeDisabled();
        break;
    }
  }

  return element;
}
