const Ajv = require('ajv');
const configParams = require("../../config.js");
let _ = require("lodash")
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
     console.log("customer find class");
        console.log("inside.." + appHooks.xtoken);

        console.log("inside find",params.query.gateway);
        //console.log(params);
        let response;
        let schemaName = eval("schema." +params.query.gateway + "_customer_get_schema");
        console.log("schemaName",schemaName);
        this.validateSchema(params.query, schemaName)

        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.getCustomer(params.query);
        } else if (params.query.gateway == "authdotnet") {
          let obj = new authdotnet({
              'api_login_key': appHooks.xtokenlogin,
              'api_trans_key': appHooks.xtoken
          });
          response = await obj.getCustomer(params.query);
        }

        return response;

  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  async create (data, params) {
        console.log("inside create");
        let schemaName = eval("schema."+data.gateway + "_customer_create_schema");
        console.log("schemaName #######" , schemaName);
        this.validateSchema(data, schemaName)
        let response;
        if (data.gateway == "stripe")
        {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            console.log(obj.abc());
            response = await obj.createCustomer(data)
        } else if (data.gateway == "authdotnet")
        {
          let obj = new authdotnet({
              'api_login_key': appHooks.xtokenlogin,
              'api_trans_key': appHooks.xtoken
          });
          response = obj.createCustomer(data);
        }

        return response;
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  async patch(id, data) {
        console.log("inside patch",data);
        let schemaName = eval("schema." + data.gateway + "_customer_update_schema");
        this.validateSchema(data, schemaName);
        let response;

        if(data.gateway == 'stripe'){
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.updateCustomer(data)
        } else if (data.gateway == "authdotnet") {
          let obj = new authdotnet({
              'api_login_key': appHooks.xtokenlogin,
              'api_trans_key': appHooks.xtoken
          });
          response = obj.updateCustomer(data);
        }
        return response;
    }

   async remove (id, params) {
      console.log("inside remove", params.query.gateway);
      let schemaName = eval("schema." + params.query.gateway + "_customer_delete_schema");
        console.log("schema",schemaName);
        this.validateSchema(params.query, schemaName);
        let response;
        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.deleteCustomer(params.query)
        } else if (params.query.gateway == "authdotnet") {
          let obj = new authdotnet({
              'api_login_key': appHooks.xtokenlogin,
              'api_trans_key': appHooks.xtoken
          });
          response = await obj.deleteCustomer(params.query)
        }
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
