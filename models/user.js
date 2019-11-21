const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
class user {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    generateAuthToken() {
      const token = jwt.sign({ id: this.id, role: this.role }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
      return token;
    }
}
//custom method to generate authToken


//function to validate user
function validateUser(input) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    role: Joi.string().required()
  });
  const result = schema.validate(input);
  return result;
}


exports.User = user;
exports.validate = validateUser;
