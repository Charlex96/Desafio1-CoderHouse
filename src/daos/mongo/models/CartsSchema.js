const mongoose = require( "mongoose");

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});


module.exports = cartsSchema;