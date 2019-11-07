'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');

describe('getTemplateBySection', function(){
  it('should return template corresponding to section id',  function(done) {
    api
        .post('/getTemplateBySection/1')
        .expect(200)
        .end(function(err, res) {
          if (err, res) {
             return done(err);
           }
          expect(res.body[0].id).to.exist;
          expect(res.body.length).to.equal(1);
          done();
        });
      })
  it('should return empty array',  function(done) {
      api
          .post('/getTemplateBySection/999')
          .expect(200)
          .end(function(err, res) {
            if (err){
              done(err);
            }
          expect(res.body).to.eql([]);
          done();
        });
      })
  it('should return status error with status code 400 and value is NAN message',  function(done) {
      api
          .post('/getTemplateBySection/abc')
          .expect(200)
          .end(function(err, res) {
            if (err){
               return done(err);
             }
          expect(res.body.message).to.equal("\"value\" must be a number");
          expect(res.body.statusCode).to.equal(405);
          done();
        });
      })
})
