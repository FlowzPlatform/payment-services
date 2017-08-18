const Ajv = require('ajv');
const configParams = require("../../config.js");
let _ = require("lodash")
const schema = require("./schema/schema.js")
    //console.log(schema.stripe_payment_charge_schema)
    //return;
    //console.log(_)
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
//let stripeConfig = require("../../config/stripe/stripeConfig");
const appHooks = require('../../app.hooks');

const authDotnet = require('../../classes/authorizedotnet.class.js');
const stripeClass = require('../../classes/stripe.class.js');

//const objApp = require('../../app');
//console.log('=================================' + this.XApiToken);

let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

//console.log("stripe config @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22.." + this.XApiToken);
//console.log(configParams.gateway.stripe.secret_key)
/*
let stripe = require("stripe")(
    //this.XApiToken
    configParams.gateway.stripe.secret_key
);*/

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
        console.log(params);

        console.log(params.query.gateway)

        /*
        this.stripe = require("stripe")(
            this.XApiToken
        );*/

        //console.log(stripe);

        let response;
        let schemaName = eval("schema." + params.query.gateway + "_payment_charge_find_schema");
        //console.log(schemaName)
        this.validateSchema(params.query, schemaName)

        if (params.query.gateway == "stripe") {
            let obj = new stripeClass({ 'secret_key': appHooks.xtoken });
            response = await obj.getCharges(params.query)
        } else if (params.query.gateway == "authorizeDotNet") {
            console.log("inside authnet...");
        }

        /*
        if (params.query.gateway == "stripe") {
            const stripe = require("stripe")(
                appHooks.xtoken
            );
        } else if (params.query.gateway == "authorizeDotNet") {
            console.log("inside authnet...");
        }

        var retrieveCharge = eval("this." + params.query.gateway + "RetrieveCharge")

        let response = retrieveCharge(params.query, stripe);
        console.log("charges  :: " + response);
        */
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

    validateSchema(data, schemaName) {
        console.log(schemaName)
        let validateSc = ajv.compile(schemaName);
        let valid = validateSc(data);

        if (!valid) {
            throw new errors.NotAcceptable('user input not valid', validateSc.errors);
        }
    }

    stripeCreateCharge(data, stripe) {
        console.log("inside charge..");

        return new Promise((resolve, reject) => {

            stripe.charges.create({
                amount: data.amount,
                currency: data.currency,
                description: data.description,
                customer: data.customerId
            }, function(err, charge) {
                // asynchronously called
                console.log(charge)
                    //console.log('1212');

                resolve(charge)
            });
        })
    }

    stripeRetrieveCharge(data, stripe) {
        console.log(1212);
        return new Promise((resolve, reject) => {

            if (!_.has(data, 'chargeId') && _.has(data, 'gateway')) {
                stripe.charges.list({
                        customer: data.customerId
                    },
                    function(err, charges) {
                        // asynchronously called
                        resolve(charges)
                            //return charges;
                    }
                );
            } else if (_.has(data, 'gateway') && _.has(data, 'chargeId')) {
                console.log("11");
                stripe.charges.retrieve(
                    data.chargeId,
                    function(err, charge) {
                        // asynchronously called
                        resolve(charge)
                            //return charge;
                    }
                );

            }

        })
    }

    update(id, data, params) {
        return Promise.resolve(data);
    }

    patch(id, data, params) {
        return Promise.resolve(data);
    }

    remove(id, params) {
        return Promise.resolve({ id });
    }
}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;