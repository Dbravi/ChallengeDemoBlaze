const { expect } = require('@playwright/test');

exports.DemoBlazePage = class DemoBlazePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByRole('link', { name: 'Log in' });
    this.usernameField = page.locator('#loginusername');
    this.passwordField = page.locator('#loginpassword');
    this.welcomeMessage = page.locator('#nameofuser');
    this.categoryLink = page.getByRole('link', { name: 'Phones' });
    this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.totalInput = page.getByLabel('Total');
    this.countryInput = page.getByLabel('Country');
    this.cityInput = page.getByLabel('City');
    this.creditCardInput = page.getByLabel('Credit card');
    this.monthInput = page.getByLabel('Month');
    this.product= page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.purchaseButton= page.getByRole('button', { name: 'Purchase' });
    this.yearInput = page.getByLabel('Year');
    this.purchaseSuccessMessage = page.locator('body');
    };

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async login(username, password) {
    await this.loginButton.click();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async verifyWelcomeMessage() {
    await expect(this.welcomeMessage).toContainText('Welcome ');
  }

  async verifyCategory() {
    await expect(this.categoryLink).toBeVisible();
  }

  async addToCart() {
    await this.product.click();
    await this.addToCartLink.click();
  }

  async dismissDialog() {
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  }
  async goToCart() {
    await this.cartLink.click();
  }

  async placeOrder(total, country, city, creditCard, month, year) {
    await this.placeOrderButton.click();
    await this.totalInput.fill(total);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.creditCardInput.fill(creditCard);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
    await this.purchaseButton.click();
  }
  
  async verifyPurchaseSuccessMessage() {
    await expect(this.purchaseSuccessMessage).toContainText('Thank you for your purchase!');
  }

  async verifyWrongPasswordDialog() {
  const dialogPromise = this.page.waitForEvent('dialog');
  const dialog = await dialogPromise;
  const dialogMessage = dialog.message();
  expect(dialogMessage).toContain('Wrong password');
  }
};