let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;

const app = require("../app.js")
const server = require("../server.js")

describe('app.js', () => {
  it('/get-search-settings should return search settings json', (done) => {
    chai
    .request(app)
    .get("/")
    .end((err, res) => {
        expect(res).to.have.status(200)
        done()
    })
  });
});