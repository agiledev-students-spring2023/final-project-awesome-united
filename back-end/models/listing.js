const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');


const listingSchema = new mongoose.Schema({
  location: {
    streetAddress: {
      type: String,
      required: true,
    },
    unitNumber: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  listingDetails: {
    status: {
      type: String,
      required: true,
      enum: ['Active', 'For Rent', 'Sold', 'Rented'],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  basicDetails: {
    propertyType: {
      type: String,
      required: true,
      enum: [
        'SingleFamily',
        'Condo',
        'Townhouse',
        'Coop',
        'MultiFamily',
        'Manufactured',
        'VacantLand',
        'Other',
        'Apartment'
      ]
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
  },
  agent: {
    email: {
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
  },
  amenities: [{
    type: String,
    required: true,
  }],
  images: [{
    type: String,
    required: true,
  }]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing, generateMockListing };

function generateMockListing() {
  const location = {
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    unitNumber: faker.datatype.number({min: 1, max: 9999})
  };
  const listingDetails = {
    status: faker.helpers.arrayElement(['Active', 'For Rent', 'Sold', 'Rented']),
    price: faker.datatype.number({ min: 100000, max: 1000000 }),
  };
  const basicDetails = {
    propertyType: faker.helpers.arrayElement([
      'SingleFamily',
      'Condo',
      'Townhouse',
      'Coop',
      'MultiFamily',
      'Manufactured',
      'VacantLand',
      'Other',
      'Apartment'
    ]),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    bathrooms: faker.datatype.number({ min: 1, max: 5 }),
  };
  const agent = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const amenities = [
    faker.helpers.arrayElement(['pool', 'gym', 'fireplace', 'washer/dryer', 'balcony']),
    faker.helpers.arrayElement(['pool', 'gym', 'fireplace', 'washer/dryer', 'balcony']),
    faker.helpers.arrayElement(['pool', 'gym', 'fireplace', 'washer/dryer', 'balcony']),
  ];
  const images = [
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
  ]
  return {
    location,
    listingDetails,
    basicDetails,
    agent,
    amenities,
    images,
  };
}
