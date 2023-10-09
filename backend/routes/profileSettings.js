const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const jwt = require("jsonwebtoken");
const { authUser } = require("../services/basicAuth");

// Update user profile info
router.put("/api/users/updateProfile", (request, response) => {

    // get token from headers
    const token = request.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const userID = decoded.userId;
    try {
        const user = users.find((user) => user.id === userID);
    
        if (!user) {
          return response.status(404).json({ message: "User not found" });
        }
        else {

            // Get information from input
            const { firstName, lastName, address1, address2, city, state, zipCode } = request.body;

            // Check for required fields
            if (!firstName || !lastName || !address1 || !city || !state || !zipCode) {
            return response.status(400).json({ message: "Please fill out all required fields" });
            }

            // Update user's profile information
            user.firstName = firstName;
            user.lastName = lastName;
            user.address1 = address1;
            user.address2 = address2;
            user.city = city;
            user.state = state;
            user.zipCode = zipCode;
            user.isProfileComplate = true;

            // Save the updated user profile
            response.status(200).json({ message: "Profile updated successfully" });

        }
    } catch (error) {
        console.error("Error updating profile: ", error);
        response.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;