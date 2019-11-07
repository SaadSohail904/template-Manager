const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const con = require('./db.js');

const addTemplate = require('./routes/addTemplate');
const addUserInstance = require('./routes/addUserInstance');
const generatePdf = require('./routes/generatePdf');
const getSectionsByTemplate = require('./routes/getSectionsByTemplate');
const getTagSuggestions = require('./routes/getTagSuggestions');
const getTemplateBySection = require('./routes/getTemplateBySection');
const sectionSearch = require('./routes/sectionSearch');
const templateSearch = require('./routes/templateSearch');
const updateUserInstance = require('./routes/updateUserInstance');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(function (req, res, next) { //allow cross origin requests
//add any token authentication
    // let allowedOrigins = [
    //     'http://127.0.0.1',
    //     'http://localhost',
    //     'http://127.0.0.1:4200',
    //     'http://localhost:4200',
    //     'http://tableegh.org:4200'
    // ];
    // let origin = req.headers.origin;
    // console.log("requested -------------------------",req.headers);

    // if (allowedOrigins.indexOf(origin) > -1) {
    //      res.end(403, 'Remote host is not allowed to use the API')
    // }

    // res.header('Access-Control-Allow-Credentials', true);
    // res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // next();
// });

app.use(express.static(path.join(__dirname, 'public')));

//checking if a user is logged in ----------------------------------
// let myLogger = function (req, res, next) {
//     if (req.session.user) {
//         next();
//     } else {
//         return res.json({ 'status': 404, 'message': "Please Login" });
//     }
// }
//checking if a user is logged in ends ------------------------------

app.use('/addTemplate', addTemplate);
app.use('/addUserInstance', addUserInstance);
app.use('/generatePdf', generatePdf);
app.use('/getSectionsByTemplate', getSectionsByTemplate);
app.use('/getTagSuggestions', getTagSuggestions);
app.use('/getTemplateBySection', getTemplateBySection);
app.use('/sectionSearch', sectionSearch);
app.use('/templateSearch', templateSearch);
app.use('/updateUserInstance', updateUserInstance);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

testData();

function testData(){
  con.query(`Insert ignore into template(id, name, tags, docid, createdby, deletedby, updatedby) values
  (1, "Template 1", "Template 1 tags", 1, 1, NULL, NULL),
  (2, "Template 2", "Template 2 tags", 2, 1, NULL, NULL),
  (3, "Template 3", "Template 3 tags", 3, 1, NULL, NULL)`);
  con.query(`Insert ignore into section(id, name, tags, templateid, properties, parentsectionid, createdby, deletedby, updatedby) values
  (1, "Section 1", "Section 1 tags", 1, '{ "Property1": "XYZ" }', NULL, 1, NULL, NULL),
  (2, "Section 2", "Section 2 tags", 1, '{ "Property1": "XYZ" }', 1, 1, NULL, NULL),
  (3, "Section 3", "Section 3 tags", 2, '{ "Property1": "XYZ" }', 2, 1, NULL, NULL)`);
  con.query(`Insert ignore into uicomponent(id, title, type, tags, properties, sectionid, createdby, deletedby, updatedby) values
  (1, "UI Component 1", "Text field", "UI Component 1 tags", '{ "Property1": "XYZ" }', 1, 1, NULL, NULL),
  (2, "UI Component 2", "Text field", "UI Component 2 tags", '{ "Property1": "XYZ" }', 1, 1, NULL, NULL),
  (3, "UI Component 3", "Text field", "UI Component 3 tags", '{ "Property1": "XYZ" }', 2, 1, NULL, NULL)`);
  con.query(`Insert ignore into tagsuggestions(id, name, type, tagSuggestion, createdby, deletedby, updatedby) values
  (1, "Template 1", "template", "Template 1 tags", 1, NULL, NULL),
  (2, "Template 2", "template", "Template 2 tags", 1, NULL, NULL),
  (3, "Template 3", "template", "Template 3 tags", 1, NULL, NULL),
  (4, "Section 1", "section", "Section 1 tags", 1, NULL, NULL),
  (5, "Section 2", "section", "Section 2 tags", 1, NULL, NULL),
  (6, "Section 3", "section", "Section 3 tags", 1, NULL, NULL),
  (7, "UI Component 1", "uicomponent", "UI Component 1 tags", 1, NULL, NULL),
  (8, "UI Component 2", "uicomponent", "UI Component 2 tags", 1, NULL, NULL),
  (9, "UI Component 3", "uicomponent", "UI Component 3 tags", 1, NULL, NULL)`);
  con.query(`Insert ignore into data(id, label, text, answer, patientid, uicomponentid, createdby, deletedby, updatedby) values
  (1, "Some Label 1", "Some text 1", "Some answer 1", 1, 1, 1, NULL, NULL),
  (2, "Some Label 2", "Some text 2", "Some answer 2", 2, 2, 1, NULL, NULL),
  (3, "Some Label 3", "Some text 3", "Some answer 3", 3, 3, 1, NULL, NULL)`)
  con.query(`Insert ignore into uicomponentoption(id, text, label, value, uicomponentid, createdby, deletedby, updatedby) values
  (1, "Data 1 Label", "Data text 1", "Yes", 1, 1, NULL, NULL),
  (2, "Data 2 Label", "Data text 2", "Yes", 2, 1, NULL, NULL),
  (3, "Data 3 Label", "Data text 3", "Yes", 3, 1, NULL, NULL)`);
}


module.exports = app;
