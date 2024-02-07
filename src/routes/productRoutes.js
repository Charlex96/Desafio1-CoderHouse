const { Router } = require("express");
const router = Router();
const ProductManager = require("../persitence/productManager.js");
const path = "/src/db/products.json";
const myProductManager = new ProductManager(path);
const validateNumber = require("./../utils/helpers.js").validateNumber;

const {
    validateRequest,
    validateNumberParams,
    validateCodeNotRepeated,
} = require("./../middleware/validators.js");

const multer = require("multer");

/**Multer config */
// 'photo' es el nombre del campo en el formulario.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
router.use(multer({ storage }).single("thumbnail"));


  /**Rutas */

router.get("/", async (req, res) => {
    try {
        const products = await myProductManager.getProducts();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
        ? isValidLimit
            ? res.status(200).json({
                status: "success",
                payload: products.slice(0, limit),
            })
            : res.status(200).json({
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
});

router.get("/:id", validateNumberParams, async (req, res) => {
    try {
        const id = req.params.id;
        const product = await myProductManager.getProductById(id);
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
});

router.post("/", validateRequest, validateCodeNotRepeated, async (req, res) => {
    try {
        const newProduct = req.body;
        const photo = req.file;
        console.log(newProduct);
        console.log(photo);
        //  antes de guardar el objeto le añado la propiedad para que se pueda acceder a la foto.
        newProduct.thumbnail = "/uploads/" + photo.filename;
        const productCreated = await myProductManager.addProduct(newProduct);
        console.log(productCreated);
        res.redirect("/");
    } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
    }
});

router.put("/:id", validateRequest, validateNumberParams, async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        const productUpdated = await myProductManager.updateProduct(id, newProduct);
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
});

router.delete("/:id", validateNumberParams, async (req, res) => {
    try {
        console.log("delete");
        const id = req.params.id;
        const product = await myProductManager.getProductById(id);
        if (!product) {
        res.status(404).json({
            status: "error",
            message: "Sorry, no product found by id: " + id,
            payload: {},
        });
        return;
        }
        const productDeleted = await myProductManager.deleteProduct(id);
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
});

module.exports = router;
