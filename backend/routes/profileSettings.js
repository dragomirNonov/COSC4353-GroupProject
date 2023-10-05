const express = require("express");
const router = express.Router();
const users = require("../data/usersData");

/* 
    Replace with user authentication (token/session)

const { authenticateUser, updateUserProfile } = require("../middleware/auth");
    */


// Update user profile info
router.put("/api/users/updateProfile", authenticateUser, (request, response) => {
    try {
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const address1 = request.body.address1;
        const address2 = request.body.address2;
        const city = request.body.city;
        const state = request.body.state;
        const zipCode = request.body.zipeCode;

        // Fetch the currently logged-in user
        const user = request.user;
    
        if (!user) {
          return response.status(404).json({ message: "User not found" });
        }
        else {
            // Update user's profile information
            user.firstName = firstName;
            user.lastName = lastName;
            user.address1 = address1;
            user.address2 = address2;
            user.city = city;
            user.state = state;
            user.zipCode = zipCode;

            // Save the updated user profile
            user.save((error) => {
                if (error) {
                    console.error("Error updating profile: ", error);
                    response.status(500).json({ message: "Internal server error" });
                } else {
                    response.status(200).json({ message: "Profile updated successfully" });
                }
            });
        }
    } catch (error) {
        console.error("Error updating profile: ", error);
        response.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;