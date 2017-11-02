var amount = {
    "properties":{
        "currency":{
            "description":"currency code",
            "type":"string"
        },
        "value":{
            "description":"amount up to N digits",
            "type":"string"
        }
    },
    "additionalProperties": false
}

module.exports = {
    
     create : {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet","paypal"]
            },
           "name":{
                "description":"plan name",
                "type":"string"
           },
           "description":{
                "description":"plan description",
                "type":"string"
           },
           "type":{
                "description":"plan type",
                "enum":["FIXED","INFINITE"]
           },
           "payment_definitions":{
                "properties":{
                    "id":{
                        "description":"ID of the payment definition",
                        "type":"string"
                    },
                    "name":{
                        "description":"payment definition name",
                        "type":"string"
                    },
                    "type":{
                        "description":"payment definition type",
                        "enum":["TRIAL", "REGULAR"]
                    },
                    "frequency_interval":{
                        "description":"nterval at which the customer is charged",
                        "type":'string'
                    },
                    "frequency":{
                        "description":"frequency of the payment in this definition",
                        "enum":["WEEK","DAY", "YEAR", "MONTH"]
                    },
                    "cycles":{
                        "description":"number of payment cycles",
                        "type":"string"
                    },
                    "amount":amount,
                    "charge_models":{
                       "properties":{     
                            "id":{
                                "description":"ID of the charge model",
                                "type":"string"
                            },
                            "type":{
                                "description":"charge model type",
                                "enum":["TAX","SHIPPING"]
                            },
                            "amount":amount,
                           },
                           "additionalProperties":false
                       }
                },
                "required":[],
                "additionalProperties": false
           },
           "merchant_preferences":{
                "type":"object",
                "properties":{

                    "setup_fee":amount,
                    "cancel_url":{
                        "description":"URL where the customer can cancel the agreement",
                        "type":"string"
                    },
                    "return_url":{
                        "description":"URL where the customer can approve the agreement",
                        "type":"string"
                    },
                    "notify_url":{
                        "description":"URL where the customer is notified that the agreement was created",
                        "type":"string"
                    },
                    "max_fail_attempts":{
                        "description":"maximum number of allowed failed payment attempts",
                        "type":"string"
                    },
                    "auto_bill_amount":{
                        "description":"whether PayPal automatically bills the outstanding balance in the next billing cycle",
                        "enum":["YES", "NO"]
                    },
                    "initial_fail_amount_action":{
                        "enum":["CONTINUE","CANCEL"]
                    },
                    "accepted_payment_type":{
                        "description":"payment types that are accepted for this plan",
                        "type":"string"
                    },
                    "char_set":{
                        "description":"character set for this plan",
                        "type":"string"
                    }

                },
                "additionalProperties":false


           }

        },
        "required":["gateway","name","description","type"],
        "additionalProperties": false
      },


    update : {

        "properties":{
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet","paypal"]
            },

            "billing_plan_id":{
                "description": "billing plan id",
                "type":"string"

            },

            "op":{
                "description": "operation to perform",
                "enum":["add", "remove", "replace", "move", "copy", "test"]
            },

            "path":{
                "description":"JSON pointer",
                "type":"string"
            },
            "value":{
                "description":"value to apply"
            },
            "from":{
                "description":"Required for the move operation"
            }
        },
        "required":["gateway","billing_plan_id"],
        "additionalProperties":false

    },  


    get : {
        "properties":{
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet","paypal"]
            },
            "plan_id" :{
                "description":"plan id",
                "type":"string"
            },
            "status":{
                "description":"Filters the plans in the response by a plan status",
                "enum":["CREATED", "ACTIVE", "INACTIVE", "DELETED"]
            },
            "page":{
                "type":"string"
            },
            "page_size":{
                "description":"number of plans to list on a single page",
                "type":"string"

            },
            "total_required":{
                "description":"whether the response includes the total_items and total_pages fields",
                "enum":["yes","no"]
            }
        },
        "required":["gateway"]
    }
  }


