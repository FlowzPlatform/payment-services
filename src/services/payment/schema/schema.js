module.exports = {
  stripe_payment_charge_schema: {
      "properties": {
          "gateway": {
              "description": "gateway in string",
              "type": "string",
              "enum": ["stripe", "authrizeDotNet"]
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
      "required": ["gateway"]
  },
    stripe_payment_charge_update_schema: {
      "properties": {
          "gateway": {
              "description": "gateway in string",
              "type": "string",
              "enum": ["stripe", "authrizeDotNet"]
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
          "fraud_details":{
              "description": "fraud_details in string",
              "type": "object"
          },
          "receipt_email":{
              "description": "email address that the receipt for this charge will be sent to",
              "type": "string"
          },
          "shipping":{
              "description": "Shipping information for the chargeId",
              "type": "object"
          },
          "transfer_group":{
              "description": "identifies this transaction as part of a group",
              "type": "string"
          }
      },
      "required": ["gateway","chargeId"]
  }
};
