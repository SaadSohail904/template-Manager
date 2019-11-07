const Joi = require('@hapi/joi');

module.exports = {
  templateValidate: function(input){
    const schema = Joi.object().keys({
      templateName: Joi.string().required(),
      templateTags: Joi.string().required(),
      sections: Joi.array().required()
    })
    const result = schema.validate(input);
    if(result.error) {
      return result;
    }
      for(let i = 0; i < input.sections.length; i++){
        let resultSec = subsectionsValidate(input.sections[i]);
        if(resultSec.error) return resultSec;
      }
    return result;
  }
}

function subsectionsValidate(section){
  const schemaSec = Joi.object().keys({
    sectionName: Joi.string().required(),
    sectionTags: Joi.string().required(),
    sectionProperties: Joi.string().required(),
    uicomponents: Joi.array().required(),
    subsections: Joi.array().required()
  })
  const resultSec = schemaSec.validate(section);
  if(resultSec.error) return resultSec;
  for(let i = 0; i < section.subsections.length; i++){
    let resultSubSec = subsectionsValidate(section.subsections[i]);
    if(resultSubSec.error) return resultSubSec;
  }
  for(let i = 0; i < section.uicomponents.length; i++){
      const resultUI = uiValidate(section.uicomponents[i]);
      if(resultUI.error) return resultUI;
    }
  return resultSec;
}

function uiValidate(uicomponent){
  const schemaUI = Joi.object().keys({
    uicomponentTitle: Joi.string().required(),
    uicomponentType: Joi.string().required(),
    uicomponentTags: Joi.string().required(),
    uicomponentProperties: Joi.string().required(),
    uicomponentOptions: Joi.array().required()
  })
  const resultUI = schemaUI.validate(uicomponent);
  for(let i = 0; i < uicomponent.uicomponentOptions.length; i++){
      const resultOptions = uicomponentOptionsValidate(uicomponent.uicomponentOptions[i]);
      if(resultOptions.error) return resultOptions;
    }
  return resultUI;
}

function uicomponentOptionsValidate(uicomponentOption){
  const schemaUI = Joi.object().keys({
    text: Joi.string().required()
  })
  const resultUI = schemaUI.validate(uicomponentOption);
  return resultUI;
}
