module.exports = {
   stripe_subscription_create_schema : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
          "customer": {
             "description": "valid customer id"
          },
          "plan": {
              "description": "valid plan id"
          }
      },
      "required": [ "gateway" , "customer" ],
      "additionalProperties": false
  },

   stripe_subscription_get_schema : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
          "id": {
              "type": "string"
          },
          "limit" : {
            "type" : "string"
          },
          "starting_after" : {
              "type" : "string"
          },
          "filterByCreated" : {
            "type": "string",
            "enum": ["lt", "lte" , "gt" ,"gte"]
          },
          "createdAt" : {

          },
          "customer" : {
            "type": "string",
          },
          "plan" : {
            "type": "string",
          },
          "status" : {
            "type": "string",
          }
      },
      "required": [ "gateway" ],
       "additionalProperties": false
  },

   stripe_subscription_delete_schema : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
          "id": {
              "type": "string"
          }
      },
      "required": ["id" , "gateway" ]
  }
}
