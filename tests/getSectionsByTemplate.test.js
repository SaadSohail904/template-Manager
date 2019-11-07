'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');

describe('getSectionsByTemplate', function(){
  it('should return sections corresponding to template id',  function(done) {
      api
        .post('/getSectionsByTemplate/1')
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body[0].sectionid).to.exist;
          done();
      })
  })
  it('should return empty array',  function(done) {
      api
        .post('/getSectionsByTemplate/999')
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
        expect(res.body).to.eql([]);
        done();
      });
  })
  it('should return status error with status code 405 and value is NAN message',  function(done) {
      api
        .post('/getSectionsByTemplate/abc')
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
  it('should return details of sections with ids: 1, 2, 3, 4, 5, 6 and 7 and also embed UI Components and subsections properties',  function(done) {
      api
          .post('/getSectionsByTemplate/1')
          .expect(200)
          .end(function(err, res) {
            if (err) {
               return done(err);
             }
             for(let i = 0; i<res.body.length; i++){
               expect(res.body[i].sectionTemplate).to.equal(1);
               for(let j =0; j< res.body[i].subsections.length;j++){
                  expect(res.body[i].subsections[j].sectionParent).to.equal(res.body[i].sectionid);
                  for(let k=0; k<res.body[i].subsections[j].uicomponents.length;k++){
                    expect(res.body[i].subsections[j].uicomponents[k].sectionid).to.equal(res.body[i].subsections[j].sectionid);
                    }
                  }
               }
            done();
          });
        })
})
