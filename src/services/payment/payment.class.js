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
        let schemaName = eval("schema." + params.query.gateway + "_payment_charge_find_schema");
        this.validateSchema(params.query, schemaName)

        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.getCharges(params.query)
        } else if (params.query.gateway == "authorizeDotNet") {
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
        let schemaName = eval("schema." + data.gateway + "_payment_charge_schema");
        //this.validate(data);
        this.validateSchema(data, schemaName)

        let response;
        //    var createCharge = eval("this." + data.gateway + "CreateCharge")

        if (data.gateway == "stripe") {

            /*
            const stripe = require("stripe")(
                appHooks.xtoken
            );

            let response = createCharge(data, stripe);
            */
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.doCharge(data)
        } else if (data.gateway == "authorizeDotNet") {
            console.log("inside authnet..." + authDotnet);
            let obj = new authDotnet();
            response = obj.doCharge();
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
        console.log("inside patch",data);
        let schemaName = eval("schema." + data.gateway + "_payment_charge_update_schema");
        this.validateSchema(data, schemaName);
        let response;

        if(data.gateway == 'stripe'){
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.updateCharge(data)
        } else if (data.gateway == "authorizeDotNet") {
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


    remove(id, params) {
        return Promise.resolve({ id });
    }

}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;