const assert = require('chai').assert;
const accountCreation = require('../app.js');
const request = require('supertest');
const path = require('path');
const fs = require('fs');

describe ('POST / get-user-data', function(){
    it ('Get user inputted location data', function(done){
        request(accountCreation)
        .post('/get-user-data')
        .send({ userCountry: 'United States of Testing', userState: 'New Test', userCity: 'New Test City', userAddress: '2030 Test Blvd.' })
        .expect(200, done)
    });
});

describe ('POST / get-user-data', function(){
    it ('Get user inputted location data', function(done){
        request(accountCreation)
        .post('/get-user-data')
        .send({ userCountry: '', userState: '', userCity: '', userAddress: ''})
        .expect(404, done)
    });
});

describe ('POST / upload-pfp', function(){
    it ('Store uploaded profile pic in local directory and get its data', function(done){
        request(accountCreation)
        .post('/upload-pfp')
        .set('Content-Type', 'multipart/form-data')
        assert.isOk(fs.existsSync('./ProfilePicture/test_pfp.jpg'));
        done();
    });
});