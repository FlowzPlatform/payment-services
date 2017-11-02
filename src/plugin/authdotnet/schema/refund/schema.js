module.exports = {


    create : {

       "properties": {
           "gateway": {
               "type": "string",
               "enum": [ "authdotnet"]
           },
           "transactionRequest":{
              "type":"object",
              "properties":{
                  "transactionType":{
                    "description":"Type of credit card transaction",
                    "type":"string"
                  },
                  "amount":{
                   // "type":"number"
                  },
                  "refTransId":{
                  },
                  "payment":{
                    "properties":{
                      "creditCard":{
                        "properties":{
                          "cardNumber":{
                            "description":"card number"
                          },
                          "expirationDate":{
                            "description":"expire date of card"
                          }
                        },
                        "required":["cardNumber","expirationDate"]
                      }
                    }
                  }
              },
              "required":["refTransId","amount"]
            }
          },
          "required":["gateway","transactionRequest"]
        }


  }
