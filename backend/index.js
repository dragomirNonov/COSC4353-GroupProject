const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// Import the route handlers from userRoutes.js
const userRoutes = require("./routes/userRoutes");
// Import the route handlers from quoteHistoryData.js
const quoteRoutes = require("./routes/quoteHistory");
// Import the route handlers from profileSettings.js
const profileSettings = require("./routes/profileSettings");

// Use the route handlers
app.use("/", userRoutes);
app.use("/", quoteRoutes);
app.use("/", profileSettings);

const url = `mongodb+srv://COSC4353:cosc4353project@fuelquoteapp.dk3u3zw.mongodb.net/FuelQuoteApp?retryWrites=true&w=majority`;
//sets up mongoose for the mongoDB connection
mongoose
  .connect(url)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
