import BaseMongoDao from "./base.mongo.dao.js";
import chatModel from "../../models/chat.model.js";

export class ChatMongoDao extends BaseMongoDao {
  constructor() {
    super(chatModel);
  }
}
