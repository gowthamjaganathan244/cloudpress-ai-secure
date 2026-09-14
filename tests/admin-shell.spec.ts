import { test, expect, type Page } from "@playwright/test";
import { adminPages, adminHref } from "../src/lib/admin-navigation";

async function ready(page: Page) {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Workspace overview",
  );
  // A real interaction ensures React is hydrated before sending shortcuts.
  await page.getByRole("button", { name: "Demo account", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Demo account details" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
}

test("root redirect, every navigation link and direct route, breadcrumbs and recovery", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/admin$/);
  for (const item of adminPages) {
    const href = adminHref(item.slug);
    await page
      .getByRole("navigation", { name: "Admin navigation", exact: true })
      .getByRole("link", { name: item.label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(
      page
        .getByRole("navigation", { name: "Admin navigation", exact: true })
        .getByRole("link", { name: item.label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("navigation", { name: "Breadcrumb" }),
    ).toContainText(item.label);
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      item.slug ? item.label : "Workspace overview",
    );
    if (item.slug)
      await expect(
        page.getByRole("heading", { name: "Planned — not available yet" }),
      ).toBeVisible();
  }
  for (const href of [
    "/admin/missing",
    "/missing",
    "/employee",
    "/admin/missing/nested",
  ]) {
    await page.goto(href);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to overview" }).click();
    await expect(page).toHaveURL(/\/admin$/);
  }
});

test("dashboard links resolve and demo actions are honest", async ({
  page,
}) => {
  await ready(page);
  const links = await page
    .locator("main a")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")!),
    );
  for (const href of new Set(links)) {
    expect(href).not.toBe("#");
    await page.goto("/admin");
    await page.locator(`main a[href="${href}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
  }
  await page.goto("/admin");
  await expect(
    page.getByText("Fictional demo data.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Live", { exact: true })).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator("main button")).toHaveCount(0);
});

test("finder shortcuts, filtering, arrows, Enter, no results, Escape and focus restoration", async ({
  page,
}) => {
  await ready(page);
  const trigger = page.getByRole("button", { name: /Find a page/ });
  await trigger.focus();
  for (const shortcut of ["Control+k", "Meta+k"]) {
    await page.keyboard.press(shortcut);
    const input = page.getByRole("combobox", { name: "Find a page" });
    await expect(input).toBeFocused();
    await input.fill("not-a-page");
    await expect(page.getByRole("status")).toContainText("No matching pages");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
  await trigger.click();
  const input = page.getByRole("combobox", { name: "Find a page" });
  await input.fill("governance");
  await expect(page.getByRole("dialog").getByRole("option")).toHaveCount(4);
  await page.keyboard.press("ArrowUp");
  await expect(input).toHaveAttribute("aria-activedescendant", "page-option-3");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/admin\/users$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await trigger.click();
  await page.getByRole("combobox", { name: "Find a page" }).fill("audit");
  await page.getByRole("option", { name: /Audit log/ }).click();
  await expect(page).toHaveURL(/\/admin\/audit-log$/);
});

test("finder contains focus and restores the keyboard shortcut origin", async ({ page }, testInfo) => {
  await ready(page);
  const origin = page.getByRole("combobox", { name: "Colour theme" });
  await origin.focus();
  await page.keyboard.press("Control+k");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("combobox", { name: "Find a page" })).toBeFocused();
  await page.screenshot({ path: testInfo.outputPath("page-finder.png") });
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press(index < 6 ? "Tab" : "Shift+Tab");
    expect(
      await page
        .getByRole("dialog")
        .evaluate((dialog) => dialog.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(origin).toBeFocused();
});

test("account disclosure keyboard, outside dismissal, Tab dismissal and links", async ({
  page,
}) => {
  await ready(page);
  const trigger = page.getByRole("button", {
    name: "Demo account",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/No account is signed in/)).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("region").getByRole("link", { name: /Settings/ }),
  ).toBeFocused();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("region").getByRole("link", { name: /Users & roles/ }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  for (const [label, slug] of [
    ["Settings", "settings"],
    ["Users & roles", "users"],
  ]) {
    await trigger.click();
    await page
      .getByRole("region")
      .getByRole("link", { name: new RegExp(label) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/admin/${slug}$`));
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  }
});

