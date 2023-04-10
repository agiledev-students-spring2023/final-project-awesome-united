let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;

const app = require("../app.js")
const server = require("../server.js")

describe('app.js', () => {
  it('/get-search-settings should return search settings json', (done) => {
    chai
    .request(app)
    .get("/get-search-settings")
    .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.any.key('Amenities')
        expect(res.body).to.have.any.key('PropertyTypes')
        done()
    })
  });
});