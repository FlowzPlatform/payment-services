module.exports = {
   create : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
        },
          "customer": {
             "description": "valid customer id"
          },
          "plan": {
              "description": "valid plan id"
          }
      },
      "required": [ "gateway" , "customer" , "plan"],
      "additionalProperties": false
  },

  get : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
        },
          "id": {
              "type": "string"
          },
          "limit" : {
            "type" : "string"
          },
          "starting_after" : {
              "type" : "string"
          },
          "filterByCreated" : {
            "type": "string",
            "enum": ["lt", "lte" , "gt" ,"gte"]
          },
          "createdAt" : {

          },
          "customer" : {
            "type": "string",
          },
          "plan" : {
            "type": "string",
          },
          "status" : {
            "type": "string",
          }
      },
      "required": [ "gateway" ],
       "additionalProperties": false
  },

   delete : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
        },
          "id": {
              "type": "string"
          }
      },
      "required": ["id" , "gateway" ]
  },

  update : {
    "properties":{
      "gateway": {
          "type": "string",
          "enum": ["stripe"]
      },
      "id": {
          "type": "string"
      },
      "source":{
        "properties":{
          "object":{
            "description":"type of payment source. Should be card"
          },
          "exp_Month": {
              "description": "card expiry month"
          },
          "exp_Year": {
              "description": "card expiry year"
          },
          "cvc": {
              "description": "CVC in Number",
              "type": "number"
          },
          "number":{   
            "description": "Card Number",
          }
        },
        "required":["object","exp_month","exp_year","number","cvc"]

      },
      "tax_percent":{
        "description": "percentage of the subscription invoice subtotal"
      },
      "trial_end":{
        "description":" timestamp representing the end of the trial period"
      }
    },
    "required":["gateway","id"]
  }
}
