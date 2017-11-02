module.exports = {

   stripe_plan_create_schema : {
      "properties": {
          "gateway": {
              "type": "string",
              "enum": ["stripe", "authrizeDotNet"]
          },
          "name": {
              "description": "plan Name in String",
              "type": "string"
          },

          "currency": {
              "description": "currency in string",
              "type": "string",
              "enum": ["USD", "INR"]
          },
          "interval": {
              "description": "interval in string",
              "type": "string"
              //,"enum": ["d", "w", "m", "y"]
          },
          "interval-count": {
              "description": "interval count in Integer",
              "type": "integer"
          },
          "amount": {
              "description": "amount must be Integer",
              "type": "integer"
          }
      },
      "required": ["gateway", "name", "amount", "currency", "interval", "interval-count"],
      "additionalProperties": false

  },



   stripe_plan_update_schema : {    // can update only plan name field
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe", "authrizeDotNet"]
        },
          "id": {
              "type": "string"
          },
          "name": {
              "description": "plan Name in String",
              "type": "string"
          }
      },
      "required": ["id" , "gateway" , "name"]
  },

   stripe_plan_delete_schema : {
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
  },

   stripe_plan_get_schema : {
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
