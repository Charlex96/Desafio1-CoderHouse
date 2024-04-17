import mongoose from "mongoose";
import CONFIG from "./config.js";

/** Patrón singleton-> retorna una sola instancia de conexión */

const { MONGO_USER, MONGO_PASS, DB_NAME } = CONFIG;
const config = {
  mongoDB: {
    URL: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.cyfup.mongodb.net/${DB_NAME}?retryWrites=true&w=majority `,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export class MongoManager {
  static #instance;
  constructor() {
    mongoose
      .connect(config.mongoDB.URL, config.mongoDB.options)
      .then(() => {
        console.log("Connected to Mongo Atlas");
      })
      .catch((error) => {
        console.log("Error Conect BD Mongo Atlas", error);
      });
  }

  static start() {
    if (!this.#instance) {
      this.#instance = new MongoManager();
    }
    return this.#instance;
  }
}
