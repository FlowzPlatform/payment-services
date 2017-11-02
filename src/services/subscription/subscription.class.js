const Ajv = require('ajv');
const configParams = require("../../config.js");
let _ = require("lodash")
const schema = require("./schema/schema.js")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
//let stripeConfig = require("../../config/stripe/stripeConfig");
const appHooks = require('../../app.hooks');



let ajv = new Ajv({
    allErrors: true
});


/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    console.log("parameter---------",params.query)
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/subscription/schema.js")
        let schemaName = schema1.get ;
        console.log("schemaName---------",schema1)
        this.validateSchema(params.query, schemaName);
        let response;
        const obj = require('../../plugin/' +params.query.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.getSubscription(params.query);
        return response;
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  async create (data, params) {
        const schema1 = require("../../plugin/"+data.gateway+"/schema/subscription/schema.js")
        let schemaName = schema1.create ;
        this.validateSchema(data, schemaName);
        let response;
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.createSubscription(data);
        return response;
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  async patch (id, data, params) {
        console.log("inside patch", data);
        const schema1 = require("../../plugin/"+data.gateway+"/schema/subscription/schema.js")
        console.log("schma1",schema1)       
        let schemaName = schema1.update ;
        this.validateSchema(data, schemaName);
        let response;
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        // console.log(appHooks.apiHeaders)
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.updateSubscription(data);
        return response;
        // console.log(response)
  }

  async remove (id, params) {
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/subscription/schema.js")
        let schemaName = schema1.delete ;
        this.validateSchema(params.query, schemaName);
        let response;
        const obj = require('../../plugin/' +params.query.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.deleteSubscription(params.query);
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
