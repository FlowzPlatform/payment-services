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
    create: {
        "properties":{
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet","paypal"]
            },
            "intent":{
                "description":"payment intent",
                "type":"string",
                "enum":["sale","authorize","order"]
            },
            "payer":{
                "type":"object",
                "properties":{
                    "payment_method":{
                        "description":"payment method",
                        "type":"string",
                        "enum":["credit_card","paypal"]
                    },
                    "status":{
                        "description":"status of payer's PayPal account",
                        "type":"string",
                        "enum":["VERIFIED","UNVERIFIED"]
                    },
                    "funding_instruments":{

                         "properties":{
                            "credit_card":{
                                "type":"object",
                                "properties":{
                                    "number":{
                                        "description":"card number",
                                        "type":"string"

                                    },
                                    "type":{
                                        "description":"card type",
                                        "enum":["VISA", "AMEX", "SOLO", "JCB", "STAR", "DELTA", "DISCOVER", "SWITCH", "MAESTRO", "CB_NATIONALE", "CONFINOGA", "COFIDIS", "ELECTRON", "CETELEM", "CHINA_UNION_PAY", "MASTERCARD"]

                                    },
                                    "expire_month":{
                                        "description":"two-digit card expiry month",
                                        "type":"integer"

                                    },
                                    "expire_year":{
                                        "description":"four-digit card expiry year",
                                        "type":"integer"

                                    },
                                    "start_month":{
                                        "description":"two-digit card start month",
                                        "type":"integer"

                                    },
                                    "start_year":{
                                        "description":"four-digit card start year",
                                        "type":"integer"

                                    },
                                    "cvv2":{
                                        "description":"card validation code",
                                        "type":"integer"

                                    },
                                    "first_name":{
                                        "description":"card holder's first name",
                                        "type":"string"

                                    },
                                    "last_name":{
                                        "description":"card holder's last name",
                                        "type":"string"

                                    },
                                    "billing_address":address,
                                    "links":{
                                        "description":"HATEOAS links related to this call"

                                    }
                                },
                                "additionalProperties": false

                            },
                            "credit_card_token":{

                                "properties":{
                                    "credit_card_id":{
                                    "description":" ID of credit card that is stored in the PayPal vault",
                                    "type":"string"
                                    },
                                    "payer_id":{
                                        "description":"ID of the customer who owns this credit card",
                                        "type":"string"
                                    },
                                    "last4":{
                                        "description":"last four digits of the card number",
                                        "type":"string"
                                    },
                                    "type":{
                                        "description":"card type",
                                        "enum":["VISA", "AMEX", "SOLO", "JCB", "STAR", "DELTA", "DISCOVER", "SWITCH", "MAESTRO", "CB_NATIONALE", "CONFINOGA", "COFIDIS", "ELECTRON", "CETELEM", "CHINA_UNION_PAY", "MASTERCARD"]

                                    },
                                    "expire_month":{
                                        "description":"expiry month from the vaulted card",
                                        "type":"integer"
                                    },
                                    "expire_year":{
                                        "description":"four-digit expiry year from the vaulted card",
                                        "type":"integer"
                                    }
                                },
                                "additionalProperties": false

                            }
                        }
                    }
                }
            },
            "transactions":{
                "properties":{
                    "reference_id":{
                        "description":"merchant-provided ID",
                        "type":"string"
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
                    "payee":{
                        "type":"object",
                        "properties":{
                            "email":{
                                "description":"email address associated with the payee's PayPal account",
                                "type":"string"

                            },
                            "merchant_id":{
                                "description":"PayPal account ID for the payee",
                                "type":"string"

                            }
                        }

                    },
                    "description":{
                        "description":"description of what is being paid for",
                        "type":"string"

                    },
                    "note_to_payee":{
                        "description":"optional note to the recipient of the funds in this transaction",
                        "type":"string"

                    },
                    "custom":{
                        "description":"free-form field for clients' use",
                        "type":"string"

                    },
                    "invoice_number":{
                        "description":"invoice number to track this payment",
                        "type":"string"

                    },
                    "purchase_order":{
                        "description":"purchase order is number or id specific to this payment",
                        "type":"string"

                    },
                    "soft_descriptor":{
                        "description":"soft descriptor that is used when charging this funding source",
                        "type":"string"

                    },
                    "payment_options":{
                        "type":"object",
                        "properties":{
                            "allowed_payment_method":{
                                "enum": ["UNRESTRICTED","INSTANT_FUNDING_SOURCE","IMMEDIATE_PAY"]
                            }
                        }
                        
                    },
                    "item_list":{
                        "type":"object",
                        "properties":{
                            "items":{
                                "type":"object",
                                "properties":{
                                    "sku":{
                                        "description":"stock keeping unit",
                                        "type":"string"
                                    },
                                    "name":{
                                        "description":"item name",
                                        "type":"string"
                                    },
                                    "description":{
                                        "description":"item description",
                                        "type":"string"
                                    },
                                    "quantity":{
                                        "description":"item quantity",
                                        "type":"string"
                                    },
                                    "price":{
                                        "description":"item cost",
                                        "type":"string"
                                    },
                                    "currency":{
                                        "description":"currency",
                                        "type":"string"
                                    },
                                    "tax":{
                                        "description":"item tax",
                                        "type":"string"
                                    },
                                    "url":{
                                        "description":"URL to item information",
                                        "type":"string"
                                    }
                                },
                                "additionalProperties":false
                            },
                            "shipping_address":address,
                            "shipping_method":{
                                "description":"shipping method used for this payment",
                                "type":"string"

                            },
                            "shipping_phone_number":{
                                "description":"shipping phone number",
                                "type":"string"

                            }
                        },
                       "additionalProperties":false
                    }
                },
                "required":[]
            },
            "note_to_payer":{
                "description":"free-form field that clients can use to send a note to the payer",
                "type":"string"

            },
            "redirect_urls":{
                "type":"object",
                "properties":{
                    "return_url":{
                        "description":"URL where the payer is redirected after he or she approves the payment",
                        "type":"string"

                    },
                    "cancel_url":{
                        "description":"The URL where the payer is redirected after he or she cancels the payment",
                        "type":"string"
                    }
                }
            }
        },
        "required":["intent","payer"]
    },
    get: {
        "properties": {
           "gateway": {
               "type": "string",
               "enum": ["stripe", "authdotnet","paypal"]
           },
           "payment_id": {
               "type": "string"
           },
           "count":{
                "description":"number of items to list in the response",
                "type": "string"
           },
           "start_id":{
                "description":"ID of the starting resource in the response",
                "type":"string"
           },
           "start_index":{
                "description":" start index of the payments to list",
                "type":"string"
           },
           "start_time":{
                "description":"start date and time for the range to show in the response",
                "type":"string"
           },
           "end_time":{
                "description":"end date and time for the range to show in the response",
                "type":"string"
           },
           "payee_id":{
                "description":"Filters the payments in the response by a PayPal-assigned merchant ID",
                "type":"string"
           },
           "sort_by":{
                "description":"Sorts the payments in the response by a create time",
                "enum":["create_time"]
           },
           "sort_order":{
                "description":"Sorts the payments in the response in descending order",
                "enum":["desc"]
           }
       },
       "required": [ "gateway"],
       "additionalProperties":false
    },
    
}
