const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
    },
    // id of the sender
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);