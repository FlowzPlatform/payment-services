const Ajv = require('ajv');
let _ = require("lodash")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
const appHooks = require('../../app.hooks');

let ajv = new Ajv({
    allErrors: true
});

/* eslint-disable no-unused-vars */
class Service {
    constructor(options) {
        console.log("inside cons..");
        // console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};
    }

    async find(params) {
        let response;
        const schema1 = require("../../plugin/"+params.query.gateway+"/schema/payment/schema.js")
        let schemaName = schema1.get ;
        this.validateSchema(params.query, schemaName)
        const obj = require('../../plugin/' +params.query.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.getCharge(params.query);
        return response;
    }

    get(id, params) {
        return Promise.resolve({
            id,
            text: `A new message with ID: ${id}!`
        });
    }

    async create(data, params) {
        console.log("inside create", data);
        const schema1 = require("../../plugin/"+data.gateway+"/schema/payment/schema.js")
        let schemaName = schema1.create ;
        //this.validate(data);
        this.validateSchema(data, schemaName)
        let response;
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.createCharge(data);
        return response;
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
        const obj = require('../../plugin/' +data.gateway+ '/init.js');
        let paymentGateway = obj.initObject(appHooks.apiHeaders); // check Headers also
        response = await paymentGateway.updateCharge(data);
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
