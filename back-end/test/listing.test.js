const listingSchema = require('../models/listing');

describe('listingSchema', () => {
  test('should generate valid mock data', () => {
    const mockListing = listingSchema.generateMockListing();
    console.log(mockListing); // Add this line to log the generated listing
    expect(mockListing).toBeDefined();
    expect(typeof mockListing.location.streetAddress).toBe('string');
    expect(typeof mockListing.location.city).toBe('string');
    expect(typeof mockListing.location.state).toBe('string');
    expect(typeof mockListing.location.zip).toBe('string');
    expect(mockListing.listingDetails.status).toMatch(/^(Active|For Rent|Sold|Rented)$/);
    expect(mockListing.listingDetails.price).toBeGreaterThan(0);
    expect(mockListing.basicDetails.propertyType).toMatch(/^(SingleFamily|Condo|Townhouse|Coop|MultiFamily|Manufactured|VacantLand|Other|Apartment)$/);
    expect(mockListing.basicDetails.bedrooms).toBeGreaterThanOrEqual(0);
    expect(mockListing.basicDetails.bathrooms).toBeGreaterThanOrEqual(0);
    expect(typeof mockListing.agent.email).toBe('string');
    expect(typeof mockListing.agent.firstName).toBe('string');
    expect(typeof mockListing.agent.lastName).toBe('string');
    expect(Array.isArray(mockListing.amenities)).toBe(true);
    expect(mockListing.amenities).toHaveLength(3);
  });
});