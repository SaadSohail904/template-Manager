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
      if (err) { throw err; }
      let validated = templateValidate(template);
      // let tagsuggestions={
      //   tags: ""
      // };
      let template_id = 0;
      if(!validated.error){
        let query = `Insert into template(name, tags, default_columns, public) values ("${template.template_name}", "${template.template_tags}", ${template.default_columns}, ${template.public})`;
        // let templateTags = template.templateTags.split(",");
        // for(let i=0; i<templateTags.length; i++){
        //   tagsuggestions.tags+=`('${template.templateName}', 'template', '${templateTags[i]}'),`;
        // }
        queryResults = await functions.runQuery(query);
        template.template_id = queryResults.insertId;
        if(template.sections.length > 0){
          for(let i = 0; i < template.sections.length; i++){
            let sectionId = template.sections[i].section_id;
            template.sections[i] = await insertSections(template.sections[i], template.template_id);
            for(let j = 0; j<template.sections.length;j++){
              if(template.sections[j].parent_section_id==sectionId){
                template.sections[j].parent_section_id = template.sections[i].section_id;
              }
            }
          }
          // tagsuggestions.tags = tagsuggestions.tags.slice(0, -1);
          // if(tagsuggestions.tags.length > 0){
          //   query = `Insert ignore into tagsuggestions(name, type, tagsuggestion) values ${tagsuggestions.tags}`;
          //   await functions.runQuery(query);
          // }
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

async function insertSections(section, template_id){
  section.section_properties = JSON.stringify(section.section_properties);
  if(section.parent_section_id==0) section.parent_section_id = null;
  let query = `Insert into section(name, section_title, tags, template_id, properties, parent_section_id, type, created_by) values('${section.section_name}', '${section.section_title}', '${section.section_tags}', ${template_id}, '${section.section_properties}', ${section.parent_section_id}, ${section.type}, ${section.created_by})`;
  console.log(query);
  // let section_tags = section.section_tags.split(",");
  // for(let i=0; i<section_tags.length; i++){
  //   tagsuggestions.tags+=`('${section.section_name}', 'section', '${section_tags[i]}'),`;
  // }
  let queryResults = await functions.runQuery(query);
  section.section_id = queryResults.insertId;
  for(let j = 0; j < section.ui_components.length; j++){
    section.ui_components[j] = await insertUIComponents(section.ui_components[j], section.section_id);
  }
  return section;
}

async function insertUIComponents(ui_components, section_id){
  ui_components.ui_components_properties = JSON.stringify(ui_components.ui_components_properties);
  let query = `Insert into ui_component(statement, type, tags, properties, section_id, created_by) values('${ui_components.ui_components_statement}', '${ui_components.ui_components_type}', '${ui_components.ui_components_tags}', '${ui_components.ui_components_properties}', ${section_id}, ${ui_components.created_by})`;
  console.log(query);
  let queryResults = await functions.runQuery(query);
  // let ui_componentsTags = ui_components.ui_componentsTags.split(",");
  // for(let i=0; i<ui_componentsTags.length; i++){
  //   tagsuggestions.tags+=`('${ui_components.ui_componentsTitle}', 'ui_components', '${ui_componentsTags[i]}'),`;
  // }
  return ui_components;
}
module.exports = router;
