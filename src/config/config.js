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
  mailing:{
    SERVICE: process.env.MAILING_SERVICE,
    PORT: process.env.MAILING_PORT,
    AUTH:{
        USER: process.env.MAILING_AUTH_USER,
        PASS: process.env.MAILING_AUTH_PASS
    }
},
};

export default CONFIG;
