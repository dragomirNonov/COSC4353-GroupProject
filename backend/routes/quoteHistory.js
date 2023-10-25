const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//const usersHistoryData = require("../data/quoteHistoryData");
const Quote = require("../models/Quote"); 


// Get all quotes
router.get("/api/quotes", async (request, response) => {
  try {
    const quotes = await Quote.find();
    response.json(quotes);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

// Get quotes based on userID
router.get("/api/quotes/user", async (request, response) => {
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  try {
    const quotes = await Quote.find({ userID });
    response.json(quotes);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/quotes", async (request, response) => {
  const body = request.body;
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  const quote = new Quote({
    userID,
    requestDate: formattedDate,
    deliveryDate: body.date,
    gallons: body.gallons,
  });

  try {
    const savedQuote = await quote.save();
    response.status(201).json({ message: "Quote added successfully", quote: savedQuote });
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;




/*
const express = require("express");
const router = express.Router();
const usersHistoryData = require("../data/quoteHistoryData");
const jwt = require("jsonwebtoken");

const Quote = require("../models/Quote");
//quoteHistoryBackEnd
//
// Get all quotes
router.get("/api/quotes", (request, response) => {
  response.json(usersHistoryData);
});

//Get quotes based on userID
router.get("/api/quotes/user", (request, response) => {
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  const quotes = usersHistoryData.filter((quote) => quote.userID === userID);
  response.json(quotes);
});

router.post("/api/quotes", (request, response) => {
  const body = request.body;
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  // console.log(body);

  const quote = {
    userID: userID,
    requestDate: formattedDate,
    deliveryDate: body.date,
    gallons: body.gallons,
  };
  usersHistoryData.push(quote);
  response.status(201).json({ message: "Quote added successfully" });
});

module.exports = router;
*/