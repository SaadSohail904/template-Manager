'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');
const con = require('../db.js');
const functions = require('../middleware/functions')

var userData = [
        {
          "label": "Date of referral",
          "text": "Select date",
          "answer": "06/11/2019",
          "patientid": 1,
          "uicomponentid": 4
        },
        {
          "label": "Last name",
          "text": "Enter last name",
          "answer": "Sohail",
          "patientid": 1,
          "uicomponentid": 5
        },
        {
          "label": "First name",
          "text": "Enter first name",
          "answer": "Saad",
          "patientid": 1,
          "uicomponentid": 6
        },
        {
          "label": "Middle name",
          "text": "Enter middle name",
          "answer": "Muhammad",
          "patientid": 1,
          "uicomponentid": 7
      },
    {
      "label": "Date of birth",
      "text": "",
      "answer": "06/02/1998",
      "patientid": 1,
      "uicomponentid": 8
  },
  {
    "label": "Gender",
    "text": "",
    "answer": "Male",
    "patientid": 1,
    "uicomponentid": 9
  },
  {
    "label": "Parent/guardian",
    "text": "Enter parent/guardian name",
    "answer": "Sohail Abdullah",
    "patientid": 1,
    "uicomponentid": 10
  },
  {
    "label": "Contact No",
    "text": "Enter your contact",
    "answer": "0334-0630077",
    "patientid": 1,
    "uicomponentid": 11
  },
  {
    "label": "Zip Code",
    "text": "Enter zip code",
    "answer": "47040",
    "patientid": 1,
    "uicomponentid": 12
},
  {
    "label": "Interpreter needed",
    "text": "",
    "answer": "Yes",
    "patientid": 1,
    "uicomponentid": 13
  },
  {
    "label": "Appointment category",
    "text": "Please check one",
    "answer": "Diagnostic Consultation",
    "patientid": 1,
    "uicomponentid": 14
  },
  {
    "label": "Appointment type",
    "text": "Please check one",
    "answer": "Consultation",
    "patientid": 1,
    "uicomponentid": 15
  }]
describe('addUserInstance', function(){
  it('should return user instances object that was inserted',  function(done) {
      api
        .post('/addUserInstance/')
        .send(userData)
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          console.log(res.body);
          console.log("-------------")
          expect(res.body.length).to.be.above(2);
          for(let i = 0; i < res.body.length; i++){
            con.query(`Delete from data where id = ${res.body[i].id}`);
          }
          done();
      })
  })

  // it('should return error corresponding to missing fields',  function(done) {
  //     api
  //       .post('/addUserInstance/1')
  //       .expect(200)
  //       .end(function(err, res){
  //         if(err){
  //           return done(err);
  //         }
  //         expect(res.body.errorMessage).to.equal("\"label\" is required");
  //         done()
  //     })
  // })

})
