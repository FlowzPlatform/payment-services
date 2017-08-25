module.exports = {
   stripe_subscription_create_schema : {
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
      "required": [ "gateway" , "customer" ],
      "additionalProperties": false
  },
  authdotnet_subscription_create_schema : {
     "properties": {
       "gateway": {
           "type": "string",
           "enum": ["stripe", "authdotnet"]
       },
         "customer": {
            "description": "valid customer id"
         },
         "plan": {
             "description": "valid plan id"
         },
         "subscription":{
              "description":"Contains information about the subscription",
              "properties":{
                "name":{
                  "description":"Merchant-assigned name"
                },
                "paymentSchedule":{
                  "description":"Contains information about the payment schedule",
                  "properties":{
                    "interval":{
                      "description":"Contains information about the time between payments",
                      "properties":{
                        "length":{
                          "description":"measurement of time"
                        },
                        "unit":{
                          "description":"unit of time"
                        }
                      },
                      "required":["length"],
                      "additionalProperties":false
                    },
                    "startDate":{
                      "description":"date the subscription begins"
                    },
                    "totalOccurrences":{
                      "description":"Number of billing occurrences"
                    },
                    "trialOccurrences":{
                      "description":"payments in the trial period"
                    }
                  },
                  "required":["interval","startDate","totalOccurrences"],
                  "additionalProperties": false
                },
                "amount":{
                  "description":"amount to be billed"
                },
                "trialAmount":{
                  "description":"amount to be charged for each payment during the trial period"
                },
                "profile":{
                  "properties":{
                    "customerProfileId":{
                      "description":"ID associated with the customer profile"
                    },
                    "customerPaymentProfileId":{
                      "description":"ID associated with the customer payment profile"
                    },
                    "customerAddressId":{
                      "description":"ID associated with the customer shipping address"
                    }
                  },
                  "required":["customerProfileId","customerPaymentProfileId","customerAddressId"]
                },

              },
              "required": ["paymentSchedule"],
              "additionalProperties": false
         }
     },
     "required": [ "gateway","subscription" ],
     "additionalProperties": false
 },










   stripe_subscription_get_schema : {
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

   stripe_subscription_delete_schema : {
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
  }
}
