import { BaseService } from "./base.service.js";
import getDAOS from "../daos/daos.factory.js";
const { cartDao, ticketDao, userDao } = getDAOS();

export class CartService extends BaseService {
  constructor() {
    super(cartDao);
  }

  async addManyOfTheSameProduct(cart, product, quantity) {
    try {
      const cartUpdated = await cartDao.addManyOfTheSameProduct(
        cart,
        product,
        quantity
      );
      return cartUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProductsOfOneCart(cart, products) {
    try {
      const cartUpdated = await cartDao.updateProductsOfOneCart(cart, products);
      return cartUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeProduct(cart, product) {
    try {
      const cartUpdated = await cartDao.removeProduct(cart, product);
      return cartUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }

  async emptyCart(cart) {
    try {
      const cartUpdated = await cartDao.emptyCart(cart);
      return cartUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }

  async purchaseCart(cart) {
    try {
      const amount = cart.products.reduce((acc, product) => {
        return acc + product._id.price * product.quantity;
      }, 0);
      const purchaser_email = await userDao.getPurchaser(cart);
      const products = cart.products.map((product) => {
        return {
          product: product._id._id,
          quantity: product.quantity,
        };
      });
      const ticket = await ticketDao.create({
        purchaser: purchaser_email,
        amount: amount,
        products: products,
      });
      const tickedCreated = await ticketDao.getOne(ticket._id);
      return tickedCreated;
    } catch (err) {
      throw new Error(err);
    }
  }
}
