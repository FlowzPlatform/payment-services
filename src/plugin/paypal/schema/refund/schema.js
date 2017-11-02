var address = {
                "type":"object",
                "properties":{
                    "line1":{
                        "description": "first line of the address",
                        "type":"string"
                    },
                    "line2":{
                        "description": "second line of the address",
                        "type":"string"
                    },
                    "city":{
                        "description": "city name",
                        "type":"string"
                    },
                    "country_code":{
                        "description": "two-digit country code",
                        "type":"string"
                    },
                    "postal_code":{
                        "description": "zip code or equivalent",
                        "type":"string"
                    },
                    "state":{
                        "description": "two-letter code for US states or the equivalent for other countries",
                        "type":"string"
                    },
                    "phone":{
                        "description": "phone number",
                        "type":"string"
                    },
                    "normalization_status":{
                        "description": "first line of the address",
                        "enum":["UNKNOWN", "UNNORMALIZED_USER_PREFERRED", "NORMALIZED", "UNNORMALIZED"]
                                      
                    },
                    "type":{
                        "description": "type of address",
                        "type":"string"
                    },
                    "recipient_name":{
                        "description": " name of the recipient at this address",
                        "type":"string"
                    }
                },
                "additionalProperties": false
            }


module.exports = {
    
     create : {
        "properties": {
           "gateway": {
              "type": "string",
              "enum": [ "authdotnet","paypal"]
           },
           "amount":{
                        "type":"object",
                        "properties":{
                            "currency":{
                                "type":"string"

                            },
                            "total":{
                                "description":"total amount charged",
                                "type":"string"

                            },
                            "details":{
                                "type":"object",
                                "properties":{
                                    "subtotal":{
                                        "description":"subtotal amount for the items",
                                        "type":"string"

                                    },
                                    "shipping":{
                                        "description":"shipping fee",
                                        "type":"string"
                                    },
                                    "tax":{
                                        "type":"string"

                                    },
                                    "handling_fee":{
                                        "type":"string"

                                    },
                                    "shipping_discount":{
                                        "type":"string"

                                    },
                                    "insurance":{
                                        "type":"string"

                                    },
                                    "gift_wrap":{
                                        "type":"string"

                                    }
                                },
                                "additionalProperties": false
                            }
                        },
                        "additionalProperties":false

           },
           "refund_source":{
              "description":"PayPal funding source type",
              "enum":["INSTANT_FUNDING_SOURCE","ECHECK","UNRESTRICTED"]
           },
           "invoice_number":{
              "description":"invoice number that is used to track this payment",
              "type":"string"
           },
           "refund_advice":{
              "description":"whether store credit was already given to the payer",
              "type": "boolean"
           },
           "payer_info":{
              "properties":{
                "email":{
                  "description":" payer's email address",
                  "type":"string"
                },
                "salutation":{
                  "description":"payer's salutation",
                  "type":"string"
                },
                "first_name":{
                  "description":"payer's first name",
                  "type":"string"
                },
                "middle_name":{
                  "description":"payer's middle name",
                  "type":"string"
                },
                "last_name":{
                  "description":"payer's last name",
                  "type":"string"
                },
                "suffix":{
                  "description":"payer's suffix",
                  "type":"string"
                },
                "payer_id":{
                  "description":"PayPal-assigned encrypted payer ID",
                  "type":"string"
                },
                "phone":{
                  "description":"payer's phone number",
                  "type":"string"
                },
                "phone_type":{
                  "description":"the phone type",
                  "enum":["HOME","WORK", "MOBILE", "OTHER"]
                },
                "birth_date":{
                  "description":"birth date of the payer",
                  "type":"string"
                },
                "tax_id":{
                  "description":"payer’s tax ID",
                  "type":"string"
                },
                 "tax_id_type":{
                  "description":"payer’s tax ID type",
                  "enum":["BR_CPF", "BR_CNPJ"]
                },
                 "country_code":{
                  "description":"country code",
                  "type":"string"
                },
                "billing_address":address,
                "shipping_address":address

              }
           }

        },
        "required":["gateway"]
      }
  }

