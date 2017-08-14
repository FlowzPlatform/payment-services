const Ajv = require('ajv');
let _ = require("lodash")
let feathersErrors = require('feathers-errors');
let errors = feathersErrors.errors;
let stripe = require("stripe")(
  "sk_test_V8ZICJodc73pjyGVBBzA0Dkb"
);

 let availableGateways = ["paypal", "stripe", "authorizeDotNet"];

let stripe_customer_create_schema = {
    "properties": {
      "gateway": {
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
      },
        "cardNumber": {
           "description": "card Nunber"
        },
        "expMonth": {
            "description": "card expiry month"
        },
        "expYear": {
            "description": "card expiry year"

        },
        "cvc": {
            "description": "CVC in Number",
            "type": "number"
        },
        "desc": {
            "description": "Customer description in String",
            "type": "string"
        },
        "email": {
            "description": "email  in String",
            "type": "string"
        }
    },
    "required": ["cardNumber" , "gateway" , "expMonth" , "expYear" ,  "cvc"]
}


let stripe_customer_get_schema = {
    "properties": {
      "gateway": {
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
      },
        "id": {
            "type": "string"
        }
    },
    "required": ["id" , "gateway" ]
}

let stripe_customer_delete_schema = {
    "properties": {
      "gateway": {
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
      },
        "id": {
            "type": "string"
        }
    },
    "required": ["id" , "gateway" ]
}


module.exports = {
  before: {
    all: [
      hook => before_all_hook_customer(hook)
    ],
    find: [
      hook => before_find_customer(hook)
    ],
    get: [],
    create: [
      hook => before_create_customer(hook)
    ],
    update: [],
    patch: [],
    remove: [
      hook => before_delete_customer(hook)
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      hook => after_create_customer(hook)
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

let ajv = new Ajv({
    allErrors: true
});

before_all_hook_customer = async hook =>
{
  if (hook.method == "find" || hook.method == "remove")
  {
          let isGatewayAvail = _.indexOf(availableGateways, hook.params.query.gateway );
          if(!hook.params.query.gateway)
          {
              throw new errors.NotAcceptable("please provide gateway")
          } else  if(isGatewayAvail < 0)
          {
              throw new errors.NotAcceptable('gateway not valid');
          }
  } else
      {
          let isGatewayAvail = _.indexOf(availableGateways, hook.data.gateway );
          if(!hook.data.gateway)
          {
              throw new errors.NotAcceptable("please provide gateway")
          } else  if(isGatewayAvail < 0)
          {
              throw new errors.NotAcceptable('gateway not valid');
          }
      }
}




function before_find_customer(hook) {
  console.log(hook);
  var myObj = hook.params.query;
   return new Promise((resolve, reject) => {

     if(!_.has(myObj, 'id') && _.has(myObj, 'gateway'))  {
       stripe.customers.list(
         {"limit" : 15},
       function(err, customers) {
         console.log(customers);
         hook.result = customers.data;
         resolve(hook);
         }
       );
     }else if (_.has(myObj, 'gateway') && _.has(myObj, 'id')){
       let gatewayUsed = eval(hook.params.query.gateway + "_customer_get_schema");
       let validate = ajv.compile(gatewayUsed);
       let valid = validate(hook.params.query);
       if (!valid)
       {
         throw new errors.NotAcceptable('user input not valid', validate.errors);
       }else {
         console.log(hook.params.query);
         stripe.customers.retrieve(
           hook.params.query.id,
         function(err, customer) {
           console.log(customer);
           if (customer) {
             hook.result = customer;
           }else if (customer == null){
             hook.result = new errors.Conflict("This customer dosen't exists");
           }
           resolve(hook);
         }
       );
       }
     }
   })
}





before_create_customer = hook => {

  let gatewayUsed = eval(hook.data.gateway + "_customer_create_schema");
  let validate = ajv.compile(gatewayUsed);
  let valid = validate(hook.data);
  if (!valid)
  {
    throw new errors.NotAcceptable('user input not valid', validate.errors);
  } else
  {
    console.log(hook.data);
    hook.result = hook.data ;
  }
}


after_create_customer = hook => {
  console.time("Timer");
  return new Promise((resolve, reject) => {
    stripe.tokens.create({
     card: {
       "number": hook.data.cardNumber,
       "exp_month": hook.data.expMonth,
       "exp_year": hook.data.expYear,
       "cvc": hook.data.cvc
     }
   }, function(err, token) {
     //console.log(token);
     console.log("error ", err);

     if (token) {
       stripe.customers.create({
          description: 'Customer for liam.moore@example.com',
          source: token.id // obtained with Stripe.js
        }, function(err, customer) {
            customer.tok_id = token.id ;
            hook.result = customer;
            resolve(hook);
            console.timeEnd("Timer");
        });
     }
     // synchronously called

   });
  })
}


function before_delete_customer (hook) {
  //console.log(hook);
  return new Promise((resolve, reject) => {
    let gatewayUsed = eval(hook.params.query.gateway + "_customer_delete_schema");
    let validate = ajv.compile(gatewayUsed);
    let valid = validate(hook.params.query);
    if (!valid)
    {
      throw new errors.NotAcceptable('user input not valid', validate.errors);
    } else
    {
      stripe.customers.del(
        hook.params.query.id,
        function(err, confirmation) {
          console.log(confirmation);
          if (confirmation) {
            hook.result = confirmation;
          }else if (confirmation == null){
            hook.result = new errors.Conflict("This Customer dosen't exists");
          }
          resolve(hook)
        }
      );
    }
  })
}
