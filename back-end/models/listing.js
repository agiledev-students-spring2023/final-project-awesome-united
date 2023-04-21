const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

const amenitiesList = ['pool', 'gym', 'fireplace', 'washer/dryer', 'balcony']
const propertyTypeList = [
  'Single-Family',
  'Condo',
  'Townhouse',
  'Coop',
  'Multi-Family',
  'Manufactured',
  'Vacant Land',
  'Other',
  'Apartment'
]
const listingTypeList = ['Active', 'For Rent']

const listingData = {
  id: {
    type: String,
    required: true,
  },
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
      enum: listingTypeList,
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
      enum: propertyTypeList
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
    enum: amenitiesList
  }],
  images: [{
    type: String,
    required: true,
  }]
}

const listingSchema = new mongoose.Schema(listingData);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing, generateMockListing, listingData };

function generateMockListing() {
  const id = uuid.v4();
  const location = {
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    unitNumber: faker.datatype.number({min: 1, max: 9999})
  };
  const listingDetails = {
    status: faker.helpers.arrayElement(listingTypeList),
    price: 0
  };
  listingDetails.price = listingDetails.status === "For Rent" ? (faker.datatype.number({ min: 1, max: 10000 })) : faker.datatype.number({ min: 1, max: 999999 } )
  const basicDetails = {
    propertyType: faker.helpers.arrayElement(propertyTypeList),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    bathrooms: faker.datatype.number({ min: 1, max: 5 }),
  };
  const agent = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const amenities = [
    faker.helpers.arrayElement(amenitiesList),
    faker.helpers.arrayElement(amenitiesList),
    faker.helpers.arrayElement(amenitiesList),
  ];
  const images = [
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
    faker.image.imageUrl(800, 600, 'abstract', true, 'lorempixel.com', 'jpg'),
  ]
  console.log(listingDetails)
  return {id,
    location,
    listingDetails,
    basicDetails,
    agent,
    amenities,
    images,
  };
}
