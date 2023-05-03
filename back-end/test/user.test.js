const userSchema = require('../models/user')

describe('userSchema', () => {
    test('should generate valid mock data', () => {
        const mockUser = userSchema.generateMockUserWithPassword("123");
        console.log(mockUser)
        expect(mockUser).toBeDefined();
       
        
      });



})