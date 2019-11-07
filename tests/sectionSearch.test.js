'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');

describe('sectionSearch', function(){
  it('should return sections corresponding to section name',  function(done) {
      api
        .post('/sectionSearch/sec')
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body[0].sectionid).to.exist;
          done()
      })
  })
  it('should return empty array',  function(done) {
      api
        .post('/sectionSearch/abcdefghijk')
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
        expect(res.body).to.eql([]);
        done();
      });
  })
  it('should return details of sections with sec keyword in name or tags column and also embed template property',  function(done) {
      api
          .post('/sectionSearch/sec')
          .expect(200)
          .end(function(err, res) {
            if (err) {
               return done(err);
             }
             for(let i = 0; i < res.body.length; i++){
               expect(res.body[i].sectionName).to.match(/Sec+/) || expect(res.body[i].sectionTags).to.match(/sec+/);
             }
            done();
          });
        })
})
