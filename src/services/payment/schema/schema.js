var customerId = {
    "description": "customerId in string",
    "type": "string"
}

module.exports = {
    stripe_payment_charge_schema: {
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
            "currency": {
                "description": "currency in string",
                "type": "string",
                "enum": ["usd", "inr"]
            },
            "customerId": customerId,
            "description": {
                "description": "description in string",
                "type": "string"
            },
            "receipt_email": {
                "description": "receipt_email in string",
                "type": "string"
            }
        },
        "required": ["gateway", "amount", "currency", "customerId"],
        "additionalProperties": false
    },
    stripe_payment_charge_find_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet"]
            },
            "chargeId": {
                "description": "chargeId in string",
                "type": "string"
            },
            "customerId": customerId,
            "limit": {
                "description": "limit in string",
                "type": "string"
            }
        },
        "required": ["gateway", "customerId"],
        "additionalProperties": false
    },
    authdotnet_payment_charge_schema: {
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
        "required": ["gateway", "amount"]
    },
    stripe_payment_charge_retrive_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet"]
            },
            "chargeId": {
                "description": "chargeId in string",
                "type": "string"
            },
            "customerId": customerId
        },
        "required": ["gateway", "chargeId"],
        "additionalProperties": false
    },
    stripe_payment_charge_update_schema: {
        "properties": {
            "gateway": {
                "description": "gateway in string",
                "type": "string",
                "enum": ["stripe", "authdotnet"]
            },
            "description": {
                "description": "description about charge in string",
                "type": "string"
            },
            "metadata": {
                "description": "Set of key/value pairs in string",
                "type": "object"
            },
            "chargeId": {
                "description": "chargeId in string",
                "type": "string"
            },
            "fraud_details": {
                "description": "fraud_details in string",
                "type": "object"
            },
            "receipt_email": {
                "description": "email address that the receipt for this charge will be sent to",
                "type": "string"
            },
            "shipping": {
                "description": "Shipping information for the chargeId",
                "type": "object",
                "properties": {
                    "address": {
                        "description": "address for Shipping information",
                        "type": "object",
                        "properties": {
                            "line1": {
                                "description": "line1 of shipping address",
                                "type": "string"
                            },
                            "city": {
                                "description": "city of shipping address",
                                "type": "string"
                            },
                            "country": {
                                "description": "country of shipping address",
                                "type": "string"
                            },
                            "line2": {
                                "description": "line2 of shipping address",
                                "type": "string"
                            },
                            "postal_code": {
                                "description": "postal_code of shipping address",
                                "type": "string"
                            },
                            "state": {
                                "description": "state of shipping address",
                                "type": "string"
                            }
                        },
                        "required": ["line1"]
                    },
                    "name": {
                        "description": "name for Shipping information",
                        "type": "string"
                    },
                    "carrier": {
                        "description": "carrier for Shipping information",
                        "type": "string"
                    },
                    "phone": {
                        "description": "phone number for shipping information",
                        "type": "number"
                    },
                    "tracking_number": {
                        "description": "tracking_number for shipping information",
                        "type": "string"
                    }
                },
                "required": ["address", "name"]
            },
            "transfer_group": {
                "description": "identifies this transaction as part of a group",
                "type": "string"
            }
        },
        "required": ["gateway", "chargeId"],
        "additionalProperties": false
    }
};