import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import crypto from 'crypto';
import app from '../server.js';

let validUser;
let authToken;

function createValidUser() {
  const validUser = {
    password: '12345678',
    passwordcon: '12345678',
  };

  const hash = crypto.randomBytes(10).toString('hex');
  validUser.email = `valid-${hash}@test.com`;

  return validUser;
}

async function loadToken(user) {
  const response = await request(app).post('/api/login').send(user);
  return response.body.token;
}

describe('Book App API', () => {
  before(async () => {
    validUser = createValidUser();
    await request(app).post('/api/register').send(validUser);
    authToken = await loadToken(validUser);
  });

  describe('Authentication Endpoints', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app).post('/api/login').send(validUser);
      assert.strictEqual(response.statusCode, 200);
    });
  });
});
