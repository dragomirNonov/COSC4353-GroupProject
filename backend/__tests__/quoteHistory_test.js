const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const router = require('./quoteRoutes'); // Import your router
const usersHistoryData = require('../data/quoteHistoryData');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('quoteRoutes', () => {
  // Mocking jwt.verify
  jwt.verify.mockImplementation((token, secretKey) => {
    if (token === 'validToken') {
      return { userId: '123' };
    } else {
      throw new Error('Invalid token');
    }
  });

  // Mocking usersHistoryData
  const mockQuotes = [
    { id: '1', userID: '123', text: 'Quote 1' },
    { id: '2', userID: '456', text: 'Quote 2' },
  ];
  jest.mock('../data/quoteHistoryData', () => mockQuotes);

  // Test GET /api/quotes
  describe('GET /api/quotes', () => {
    it('should return all quotes', async () => {
      const response = await request(express().use(router)).get('/api/quotes');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockQuotes);
    });
  });

  // Test GET /api/quotes/user
  describe('GET /api/quotes/user', () => {
    it('should return quotes for a valid user', async () => {
      const response = await request(express().use(router))
        .get('/api/quotes/user')
        .set('token', 'validToken');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockQuotes[0]]);
    });

    it('should return 401 for an invalid token', async () => {
      const response = await request(express().use(router))
        .get('/api/quotes/user')
        .set('token', 'invalidToken');
      expect(response.statusCode).toBe(401);
    });
  });
});
