const { Router } = require("express") ;
const router = Router();
const ProductManager = require( "../../daos/fs/productManager.js");
const path = "../../files/products.json";
const myProductManager = new ProductManager(path);
const { validateNumber } = require( "../../utils/helpers.js");

router.get("/", async (req, res) => {
    try {
        const products = await myProductManager.getProducts();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
        ? isValidLimit
            ? res.render("home", {
                products: products.slice(0, limit),
            })
            : res.render("home", {
                products: products,
            })
        : res.render("home", {
            products: [],
            });
    } catch (err) {
        res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
        });
    }
});

module.exports = router;




