const Ajv = require('ajv');
const configParams = require("../../config.js");
let _ = require("lodash")
const schema = require("./schema/schema.js")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
//let stripeConfig = require("../../config/stripe/stripeConfig");
const appHooks = require('../../app.hooks');

const authDotnet = require('../../classes/authorizedotnet.class.js');
const stripeClass = require('../../classes/stripe.class.js');

let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

let ajv = new Ajv({
    allErrors: true
});


/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    console.log("subscription find class");
        console.log("inside.." + appHooks.xtoken);

        console.log("inside find",params.query.gateway);
        //console.log(params);
        let response;
        let schemaName = eval("schema." + params.query.gateway + "_subscription_get_schema");
        console.log("schemaName",schemaName);
        this.validateSchema(params.query, schemaName)

        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.getSubscription(params.query);
        } else if (params.query.gateway == "authorizeDotNet") {
            console.log("inside authnet...");
        }

        return response;

  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  async create (data, params) {
   
        console.log("inside create", data);
        let schemaName = eval("schema." + data.gateway + "_subscription_create_schema");
        console.log("schema",schemaName);
        this.validateSchema(data, schemaName);
        let response;
        if (data.gateway == "stripe") {

            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.createSubscription(data)
        } else if (data.gateway == "authorizeDotNet") {
            console.log("inside authnet..." + authDotnet);
        }
        return response;
   
        
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  async remove (id, params) {
      console.log("inside remove", params.query.gateway);
      let schemaName = eval("schema." + params.query.gateway + "_subscription_delete_schema");
        console.log("schema",schemaName);
        this.validateSchema(params.query, schemaName);
        let response;
        if (params.query.gateway == "stripe") {

            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.deleteSubscription(params.query)
        } else if (params.query.gateway == "authorizeDotNet") {
            console.log("inside authnet..." + authDotnet);
        }
        return response;
  }

  validateSchema(data, schemaName) {
        console.log(schemaName)
        let validateSc = ajv.compile(schemaName);
        let valid = validateSc(data);

        if (!valid) {
            throw new errors.NotAcceptable('user input not valid', validateSc.errors);
        }
    }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
