const express = require('express');
const request = require('supertest');
const router = express.Router();
const usersHistoryData = require('../data/quoteHistoryData');
const jwt = require('jsonwebtoken');

describe('quoteRoutes', () => {
    it('GET /api/quotes should return all quotes', async () => {
      const app = express();
  
      // Define the route handler for GET /api/quotes
      app.get('/api/quotes', (request, response) => {
        response.json(usersHistoryData);
      });
  
      const response = await request(app).get('/api/quotes');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(usersHistoryData);
    });
  });


  describe('quoteRoutes', () => {
    it('GET /api/quotes/user should return user-specific quotes', async () => {
      const app = express();
  
      // Define the route handler for GET /api/quotes/user
      app.get('/api/quotes/user', (request, response) => {
        const token = request.headers['token'];
        const decoded = jwt.verify(token, 'secretkey');
        const userID = decoded.userId;
  
        const quotes = usersHistoryData.filter((quote) => quote.userID === userID);
        response.json(quotes);
      });
  
      // Define a valid token for testing
      const validToken = jwt.sign({ userId: 'testUserId' }, 'secretkey');
  
      const response = await request(app)
        .get('/api/quotes/user')
        .set('token', validToken);
      // Expect a 200 status code
      expect(response.status).toBe(200);
  
    });
  });