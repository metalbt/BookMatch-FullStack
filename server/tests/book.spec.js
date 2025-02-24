import { test, expect } from '@playwright/test';
import crypto from 'crypto';

function createValidUser() {
  const hash = crypto.randomBytes(10).toString('hex');
  return {
    email: `valid-${hash}@email.com`,
    password: '12345678',
    passwordcon: '12345678',
  };
}

test.describe('Book App', () => {
  let validUser;

  test.beforeAll(() => {
    validUser = createValidUser();
  });

  test('should sign up and sign in', async ({ page }) => {
    // Cadastro
    await page.goto('http://localhost:3000/registro.html');
    await page.fill('input[name="email"]', validUser.email);
    await page.fill('input[name="password"]', validUser.password);
    await page.fill('input[name="passwordcon"]', validUser.passwordcon);
    await page.click('button.btn-danger');
    await expect(page).toHaveURL(/login.html/);

    // Login
    await page.goto('http://localhost:3000/login.html');
    await page.fill('input[name="email"]', validUser.email);
    await page.fill('input[name="password"]', validUser.password);
    await page.click('button.btn-danger');
    await expect(page).toHaveURL(/home.html/);
  });
});
