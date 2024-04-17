import getDAOS from "../daos/daos.factory.js";
const { cartDao, productDao } = getDAOS();
class CartController {
  async create(req, res) {
    /**Crea un carrito vacío de productos.
     * No le envío body->creo un carrito a partir del schema.
     */
    try {
      const cartCreated = await cartDao.create();
      cartCreated
        ? res.status(201).json({
            status: "success",
            payload: cartCreated,
          })
        : res.json({
            status: "error",
          });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getAll(req, res) {
    /**Devuelve todos los carritos */
    try {
      const allCarts = await cartDao.getAll();
      allCarts
        ? res.status(200).json({
            status: "success",
            payload: allCarts,
          })
        : res.status(200).json({
            status: "success",
            payload: [],
          });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getProductsOfCart(req, res) {
    /**Devuelve los productos de un carrito por id */
    try {
      const idCart = req.params.idCart;
      const cart = await cartDao.getOne(idCart);
      cart
        ? res.status(200).json({
            status: "success",
            payload: cart.products,
          })
        : res.status(404).json({
            status: "error",
            message: "Sorry, no cart found by id: " + idCart,
            payload: {},
          });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async viewCartDetail(req, res) {
    try {
      const idCart = req.params.idCart;

      const cart = await cartDao.getOne(idCart);
      const products = cart.products;

      cart
        ? res.render("myCart", { products })
        : res.status(404).json({
            status: "error",
            message: "Sorry, no cart found by id: " + idCart,
            payload: {},
          });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
  async addProductToCart(req, res) {
    try {
      const cart = await cartDao.getOne(req.params.idCart);
      const product = await productDao.getOne(req.params.idProduct);
      const payload = req.body;
      /** Utilizo la misma ruta para agregar una unidad de un producto
       * o varias unidades de un producto.
       * Si no envío payload.quantity, se agrega una unidad por default.
       */
      if (payload.quantity) {
        console.log("payload.quantity", payload.quantity);
        //faltaria validar que sea un numero
        if (payload.quantity < 0 || payload.quantity == 0)
          throw new Error("La cantidad debe ser mayor a 0");
        if (cart && product) {
          const cartUpdated = await cartDao.addManyOfTheSameProduct(
            cart,
            product,
            payload.quantity
          );
          const response = await cartDao.getOne(cartUpdated._id);
          res.status(201).json({
            status: "success",
            payload: response,
          });
        } else {
          res.status(404).json({ message: "Missing data" });
        }
      } else {
        if (cart && product) {
          const cartUpdated = await cartDao.addProduct(cart, product);
          const response = await cartDao.getOne(cartUpdated._id);
          res.status(201).json({
            status: "success",
            payload: response,
          });
        } else {
          res.status(404).json({ message: "Missing data" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  }
  async updateAllProductsOfCart(req, res) {
    try {
      const cart = await cartDao.getOne(req.params.idCart);
      const payload = req.body;
      if (cart) {
        const cartUpdated = await cartDao.updateProductsOfOneCart(
          cart,
          payload.products
        );
        const response = await cartDao.getOne(cartUpdated._id);
        res.status(201).json({
          status: "success",
          payload: response,
        });
      } else {
        res.status(404).json({ message: "Missing data" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  }
  async deleteOneProductOfCart(req, res) {
    try {
      const cart = await cartDao.getOne(req.params.idCart);
      const product = await productDao.getOne(req.params.idProduct);
      if (cart && product) {
        const cartUpdated = await cartDao.removeProduct(cart, product);
        const response = await cartDao.getOne(cartUpdated._id);
        res.status(201).json({
          status: "success",
          payload: response,
        });
      } else {
        res.status(404).json({ message: "Missing data" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  }
  async deleteAllProductsOfCart(req, res) {
    try {
      const cart = await cartDao.getOne(req.params.idCart);
      if (cart) {
        const cartUpdated = await cartDao.emptyCart(cart);
        const response = await cartDao.getOne(cartUpdated._id);
        res.status(201).json({
          status: "success",
          payload: response,
        });
      } else {
        res.status(404).json({ message: "Missing data" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  }
}

/**Creo una instancia de la clase CartController */
const cartController = new CartController();

/**Con destructuring declaro variables que guarden todos sus métodos */
const {
  create,
  getAll,
  getProductsOfCart,
  viewCartDetail,
  addProductToCart,
  updateAllProductsOfCart,
  deleteOneProductOfCart,
  deleteAllProductsOfCart,
} = cartController;

/**Exporto los métodos del controlador */
export {
  create,
  getAll,
  getProductsOfCart,
  viewCartDetail,
  addProductToCart,
  updateAllProductsOfCart,
  deleteOneProductOfCart,
  deleteAllProductsOfCart,
};
