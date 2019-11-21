const express = require('express');
const router = express.Router();;
const con = require('../db.js');
const {validateid} = require("../middleware/idValidate.js");
const {validateName} = require("../middleware/nameValidate.js");
const app = require("../app.js");
const _ = require("lodash");
const functions = require("../middleware/functions.js");
const {getSectionsTemplate} = require("../middleware/getSectionsTemplate.js");
const auth = require("../middleware/auth");
/* GET users listing. */

router.post('/:sectionName', async function (req,res) {
    let sectionName = req.params.sectionName;
    try{
        let validated = validateName(sectionName);
        if (validated.error === undefined) {
          let query = `Select s.id as sectionid, s.name as sectionName, s.tags as sectionTags, s.templateid as sectionTemplate,
          s.properties as sectionProperties, s.parentsectionid as sectionParent, t.id as templateid, t.name as templateName,
          t.tags as templateTags from section s left join template t on s.templateid = t.id where s.name like "%${sectionName}%"
          OR s.tags like "%${sectionName}%"`
          let queryResults = await functions.runQuery(query);
          queryResults = getSectionsTemplate(queryResults);
          queryResults = functions.replaceChars(queryResults);
          res.send(queryResults);
        } else {
            res.send({statusCode: 405, message: validated.error.message });
        }
    }
    catch(error){
        res.send({statusCode: 405, message: error.message});
    }
  })

module.exports = router;
