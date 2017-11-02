const stripe = require('./class/class.js');
const errors = require('feathers-errors');
module.exports.initObject = function(apiHeaders)
{
  console.log("inside fn.....................................");
  if (!('x-api-token' in apiHeaders))
  {
    throw new errors.BadRequest({errors: {headers: 'Invalid headers'} });
  }
  else
  {
      let obj = new stripe({ 'secret_key': apiHeaders['x-api-token'] });
      return obj;
  }
}
