const Joi = require('@hapi/joi');

module.exports = {
  userDataValidate: function(input){
    const schema = Joi.object().keys({
      label: Joi.string().required(),
      text: Joi.string().required().allow(''),
      answer: Joi.string().required(),
      patientid: Joi.number().integer().required(),
      uicomponentid: Joi.number().integer().required()
    })
    let result;
    for(let i = 0; i < input.length; i++){
      result = schema.validate(input[i]);
      if(result.error) return result;
    }
    return result;
  }
}
