const Ajv = require('ajv');
let _ = require("lodash");
const func = require("../../../functions.js");
let feathersErrors = require('feathers-errors');
const configParams = require("../../config.js");
let errors = feathersErrors.errors;
let schema = require("./schema/schema.js");
let stripe = require("stripe")(
    configParams.gateway.stripe.secret_key
);

let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

let stripe_subscription_create_schema = {
    "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
        "customer": {
            "description": "valid customer id"
        },
        "plan": {
            "description": "valid plan id"
        }
    },
    "required": ["gateway", "customer"]
}

let stripe_subscription_get_schema = {
    "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
        "id": {
            "type": "string"
        },
        "starting_after": {
            "type": "string"
        }
    },
    "required": ["id", "gateway"],
    "additionalProperties": false
}

let stripe_subscription_delete_schema = {
    "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
        "id": {
            "type": "string"
        }
    },
    "required": ["id", "gateway"]
}


let ajv = new Ajv({
    allErrors: true
});

module.exports = {
    before: {
        all: [
            hook => before_all_hook_subscription(hook)
        ],
        find: [
            hook => before_find_subscription(hook)
        ],
        get: [],
        create: [
            hook => before_create_subscription(hook)
        ],
        update: [],
        patch: [],
        remove: [
            hook => before_delete_subscription(hook)
        ]
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [
            hook => after_create_subscription(hook)
        ],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};




before_all_hook_subscription = async hook => {
    console.log("###########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    func.validateGateway(hook);
}



function before_find_subscription(hook) {
    console.log(hook);
    var myObj = hook.params.query;
    console.log(_.isEmpty(myObj));
    return new Promise((resolve, reject) => {
        if (!_.has(myObj, 'id') && _.has(myObj, 'gateway')) {
            let gatewayUsed = eval("schema." + hook.params.query.gateway + "_subscription_get_schema");
            let validate = ajv.compile(gatewayUsed);
            let valid = validate(hook.params.query);
            if (!valid) {
                throw new errors.NotAcceptable('user input not valid', validate.errors);
            } else {
                // let gte = "gt";
                let filterByCreated = "gte";
                let createdAt = hook.params.query.createdAt
                let subscriptionList = {
                    "limit": hook.params.query.limit,
                    "created": {},
                    "customer": hook.params.query.customer,
                    "plan": hook.params.query.plan,
                    "starting_after": hook.params.query.starting_after,
                    "status": hook.params.query.status
                }
                subscriptionList.created[filterByCreated] = createdAt
                stripe.subscriptions.list(subscriptionList,
                    function(err, subscriptions) {
                        if (subscriptions) {
                            hook.result = subscriptions.data;
                        } else {
                            hook.result = err;
                        }
                        resolve(hook);
                    }
                );
            }

        } else if (_.has(myObj, 'gateway') && _.has(myObj, 'id')) {
            let gatewayUsed = eval("schema." + hook.params.query.gateway + "_subscription_get_schema");
            let validate = ajv.compile(gatewayUsed);
            let valid = validate(hook.params.query);
            if (!valid) {
                throw new errors.NotAcceptable('user input not valid', validate.errors);
            } else {
                console.log(hook.params.query);
                stripe.subscriptions.retrieve(
                    hook.params.query.id,
                    function(err, plan) {
                        console.log(plan);
                        if (plan) {
                            hook.result = plan;
                        } else {
                            hook.result = err;
                        }
                        resolve(hook);
                    }
                );
            }
        }
    })
}


before_create_subscription = (hook) => {
    let gatewayUsed = eval("schema." + hook.data.gateway + "_subscription_create_schema");
    let validate = ajv.compile(gatewayUsed);
    let valid = validate(hook.data);
    if (!valid) {
        throw new errors.NotAcceptable('subscription input not valid', validate.errors);
    } else {
        console.log(hook.data);
        hook.result = hook.data;
    }
}

after_create_subscription = (hook) => {
    console.time("Timer");
    return new Promise((resolve, reject) => {
        stripe.subscriptions.create({
            customer: hook.data.customer,
            items: [{
                plan: hook.data.plan,
            }, ]
        }, function(err, subscription) {
            console.log(subscription);
            console.log(err);
            if (subscription) {
                hook.result = subscription;
            } else {
                hook.result = err;
            }
            console.log(hook);
            resolve(hook);
        });
    })
}

function before_delete_subscription(hook) {
    //console.log(hook);
    return new Promise((resolve, reject) => {
        let gatewayUsed = eval("schema." + hook.params.query.gateway + "_subscription_delete_schema");
        let validate = ajv.compile(gatewayUsed);
        let valid = validate(hook.params.query);
        if (!valid) {
            throw new errors.NotAcceptable('user input not valid', validate.errors);
        } else {
            stripe.subscriptions.del(
                hook.params.query.id,
                function(err, confirmation) {
                    console.log("######################  ", confirmation);
                    if (confirmation) {
                        hook.result = confirmation;
                    } else if (confirmation == null) {
                        hook.result = err
                    }
                    resolve(hook)
                }
            );
        }
    })
}