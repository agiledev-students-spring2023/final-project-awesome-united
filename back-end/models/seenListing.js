const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const seenListingSchema = new mongoose.Schema ({
    userId: {
        type: String,
        required :true
    },
    listingId: {
        type: String,
        required: true,
    }
})

const seenListing = mongoose.model('seenListing', seenListingSchema);
module.exports = {seenListing}