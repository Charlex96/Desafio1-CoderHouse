import { Schema, model, Types } from "mongoose";
import { getRandomCode } from "../utils/fakerData.js";
const ticketSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      default: getRandomCode,
    },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, default: 0, required: true },
    purchaser: { type: String, required: true },
    products: [
      {
        product: { type: Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true, default: 0 },
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model("tickets", ticketSchema);
