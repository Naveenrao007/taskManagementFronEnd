const mongoose = require("mongoose");
const User = require("path-to-your-user-model"); // Replace with the actual path to your User model

// Function to get user ID by email
async function getUserIdByEmail(email) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return user._id; // Return the user ID if found
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
}
 