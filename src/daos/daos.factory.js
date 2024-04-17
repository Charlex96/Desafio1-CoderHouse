import CONFIG from "../config/config.js";

let productDao;
let cartDao;
let chatDao;
let userDao;
let homeDao;
let authDao;

switch (CONFIG.DATASOURCE) {
  case "MEMORY": {
    // TODO: completar lo que falta
    break;
  }
  case "MONGO": {
    const { ProductMongoDao } = await import("./mongo/product.mongo.dao.js");
    productDao = new ProductMongoDao();
    const { CartMongoDao } = await import("./mongo/cart.mongo.dao.js");
    cartDao = new CartMongoDao();
    const { ChatMongoDao } = await import("./mongo/chat.mongo.dao.js");
    chatDao = new ChatMongoDao();
    const { HomeMongoDao } = await import("./mongo/home.mongo.dao.js");
    homeDao = new HomeMongoDao();
    const { UserMongoDao } = await import("./mongo/user.mongo.dao.js");
    userDao = new UserMongoDao();
    const { AuthMongoDao } = await import("./mongo/auth.mongo.dao.js");
    authDao = new AuthMongoDao();
    break;
  }
  default: {
    throw new Error(
      "Debes elegir un tipo de persistencia válido: MEMORY o MONGO"
    );
  }
}

const getDAOS = () => {
  return {
    productDao,
    cartDao,
    chatDao,
    homeDao,
    userDao,
    authDao,
  };
};

export default getDAOS;
