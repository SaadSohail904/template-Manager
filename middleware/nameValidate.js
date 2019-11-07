// const _ = require('underscore');
const Joi = require('@hapi/joi');
// const clone = require('clone');
module.exports = {
  validateName: function(input){
    const schema = Joi.string().required()
    const result = schema.validate(input);
    return result;
  }
}
