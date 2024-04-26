import BaseMongoDao from "./base.mongo.dao.js";
import userModel from "../../models/user.model.js";
export class UserMongoDao extends BaseMongoDao {
  constructor() {
    super(userModel);
  }
  async getUserByUsername(username) {
    try {
      const user = await this.db.findOne(username);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.db.findOne(email);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPurchaser(cart) {
    const user = await this.db.findOne({ cart: cart });
    return user?.email;
  }
}
