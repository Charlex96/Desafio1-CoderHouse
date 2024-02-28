const mongoose = require( "mongoose");

const messagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = messagesSchema;