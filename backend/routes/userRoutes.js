const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../data/usersData");
const userAuthentication = require("../services/basicAuth");
let authUser = userAuthentication.authUser;
let { user } = require("../models/userSchemas");

// LOGIN
router.post("/api/login", async (req, res) => {
  try {
    const userExists = await user
      .findOne({ username: req.body.username })
      .exec();

    if (!userExists) {
      return res.status(401).json({
        title: "User not found.",
        message: "Invalid credentials.",
      });
    }

    if (!bcrypt.compareSync(req.body.password, userExists.password)) {
      return res.status(401).json({
        title: "Login Failed.",
        message: "Invalid Password.",
      });
    }

    let token = jwt.sign({ userId: userExists._id }, "secretkey", {
      expiresIn: "100min",
    });

    return res.status(200).json({
      message: "Login success",
      token: token,
      isProfileComplete: userExists.profileComplete,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
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
  try {
    const email = request.body.email;
    const username = request.body.username;

    const existingUser = await user
      .findOne({
        $or: [{ email: email }, { username: username }],
      })
      .exec();
    if (existingUser) {
      return response.status(401).json({
        title: "Existing Email",
        message: "User already exists.",
      });
    }
    const newUser = new user({
      username: request.body.username,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 10),
      profileComplete: false,
    });
    const savedUser = await newUser.save();
    return response
      .status(200)
      .json({ savedUser: savedUser, message: "User added successfully." });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
});

module.exports = router;