test("theme follows system, explicit preferences persist and override system changes", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await ready(page);
  const theme = page.getByRole("combobox", { name: "Colour theme" });
  await expect(theme).toHaveValue("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const preference of ["dark", "light", "system"]) {
    await theme.selectOption(preference);
    await page.reload();
    await expect(theme).toHaveValue(preference);
    expect(
      await page.evaluate(() => localStorage.getItem("cloudpress-theme")),
    ).toBe(preference);
  }
  await theme.selectOption("light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("sidebar persistence, keyboard links and skip link", async ({ page }) => {
  await ready(page);
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Expand sidebar" }),
  ).toBeVisible();
  expect(
    await page
      .locator(".desktop-sidebar")
      .evaluate((node) => node.getBoundingClientRect().width),
  ).toBe(80);
  const articles = page
    .getByRole("navigation", { name: "Admin navigation", exact: true })
    .getByRole("link", { name: "Articles", exact: true });
  await articles.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/admin\/articles$/);
  await page.getByRole("button", { name: "Expand sidebar" }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Collapse sidebar" }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("blocked storage remains usable without hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await ready(page);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(
    page.getByRole("button", { name: "Expand sidebar" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("invalid stored preferences fall back safely", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cloudpress-theme", "invalid");
    localStorage.setItem("cloudpress-sidebar", "invalid");
  });
  await ready(page);
  await expect(
    page.getByRole("combobox", { name: "Colour theme" }),
  ).toHaveValue("system");
  await expect(
    page.getByRole("button", { name: "Collapse sidebar" }),
  ).toBeVisible();
});

test("saved theme is applied by the first frame containing page content", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    localStorage.setItem("cloudpress-theme", "dark");
    const check = () => {
      if (document.querySelector("main"))
        document.documentElement.dataset.firstContentTheme =
          document.documentElement.dataset.theme;
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
  await ready(page);
  await expect(page.locator("html")).toHaveAttribute(
    "data-first-content-theme",
    "dark",
  );
});

for (const width of [768, 1024, 1280, 1440, 1920]) {
  for (const theme of ["light", "dark"] as const) {
    test(`${theme} layout and navigation at ${width}px`, async ({
      page,
    }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);
      await page
        .getByRole("combobox", { name: "Colour theme" })
        .selectOption(theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(`${theme}-${width}.png`),
        fullPage: true,
      });
      if (width < 1024) {
        const trigger = page.getByRole("button", {
          name: "Open admin navigation",
        });
        await trigger.click();
        for (let index = 0; index < 12; index++) {
          await page.keyboard.press("Tab");
          expect(
            await page
              .getByRole("dialog")
              .evaluate((dialog) => dialog.contains(document.activeElement)),
          ).toBe(true);
        }
        await page.keyboard.press("Escape");
        await expect(trigger).toBeFocused();
        for (const item of adminPages) {
          await trigger.click();
          await page
            .getByRole("dialog")
            .getByRole("link", { name: item.label, exact: true })
            .click();
          await expect(page).toHaveURL(new RegExp(`${adminHref(item.slug)}$`));
          await expect(page.getByRole("dialog")).toHaveCount(0);
        }
        await trigger.click();
        await page.setViewportSize({ width: 1280, height: 1000 });
        await expect(page.getByRole("dialog")).toHaveCount(0);
      } else {
        await page.getByRole("button", { name: "Collapse sidebar" }).click();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.getByRole("button", { name: "Expand sidebar" }).click();
      }
      await page.goto("/admin/documents");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("small screens and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole("button", { name: /Find a page/ })).toBeVisible();
  const duration = await page
    .locator(".primary-button")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01);
  await page.getByRole("button", { name: "Open admin navigation" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("link", { name: "Settings", exact: true }),
  ).toBeVisible();
});
