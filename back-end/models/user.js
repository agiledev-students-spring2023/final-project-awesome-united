
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

//user schema
const userSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
      },
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        enum:['Seller', 'Buyer']
    },
    passwordHash: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String, 
        default: null,
    }
})

 function generateMockUserWithPassword(password){ 
    
    const id = uuid.v4();
    const location = {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      unitNumber: faker.datatype.number({min: 1, max: 9999})
    };
    const email = faker.internet.email()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const accountType = faker.helpers.arrayElement(['Seller', 'Buyer'])
    const profilePhoto = faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg')
    const userName = faker.internet.userName();
    let passwordHash = password;
    bcrypt.hash(password, 10).then((hash) => passwordHash = hash)
    //make the hash
    
    

    return new User({
        id, userName, firstName, lastName, email, accountType, passwordHash, profilePhoto, location
    })
    
}
const User = mongoose.model('User', userSchema);
module.exports = {User, generateMockUserWithPassword}