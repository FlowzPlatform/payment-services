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

     updateCharge(data) {

        console.log("inside updatedata..");
        console.log("data", data);
        var chargeId = data.chargeId;
        delete data.chargeId;
        delete data.gateway;
        console.log("obj", data);


        return new Promise((resolve, reject) => {
            this.stripe.charges.update(
                chargeId, data,
                function(err, charge) {
                    // asynchronously called
                    if (err) {
                        console.log(err);
                        console.log("err");
                    } else {
                        resolve(charge);
                        //console.log("response",charge);
                    }

                }
            );
        });
    }

    getsubscriptions(data){
        console.log("getsubscriptions");
        console.log("data", data);

        return new Promise((resolve, reject) => {
        if (!_.has(data, 'id') && _.has(data, 'gateway')) {
         
                // let gte = "gt";
                let filterByCreated = "gte";
                let createdAt = data.createdAt
                let subscriptionList = {
                    "limit": data.limit,
                    "created": {},
                    "customer": data.customer,
                    "plan": data.plan,
                    "starting_after": data.starting_after,
                    "status": data.status
                }
                subscriptionList.created[filterByCreated] = createdAt
                this.stripe.subscriptions.list(subscriptionList,
                    function(err, subscriptions) {
                        resolve(subscriptions);
                    }
                );
            

        } else if (_.has(data, 'gateway') && _.has(data, 'id')) {
                //console.log(hook.params.query);
                this.stripe.subscriptions.retrieve(
                    data.id,
                    function(err, plan) {
                        console.log(plan);
                        resolve(plan);
                    }
                );
            
        }
    })
    }


    createSubscription(data){
        console.log("inside createSubscription",data);
        return new Promise((resolve, reject) => {
        this.stripe.subscriptions.create({
            customer: data.customer,
            items: [{
                plan: data.plan,
            }, ]
        }, function(err, subscription) {
            if(err){
                console.log(err);
            }else{
                resolve(subscription);
            }
        });
    })
    }

    deleteSubscription(data){
        console.log("inside deleteSubscription",data);
        return new Promise((resolve, reject) => {
        this.stripe.subscriptions.del(
                data.id,
                function(err, confirmation) {
                    resolve(confirmation);
                });
        });
    }

    getcustomers(data){
        console.log("inside getcustomers",data);
        return new Promise((resolve, reject) => {

        if(!_.has(data, 'id') && _.has(data, 'gateway'))  {
            this.stripe.customers.list(
                {"limit" : 15},
                function(err, customers) {
                resolve(customers);
                });
             }else if (_.has(data, 'gateway') && _.has(data, 'id')){
                    this.stripe.customers.retrieve(
                        data.id,
                    function(err, customer) {
                        console.log(customer);
                        if (customer) {
                            console.log("customer",customer);
                            }
                        else if (customer == null){
                            hook.result = new errors.Conflict("This customer dosen't exists");
                            }
                            resolve(customer);
                        });
                    }
            })
        }

    createCustomer(data){
        console.log("inside create customer",data);
        //console.time("Timer");
        return new Promise((resolve, reject) => {
            //console.log("$$$$$$$$$$$$$$$$ ", this);
            let stripeInstance = this;
             this.stripe.tokens.create({
             card: {
                "number": data.cardNumber,
                "exp_month": data.expMonth,
                "exp_year": data.expYear,
                "cvc": data.cvc
                }
            }, function(err, token) {
                if(err){
                     console.log("error ", err);
                }
                else 
                {
                    
                    //     console.log("token",token);
                        stripeInstance.stripe.customers.create({
                        description: 'Customer for liam.moore@example.com',
                        source: token.id // obtained with Stripe.js
                    }, function(err, customer) {
                            customer.tok_id = token.id ;
                            resolve(customer);
                            //console.timeEnd("Timer");
                    });
                    }
     // synchronously called

            });
        })
    }   


}

module.exports = function(options) {
    return new Stripe(options);
};

module.exports.Stripe = Stripe;