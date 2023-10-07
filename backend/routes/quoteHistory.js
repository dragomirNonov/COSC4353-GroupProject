const express = require("express");
const router = express.Router();
const usersHistoryData = require("../data/quoteHistoryData");
const jwt = require("jsonwebtoken");

// Get all quotes
router.get("/api/quotes", (request, response) => {
  response.json(usersHistoryData);
});

//Get quotes based on userID
router.get("/api/quotes/user", (request, response) => {
  //get token from headers
  const token = request.headers["token"];
  //decode jwt
  const decoded = jwt.verify(token, "secretkey");
  //get user id from jwt
  const userID = decoded.userId;

  const quotes = usersHistoryData.filter((quote) => quote.userID === userID);
  response.json(quotes);
});

module.exports = router;
