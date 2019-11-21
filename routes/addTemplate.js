const express = require('express');
const router = express.Router();
const functions = require("../middleware/functions")
const {templateValidate} = require("../middleware/templateValidate");
const con = require("../db.js");
const auth = require("../middleware/auth");



/* GET home page. */
router.post('/', function(req, res) {
  con.beginTransaction(async function(err) {
    try {
      template=req.body;
      console.log(req.body);
      if (err) { throw err; }
      let validated = templateValidate(template);
      let tagsuggestions={
        tags: ""
      };
      let templateid = 0;
      if(!validated.error){
        let query = `Insert into template(name, tags) values ("${template.templateName}", "${template.templateTags}")`;
        let templateTags = template.templateTags.split(",");
        for(let i=0; i<templateTags.length; i++){
          tagsuggestions.tags+=`('${template.templateName}', 'template', '${templateTags[i]}'),`;
        }
        queryResults = await functions.runQuery(query);
        template.templateid = queryResults.insertId;
        if(template.sections.length > 0){
          for(let i = 0; i < template.sections.length; i++){
            template.sections[i] = await insertSections(template.sections[i], template.templateid, null, tagsuggestions);
          }
          tagsuggestions.tags = tagsuggestions.tags.slice(0, -1);
          if(tagsuggestions.tags.length > 0){
            query = `Insert ignore into tagsuggestions(name, type, tagsuggestion) values ${tagsuggestions.tags}`;
            await functions.runQuery(query);
          }
        }
        con.commit();
        template.rollback = false;
        res.send(template);
      } else {
        res.send({statusCode: 405, errorMessage: validated.error.message });
      }
    } catch (error) {
      con.rollback();
      res.send({statusCode: 405, errorMessage: error.message, rollback:"true"});
    }
  })
});

async function insertSections(section, templateid, parentsectionid, tagsuggestions){
  let query = `Insert into section(name, tags, templateid, properties, parentsectionid) values('${section.sectionName}',' ${section.sectionTags}', ${templateid}, '${section.sectionProperties}', ${parentsectionid})`;
  let sectionTags = section.sectionTags.split(",");
  for(let i=0; i<sectionTags.length; i++){
    tagsuggestions.tags+=`('${section.sectionName}', 'section', '${sectionTags[i]}'),`;
  }
  let queryResults = await functions.runQuery(query);
  section.sectionid = queryResults.insertId;
  section.parentsectionid = parentsectionid;
  for(let j = 0; j < section.uicomponents.length; j++){
    section.uicomponents[j] = await insertuicomponents(section.uicomponents[j], section.sectionid, tagsuggestions);
  }
  for(let i = 0; i < section.subsections.length; i++){
    section.subsections[i] = await insertSections(section.subsections[i], templateid, section.sectionid, tagsuggestions);
  }
  return section;
}

async function insertuicomponents(uicomponent, sectionid, tagsuggestions){
  let query = `Insert into uicomponent(title, type, tags, properties, sectionid) values('${uicomponent.uicomponentTitle}', '${uicomponent.uicomponentType}', '${uicomponent.uicomponentTags}', '${uicomponent.uicomponentProperties}', ${sectionid})`;
  let queryResults = await functions.runQuery(query);
  let uicomponentTags = uicomponent.uicomponentTags.split(",");
  for(let i=0; i<uicomponentTags.length; i++){
    tagsuggestions.tags+=`('${uicomponent.uicomponentTitle}', 'uicomponent', '${uicomponentTags[i]}'),`;
  }
  uicomponent.uicomponentid = queryResults.insertId;
  await insertuicomponentOptions(uicomponent, uicomponent.uicomponentid);
  return uicomponent;
}
async function insertuicomponentOptions(uicomponent, uicomponentid){
  let optionsToAdd = "";
  for(let i = 0; i<uicomponent.uicomponentOptions.length; i++){
    optionsToAdd += `("${uicomponent.uicomponentOptions[i].text}", ${uicomponentid}),`
  }
  optionsToAdd = optionsToAdd.slice(0, -1);
  if(optionsToAdd.length>1){
    let query = `Insert into uicomponentoption(text, uicomponentid) values ${optionsToAdd}`;
    let queryResults = await functions.runQuery(query);
  }
}
module.exports = router;
