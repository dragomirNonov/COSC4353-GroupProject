const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = require("../data/usersData");

// Get all users
router.get("/api/users", (request, response) => {
  response.json(users);
});

// Login
router.post("/api/login", (request, response) => {
  const username = request.body.username;
  const enteredPassword = request.body.password;
  const user = users.find((user) => user.username === username);

  if (!user) {
    console.log("User not found");
    response.status(401).json({ message: "User not found" });
    return;
  }

  bcrypt.compare(enteredPassword, user.password, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
      response.status(500).json({ message: "Internal server error" });
      return;
    }
    if (result === true) {
      response.json(user);
    } else {
      console.log("Wrong password");
      response.status(401).json({ message: "Wrong password" });
    }
  });
});

// Get user by ID
router.get("/api/users/id/:id", (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);
  console.log("asdasd");
  response.json(user);
});

// Get user by firstName
router.get("/api/users/:firstName", (request, response) => {
  const firstName = request.params.firstName;
  const user = users.find((user) => user.firstName === firstName);
  response.json(user);
});

// Register user
router.post("/api/users", async (request, response) => {
  const maxId = users.length > 0 ? Math.max(...users.map((n) => n.id)) : 0;
  const body = request.body;
  const userExists = users.find((user) => user.username === body.username);

  if (userExists) {
    response.status(400).json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = {
      id: maxId + 1,
      profileComplated: false,
      firstName: "",
      lastName: "",
      username: body.username,
      password: hashedPassword,
      email: body.email,
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    };
    users.push(user);
    response.status(201).json({ message: "User added successfully" });
  }
});

module.exports = router;
