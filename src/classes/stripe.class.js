let _ = require("lodash")

class Stripe {
    constructor(options) {
        console.log("inside stripe class..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};

        this.stripe = require("stripe")(
            options.secret_key
        );
    }

    doCharge(data) {
        console.log("insiede stripe docharge..");
        //console.log(this.stripe);

        return new Promise((resolve, reject) => {

            this.stripe.charges.create({
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

    getCharges(data) {
        console.log("inside getcharges...")
        console.log(1212);
        return new Promise((resolve, reject) => {

            if (!_.has(data, 'chargeId') && _.has(data, 'gateway')) {
                this.stripe.charges.list({
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
                this.stripe.charges.retrieve(
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
}

module.exports = function(options) {
    return new Stripe(options);
};

module.exports.Stripe = Stripe;