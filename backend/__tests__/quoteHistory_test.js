const express = require("express");
const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const { quote } = require("../models/userSchemas");
const quoteModel = require("../models/userSchemas").quote;
const userSchemas = require("../models/userSchemas");

describe("GET /api/quotes/user", () => {
  it("should return quotes for a valid user", async () => {
    // Assuming you have a valid token for testing
    const userId = "user123";
    const token = jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });
    // Make the request
    const res = await request(app).get("/api/quotes/user").set("token", token);

    // Expectations
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("length");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /api/quotes/user", () => {
  it("should return 401 if the token is missing", async () => {
    const res = await request(app).get("/api/quotes/user");

    expect(res.statusCode).toBe(401);
  });

  it("should return 401 if the token is invalid", async () => {
    const res = await request(app)
      .get("/api/quotes/user")
      .set("token", "invalid_token");

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/quotes/getquote", () => {
  it("should return a suggested price for a valid request", async () => {
    // Replace with the actual quote object for testing
    const quoteObj = {
      // Your quote object properties go here
    };

    const userId = "user123";
    const token = jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });
    // Make the request
    const res = await request(app)
      .get("/api/quotes/getquote")
      .set("token", token)
      .query(quoteObj);

    // Expectations
    expect(res.status).toBe(201);
  });
});

describe("POST /api/quotes", () => {
  it("should create a new quote for a valid request", async () => {
    // Replace with the actual quote data for testing
    const quoteData = {
      date: "2023-12-01",
      gallons: 100,
      pricePerGalon: 2,
      totalAmount: 200,
    };

    // Replace with the actual token for testing
    const userId = "user123";
    const token = jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });

    // Make the request
    const res = await request(app)
      .post("/api/quotes")
      .set("token", token)
      .send(quoteData);

    // Expectations
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Quote added successfully");
    expect(res.body).toHaveProperty("quote");
  });
});

describe("POST /api/quotes", () => {
  it("should return 401 if the token is missing", async () => {
    const res = await request(app)
      .post("/api/quotes")
      .send(/* Replace with valid quote data */);

    expect(res.status).toBe(401);
  });

  it("should return 401 if the token is invalid", async () => {
    const res = await request(app)
      .post("/api/quotes")
      .set("token", "invalid_token")
      .send(/* Replace with valid quote data */);

    expect(res.status).toBe(401);
  });
});

describe("POST /api/quotes", () => {
  it("should handle server error during quote creation", async () => {
    // Mocking save to simulate a server error
    jest.spyOn(userSchemas.quote.prototype, "save").mockImplementation(() => {
      throw new Error("Simulated server error");
    });

    const quoteData = {
      // Your valid quote data goes here
    };

    const userId = "user123";
    const token = jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });

    const response = await request(app)
      .post("/api/quotes")
      .set("token", token)
      .send(quoteData);

    // Expect a 500 server error response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "An error occurred",
    });

    // Restore the original implementation of save
    userSchemas.quote.prototype.save.mockRestore();
  });
});

describe("GET /api/quotes/user", () => {
  it("should handle server error during quote retrieval", async () => {
    // Mocking find to simulate a server error
    jest.spyOn(userSchemas.quote, "find").mockImplementation(() => {
      throw new Error("Simulated server error");
    });

    const userId = "user123";
    const token = jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });

    const response = await request(app)
      .get("/api/quotes/user")
      .set("token", token);

    // Expect a 500 server error response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "An error occurred",
    });

    // Restore the original implementation of find
    userSchemas.quote.find.mockRestore();
  });
});
