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

        let response;
        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.get ;
        //let schemaName = eval("schema." +params.query.gateway + "_customer_get_schema");
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

        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.create ;
        //let schemaName = eval("schema."+data.gateway + "_customer_create_schema");/
        this.validateSchema(data, schemaName)

        let response;
        if (data.gateway == "stripe")
        {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            //console.log(obj.abc());
            response = await obj.createCustomer(data)
        } else if (data.gateway == "authdotnet")
        {
          console.log("inside authdotnet")
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
        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.update ;
        //let schemaName = eval("schema." + data.gateway + "_customer_update_schema");
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
        //let schemaName = eval("schema." + params.query.gateway + "_customer_delete_schema");
        let schema1 = require("../../plugin/"+params.query.gateway+"/schema/customer/schema.js")
        let schemaName = schema1.delete ;
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
