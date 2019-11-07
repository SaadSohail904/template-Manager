const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const con = require("../db.js");
const functions = require("../middleware/functions.js");
const fs = require('fs');

/* GET home page. */
router.post('/:filename', function(req, res) {
  template = {
    "templateName": "Appointment form",
    "templateTags": "Appointment form, Patient",
    "sections": [
        {
            "sectionName": "Personal Info",
            "sectionTags": "Appointment form, Personal Data",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents": [],
            "subsections": [
                {
                    "sectionName": "Date",
                    "sectionTags": "Appointment form, Date",
                    "sectionProperties": "{ \"Property1\": \"XYZ\" }",
                    "createdAt": "2019-11-06T07:41:51.853Z",
                    "uicomponents": [
                        {
                            "uicomponentTitle": "Date of referral",
                            "uicomponentType": "Date",
                            "uicomponentTags": "Date of referral, Date, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 4
                        }
                    ],
                    "subsections": [],
                    "sectionid": 5,
                    "parentsectionid": 4
                },
                {
                    "sectionName": "Name",
                    "sectionTags": "Appointment form, Name",
                    "sectionProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponents": [
                        {
                            "uicomponentTitle": "Last name",
                            "uicomponentType": "Text box",
                            "uicomponentTags": "Last name, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 5
                        },
                        {
                            "uicomponentTitle": "First name",
                            "uicomponentType": "Text Box",
                            "uicomponentTags": "First name, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 6
                        },
                        {
                            "uicomponentTitle": "Middle name",
                            "uicomponentType": "Text box",
                            "uicomponentTags": "Middle name, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 7
                        }
                    ],
                    "subsections": [],
                    "sectionid": 6,
                    "parentsectionid": 4
                },
                {
                    "sectionName": "MiscInfo1",
                    "sectionTags": "Appointment form, MiscInfo",
                    "sectionProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponents": [
                        {
                            "uicomponentTitle": "Date of Birth",
                            "uicomponentType": "Date",
                            "uicomponentTags": "Date of birth, Date, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 8
                        },
                        {
                            "uicomponentTitle": "Gender",
                            "uicomponentType": "Check Box",
                            "uicomponentTags": "Gender, Check Box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [
                                {
                                    "text": "Male"
                                },
                                {
                                    "text": "Female"
                                }
                            ],
                            "uicomponentid": 9
                        }
                    ],
                    "subsections": [],
                    "sectionid": 7,
                    "parentsectionid": 4
                },
                {
                    "sectionName": "MiscInfo2",
                    "sectionTags": "Appointment form, MiscInfo",
                    "sectionProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponents": [
                        {
                            "uicomponentTitle": "Parent/Guardian Name",
                            "uicomponentType": "Text box",
                            "uicomponentTags": "Parent/Guardian Name, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 10
                        },
                        {
                            "uicomponentTitle": "Contact No.",
                            "uicomponentType": "Text box",
                            "uicomponentTags": "Contact No, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 11
                        }
                    ],
                    "subsections": [],
                    "sectionid": 8,
                    "parentsectionid": 4
                },
                {
                    "sectionName": "MiscInfo3",
                    "sectionTags": "Appointment form, MiscInfo",
                    "sectionProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponents": [
                        {
                            "uicomponentTitle": "Zip Code",
                            "uicomponentType": "Text box",
                            "uicomponentTags": "Zip Code, Text box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [],
                            "uicomponentid": 12
                        },
                        {
                            "uicomponentTitle": "Interpreter",
                            "uicomponentType": "Check box",
                            "uicomponentTags": "Interpreter, Check box, Appointment form",
                            "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                            "uicomponentOptions": [
                                {
                                    "text": "Yes"
                                },
                                {
                                    "text": "No"
                                }
                            ],
                            "uicomponentid": 13
                        }
                    ],
                    "subsections": [],
                    "sectionid": 9,
                    "parentsectionid": 4
                }
            ],
            "sectionid": 4,
            "parentsectionid": null
        },
        {
            "sectionName": "AppointmentType",
            "sectionTags": "Appointment form, AppointmentType",
            "sectionProperties": "{ \"Property1\": \"XYZ\" }",
            "uicomponents": [
                {
                    "uicomponentTitle": "Appointment category",
                    "uicomponentType": "Check box",
                    "uicomponentTags": "Appointment category, Check box, Appointment form",
                    "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponentOptions": [
                        {
                            "text": "Consultation"
                        },
                        {
                            "text": "Medical management"
                        },
                        {
                            "text": "Medical evaluation"
                        },
                        {
                            "text": "Mental health surgery"
                        },
                        {
                            "text": "Surgical Options"
                        },
                        {
                            "text": "Telemedicine"
                        },
                        {
                            "text": "Other"
                        }
                    ],
                    "uicomponentid": 14
                },
                {
                    "uicomponentTitle": "Appointment type",
                    "uicomponentType": "Check box",
                    "uicomponentTags": "Appointment type, Check box, Appointment form",
                    "uicomponentProperties": "{ \"Property1\": \"XYZ\" }",
                    "uicomponentOptions": [
                        {
                            "text": "Consultation"
                        },
                        {
                            "text": "Transfer care"
                        }
                    ],
                    "uicomponentid": 15
                }
            ],
            "subsections": [],
            "sectionid": 10,
            "parentsectionid": null
        }
    ],
    "templateid": 4
}
  userInstances = [
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
        "label": "Middle name",
        "text": "Enter middle name",
        "answer": "Muhammad",
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
    }
]
    const doc = new PDFDocument({
          size: [800, 1000],
          bufferPages: true
        });
    doc.page.margins.top = 0;
    doc.page.margins.bottom = 0;
    doc.page.margins.left=0;
    doc.page.margins.right=0;
    doc.fontSize(14);
    let filename = req.params.filename;
    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    //doc.text(JSON.stringify(template), 50, 60);
    let patientName = "Saad Sohail";
    let dateOfAccident = "05-11-2019";
    let dateOfBirth = "06-02-1998";
    let age = "21";
    let gender = "Male";
    let address = "House X-1, Street 99, XYZ Town, Islamabad";
    let docName = "Nabeel Hussain";
    let date = "06-11-2019";
    stringHeight = doc.heightOfString("(866) 248-4633");
    doc.lineWidth(2);
    doc.moveTo(0, 40).lineTo(800, 40).stroke();
    doc.font('Helvetica-Bold').text("Patient Name: ", 50, doc.Y, {lineBreak : false})
    .font('Helvetica').text(patientName, {lineBreak : false})
    .font('Helvetica-Bold').text("Date Of Accident: ", doc.page.width-250, doc.Y, {lineBreak : false})
    .font('Helvetica').text(dateOfAccident, {lineGap:20});

    doc.font('Helvetica-Bold').text("Date Of Birth: ", 50, doc.Y, {lineBreak : false})
    .font('Helvetica').text(dateOfBirth,  {lineBreak : false})
    .font('Helvetica-Bold').text("Age: ", 350, doc.Y, {lineBreak : false})
    .font('Helvetica').text(age,  {lineBreak : false})
    .font('Helvetica-Bold').text("Gender: ", doc.page.width-250, doc.Y, {lineBreak : false})
    .font('Helvetica').text(gender, {lineGap:20});



    doc.font('Helvetica-Bold').text("Address: ", 50, doc.Y, {lineBreak : false})
    .font('Helvetica').text(address, {lineGap:20});
    doc.font('Helvetica-Bold').fontSize(16).text(template.templateName,{underline:true, align:"center"});

    doc.fontSize(12);
    // for(let i = 0; i < template.sections.length; i++){
    //     sectionsData(template.sections[i], userInstances);
    // }
    for(let i = 0; i < userInstances.length;i++){
     if(Math.floor(doc.y)>(doc.page.height-250)) {
          doc.addPage();
          doc.lineWidth(2);
          doc.moveTo(0, 40).lineTo(800, 40).stroke();
          doc.y = 65;
     }
      doc.font('Helvetica-Bold').text(`${userInstances[i].label}: `, 50, doc.Y, {lineBreak:false})
      .font('Helvetica').text(userInstances[i].answer, {lineGap:20});
    }
    const range = doc.bufferedPageRange();
    doc.fontSize(12);
    for (let i = range.start; i <= (doc._pageBufferStart + doc._pageBuffer.length - 1); i++) {
       doc.switchToPage(i);
       doc.y = 875;
       doc.font('Helvetica-Bold').text("Referring Physician: ", 50, doc.Y, {lineBreak : false})
       .font('Helvetica').text(docName,  {lineBreak : false})
       .font('Helvetica-Bold').text("Date: ", doc.page.width-250, doc.Y, {lineBreak : false})
       .font('Helvetica').text(date,  {lineGap: 20});
       doc.font('Helvetica-Bold').text("Signature: ", 50, doc.Y, {lineBreak : false})
       .font('Helvetica').text("",  {lineBreak : false})
       .font('Helvetica-Bold').text("NPI: ", doc.page.width-250, doc.Y, {lineBreak : false})
       .font('Helvetica').text(date,  {lineGap: 20});
       doc.lineWidth(2);
       doc.moveTo(0, doc.page.height-45).lineTo(800, doc.page.height-45).stroke();
       doc.font('Helvetica').text("(866) 248-4633 | 63-36 99th St Rego Park, NY 11374 | templateManager.com | info@templateManager.com", 0, doc.page.height-30, {align:"center"});
     }
    let out = fs.createWriteStream('new.pdf');
    doc.pipe(out);
    doc.end();
    res.send();
    out.on('finish', function() {
      // what you want to do with the file.
    });
});

// function sectionsData(section, userInstances){
//   for(let i = 0; i < section.subsections.length; i++){
//     sectionsData(section.subsections[i], userInstances);
//   }
//   for(let i = 0; i < section.uicomponents.length; i++){
//      let dataToAdd = _.filter(userInstances, function(obj){
//        return obj.uicomponentid == section.uicomponents.id;
//      })
//      doc.font('Helvetica-Bold').text(`${dataToAdd.label}: `, doc.X+1, doc.Y, {lineBreak:false})
//      .font('Helvetica').text(dataToAdd.answer, {lineBreak:false, lineGap:20});
//   }
//   doc.moveDown();
//   if(Math.floor(doc.y)>(doc.page.height-250)) {
//        doc.addPage();
//        doc.lineWidth(2);
//        doc.moveTo(0, 40).lineTo(800, 40).stroke();
//        doc.y = 65;
//   }
// }
module.exports = router;
