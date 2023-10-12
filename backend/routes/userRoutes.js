const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../data/usersData");
const userAuthentication = require("../services/basicAuth");
let authUser = userAuthentication.authUser;

// LOGIN
router.post("/api/login", (request, response) => {
  const username = request.body.username;
  const enteredPassword = request.body.password;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(401).json({ message: "User not found" });
  }

  bcrypt.compare(enteredPassword, user.password, (err, result) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    if (result === true) {
      let token = jwt.sign({ userId: user.id }, "secretkey", {
        expiresIn: "500min",
      });
      return response.status(200).json({
        message: "Login success",
        token: token,
        isProfileComplate: user.isProfileComplate,
      });
    } else {
      return response.status(401).json({ message: "Wrong password" });
    }
  });
});

// Get user by ID
router.get("/api/users/id", authUser, (request, response) => {
  try {
    const token = request.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const userID = decoded.userId;
    const user = users.find((user) => user.id === userID);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.json(user);
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" });
  }
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
    console.log(hashedPassword);
    const user = {
      id: maxId + 1,
      isProfileComplate: false,
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
