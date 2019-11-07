const express = require('express');
const router = express.Router();
const con = require('../db.js');
const {validateName} = require("../middleware/nameValidate.js");
const app = require("../app.js");
const _ = require("lodash");
const functions = require("../middleware/functions.js");
const {getTemplateSections} = require("../middleware/getTemplateSections.js");


router.post('/:templateName', async function (req,res) {
    let templateName = req.params.templateName;
    try{
        let validated = validateName(templateName);
        if (validated.error === undefined) {
          let query = `Select s.id as sectionid, s.name as sectionName, s.tags as sectionTags, s.templateid as sectionTemplate,
          s.properties as sectionProperties, s.parentsectionid as sectionParent, t.id as templateid, t.name as templateName,t.tags
          as templateTags, u.id as uicomponentid, u.title as uicomponentTitle, u.type as uicomponentType, u.tags as
          uicomponentTags, u.properties as uicomponentProperties from (template t left join section s on s.templateid = t.id)
          left join uicomponent u on u.sectionid = s.id where t.name like "%${templateName}%" OR t.tags like "%$${templateName}%"`;
          let queryResults = await functions.runQuery(query);
          if(queryResults.length > 0){
            let sectionsObject = [];
            let resultObject = functions.getMiscData(queryResults);
            resultObject = getTemplateSections(queryResults, resultObject);
            resultObject = functions.replaceChars(resultObject);
            res.send(resultObject);
          } else {
            res.send(queryResults);
          }
        } else {
            res.send({statusCode: 405, message: validated.error.message });
        }
    }
    catch(error){
        res.send({statusCode: 405, message: error.message});
    }
  })

module.exports = router;
