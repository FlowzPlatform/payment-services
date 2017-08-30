let _ = require("lodash")
let stripeConfig = require("../../../config/stripe/stripeConfig");

class Stripe {
    /**
     * constructor
     * @param {*} options
     */
    constructor(options) {
        console.log("inside stripe class..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};

        this.stripe = require("stripe")(
            options.secret_key
        );
    }

    /**
     * do direct charge
     * @param {*} data
     */
    doCharge(data) {
        console.log("inside stripe docharge..");
        //console.log(this.stripe);

        return new Promise((resolve, reject) => {

            this.stripe.charges.create({
                amount: data.amount,
                currency: data.currency,
                description: data.description,
                customer: data.customerId
            }, function(err, charge) {
                // asynchronously called
                if (err) {
                    resolve(err)
                } else {
                    console.log(charge)
                        //console.log('1212');
                    resolve(charge)
                }
            });
        })
    }
    getCharge(data) {
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



    getSubscription(data) {

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
    createSubscription(data) {

        console.log("inside createSubscription", data);
        return new Promise((resolve, reject) => {
            this.stripe.subscriptions.create({
                customer: data.customer,
                items: [{
                    plan: data.plan,
                }, ]
            }, function(err, subscription) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(subscription);
                }
            });
        })
    }
    deleteSubscription(data) {

        console.log("inside deleteSubscription", data);
        return new Promise((resolve, reject) => {
            this.stripe.subscriptions.del(
                data.id,
                function(err, confirmation) {
                    resolve(confirmation);
                });
        });
    }



    getCustomer(data) {

        console.log("inside getcustomers", data);
        return new Promise((resolve, reject) => {

            if (!_.has(data, 'id') && _.has(data, 'gateway')) {
                this.stripe.customers.list({ "limit": 15 },
                    function(err, customers) {
                        resolve(customers);
                    });
            } else if (_.has(data, 'gateway') && _.has(data, 'id')) {
                this.stripe.customers.retrieve(
                    data.id,
                    function(err, customer) {
                        console.log(customer);
                        if (customer) {
                            console.log("customer", customer);
                        } else if (customer == null) {
                            hook.result = new errors.Conflict("This customer dosen't exists");
                        }
                        resolve(customer);
                    });
            }
        })
    }
    createCustomer(data) {

        console.log("inside create customer", data);
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
                if (err) {
                    console.log("error ", err);
                } else {
                    stripeInstance.stripe.customers.create({
                        description: 'Customer for liam.moore@example.com',
                        source: token.id // obtained with Stripe.js
                    }, function(err, customer) {
                        customer.tok_id = token.id;
                        resolve(customer);
                        //console.timeEnd("Timer");
                    });
                }
                // synchronously called

            });
        })
    }
    updateCustomer(data) {

        console.log("data", data);
        var customer = data.customer;
        delete data.gateway;
        delete data.customer;
        console.log("data", data);

        console.log("inside update customer", data);
        return new Promise((resolve, reject) => {
            this.stripe.customers.update(
                customer, data,
                function(err, customer) {
                    // asynchronously called
                    resolve(customer);
                });
        })
    }
    deleteCustomer(data) {

        console.log("inside delete customer", data);
        return new Promise((resolve, reject) => {
            this.stripe.customers.del(
                data.id,
                function(err, confirmation) {
                    console.log(confirmation);
                    resolve(confirmation);
                });
        })
    }



    async createPlan(data) {

        console.log("111111111111111111 ", data)
        var modify_interval = this.modify_interval_func(data.gateway, data.interval);
        let modifyPlanId = await this.modify_plan_id_func(data.gateway, data.name);
        console.log(modify_interval);
        console.log("result  ", modifyPlanId);
        data.id = modifyPlanId.id;
        data.interval = modify_interval;
        console.log("22222222222222222222222 ", data);

        return new Promise((resolve, reject) => {

            this.stripe.plans.create({
                amount: data.amount,
                interval: data.interval,
                name: data.name,
                currency: data.currency,
                id: data.id
            }, function(err, plan) {
                // asynchronously called
                console.log("created plan ---- ", plan);
                resolve(plan);
            })
        })

    }
    modify_interval_func(gateway, interval) {
        var new1 = eval(gateway + "Config.interval." + interval);
        console.log("modify_interval_func", new1);
        return eval(gateway + "Config.interval." + interval)
    }
    modify_plan_id_func(gateway, name) {
        var str = name;
        var foundresult = false;
        str = str.replace(/\s+/g, '-').toLowerCase();
        let modifyPlanIdData = {
            "id": "fp-" + str
        };
        console.log("modifyPlanIdData", modifyPlanIdData);
        return modifyPlanIdData;
    }
    getPlan(data) {
        return new Promise((resolve, reject) => {
            if (!_.has(data, 'id') && _.has(data, 'gateway')) {
                this.stripe.plans.list({ "limit": data.limit , "starting_after": data.starting_after },
                    function(err, plans) {
                        console.log("plans", plans);
                        resolve(plans);
                    });
            } else if (_.has(data, 'gateway') && _.has(data, 'id')) {
                this.stripe.plans.retrieve(
                    data.id,
                    function(err, plan) {
                        console.log("plan", plan);
                        resolve(plan);
                    });
            }
        })
    }
    updatePlan(data) {

        return new Promise((resolve, reject) => {
            let stripe_interval = this.modify_interval_func(data.gateway, data.interval);
            console.log(stripe_interval);
            this.stripe.plans.update(data.id, {
                name: data.name
            }, function(err, plan) {
                console.log(plan);
                resolve(plan);
            });
        })
    }
    deletePlan(data) {

        return new Promise((resolve, reject) => {
            this.stripe.plans.del(
                data.id,
                function(err, confirmation) {
                    console.log(confirmation);
                    resolve(confirmation);
                });
        })
    }

}

module.exports = function(options) {
    return new Stripe(options);
};

module.exports.Stripe = Stripe;
