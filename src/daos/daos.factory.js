import CONFIG from "../config/config.js";

let productDao;
let cartDao;
let userDao;
let ticketDao;

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
    const { UserMongoDao } = await import("./mongo/user.mongo.dao.js");
    userDao = new UserMongoDao();
    const { TicketMongoDao } = await import("./mongo/ticket.mongo.dao.js");
    ticketDao = new TicketMongoDao();
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
    userDao,
    ticketDao,
  };
};

export default getDAOS;
