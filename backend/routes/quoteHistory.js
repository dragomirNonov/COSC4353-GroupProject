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
  console.log(body);
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
