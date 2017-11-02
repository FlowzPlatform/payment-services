module.exports = {
   create : {
     "properties": {
       "gateway": {
           "type": "string",
           "enum": ["stripe", "authdotnet"]
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
                          "description":"measurement of time",

                          'type' : 'number'

                        },
                        "unit":{
                          "description":"unit of time",
                          "type" : "string",
                          "enum" : ["MONTHS" , "DAYS"]
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

  get : {
    "properties":{
      "gateway":{
        "type":"string",
        "enum":["authdotnet"]
      },
      "id":{
        "type":"string"
      },
      "getStatus":{
        "description":"for status you have to set value true otherwise false"
      },
      "searchType":{
        "type":"string",
        "enum":["CARDEXPIRINGTHISMONTH","SUBSCRIPTIONACTIVE","SUBSCRIPTIONINACTIVE","SUBSCRIPTIONEXPIRINGTHISMONTH"]
      }
    },
    "required": ["gateway"]
  },


  update : {

    "properties":{
      "gateway":{
        "type":"string",
        "enum":["authdotnet"]
      },
      "id":{
        "type":"string"
      },
      "subscription":{
        "properties":{
          "order":{
            "type":"object",
            "properties":{
              "invoiceNumber":{
                "type":"string"
              },
              "description":{
                "type":"string"
              }
            }
          }
        }
      }
    },
    "required":["id","gateway","subscription"]

  },



  delete : {

    "properties": {
        "gateway": {
            "type": "string",
            "enum": ["authdotnet"]
        },
          "id": {
              "type": "string"
          }
      },
      "required": ["id" , "gateway" ]
  }
}
