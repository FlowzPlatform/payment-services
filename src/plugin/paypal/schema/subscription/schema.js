
/* Create agreement */

module.exports = {
    create: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["paypal"]
            },
            "name": {
                "description": "The agreement name",
                "type": "string"
            },
            "description": {
                "description": "The agreement description",
                "type": "string"
            },
            "start_date": {
                "description": "The date when this agreement begins",
                "type": "string"
            },
            "payment_token": {
                "type": "string",
                "description": "The ID of the agreement to execute"
            },
            "note": {
                "type": "string",
                "description": "The reason for the agreement state change."
            },
            "agreement_id":{
                    "type":"string",
                    "description":"ID of the agreement to suspend"
                },
            "action":{
                    "description":"give action to be perform",
                    "enum":["create","reactivate","suspend","cancel"]
                },
            "payer": {
                "type": "object",
                "properties": {
                    "payment_method": {
                        "description": "payment method",
                        "type": "string",
                        "enum": ["credit_card", "paypal"]
                    },
                    "payer_info": {
                        "type": "object",
                        "properties": {
                            "email": {
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                }
            },
            "agreement_details": {
                "type": "object",
                "properties": {
                    "outstanding_balance": {
                        "type": "object",
                        "description": "The outstanding balance for this agreement",
                        "properties": {
                            "value": {
                                "type": "string",
                                "description": "The three-letter ISO 4217 alphabetic currency code"
                            },
                            "currency": {
                                "type": "string",
                                "description": "The currency value. Might be an integer for currencies like JPY that are not typically fractional or a three-place decimal fraction for currencies like TND that are subdivided into thousandths. For the required number of decimal places for a currency code"
                            }
                        }
                    },
                    "cycles_remaining": {
                        "type": "string",
                        "description": "The number of payment cycles remaining for this agreement"
                    },
                    "cycles_completed": {
                        "type": "string",
                        "description": "The number of payment cycles completed for this agreement."
                    },
                    "next_billing_date": {
                        "type": "string",
                        "description": "The next billing date for this agreement, in Internet date and time format. For example, 2017-01-23T08:00:00Z."
                    },
                    "last_payment_amount": {
                        "type": "object",
                        "description": "The last payment amount for this agreement",
                        "properties": {
                            "value": {
                                "type": "string",
                                "description": "The three-letter ISO 4217 alphabetic currency code"
                            },
                            "currency": {
                                "type": "string",
                                "description": "The currency value. Might be an integer for currencies like JPY that are not typically fractional or a three-place decimal fraction for currencies like TND that are subdivided into thousandths. For the required number of decimal places for a currency code"
                            }
                        }
                    },
                    "final_payment_date": {
                        "type": "string",
                        "description": "The final payment date for this agreement, in Internet date and time format. For example, 2017-09-23T08:00:00Z."
                    },
                    "failed_payment_count": {
                        "type": "string",
                        "description": "The total number of failed payments for this agreement."
                    }
                }
            },

            "plan": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the plan"
                    },
                    "name": {
                        "type": "string",
                        "description": "The plan name",
                    },
                    "description": {
                        "type": "string",
                        "description": "The plan description"
                    },
                    "type": {
                        "type": "string",
                        "description": "The plan type,Possible values: FIXED, INFINITE",
                        "enum": ["FIXED", "INFINITE"]
                    }
                },
            },
            "shipping_address": {
                "type": "object",
                "properties": {
                    "line1": {
                        "type": "string",
                        "description": "required line1 of address"
                    },
                    "line2": {
                        "type": "string",
                        "description": "required line2 of address"
                    },
                    "city": {
                        "type": "string",
                        "description": "city name"
                    },
                    "state": {
                        "type": "string",
                        "description": "state name"
                    },
                    "postal_code": {
                        "type": "string",
                        "description": "postal code"
                    },
                    "country_code": {
                        "type": "string",
                        "description": "country code"
                    }
                }
            },
            "override_merchant_preferences": {
                "type": "object",
                "description": "Merchant preferences that override the default information in the plan. If you omit this parameter, the agreement uses the default merchant preferences from the plan",
                "properties": {
                    "setup_fee": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "minLength": 1,
                                "description": "The three-letter ISO 4217 alphabetic currency code"
                            },
                            "currency": {
                                "type": "string",
                                "minLength": 1,
                                "description": "The currency value. Might be an integer for currencies like JPY that are not typically fractional or a three-place decimal fraction for currencies like TND that are subdivided into thousandths. For the required number of decimal places for a currency code"
                            }
                        }
                    },
                    "return_url": {
                        "type": "string",
                        "description": "he URL where the customer can approve agreement."
                    },
                    "cancel_url": {
                        "type": "string",
                        "description": "The URL where the customer can cancel the agreemen"

                    },
                    "auto_bill_amount": {
                        "type": "string",
                        "description": "Indicates whether PayPal automatically bills the outstanding balance in the next billing cycle. The outstanding balance is the total amount of any previously failed scheduled payments",
                        "enum": ["YES", "NO"]
                    },
                    "initial_fail_amount_action": {
                        "type": "string",
                        "description": "The action if the customer's initial payment fails",
                        "enum": ["CONTINUE", "CANCEL"]
                    },
                    "max_fail_attempts": {
                        "type": "string",
                        "description": "The maximum number of allowed failed payment attempts. Default is 0, which allows infinite failed payment attempts."
                    }
                }
            },
            "override_charge_models": {
                "type": "array",
                "description": "A charge model that overrides default charge information during agreement creation.",
                "uniqueItems": true,
                "minItems": 1,
                "items": {
                    "required": [
                        "charge_id"
                    ],
                    "properties": {
                        "charge_id": {
                            "type": "string",
                            "description": "The ID of the charge model."
                        },
                        "amount": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "description": "The currency value. Might be an integer for currencies like JPY that are not typically fractional or a three-place decimal fraction for currencies like TND that are subdivided into thousandths. For the required number of decimal places for a currency code, see ISO 4217."
                                },
                                "currency": {
                                    "type": "string",
                                    "description": "The three-letter ISO 4217 alphabetic currency code"
                                }
                            }
                        }
                    }
                }
            }
        },
        "required":["gateway","action"]
    },

    /* Show agreement details */

    get: {
        "properties": {
            "gateway": {
                "type": "string",
                "enum": ["paypal"]
            },
            "agreement_id": {
                "type": "string",
                "description": "The ID of the agreement for which to show details."
            }
        },
        "required":["gateway","agreement_id"]
    },

    /* Update agreement*/

    update: {
        "properties": {
            "gateway": {
                "type": "string",
                "enum": ["paypal"]
            },
            "agreement_id": {
                "type": "string",
                "description": "The ID of the agreement to update"
            },
            "op": {
                "type": "string",
                "description": "The operation to perform.",
                "enum": ["add", "remove", "replace", "move", "copy", "test"]
            },
            "path": {
                "type": "string",
                "description": "A JSON pointer that references a location in the target document where the operation is performed.",
            },
            "value": {
                "description": "value to apply"
            },
            "from": {
                "description": "Required for the move operation"
            }
        },
        "required":["gateway"]
    }
}