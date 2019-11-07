'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
const app = require('../app.js');
const con = require('../db.js');
const functions = require('../middleware/functions')

var template = {
        "templateName": "Appointment form",
        "templateTags": "Appointment form, Patient",
        "sections":[{
          "sectionName": "Personal Info",
          "sectionTags": "Appointment form, Personal Data",
          "sectionProperties": "{ \"Property1\": \"XYZ\" }",
          "uicomponents":[],
          "subsections":[{
            "sectionName": "Date",
            "sectionTags": "Appointment form, Date",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents":[
              {
                  "uicomponentTitle":"Date of referral",
                  "uicomponentType":"Date",
                  "uicomponentTags":"Date of referral, Date, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              }
            ],
            "subsections":[]
          },{
            "sectionName": "Name",
            "sectionTags": "Appointment form, Name",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents":[
              {
                  "uicomponentTitle": "Last name",
                  "uicomponentType":"Text box",
                  "uicomponentTags": "Last name, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              },{
                  "uicomponentTitle": "First name",
                  "uicomponentType":"Text Box",
                  "uicomponentTags": "First name, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              },{
                  "uicomponentTitle": "Middle name",
                  "uicomponentType":"Text box",
                  "uicomponentTags": "Middle name, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              }
            ],
            "subsections":[]
          },{
            "sectionName": "MiscInfo1",
            "sectionTags": "Appointment form, MiscInfo",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents":[
              {
                  "uicomponentTitle": "Date of Birth",
                  "uicomponentType":"Date",
                  "uicomponentTags": "Date of birth, Date, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              },{
                  "uicomponentTitle": "Gender",
                  "uicomponentType":"Check Box",
                  "uicomponentTags": "Gender, Check Box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[{
                    "text": "Male"
                  },{
                    "text": "Female"
                  }]
              }
            ],
            "subsections":[]
          },{
            "sectionName": "MiscInfo2",
            "sectionTags": "Appointment form, MiscInfo",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents":[
              {
                  "uicomponentTitle": "Parent/Guardian Name",
                  "uicomponentType": "Text box",
                  "uicomponentTags": "Parent/Guardian Name, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]

              },{
                  "uicomponentTitle": "Contact No.",
                  "uicomponentType": "Text box",
                  "uicomponentTags": "Contact No, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              }
            ],
            "subsections":[]
          },{
            "sectionName": "MiscInfo3",
            "sectionTags": "Appointment form, MiscInfo",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents":[
              {
                  "uicomponentTitle": "Zip Code",
                  "uicomponentType": "Text box",
                  "uicomponentTags": "Zip Code, Text box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[]
              },{
                  "uicomponentTitle": "Interpreter",
                  "uicomponentType": "Check box",
                  "uicomponentTags": "Interpreter, Check box, Appointment form",
                  "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                  "uicomponentOptions":[{
                    "text": "Yes"
                  },{
                    "text": "No"
                  }]
              }
            ],
            "subsections":[]
          }]
        },{
          "sectionName": "AppointmentType",
          "sectionTags": "Appointment form, AppointmentType",
          "sectionProperties": "{ \"Property1\": \"XYZ\" }",
          "uicomponents":[
            {
                "uicomponentTitle": "Appointment category",
                "uicomponentType": "Check box",
                "uicomponentTags": "Appointment category, Check box, Appointment form",
                "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                "uicomponentOptions":[{
                  "text": "Consultation"
                },{
                  "text": "Medical management"
                },{
                  "text": "Medical evaluation"
                },{
                  "text": "Mental health surgery"
                },{
                  "text": "Surgical Options"
                },{
                  "text": "Telemedicine"
                },{
                  "text": "Other"
                }]
            },{
                "uicomponentTitle": "Appointment type",
                "uicomponentType": "Check box",
                "uicomponentTags": "Appointment type, Check box, Appointment form",
                "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                "uicomponentOptions":[{
                  "text": "Consultation"
                },{
                  "text": "Transfer care"
                }]
            }
          ],
          "subsections":[]
        }]
      }
describe('addTemplate', function(){
  it('should return template that was successfully inserted into the database',  function(done) {
      api
        .post('/addTemplate/')
        .send(template)
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body.rollback).to.equal(false);
          let template = res.body;
          api
            .post(`/templateSearch/${template.templateName}`)
            .end(function(err, res){
              for(let i = 0; i < res.body.length; i++){
                if(template.templateid == res.body[i].templateid){
                  con.query(`Delete from template where id = ${template.templateid}`);
                  for(let j = 0; j < template.sections.length; j++){
                    expect(template.sections[j].sectionid).to.equal(res.body[i].sections[j].sectionid);
                    for(let k = 0; k < template.sections[j].uicomponents.length; k++){
                      expect(template.sections[j].uicomponents[k].uicomponentid).to.equal(res.body[i].sections[j].uicomponents[k].uicomponentid);
                        }
                    }
                  }
                }
              })
          done();
      })
  })
});
