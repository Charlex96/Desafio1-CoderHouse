const fs = require("fs");

class ProductManager {
    constructor(productPath, cartPath) {
        this.productPath = productPath;
        this.cartPath = cartPath;
    }

  // Methods for managing products

    async loadInitialProducts(products) {
        await this.write(this.productPath, products);
    }

    async getProducts() {
        return await this.read(this.productPath);
    }

    async getProductById(id) {
        const allProductsArray = await this.read(this.productPath);
        const product = allProductsArray.find((product) => product.id == id);
        return product;
    }

    async addProduct(product) {
        const allProductsArray = await this.read(this.productPath);
        const newProduct = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            ...product,
        };
        allProductsArray.push(newProduct);
        await this.write(this.productPath, allProductsArray);
        return newProduct;
    }

    async updateProductById(id, updatedFields) {
        let allProductsArray = await this.read(this.productPath);
        const index = allProductsArray.findIndex((product) => product.id == id);
        if (index !== -1) {
            allProductsArray[index] = { ...allProductsArray[index], ...updatedFields };
            await this.write(this.productPath, allProductsArray);
            return allProductsArray[index];
        }
        return null;
    }

    async deleteProductById(id) {
        let allProductsArray = await this.read(this.productPath);
        const index = allProductsArray.findIndex((product) => product.id == id);
        if (index !== -1) {
            const deletedProduct = allProductsArray.splice(index, 1)[0];
            await this.write(this.productPath, allProductsArray);
            return deletedProduct;
        }
        return null;
    }

    // Methods for managing carts

    async createCart() {
        const allCartsArray = await this.read(this.cartPath);
        const newCart = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        products: [],
        };
        allCartsArray.push(newCart);
        await this.write(this.cartPath, allCartsArray);
        return newCart;
    }

    async getCartById(id) {
        const allCartsArray = await this.read(this.cartPath);
        return allCartsArray.find((cart) => cart.id == id);
    }

    async addProductToCart(cartId, productId, quantity) {
        const allCartsArray = await this.read(this.cartPath);
        const cartIndex = allCartsArray.findIndex((cart) => cart.id == cartId);
        const productIndex = allCartsArray[cartIndex]?.products.findIndex(
        (product) => product.id == productId
        );

        if (cartIndex !== -1 && productIndex === -1) {
            allCartsArray[cartIndex].products.push({ id: productId, quantity });
            await this.write(this.cartPath, allCartsArray);
            return allCartsArray[cartIndex];
        } else if (cartIndex !== -1 && productIndex !== -1) {
        // Increment the quantity if the product already exists in the cart
            allCartsArray[cartIndex].products[productIndex].quantity += quantity;
            await this.write(this.cartPath, allCartsArray);
            return allCartsArray[cartIndex];
        } else {
            return null;
        }
    }

    // Common read and write methods

    async read(filePath) {
        let dataArray = [];
        try {
        let dataString = await fs.promises.readFile(filePath, "utf-8");
        dataString.length > 0
            ? (dataArray = JSON.parse(dataString))
            : (dataArray = []);
        } catch (err) {
        console.log("Error reading file", err);
        }
        return dataArray;
    }

    async write(filePath, dataArray) {
        let dataString = JSON.stringify(dataArray);
        try {
            await fs.promises.writeFile(filePath, dataString);
        } catch (err) {
            console.log("Error writing to file", err);
        }
    }
}

module.exports = ProductManager;
