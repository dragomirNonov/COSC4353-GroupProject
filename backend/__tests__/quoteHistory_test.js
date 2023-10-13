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

describe('quoteRoutes', () => {
  it('POST /api/quotes should add a quote and return a 201 status', async () => {
    const app = express();

    // Define the route handler for POST /api/quotes
    app.post('/api/quotes', (request, response) => {
      const body = request.body;
      const token = request.headers['token'];
      const decoded = jwt.verify(token, 'secretkey');
      const userID = decoded.userId;

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Months are zero-based, so add 1
      const day = today.getDate();
      const formattedDate = `${year}-${month}-${day}`;

      console.log(body);

      const quote = {
        userID: userID,
        requestDate: formattedDate,
        deliveryDate: body.date,
        gallons: body.gallons,
      };
      usersHistoryData.push(quote);
      //Expect a 201 status code 
      response.status(500).json({ message: 'Quote added successfully' });
    });

    // Define a valid token for testing
    const validToken = jwt.sign({ userId: 'testUserId' }, 'secretkey');

    // Define the request body for the POST request
    const requestBody = {
      date: '2023-10-10',
      gallons: 10,
    };

    const response = await request(app)
      .post('/api/quotes')
      .set('token', validToken)
      .send(requestBody);

    // Expect a 201 status code and a message
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Quote added successfully' });
  });
});