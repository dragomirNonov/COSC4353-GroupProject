const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const usersHistoryData = require("../data/quoteHistoryData");

// Get id number from User
// Use id number to fetch address/fetch history

//not sure about the correct url
// "../data/quoteHistoryData"
router.get("/api/users/id/:id", (request, response) => {
  const id = Number(request.params.id);
  // Filter the users array to find all users with the same id
  const listQuotes = users.filter((user) => user.id === id);

  // Check if any matching users were found
  if (listQuotes.length > 0) {
    response.json(listQuotes);
  } else {
    // No matching users found
    response.status(404).json({ message: "No users found with the specified ID." });
  }
});


// Need to Replace "1" with ID from profile info
/*
const userId = 1;

// Fetch info from ?Another file with data?
fetch(`/api/users/id/${userId}`)
  .then((response) => {
    if (response.ok) {
      return response.json(); // Parse the response as JSON
    } else {
      throw new Error("Failed to fetch user data");
    }
  })
  .then((user) => {
    if (user) {
      console.log(`User ID ${userId} data:`, user);
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

*/