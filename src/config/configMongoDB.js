

import mongoose from "mongoose";
import "dotenv/config";

const config = {
    mongoDB: {
        // URL: `mongodb+srv://fimacharles:lE8oqWVO44hcDsJu@dbcoder.bpexbss.mongodb.net/ecommerce`, // Use environment variables for sensitive data
        
        URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbcoder.bpexbss.mongodb.net/${process.env.DB_NAME}`, // Use environment variables for sensitive data
    },
};

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
        console.log("Connected to Mongo Atlas");
    } catch (error) {
        console.log("Error en la conexión con Mongo Atlas", error);
    }
};
