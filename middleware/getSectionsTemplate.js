const _ = require("lodash");

module.exports = {
  getSectionsTemplate :function(sectionsResult){
    let resultObject = sectionsResult;
    let templateObject = [];
    templateObject = _.uniqBy(sectionsResult, 'templateid');
    if(sectionsResult.length > 0){
      for(let i = 0; i < sectionsResult.length; i++){
        let templateIndex = _.findIndex(templateObject, (obj)=>{
          return obj.templateid == sectionsResult[i].templateid;
        })
        resultObject[i] = _.pick(resultObject[i], ['sectionid', 'sectionName', 'sectionTags', 'sectionParent', 'sectionProperties', 'sectionTemplate']);
        templateObject[templateIndex] = _.pick(templateObject[templateIndex], ['templateid', 'templateName', 'templateTags']);
        resultObject[i].template=[];
        resultObject[i].template.push(templateObject[templateIndex]);
      }
    }
    return resultObject;
  }
}
