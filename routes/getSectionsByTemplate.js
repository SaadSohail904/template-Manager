const express = require('express');
const router = express.Router();;
const con = require('../db.js');
const {validateId} = require("../middleware/idValidate.js");
const {validateName} = require("../middleware/nameValidate.js");
const app = require("../app.js");
const _ = require("lodash");
const functions = require("../middleware/functions.js");
/* GET users listing. */

router.post('/:templateid', async function (req,res){
      let templateid = req.params.templateid;
      let validated = validateId(templateid);
      try{
          if (validated.error === undefined) {
            let query=`Select s.id as sectionid, s.name as sectionName, s.tags as sectionTags, s.templateid as sectionTemplate,
            s.properties as sectionProperties, s.parentsectionid as sectionParent, u.id as uicomponentid, u.title as
            uicomponentTitle, u.type as uicomponentType, u.tags as uicomponentTags, u.properties as uicomponentProperties from section s left join uicomponent u on s.id = u.sectionid  where s.templateid = ${templateid}`;
            let queryResults = await(functions.runQuery(query));
            queryResults = functions.getMiscData(queryResults);
            queryResults = functions.replaceChars(queryResults);
            res.send(queryResults);
            }
          else {
                res.send({statusCode: 405, message: validated.error.message});
              }
          }
      catch (error) {
          res.send({statusCode: 405, message: error.message});
      }
}
)

module.exports = router;
