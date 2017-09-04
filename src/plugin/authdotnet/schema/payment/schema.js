var customerId = {
    "description": "customerId in string",
    "type": "string"
}

module.exports = {
    create: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet"]
            },
            "amount": {
                "description": "amount in Integer",
                "type": "integer"
            },
            "isCustomer": {
                "description": "isCustomer in string",
                "type": "boolean",
            }
        },
        "required": ["gateway", "amount","isCustomer"],
        "oneOf": [{
                "type": "object",
                "properties": {
                    "customerId": {
                        "description": "customerId in string",
                        "type": "string"
                    },
                    "customerPaymentProfieId": {
                        "description": "customerPaymentProfieId in string",
                        "type": "string"
                    }
                },
                "required": ["customerId", "customerPaymentProfieId"]
            },
            {
                "type": "object",
                "properties": {
                    "cardNumber": {
                        "description": "card number in string",
                        "type": "string"
                    },
                    "expMonth": {
                        "description": "expiry month in String",
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 2
                    },
                    "expYear": {
                        "description": "expiry year in String",
                        "type": "string"
                    },
                    "cvc": {
                        "description": "cvc in string",
                        "type": "string"
                    }
                },
                "required": ["cardNumber", "expMonth", "expYear", "cvc"]
            }
        ]
    }
}
