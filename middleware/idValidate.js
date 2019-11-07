// const _ = require('underscore');
const Joi = require('@hapi/joi');
// const clone = require('clone');
module.exports = {
  validateId: function(input){
    const schema = Joi.number().integer()
    const result = schema.validate(input);
    return result;
  }
}
