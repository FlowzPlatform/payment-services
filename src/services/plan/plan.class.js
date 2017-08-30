const Ajv = require('ajv');
const configParams = require("../../config.js");
let _ = require("lodash")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
//let stripeConfig = require("../../config/stripe/stripeConfig");
const appHooks = require('../../app.hooks');
const authDotnet = require('../../classes/authorizedotnet.class.js');
//const stripeClass = require('../../classes/stripe.class.js');

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
        let response;
      //  let schemaName = eval("schema."+params.query.gateway + "_plan_get_schema");
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/plan/schema.js")
        let schemaName = schema1.get ;
        this.validateSchema(params.query, schemaName)

        const class1 = require("../../plugin/"+params.query.gateway+"/class/class.js")
        let obj = new class1 ({'secret_key': appHooks.xtoken })
        response = await obj.getPlan(params.query);
        return response;
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  async create (data, params) {
    console.log(data);
        //let schemaName = eval("schema."+ data.gateway + "_plan_create_schema");
        const schema1 = require("../../plugin/"+data.gateway+"/schema/plan/schema.js")
        let schemaName = schema1.create ;
        this.validateSchema(data, schemaName)

        let response;
        const class1 = require("../../plugin/"+data.gateway+"/class/class.js")
        let obj = new class1 ({'secret_key': appHooks.xtoken })
        response = await obj.createPlan(data);
        return response;
  }



  update (id, data, params) {
    return Promise.resolve(data);
  }

  async patch(id, data) {
        //let schemaName = eval("schema."+ data.gateway + "_plan_update_schema");
        const schema1 = require("../../plugin/"+data.gateway+"/schema/plan/schema.js")
        let schemaName = schema1.update ;
        this.validateSchema(data, schemaName);
        let response;
        const class1 = require("../../plugin/"+data.gateway+"/class/class.js")
        let obj = new class1 ({'secret_key': appHooks.xtoken })
        response = await obj.updatePlan(data);
        return response;
    }

  async remove (id, params) {
        //let schemaName = eval("schema." + params.query.gateway + "_plan_delete_schema");
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/plan/schema.js")
        let schemaName = schema1.delete ;
        this.validateSchema(params.query, schemaName);
        let response;
        const class1 = require("../../plugin/"+params.query.gateway+"/class/class.js")
        let obj = new class1 ({'secret_key': appHooks.xtoken })
        response = await obj.deletePlan(params.query);
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
