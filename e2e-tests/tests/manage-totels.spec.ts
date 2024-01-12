import { test, expect } from "@playwright/test";
import exp from "constants";

import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // get the gignin button
  await page
    .getByRole("link", {
      name: "Sign In ",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("12@a.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("SignIn sucessful")).toBeVisible();
});

test("should allow user to add hotels", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name="name"]').fill("test hotel");
  await page.locator('[name="city"]').fill("test citycity");
  await page.locator('[name="country"]').fill("Test country");
  await page.locator('[name="description"]').fill("Test description");
  await page.getByLabel("Price per Night").fill("4");
  await page.getByLabel("select as rating").selectOption("3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.locator('[name="adultCount"]').fill("2");
  // await page.locator('[name="childCount"]').fill("4");
  await page.setInputFiles('[name="imageFile"]', [
    path.join(__dirname, "files", "test-img.png"),
  ]);

  await page.getByRole("button", { name: "save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels ", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotel`);
  await expect(page.getByText("test--hotel")).toBeVisible();
  await expect(page.getByText("What is Lorem Ipsum?")).toBeVisible();
  await expect(page.getByText("new-test-city,tttest")).toBeVisible();
  await expect(page.getByText("Pet Friendly")).toBeVisible();
  await expect(page.getByText("46 per night")).toBeVisible();
  await expect(page.getByText("2 adults , 1 children")).toBeVisible();
  await expect(page.getByText("5 star rating")).toBeVisible();
  // await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
