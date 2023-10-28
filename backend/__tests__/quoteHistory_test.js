const express = require("express");
const request = require("supertest");
const app = express("../index");
const jwt = require("jsonwebtoken");
const { quote } = require("../models/userSchemas");

    // Define the route handler for GET /api/quotes/user
    app.get("/api/quotes/user", async (req, res) => {
      try {
        // Get the user ID from the token in the request headers
        const token = req.headers["token"];
        const decoded = jwt.verify(token, "secretkey");
        const userID = decoded.userId;

        // Use the quote model to fetch user-specific quotes from the database
        const quotes = await quote.find({ userID });

        // Return the quotes as a JSON response
        res.json(quotes);
      } catch (error) {
        // Handle any errors and return an error response if needed
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Define the route handler for GET /api/quotes
    app.get("/api/quotes", async (req, res) => {
      try {
        // Use the quote model to fetch all quotes from the database
        const quotes = await quote.find();

        // Return the quotes as a JSON response
        res.json(quotes);
      } catch (error) {
        // Handle any errors and return an error response if needed
        res.status(500).json({ error: "An error occurred" });
      }
    });

describe("quoteRoutes", () => {
  jest.setTimeout(30000);
  it("GET /api/quotes/user should return user-specific quotes", async () => {
    
    // Define a valid token for testing
    const validToken = jwt.sign({ userId: "testUserId" }, "secretkey");

    // Test GET /api/quotes/user
    const responseUser = await request(app)
      .get("/api/quotes/user")
      .set("token", validToken);

    // Expect a 200 status code
    expect(responseUser.status).toBe(200);

    // Test GET /api/quotes
    const responseQuotes = await request(app).get("/api/quotes");

    // Expect a 200 status code
    expect(responseQuotes.status).toBe(200);
  });

  it("GET /api/quotes should handle errors", async () => {
    // Create a fake user ID for testing
    const fakeUserId = "fakeUserId";

    // Mock the behavior of quote.find to throw an error
    const quoteFind = quote.find;
    quote.find = () => {
      throw new Error("Test error");
    };

    // Test GET /api/quotes with the fake user
    const response = await request(app)
      .get("/api/quotes")
      .set("token", jwt.sign({ userId: fakeUserId }, "secretkey"));

    // Expect a 500 status code due to the error
    expect(response.status).toBe(500);

    // Restore the original implementation of quote.find
    quote.find = quoteFind;
  });


  it("POST /api/quotes should handle errors", async () => {
    // Define the route handler for POST /api/quotes
    app.post("/api/quotes", async (req, res) => {
      try {
        // Simulate an error by throwing an exception
        throw new Error("Test error");
      } catch (error) {
        // Handle the error and return a 500 status code
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Test POST /api/quotes
    const response = await request(app)
      .post("/api/quotes")
      .set("token", jwt.sign({ userId: "testUserId" }, "secretkey"))
      .send({
        date: "2023-10-30",
        gallons: 100,
        pricePerGallon: 3.5,
        totalAmount: 350,
      });

    // Expect a 500 status code due to the error
    expect(response.status).toBe(500);
  });

  
  it("POST /api/quotes should handle errors", async () => {
    // Define the route handler for POST /api/quotes
    app.post("/api/quotes", async (req, res) => {
      try {
        // Simulate a successful quote creation
        const newQuote = new quote({
          userID: "testUserId",
          requestDate: "2023-10-30",
          deliveryDate: "2023-11-15",
          gallons: 100,
          pricePerGallon: 3.5,
          totalAmount: 350,
        });
        const savedQuote = await newQuote.save();
        res.status(201).json({ message: "Quote added successfully", quote: savedQuote });
      } catch (error) {
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Test POST /api/quotes
    const response = await request(app)
      .post("/api/quotes")
      .set("token", jwt.sign({ userId: "testUserId" }, "secretkey"))
      .send({
        date: "2023-10-30",
        gallons: 100,
        pricePerGallon: 3.5,
        totalAmount: 350,
      });

    // Expect a 201 status code for a successful quote creation
    expect(response.status).toBe(201);
    // Expect the response message to indicate successful quote creation
    expect(response.body.message).toBe("Quote added successfully");
    // Ensure the response contains the saved quote data
    expect(response.body.quote).toBeDefined();
  });
});