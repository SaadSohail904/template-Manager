const con = require('../db.js');
const _ = require("lodash");

//Used in templateSearch and getSectionsbyTemplate api to add uicomponent and subsections in sections field
exports.getMiscData = function (queryResult){
  let sectionsObject = [];
  let uicomponents = [];
  sectionsObject = _.uniqBy(queryResult, 'sectionid');
  uicomponents = _.uniqBy(queryResult, 'uicomponentid')
  for(let i=0; i<sectionsObject.length;i++){
    sectionsObject[i] = _.pick(sectionsObject[i], ['sectionid', 'sectionName', 'sectionTags', 'sectionTemplate', 'sectionProperties', 'sectionParent', 'uicomponents', 'subsections']);
    sectionsObject[i].uicomponents = [];
    sectionsObject[i].subsections = [];
  }
  for(let i=0; i<uicomponents.length;i++){
    uicomponents[i] = _.pick(uicomponents[i], ['uicomponentid', 'uicomponentTitle', 'uicomponentType', 'uicomponentTags', 'uicomponentProperties', 'sectionid']);
  }
  for(let i = 0; i < queryResult.length; i++){
    let resultIndex = _.findIndex(sectionsObject, (obj) => {
      return queryResult[i].sectionid == obj.sectionid;
    })
    let uiIndex = _.findIndex(uicomponents, (obj) => {
      return queryResult[i].uicomponentid == obj.uicomponentid;
    });
    if(queryResult[i].uicomponentid!=null){
      sectionsObject[resultIndex].uicomponents.push(uicomponents[uiIndex]);
    }
  }
  for(let i = 0; i < sectionsObject.length; i++){
    sectionsObject[i].uicomponents= _.uniqBy(sectionsObject[i].uicomponents, 'uicomponentid');
    for(let j = 0; j< sectionsObject.length; j++){
      if(sectionsObject[j].sectionParent == sectionsObject[i].sectionid){
        sectionsObject[i].subsections.push(sectionsObject[j]);
      }
    }
  }
  _.remove(sectionsObject, (obj) => obj.sectionParent != null);

  return sectionsObject;
}

//Used in all apis before sending result to replace special characters included from query results
exports.replaceChars = function(obj){
  obj = JSON.stringify(obj);
  obj = obj.replace(/\\r?\\n/g, " ");
  return JSON.parse(obj);
}

//Used in sectionSearch/templateSearch and getSectionsbyTemplate api to wait for query results
exports.runQuery = function (query){
  return new Promise((resolve, reject) => {
    con.query(query, (err, queryResults) => {
      if(err){
        reject(err);
      }
      else{
        resolve(queryResults);
      }
    })
  })
}
