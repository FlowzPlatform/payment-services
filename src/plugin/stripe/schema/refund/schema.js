module.exports = {
     create : {
     "properties":{
        "gateway":{
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
        },
        "chargeId":{
          "descripion":"identifier of the charge to refund",
          "type":"string"
        },
        "amount": {
          "description": "amount in Integer",
          "type": "integer"
        },
        "reason":{
          "descripion":"String indicating the reason for the refund"
        },
        "metadata":{
          "type":"object"
        }
      },
      "required":["chargeId","gateway"]
    },

  get : {
      "properties": {
        "gateway": {
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
        },
        "id": {
          "type": "string"
        },
        "limit":{
          "description":"can set limitation of data"
        },
        "starting_after":{
          "description":"cursor for use in pagination",
          "type":"string"
        },
        "chargeId":{
          "type":"string"
        }
      },
      "required": ["gateway"]
  },

  update : {
    "properties":{
      "gateway":{
          "type": "string",
          "enum": ["stripe", "authrizeDotNet"]
        },
        "id":{
          "type":"string"
        },
        "metadata":{
          "type":"object"
        }
    },
    "required":["gateway","id"]
  }
}