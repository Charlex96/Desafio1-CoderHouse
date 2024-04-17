import getDAOS from "../daos/daos.factory.js";
const { productDao } = getDAOS();
//import productDao from "../daos/mongo/product.mongo.dao.js";
class ProductController {
  async viewAll(req, res) {
    try {
      /**Deberá poder recibir por query params
       * un limit (opcional), una page (opcional),
       *  un sort (opcional)
       * y un title (opcional)
       */
      const { limit, page, sort, query } = req.query;

      const products = await productDao.getAll(limit, page, sort, query);
      products
        ? res.status(200).json({
            status: "success",
            payload: products,
          })
        : res.status(200).json({ status: "success", payload: [] });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const product = await productDao.getOne(id);
      product
        ? res.status(200).json({
            status: "success",
            payload: product,
          })
        : res.status(404).json({
            status: "error",
            message: "Sorry, no product found by id: " + id,
            payload: {},
          });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const newProduct = req.body;
      // validate code not repeated
      const response = await productDao.getAll();
      const allProducts = response.docs;
      const product = allProducts.find(
        (product) => product.code == newProduct.code
      );
      if (product) {
        res.status(400).json({
          status: "error",
          payload:
            "Invalid request body. Code already exists: " + newProduct.code,
        });
        return;
      }
      const productCreated = await productDao.create(newProduct);

      res.status(201).json({
        status: "success",
        payload: productCreated,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const newProduct = req.body;
      const productUpdated = await productDao.update(id, newProduct);
      res.status(200).json({
        status: "success",
        payload: productUpdated,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
  async deleteOne(req, res) {
    try {
      const id = req.params.id;
      const productDeleted = await productDao.delete(id);
      res.status(200).json({
        status: "success",
        payload: productDeleted,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
}

const productController = new ProductController();
const { viewAll, getOne, create, update, deleteOne } = productController;

export { viewAll, getOne, create, update, deleteOne };
