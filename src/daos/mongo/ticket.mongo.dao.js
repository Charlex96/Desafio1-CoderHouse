import BaseMongoDao from "./base.mongo.dao.js";
import ticketModel from "../../models/ticket.model.js";

export class TicketMongoDao extends BaseMongoDao {
  constructor() {
    super(ticketModel);
  }
}
