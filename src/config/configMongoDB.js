

const mongoose = require("mongoose");
require("dotenv/config");

const config = {
    mongoDB: {
        URL: `mongodb+srv://fimacharles:lE8oqWVO44hcDsJu@dbcoder.bpexbss.mongodb.net/ecommerce`, // Use environment variables for sensitive data
    },
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoDB.URL);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error.message);
    }
};

module.exports = {
    connectMongoDB: connectMongoDB,
};

