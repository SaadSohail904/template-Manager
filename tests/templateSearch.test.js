'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');
const con = require('../db.js');
const functions = require('../middleware/functions');

describe('templateSearch', function(){
  it('should return templates corresponding to template name',  function(done) {
      api
        .post('/templateSearch/1')
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body[0].templateid).to.exist;
          done();
      })
  })
  it('should return empty array',  function(done) {
      api
        .post('/templateSearch/abcdefghijk')
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
        expect(res.body).to.eql([]);
        done();
      });
  })
  it('should return details of templates with temp keyword in name or tags column and also embed sections property',  function(done) {
      api
          .post('/templateSearch/Temp')
          .expect(200)
          .end(function(err, res) {
            if (err) {
               return done(err);
             }
             for(let i = 0; i < res.body.length; i++){
               expect(res.body[i].templateName).to.match(/Temp/);
            }
            done();
          });
        })
})
