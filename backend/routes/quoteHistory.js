const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { quote } = require("../models/userSchemas");
const { getSuggestedPrice } = require("../services/pricingModule");
const userAuthentication = require("../services/basicAuth");
let authUser = userAuthentication.authUser;
// Get all quotes
router.get("/api/quotes", authUser, async (request, response) => {
  try {
    const quotes = await quote.find();
    response.json(quotes);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

// Get quotes based on userID
router.get("/api/quotes/user", authUser, async (request, response) => {
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  try {
    const quotes = await quote.find({ userID });
    response.json(quotes);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

// Get quote
router.get("/api/quotes/getquote", authUser, (request, response) => {
  const quoteObj = request.query;
  console.log(quoteObj);
  const finalQuote = getSuggestedPrice(quoteObj);
  console.log(finalQuote);
  response.status(201).json(finalQuote);
});

//Create new Quote
router.post("/api/quotes", authUser, async (request, response) => {
  const body = request.body;
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  const newQuote = new quote({
    userID: userID,
    requestDate: formattedDate,
    deliveryDate: body.date,
    gallons: body.gallons,
    pricePerGallon: body.pricePerGallon,
    totalAmount: body.totalAmount,
  });

  try {
    const savedQuote = await newQuote.save();
    response
      .status(201)
      .json({ message: "Quote added successfully", quote: savedQuote });
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
