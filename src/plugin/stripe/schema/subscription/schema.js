module.exports = {
   create : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
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




  get : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
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

   delete : {
      "properties": {
        "gateway": {
            "type": "string",
            "enum": ["stripe"]
        },
          "id": {
              "type": "string"
          }
      },
      "required": ["id" , "gateway" ]
  }
}
