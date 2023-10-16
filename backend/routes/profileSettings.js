const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = require("../data/usersData");
const jwt = require("jsonwebtoken");
const { authUser } = require("../services/basicAuth");
let { user, profile } = require("../models/userSchemas");

let states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

// Get user info
router.get("/api/profile", (request, response) => {
  try {
    const token = request.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const userID = decoded.userId;

    const userExists = user
      .findOne({ _id: userID })
      .exec();

    if(!userExists) {
      console.log("Profile get failed.");
      return response.status(404).json({ message: "User not found" });
    } else {
      console.log("Profile get success.");
      response.status(200).json({ message: "Profile get success", userExists });
    }

  } catch (error) {
    console.error("Error getting profile: ", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile info
router.put("/api/users/updateProfile", async (request, response) => {
  // get token from headers
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  try {
    const userExists = user
    .findOne({ _id: userID })
    .exec();
    var { firstSuccess, lastSuccess, add1Success, add2Success, citySuccess, stateSuccess, zipSuccess, } = false;
    const namePattern = /^[A-Za-z]{1,25}$/;
    const address1Pattern = /^(?=\S*\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d)[a-zA-Z\d\s',.#/-]*$/;
    const address2Pattern = /^[A-Za-z]*[.]?[ ]+[0-9]*$/;
    const cityPattern = /^[A-Za-z ]{1,25}$/;
    const zipPattern = /[0-9]{5,9}/;

    if (!userExists) {
      return response.status(404).json({ message: "User not found" });
    } else {

      // Get information from input
      var { firstName, lastName, address1, address2, city, state, zipCode } = request.body;

      if (!namePattern.test(firstName) || firstName === "") {
        console.log("Bad firstName input.");
        return response.status(401).json({ message: "Invalid first name input." });
      } else {
        firstSuccess = true;
      }

      if (!namePattern.test(lastName) || lastName === "") {
        console.log("Bad lastName input.");
        return response.status(401).json({ message: "Invalid last name input." });
      } else {
        lastSuccess = true;
      }

      if (!address1Pattern.test(address1) || address1 === "") {
        console.log("Bad address1 input.");
        return response.status(401).json({ message: "Invalid address 1 input." });
      } else {
        add1Success = true;
      }

      if (!address2Pattern.test(address2) && address2 !== "") {
        console.log("Bad address2 input.");
        return response.status(401).json({ message: "Invalid address 2 input." });
      } else {
        if (!address2) {
          console.log("No address 2 change.");
          address2 = userExists.address2;
        }
        add2Success = true;
      }

      if (!cityPattern.test(city) || city === "") {
        console.log("Bad city input.");
        return response.status(401).json({ message: "Invalid city input." });
      } else {
        citySuccess = true;
      }

      if (states.includes(state)) {
        stateSuccess = true;
      }

      if (!zipPattern.test(zipCode) || zipCode === "") {
        console.log("Bad zipCode input.");
        return response.status(401).json({ message: "Invalid zip code input." });
      } else {
        zipSuccess = true;
      }

      console.log("First: ", firstSuccess);
      console.log("last: ", lastSuccess);
      console.log("add1: ", add1Success);
      console.log("add2: ", add2Success);
      console.log("city: ", citySuccess);
      console.log("stae: ", stateSuccess);
      console.log("zip: ", zipSuccess);

      if (!firstSuccess || !lastSuccess || !add1Success || !add2Success || !citySuccess || !stateSuccess || !zipSuccess) {
        console.log("Profile update failed. Invalid input.");
        return response.status(400).json({ message: "Error updating profile: invalid input." });
      } else {

        const existingProfile = await profile.findOne({ _id: userExists._id });

        if (existingProfile) {
          existingProfile.firstName = firstName;
          existingProfile.lastName = lastName;
          existingProfile.address1 = address1;
          existingProfile.address2 = address2;
          existingProfile.city = city;
          existingProfile.state = state;
          existingProfile.zipCode = zipCode;
          await existingProfile.save();
        } else {
          //  If the user does not have an existing "profile" document, create a new one
          const newProfile = new profile({
            _id: userExists._id,
            firstName: firstName,
            lastName: lastName,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zipCode: zipCode,
          });
          userExists.profileComplete = true;

          await newProfile.save();
          await userExists.save();
        }
      
        // Save the updated user profile
        console.log("Profile update success.");
        return response.status(200).json({ message: "Profile updated successfully", isProfileComplete: userExists.profileComplete, });
      }
    }
  } catch (error) {
      console.error("Error updating profile: ", error);
      response.status(500).json({message: "Internal server error"});
  }
});

// Update user account info
router.put("/api/users/updateAccount", async (request, response) => {
  // get token from headers
  const token = request.headers["token"];
  const decoded = jwt.verify(token, "secretkey");
  const userID = decoded.userId;

  try {
    const userExists = user
    .findOne({ _id: userID })
    .exec();

    if (!userExists) {
      return response.status(404).json({ message: "User not found" });
    } else {
      // Get information from input
      var email = request.body.email;
      const enteredPassword = request.body.password;
      var hashedPassword = "";
      var emailSuccess = false;
      var passwordSuccess = false;

      // User can enter new email or new password or both
      if (!email && !enteredPassword) {
        console.log("Error: No email or password input.");
        return response.status(400).json({
            message:
              "Please enter a new email or password to update your account. ",
          });
      } else if (email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
        if (!emailPattern.test(email)) {
          console.log("Error: Invalid email input.");
          return response.status(401).json({ message: "Invalid email input." });
        } else if (email === userExists.email) {
          console.log("Error: New email is the same as current email.");
          return response.status(401).json({ message: "New email cannot be the same as old email." });
        } else {
          console.log("New email: ", email);
          emailSuccess = true;
        }
      } else {
        email = userExists.email;
        console.log("No email change.");
        emailSuccess = true;
      }

      // If user entered a new password
      if (enteredPassword) {
        try {
          const passwordMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(enteredPassword, userExists.password, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });

          if (passwordMatch) {
            console.log("Error: New password is the same as current password.");
            return response.status(401).json({
                message: "New password cannot be the same as old password.",
              });
          } else {
            hashedPassword = await bcrypt.hash(request.body.password, 10);
            console.log("New password: ", hashedPassword);
            passwordSuccess = true;
          }
        } catch (err) {
          console.log("Error: Internal server error.");
          return response.status(500).json({ message: "Internal server error." });
        }
      } else {
        hashedPassword = userExists.password;
        console.log("No password change.");
        passwordSuccess = true;
      }

      if (emailSuccess && passwordSuccess) {
        userExists.email = email;
        userExists.password = hashedPassword;
        userExists.save();

        console.log(" New email: ", userExists.email);
        console.log(" New password: ", userExists.password);

        // Save the updated user profile
        return response.status(200).json({ message: "Account updated successfully. " });
      } else {
        return response.status(401).json({ message: "Error updating account. " });
      }
    }
  } catch (error) {
    console.error("Error updating account: ", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
