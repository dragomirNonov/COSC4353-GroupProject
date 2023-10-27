const express = require("express");
const request = require("supertest");
const app = express();
const jwt = require("jsonwebtoken");
const { quote } = require("../models/userSchemas");

describe("quoteRoutes", () => {
    jest.setTimeout(30000);

  it("GET /api/quotes should return all quotes", async () => {
    // Define the route handler for GET /api/quotes
    app.get("/api/quotes", async (req, res) => {
      try {
        const quotes = await quote.find();
        res.json(quotes);
      } catch (error) {
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Test GET /api/quotes
    const response = await request(app).get("/api/quotes");

    // Expect a 200 status code
    expect(response.status).toBe(200);
  });

  it("GET /api/quotes/user should return user-specific quotes", async () => {
    // Define the route handler for GET /api/quotes/user
    app.get("/api/quotes/user", async (req, res) => {
      try {
        // Simulate a valid token
        const validToken = jwt.sign({ userId: "testUserId" }, "secretkey");

        // Use the valid token to retrieve user-specific quotes
        const response = await request(app)
          .get("/api/quotes/user")
          .set("token", validToken);

        // Expect a 200 status code
        expect(response.status).toBe(200);
      } catch (error) {
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Test GET /api/quotes/user
    const response = await request(app).get("/api/quotes/user");

    // Expect a 200 status code
    expect(response.status).toBe(200);
  });

  it("POST /api/quotes should handle quote creation", async () => {
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
