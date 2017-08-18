module.exports = {
    stripe_payment_charge_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authorizeDotNet"]
            },
            "amount": {
                "description": "amount in Integer",
                "type": "integer"
            },
            "currency": {
                "description": "currency in string",
                "type": "string",
                "enum": ["usd", "inr"]
            },
            "customerId": {
                "description": "customerId in string",
                "type": "string"
            }
        },
        "required": ["gateway", "amount", "currency", "customerId"]
    },
    stripe_payment_charge_find_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authrizeDotNet"]
            },
            "chargeId": {
                "description": "chargeId in string",
                "type": "string"
            },
            "customerId": {
                "description": "customerId in string",
                "type": "string"
            }
        },
        "required": ["gateway", "customerId"]
    },
    authorizeDotNet_payment_charge_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authorizeDotNet"]
            },
            "amount": {
                "description": "amount in Integer",
                "type": "integer"
            },
            "currency": {
                "description": "currency in string",
                "type": "string",
                "enum": ["usd", "inr"]
            },
            "customerId": {
                "description": "customerId in string",
                "type": "string"
            }
        },
        "required": ["gateway", "amount", "currency", "customerId"]
    },
};