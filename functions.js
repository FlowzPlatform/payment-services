let _ = require("lodash")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;

let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

let validateGateway = function(hook) {
  console.log('inside func..'+hook.method+"--"+JSON.stringify(hook.params.query));
  if (hook.method == "get" || hook.method == "find" || hook.method == "remove")
  {
    if(!hook.params.query.gateway)
    {
      throw new errors.NotAcceptable("please provide gateway")
    }
    else
    {
      let isGatewayAvail = _.indexOf(availableGateways, hook.params.query.gateway );
      if(isGatewayAvail < 0)
      {
        throw new errors.NotAcceptable('gateway not valid');
      }

      console.log("headers ::$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ " + Object.keys(hook));
    }
  }
  else
  {
    //console.log("else..");
    if(!hook.data.gateway)
    {
     throw new errors.NotAcceptable("please provide gateway")
    }
    else
    {
      let isGatewayAvail = _.indexOf(availableGateways, hook.data.gateway );
      if(isGatewayAvail < 0)
      {
        throw new errors.NotAcceptable('gateway not valid');
      }

      console.log("headers :: " + hook);
    }
  }
}

module.exports.validateGateway = validateGateway;
