require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const conn = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI); // No need for options
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

conn();

