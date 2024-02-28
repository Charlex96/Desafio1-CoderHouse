const MongoClass = require( "./MongoClass.js");
const { messagesSchema } = require( "./models/MessagesSchema.js");

class MongoDBChats extends MongoClass {
    constructor() {
        super("messages", messagesSchema);
    }
}

module.exports = MongoDBChats;
