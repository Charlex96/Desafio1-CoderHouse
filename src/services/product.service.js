import { BaseService } from "./base.service.js";
import getDAOS from "../daos/daos.factory.js";
const { productDao } = getDAOS();
export class ProductService extends BaseService {
  constructor() {
    super(productDao);
  }
  async getAll(limit, page, sort, query) {
    try {
      const all = await this.dao.getAll(limit, page, sort, query);
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }
}
