const { test } = require('@playwright/test');
const { DemoBlazePage } = require('./DemoBlazePage');

test('Verify being able to login as admin', async ({ page }) => {
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goto();
  await demoBlazePage.login('admin', 'admin');
  await demoBlazePage.verifyWelcomeMessage();
});

test('Verify that category exist', async ({ page }) => {
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goto();
  await demoBlazePage.verifyCategory('Phones');
});

test('Verify make able to do a purchase', async ({ page }) => {
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goto();
  await demoBlazePage.login('admin', 'admin');
  await demoBlazePage.addToCart();
  await demoBlazePage.dismissDialog();
  await demoBlazePage.goToCart();
  await demoBlazePage.placeOrder('Samsung galaxy s6', 'Argentina', 'Buenos Aires', '1234 4567 1235 5421', 'March', '2025');
  await demoBlazePage.verifyPurchaseSuccessMessage();
});

test('Negative test case: verify invalid password message', async ({ page }) => {
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goto();
  await demoBlazePage.login('admin', '123'); // Wrong password
  await demoBlazePage.verifyWrongPasswordDialog();
});