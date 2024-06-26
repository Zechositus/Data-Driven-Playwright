const { test, expect } = require('@playwright/test');

let usrName = "ben+pose@workwithloop.com";
let psWord = "Password123";

test(`login to asana`, async ({ page }) => {
      // Login to Asana
      test.slow();
      await page.goto('https://app.asana.com/-/login');
      await page.getByLabel('Email address').click();
      await page.getByLabel('Email address').fill(usrName);
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await page.getByLabel('Password', { exact: true }).click();
      await page.getByLabel('Password', { exact: true }).fill(psWord);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByLabel('Cross-functional project plan, Project').click();
      //await expect(page.getByRole('heading', { name: `To Do` })).arrayContaining(page.getByText("Draft project brief"));
    });