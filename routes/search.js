const express = require('express');
const router = express.Router();
const functions = require("../middleware/functions");
const _ = require("lodash");


/* GET home page. */
router.post('/', async function(req, res) {
let templateObject = [];
let sectionsObject = [];
let uiComponentsObject = [];
  if(req.body.type=='All' || req.body.type=='template'){
    let query = `Select t.id as template_id, t.default_columns as default_columns, t.name as template_name, t.tags as template_tags, t.public as public, s.id as
    section_id, s.name as section_name, s.title as title, s.tags as section_tags, s.properties as section_properties, s.parent_section_id as parent_section_id, s.type as
    section_type, s.template_id as section_template_id, u.id as ui_component_id, u.statement as statement, u.type as uicomponent_type, u.tags as uicomponent_tags, u.id
    as ui_component_section_id, u.properties as uicomponent_properties from template t inner join section s on s.template_id = t.id inner join ui_component u on
    u.section_id = s.id where t.name like "%${req.body.searchParams}%" OR t.tags like "%$${req.body.searchParams}%"`;
    let queryResults = await functions.runQuery(query);
    // let uiComponentsObject = [];
    templateObject = _.uniqBy(queryResults, 'template_id');
    sectionsObject = _.uniqBy(queryResults, 'section_id');
    uiComponentsObject = _.uniqBy(queryResults, 'ui_component_id');

    for(let i = 0; i < queryResults.length; i++){
      if(templateObject.length>i){
        console.log(templateObject.length);
        templateObject[i].sections=[];
        templateObject[i] = _.pick(templateObject[i], ['template_id', 'default_columns', 'template_name', 'template_tags', 'public', 'sections']);
      }
        console.log(templateObject);
      if(sectionsObject.length>i){
        sectionsObject[i].ui_components=[];
        sectionsObject[i] = _.pick(sectionsObject[i], ['section_id', 'section_name', 'title', 'section_tags', 'section_properties', 'parent_section_id', 'section_type', 'ui_components']);
      }
      if(uiComponentsObject.length>i){
        uiComponentsObject[i] = _.pick(uiComponentsObject[i], ['ui_component_id', 'statement', 'uicomponent_type', 'uicomponent_tags', 'uicomponent_properties']);
      }
    }
    for(let i = 0; i < templateObject.length; i++){
        for(let j = 0; j < sectionsObject.length; j++){
          if(sectionsObject[j].section_template_id=templateObject[i].template_id){
            templateObject[i].sections.push(sectionsObject[j]);
          }
          for(let k = 0; k < uiComponentsObject.length; k++){
            if(uiComponentsObject[k].ui_component_section_id=sectionsObject[j].section_id){
              sectionsObject[j].ui_components.push(uiComponentsObject[k]);
            }
          }
        }
    }
    //   let templateIndex = _.findIndex(templateObject, (obj)=>{
    //     return obj.templateid == queryResults[i].templateid;
    //   })
    //   resultObject[i] = _.pick(resultObject[i], ['sectionid', 'sectionName', 'sectionTags', 'sectionParent', 'sectionProperties', 'sectionTemplate']);
    //   templateObject[templateIndex] = _.pick(templateObject[templateIndex], ['templateid', 'templateName', 'templateTags']);
    //   resultObject[i].template=[];
    //   resultObject[i].template.push(templateObject[templateIndex]);
    // }
    console.log(templateObject);
  }

  if(req.body.type=='All' || req.body.type=='section'){
      let query = `Select s.id as section_id, s.name as section_name, s.title as title, s.tags as section_tags, s.properties as section_properties,
      s.parent_section_id as parent_section_id, s.type as section_type,  u.id as ui_component_id, u.statement as statement, u.type as uicomponent_type, u.tags as
      uicomponent_tags, u.properties as uicomponent_properties from section s inner join ui_component u on u.section_id = s.id where s.name like
      "%${req.body.searchParams}%" OR s.tags like "%$${req.body.searchParams}%"`;
      let queryResults = await functions.runQuery(query);
      console.log(queryResults);
  }

  if(req.body.type=='All' || req.body.type=='ui_component'){
      let query = `Select * from ui_component where tags like "%$${req.body.searchParams}%"`;
      let queryResults = await functions.runQuery(query);
      console.log(queryResults);
  }
  res.send({statusCode:200, message: templateObject});
})

module.exports = router;
