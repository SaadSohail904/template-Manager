const express = require('express');
const router = express.Router();
const functions = require('../middleware/functions');
const {userDataValidate} = require('../middleware/userDataValidate');
const con = require("../db.js");

/* GET home page. */
router.post('/', function(req, res) {
  con.beginTransaction(async function(err) {
    try{
      let userData = req.body;
      let validated = userDataValidate(userData);
      if(!validated.error){
        let queryData = "";
        for(let i = 0; i < userData.length; i++){
          let query = `Insert into data(label, text, answer, patientid, uicomponentid) values("${userData[i].label}", "${userData[i].text}", "${userData[i].answer}", ${userData[i].patientid}, ${userData[i].uicomponentid})`;
          let queryResults = await functions.runQuery(query);
          userData[i].id = queryResults.insertId;
          }
        con.commit();
        res.send(userData);
      } else {
          res.send({statusCode: 405, errorMessage: validated.error.message });
      }
    } catch(error) {
      con.rollback();
      res.send({statusCode: 405, errorMessage: error.message, rollback:"true"});
    }
  })
});



module.exports = router;
