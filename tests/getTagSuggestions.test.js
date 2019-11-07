'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');

describe('getTagSuggestions', function(){
  it('should return tags inside response body',  function(done) {
      api
        .post('/getTagSuggestions/1/section')
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body[0]).to.exist
          done()
      })
  })

  it('should return empty array',  function(done) {
      api
        .post('/getTagSuggestions/1dsad/section')
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body).to.eql([]);
          done()
      })
  })

  // it('should return tags corresponding to given name',  function(done) {
  //     api
  //       .post('/getTagSuggestions/1/section')
  //       .expect(200)
  //       .end(function(err, res){
  //         if(err){
  //           return done(err);
  //         }
  //         for(let i = 0; i < res.body.length; i++){
  //           expect(res.body[i]).to.match(/1+/);
  //         }
  //         done();
  //     })
  // })
})
