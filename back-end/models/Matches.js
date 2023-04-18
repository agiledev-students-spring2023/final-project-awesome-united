const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema(
    {
        members: {
          type: Array,
        },
      },
      { timestamps: true }
    );

module.exports = mongoose.model("Matches", MatchesSchema);