const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

// Load Environment Variables
dotenv.config();

// Load the User Model
const User = require("./models/User");

// Connect to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  });

// Read the JSON file synchronously
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);

// Function to Import Data
const importData = async () => {
  try {
    // Optional: Clear existing users to avoid 'duplicate email' errors during testing
    // await User.deleteMany(); 
    // console.log("Existing users cleared.");

    // User.create() automatically triggers the pre("save") password hashing hook!
    await User.create(users);
    
    console.log("✅ Users Imported Successfully!");
    process.exit(); // Exit the script successfully
  } catch (error) {
    console.error("❌ Error importing data:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Execute the function
importData();