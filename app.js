const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;
const ProductManager = require("./productManager");
const { createFile, productsToSave, validateNumber, generateUniqueID } = require("./helpers"); // Import generateUniqueID

const path = "./products.txt";
createFile(path);

const myProductManager = new ProductManager(path);
myProductManager.loadInitialProducts(productsToSave);

app.use(express.json());

// POST new product
app.post("/api/products", async (req, res) => {
    try {
        const newProduct = {
            id: generateUniqueID(), // Use generateUniqueID function
            ...req.body,
        };
        const addedProduct = await myProductManager.addProduct(newProduct);
        res.status(201).json(addedProduct);
    } catch (err) {
        console.log("addProduct", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/products/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const isValidId = validateNumber(id);
        if (!isValidId) {
            res.json({ error: "Sorry, invalid id" });
            return;
        }
        const product = await myProductManager.getProductById(id);
        product
        ? res.json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (err) {
        console.log("getProductById", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const newProduct = await myProductManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.log("addProduct", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/api/products/:pid", async (req, res) => {
    try {
        const updatedProduct = await myProductManager.updateProductById(
        req.params.pid,
        req.body
        );
        updatedProduct
        ? res.json(updatedProduct)
        : res.status(404).json({ error: "Product not found" });
    } catch (err) {
        console.log("updateProductById", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/api/products/:pid", async (req, res) => {
    try {
        const deletedProduct = await myProductManager.deleteProductById(
        req.params.pid
        );
        deletedProduct
        ? res.json(deletedProduct)
        : res.status(404).json({ error: "Product not found" });
    } catch (err) {
        console.log("deleteProductById", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Carts routes
app.post("/api/carts", async (req, res) => {
    try {
        const newCart = await myProductManager.createCart();
        res.status(201).json(newCart);
    } catch (err) {
        console.log("createCart", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/carts/:cid", async (req, res) => {
    try {
        const cart = await myProductManager.getCartById(req.params.cid);
        cart
        ? res.json(cart)
        : res.status(404).json({ error: "Cart not found" });
    } catch (err) {
        console.log("getCartById", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        const updatedCart = await myProductManager.addProductToCart(cid, pid, quantity);
        updatedCart
        ? res.json(updatedCart)
        : res.status(404).json({ error: "Cart or Product not found" });
    } catch (err) {
        console.log("addProductToCart", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

try {
    app.listen(PORT, () =>
        console.log(
        `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
        )
    );
} catch (error) {
    console.log("Error al iniciar servidor", error);
}

