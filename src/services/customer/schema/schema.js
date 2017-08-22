module.exports = {
     stripe_customer_create_schema : {
        "properties": {
            "gateway": {
                "type": "string",
                "enum": ["stripe", "authdotnet"]
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
        "required": ["cardNumber", "gateway", "expMonth", "expYear", "cvc"]
    },

    authdotnet_customer_create_schema : {
       "properties": {
           "gateway": {
               "type": "string",
               "enum": ["stripe", "authdotnet"]
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
       "required": ["cardNumber", "gateway", "expMonth", "expYear", "cvc"]
   },















     stripe_customer_get_schema : {
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

     stripe_customer_delete_schema : {
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

     stripe_customer_update_schema : {
        "properties":{
            "customer":{
              "description": "customerid in String",
              "type": "string"  
            },
            "description":{
                "description": "Customer description in String",
                "type": "string"
            },
            "email": {
                "description": "email  in String",
                "type": "string"
            }
        },
        "required":["customer"]
     }
}
