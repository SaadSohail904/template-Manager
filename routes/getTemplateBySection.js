const express = require('express');
const router = express.Router();;
const con = require('../db.js');
const {validateId} = require("../middleware/idValidate.js");
const {validateName} = require("../middleware/nameValidate.js");
const app = require("../app.js");
const _ = require("lodash");
const functions = require("../middleware/functions.js");
const auth = require("../middleware/auth");
/* GET users listing. */


router.post('/:sectionid', (req,res) => {
    let sectionid = req.params.sectionid;
    try {
      let validated = validateId(sectionid);
      if (validated.error === undefined) {
            con.query(`Select * from template where id in(Select templateid from section where id = ${sectionid})`, (err, queryResults)=>{
              if(err){
                res.send(err);
              } else{
              queryResults = functions.replaceChars(queryResults);
              res.send(queryResults);
              }
              });
          } else {
                res.send({statusCode: 405, message: validated.error.message });
          }
        }
           catch (error) {
               res.send({statusCode: 405, message: error.message});
        }
    })

module.exports = router;
