const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Import the route handlers from userRoutes.js
const userRoutes = require("./routes/userRoutes");

// Use the route handlers
app.use("/", userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
