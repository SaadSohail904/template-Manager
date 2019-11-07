const _ = require("lodash");

module.exports = {
  getTemplateSections :function(templatesResult, sectionsObject){
    let resultObject = _.uniqBy(templatesResult, 'templateid');
    for(let i = 0; i < resultObject.length; i++){
      resultObject[i] = _.pick(resultObject[i], ['templateid', 'templateName', 'templateTags']);
      resultObject[i].sections=[];
    }
      for(let i = 0; i < sectionsObject.length; i++){
        if(sectionsObject[i].sectionid !=null){
          let templateIndex = _.findIndex(resultObject, (obj)=>{
            return obj.templateid == sectionsObject[i].sectionTemplate;
          })
          resultObject[templateIndex].sections.push(sectionsObject[i]);
        }
      }
      return resultObject;
  }
}
