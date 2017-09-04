authdotnet_customer_create_schema_address = {
          "description":"customer’s address in string",
          "properties":{
              "firstName":{
                  "description":"customer’s first name in string",
                  "type":"string"
              },
              "lastName":{
                  "description":"customer’s last name in string",
                  "type":"string"
              },
              "company":{
                  "description":"company name in string",
                  "type":"string"
              },
              "address":{
                  "description":"customer’s shipping  address in string",
                  "type":"string"
              },
              "city":{
                  "description":"customer’s city in string",
                  "type":"string"
              },
              "state":{
                  "description":"customer’s state in string",
                  "type":"string"
              },
              "zip":{
                  "description":"customer’s zip in string",
                  "type":"string"
              },
              "country":{
                  "description":"customer’s country in string",
                  "type":"string"
              },
              "phoneNumber":{
                  "description":"customer’s phoneNumber in string",
                  "type":"number"
              },
              "faxNumber":{
                  "description":"customer’s faxNumber in string",
                  "type":"number"
               }
          },
          "additionalProperties": false
        }


module.exports = {


    create : {
       "properties": {
           "gateway": {
               "type": "string",
               "enum": [ "authdotnet"]
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
           "email": {
               "description": "Customer email in String",
               "type": "string"
           },
           "description": {
               "description": "Customer description in String",
               "type": "string"
           },
           "merchantCustomerId": {
               "description": "merchantCustomerId must be unique",
               "type": "string"
           },
           "address":authdotnet_customer_create_schema_address,

       },
       "required": ["cardNumber", "gateway", "expMonth", "expYear","description",  'merchantCustomerId' ],
       "additionalProperties": false
   },





    get : {
       "properties": {
           "gateway": {
               "type": "string",
               "enum": ["stripe", "authdotnet"]
           },
           "id": {
               "type": "string"
           }
       },
       "required": [ "gateway"]
   },



    delete : {
       "properties": {
           "gateway": {
               "type": "string",
               "enum": ["stripe", "authdotnet"]
           },
           "id": {
               "type": "string"
           }
       },
       "required": ["id", "gateway"]
   },




     update : {
        "properties":{
            "gateway": {
                "type": "string",
                "enum": ["stripe", "authdotnet"]
            },
            "customer":{
              "description": "customer in String",
              "type": "string"
            },
            "description":{
                "description": "Customer description in String",
                "type": "string"
            },
            "email": {
                "description": "email  in String",
                "type": "string"
            },
            "merchantCustomerId": {
                "description": "merchantCustomerId must be unique",
                "type": "string"
            }
        },
        "required":["customer"],
         "additionalProperties": false
     }
}
