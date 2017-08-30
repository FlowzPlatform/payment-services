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
    constructor(options) {
        console.log("inside cons..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};
    }

    async find(params) {

        console.log("inside.." + appHooks.xtoken);

        console.log("inside find");
        //console.log(params);
        let response;
        // let schemaName = eval("schema." + params.query.gateway + "_payment_charge_find_schema");
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/payment/schema.js")
        let schemaName = schema1.get ;
        this.validateSchema(params.query, schemaName)

        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.getCharge(params.query)
        } else if (params.query.gateway == "authdotnet") {
            console.log("inside authnet...");
        }

        return response;

        //return Promise.resolve([]);
    }

    get(id, params) {
        return Promise.resolve({
            id,
            text: `A new message with ID: ${id}!`
        });
    }

    async create(data, params) {
        console.log("inside create", data);
        // let schemaName = eval("schema." + data.gateway + "_payment_charge_schema");
        const schema1 = require("../../plugin/"+data.gateway+"/schema/payment/schema.js")
        let schemaName = schema1.create ;
        //this.validate(data);
        this.validateSchema(data, schemaName)

        let response;
        //    var createCharge = eval("this." + data.gateway + "CreateCharge")

        if (data.gateway == "stripe") {

            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.doCharge(data)
        } else if (data.gateway == "authdotnet") {
            console.log("inside authnet..." + authdotnet);
            let obj = new authdotnet({
                'api_login_key': appHooks.xtokenlogin,
                'api_trans_key': appHooks.xtoken
            });
            response = obj.doCharge(data);
            //console.log("================" + obj.doCharge())
        }

        //console.log(response)

        return response;
        // if (Array.isArray(data))
        // {
        //   return Promise.all(data.map(current => this.create(current)));
        //   //return Promise.all(data.map(current => this.create(current)));
        // }
        //
    }


    update(id, data, params) {
        return Promise.resolve(data);
    }


    async patch(id, data) {
        console.log("inside patch", data);
        //let schemaName = eval("schema." + data.gateway + "_payment_charge_update_schema");
        const schema1 = require("../../plugin/"+data.gateway+"/schema/payment/schema.js")
        let schemaName = schema1.update ;
        this.validateSchema(data, schemaName);
        let response;

        if (data.gateway == 'stripe') {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.updateCharge(data)
        } else if (data.gateway == "authdotnet") {
            console.log("inside authnet..." + authdotnet);
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


    remove(id, params) {
        return Promise.resolve({ id });
    }

}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;
