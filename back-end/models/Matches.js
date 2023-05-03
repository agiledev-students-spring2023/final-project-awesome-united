const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema(
    {
        // array that holds the matches
        members: {
          type: Array,
        },
        type: {
          type: String,
          required: true,
          enum:['yes', 'maybe']
        },
        // holds the listing address associated with the seller in the match
        listingAddess:{
          type: String,
        }      
    },
      { timestamps: true }
    );

module.exports = mongoose.model("Matches", MatchesSchema);