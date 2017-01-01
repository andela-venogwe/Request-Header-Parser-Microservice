process.env.NODE_ENV = 'test';
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Headers', () => {
  /*
   * Test the api
   */
  it('should return an json response', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.json;
      });
  });

  it(`should return a json response with IP address,
  language and operating system for the user`, () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        Object.keys(res.body).should.be.eql(['ipaddress', 'language', 'software']);
      });
  });
});
