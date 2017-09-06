let _ = require("lodash")

class Paypal {

    constructor(options) {

        this.options = options || {};
        this.paypal = require('paypal-rest-sdk');

        let paypalConfig = {
            "host":'api.sandbox.paypal.com',
            "port":'',
            "api":{
                "client_id":options.client_id,
                "client_secret":options.client_secret
            }
        }

        console.log("///////////////////////////////////////////////////////",paypalConfig);

        this.paypal.configure(paypalConfig.api);

    }


    //########   PAYMENT    ########//

    createCharge(data) {
       return new Promise((resolve, reject) => {

        delete data.gateway;

     var payment_data = data;

     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44444444444",payment_data);

     // resolve(data);

            this.paypal.payment.create(payment_data, function(error, payment){
              if(error){
                resolve(error);
              } else {
                resolve(payment);
              }
            });
        })
    }


    getCharge(data) {
        console.log("inside getcharges...")
        console.log(1212);

        return new Promise((resolve, reject) => {

            if (_.has(data, 'payment_id') && _.has(data, 'gateway')) {

                 this.paypal.payment.get(data.payment_id, function (error, payment) {
                    if (error) {
                        resolve(error);
                    } else {
                            resolve(payment);
                        }

                });

            } else if (_.has(data, 'gateway') && !_.has(data, 'payment_id')) {
                console.log("11");

                delete data.gateway;

                var listPayment = data;

                this.paypal.payment.list(listPayment, function (error, payment) {
                    if (error) {
                        throw error;
                    } else {
                        resolve(payment);
                        console.log("payment",payment);
                    }
                });
            }

        })
    }
}



module.exports = function(options) {
    return new Paypal(options);
};

module.exports.Paypal = Paypal;
