const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema(
    {
        // array that holds the matches
        members: {
          type: Array,
        },
      },
      { timestamps: true }
    );

module.exports = mongoose.model("Matches", MatchesSchema);