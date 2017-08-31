const Ajv = require('ajv');
let _ = require("lodash");
const schema = require("./schema/schema.js")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
//let stripeConfig = require("../../config/stripe/stripeConfig");
const appHooks = require('../../app.hooks');

const authdotnet = require('../../classes/authorizedotnet.class.js');
const stripeClass = require('../../classes/stripe.class.js');



let ajv = new Ajv({
    allErrors: true
});


/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
        let response;
        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.get ;
        this.validateSchema(params.query, schemaName)
        const obj = require('../../plugin/' +params.query.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.getCustomer(params.query);
        return response;
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  async create (data, params) {
        let schema1 = require("../../plugin/"+data.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.create ;
        this.validateSchema(data, schemaName)
        let response;
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.createCustomer(data);
        return response;
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  async patch(id, data) {
        let schema1 = require("../../plugin/"+data.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.update ;
        this.validateSchema(data, schemaName);
        let response;
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.updateCustomer(data);
        return response;
    }

   async remove (id, params) {
        //let schemaName = eval("schema." + params.query.gateway + "_customer_delete_schema");
        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.delete ;
        this.validateSchema(params.query, schemaName);
        let response;
        const obj = require('../../plugin/' +params.query.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.deleteCustomer(params.query);
        return response;
  }

  validateSchema(data, schemaName) {

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
