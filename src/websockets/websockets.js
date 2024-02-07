const ProductManager = require("../persitence/productManager");
const path = "/src/db/products.json";
const myProductManager = new ProductManager(path);

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New client websocket: ", socket.id); // x8WIv7-mJelg7on_ALbx
        socket.on("new-product", async (data) => {
        console.log(data);
        try {
            await myProductManager.addProduct(data);
            const productListUpdated = await myProductManager.getProducts();
            io.sockets.emit("refresh-products", productListUpdated);
        } catch (err) {
            console.log(err);
        }
        });
    });
};
