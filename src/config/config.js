import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  PORT: process.env.PORT || "8080",
  DB_NAME: process.env.DB_NAME || "test",
  MONGO_USER: process.env.MONGO_USER || "",
  MONGO_PASS: process.env.MONGO_PASS || "",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || "",
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || "",
  DATASOURCE: process.env.DATASOURCE || "MONGO",
};

export default CONFIG;
