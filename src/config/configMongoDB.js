import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoDB: {
    URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbcoder.bpexbss.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    // options: {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // },
  },
};

export const connectMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
    console.log("Connected to Mongo Atlas");
  } catch (error) {
    console.error("Error Conect BD Mongo Atlas", error.message);
    console.error("Full error details:", error);
  }

  console.log('MONGO_USER:', process.env.MONGO_USER);
  console.log('MONGO_PASS:', process.env.MONGO_PASS);
  console.log('DB_NAME:', process.env.MONGO_DB);
};