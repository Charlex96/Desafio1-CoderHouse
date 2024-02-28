const MongoClass = require( "./MongoClass.js");
const  productsSchema = require( "./models/ProductsSchema.js");

class MongoDBProducts extends MongoClass {
    constructor() {
        super("products", productsSchema);
    }
}

module.exports = MongoDBProducts;

