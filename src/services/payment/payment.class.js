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

let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

console.log("stripe config..");
console.log(configParams.gateway.stripe.secret_key)
let stripe = require("stripe")(
    configParams.gateway.stripe.secret_key
);

let ajv = new Ajv({
    allErrors: true
});
/*
let stripe_payment_charge_schema = {
    "properties": {
        "gateway": {
            "description": "gateway in string",
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
        "amount": {
            "description": "amount in Integer",
            "type": "integer"
        },
        "currency": {
            "description": "currency in string",
            "type": "string",
            "enum": ["usd", "inr"]
        },
        "customerId": {
            "description": "customerId in string",
            "type": "string"
        }
    },
    "required": ["gateway", "amount", "currency", "customerId"]
}*/

/* eslint-disable no-unused-vars */
class Service {
    constructor(options) {
        console.log("inside cons..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};
    }

    find(params) {

        console.log("inside find");
        //console.log(params);

        let schemaName = eval("schema." + params.query.gateway + "_payment_charge_find_schema");
        //console.log(schemaName)
        this.validateSchema(params.query, schemaName)

        var retrieveCharge = eval("this." + params.query.gateway + "RetrieveCharge")

        let response = retrieveCharge(params.query);
        console.log("charges  :: " + response);

        //let response = this.retrieveCharge(params.query);

        return response;

        //return Promise.resolve([]);
    }

    get(id, params) {
        return Promise.resolve({
            id,
            text: `A new message with ID: ${id}!`
        });
    }

    create(data, params) {
        console.log("inside create" , data);
        let schemaName = eval("schema." + data.gateway + "_payment_charge_schema");
        //this.validate(data);
        this.validateSchema(data, schemaName)
        let response = this.charge(data);
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

    validate(data) {
        /*
        if(!data.gateway)
        {
          throw new errors.NotAcceptable('please provide gateway');
        }
        let isGatewayAvail = _.indexOf(availableGateways, data.gateway)

        if(isGatewayAvail < 0)
        {
          throw new errors.NotAcceptable('gateway not valid');
        }*/
        let gatewayUsed = eval("schema." + data.gateway + "_payment_charge_schema");
        //  console.log(gatewayUsed);
        let validate = ajv.compile(gatewayUsed);
        let valid = validate(data);
        if (!valid) {
            throw new errors.NotAcceptable('user input not valid', validate.errors);
        }
    }

    charge(data) {
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

    stripeRetrieveCharge(data) {
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

    update(data, params) {

    }

    patch(id,data) {   
        console.log("inside patch");
        console.log("------------------",data);
        let schemaName = eval("schema." + data.gateway + "_payment_charge_update_schema");
        this.validateSchema(data, schemaName);
        let response = this.updatedata(data); 
        return response;   
    }

 
    updatedata(data){
 
        console.log("inside updatedata..");
        console.log("data",data);
        var chargeId = data.chargeId;
        delete data.chargeId;
        delete data.gateway;
        console.log("obj",data);

        
        return new Promise((resolve, reject) => {
         stripe.charges.update(
                    chargeId,data,
                    function(err, charge) {
                        // asynchronously called
                        if(err){
                            console.log(err)
                        }
                        else{
                            resolve(charge);
                        }
                       
                    }
                );
     });
    }


    remove(id, params) {
        return Promise.resolve({ id });
    }
}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;