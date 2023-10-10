const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const jwt = require("jsonwebtoken");
const { authUser } = require("../services/basicAuth");

// Get user info
router.get("/api/profile", (request, response) => {
    console.log("Inside get profile.");
    try {
        //get token
        const token = request.headers["token"];
        const decoded = jwt.verify(token, "secretkey");
        const userID = decoded.userId;

        console.log("Inside get info. User id: ", userID);
        const user = users.find((user) => user.id === userID);

        console.log("User: ", user);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        else {
            response.json({message: "Profile get success", user,});
        }

        
    } catch (error) {
    console.error("Error getting profile: ", error);
    response.status(500).json({message: "Internal server error"});
    }

});

// Update user profile info
router.put("/api/users/updateProfile", async (request, response) => {
    // get token from headers
    const token = request.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const userID = decoded.userId;
    try {
        const userIndex = users.findIndex((user) => user.id === userID);
    
        if (userIndex === -1) {
          return response.status(404).json({ message: "User not found" });
        }
        else {

            const user = users[userIndex];
            // Get information from input
            const { firstName, lastName, address1, address2, city, state, zipCode } = request.body;

            // Check for required fields
            if (!firstName || !lastName || !address1 || !city || !state || !zipCode) {
            return response.status(400).json({ message: "Please fill out all required fields" });
            }

            console.log("Updated user:", user);
            // Update user's profile information
            user.firstName = firstName;
            user.lastName = lastName;
            user.address1 = address1;
            user.address2 = address2;
            user.city = city;
            user.state = state;
            user.zip = zipCode;
            user.isProfileComplate = true;

            // Update the user data in userData.js
            users[userIndex] = user;
            console.log("User is now: ", users[userIndex]);

            // Save the updated user profile
            return response.status(200).json({ message: "Profile updated successfully", isProfileComplate: true, });

        }
    } catch (error) {
        console.error("Error updating profile: ", error);
        response.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;