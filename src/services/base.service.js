export class BaseService {
  constructor(dao) {
    this.dao = dao;
  }
  async getAll() {
    try {
      const all = await this.dao.getAll({});
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getOne(id) {
    try {
      const one = await this.dao.getOne(id);
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(doc) {
    try {
      const newDoc = await this.dao.create(doc);
      return newDoc;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id, doc) {
    try {
      await this.dao.update(id, doc);
      const docUpdated = await this.dao.getOne(id);
      return docUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const deletedDoc = await this.dao.delete(id);
      return deletedDoc;
    } catch (err) {
      throw new Error(err);
    }
  }
}
